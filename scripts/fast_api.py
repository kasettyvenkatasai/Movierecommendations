from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI()

# Load trained model and utilities
clf = joblib.load("./models/genre_mood_model.pkl")
vectorizer = joblib.load("./models/tfidf_vectorizer.pkl")
mlb = joblib.load("../data/genre_mlb.pkl")

# Load movie dataset (only once for efficiency)
movies_df = pd.read_csv("../data/Top_10000_Movies_IMDb.csv")

# Mood ↔ Genre mapping
genre_to_mood = {
    "Comedy": "Happy",
    "Romance": "Romantic",
    "Drama": "Thoughtful",
    "Horror": "Scared",
    "Adventure": "Excited",
    "Action": "Energetic",
    "Thriller": "Tense",
    "Sci-Fi": "Curious"
}

# Reverse mapping: mood → genres
mood_to_genre = {}
for g, m in genre_to_mood.items():
    mood_to_genre.setdefault(m, []).append(g)


@app.post("/predict/")
def predict(movie_name: str, plot: str):
    X = vectorizer.transform([movie_name + " " + plot])
    y_pred = clf.predict(X)
    genres = mlb.inverse_transform(y_pred)[0]
    moods = list({genre_to_mood.get(g, "Neutral") for g in genres})
    return {"genres": genres, "moods": moods}


@app.get("/recommend/")
def recommend(mood: str, top_n: int = 10):
    """
    Recommend movies based on mood → genres mapping.
    """
    mood = mood.capitalize()
    if mood not in mood_to_genre:
        return {"error": f"Mood '{mood}' not found. Available: {list(mood_to_genre.keys())}"}

    # Find genres that map to this mood
    target_genres = mood_to_genre[mood]

    # Filter dataset
    mask = movies_df["Genre"].apply(lambda g: any(tg in g for tg in target_genres))
    results = movies_df[mask].sample(n=min(top_n, mask.sum()), random_state=42)

    return {
        "mood": mood,
        "matched_genres": target_genres,
        "recommendations": results[["Movie Name", "Genre", "Rating", "Link"]].to_dict(orient="records")
    }
