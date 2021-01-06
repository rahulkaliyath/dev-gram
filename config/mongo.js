const mongoose = require('mongoose');
const config = require('config');
const MONGO_URL = config.get('MONGO_URI');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, 
            { useNewUrlParser: true, 
              useUnifiedTopology: true,
              useCreateIndex: true ,
              useFindAndModify:false});
        console.log("Connected to DB");
    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

