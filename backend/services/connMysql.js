import mysql from "mysql2";
import "dotenv/config"

export const connection = mysql.createConnection({
  host: process.env.hostDev,
  user: process.env.userDev,
  password: process.env.pwDev,
  database: process.env.dbDev,
});

connection.connect((error)=>{
    if(error){
        console.error(`Errore durante la connessione al database ${error}`);
    }else{
        console.log(`Connessione al database stabilita con successo`);
    }
})