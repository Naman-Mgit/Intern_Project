require('dotenv').config(); // For environment variables


export const config = {
  development: {
    db: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as number | undefined,
        dialect: 'mysql',
      },
      
  // Define other environments (test, production) if needed
}
}

// type ConnectionObject={
//     isConnected?:Number
// }
// const connection:ConnectionObject={}

// console.log(process.env.MONGODB_URI);
// async function dbConnect():Promise<void>{
//     if(connection.isConnected){
//         console.log("Database is alredy connected")
//         return;
//     }
//     try {
//        console.log(process.env.MONGODB_URI);
//        const Db=await mongoose.connect(process.env.MONGODB_URI||"");
       
//        console.log(Db.connections);
//        connection.isConnected=Db.connections[0].readyState;

//        console.log("Database connected successfully!");
//     } catch (error) {
//         console.log("The error in connecting database is",error);
//         process.exit(1);
//     }
// }
// export default dbConnect;