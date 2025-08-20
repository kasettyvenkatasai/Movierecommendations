const mongoose = require('mongoose');
async function getmongoconnect(url){
   await mongoose.connect(url ,{connectTimeoutMS: 50000});
}
module.exports = { getmongoconnect};