const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGOURI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true,
        });
console.log(`Mongodb is connected:${conn.connection.host}`.cyan.underline);

    }catch(error){
        console.log(`Error:${error.message}`.red.bold);
        process.exit();
    }
}
module.exports = connectDB;