import mongoose from 'mongoose';


export const  connectDB = async () => {
 await mongoose.connect('mongodb+srv://sairagulragul6_db_user:quizora16@cluster0.zouvhoj.mongodb.net/QuizoraApp')
 .then(()=>{

    console.log('DB CONNECTED')
 })

}
