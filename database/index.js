import sqlite3 from 'sqlite3'

const sql = sqlite3.verbose()

const DBSOURCE = "db.sqlite"

let db = new sql.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE todo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            description text, 
            inProcess boolean, 
            isDone boolean
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                const insert = 'INSERT INTO todo (name, description, inProcess, isDone) VALUES (?,?,?,?)'
                db.run(insert, ["Купить","Купить авто", false, false])
                db.run(insert, ["Hobby","Поиграть в футбол", true, false])
            }
        });  
    }
});


export default db