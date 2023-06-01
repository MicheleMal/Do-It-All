import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "TodoList",
});

connection.connect((error)=>{
    if(error){
        console.error(`Errore durante la connessione al database ${error}`);
    }else{
        console.log(`Connessione al database stabilita con successo`);
    }
})