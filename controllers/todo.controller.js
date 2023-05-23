import db from '../database/index.js'

export const getAllTodos = (req, res, next) => {
    const sql = "select * from todo"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
}

export const getTodoById = (req, res, next) => {
    const sql = "select * from todo where id = ?"
    const params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
}

export const createTodo = (req, res, next) => {
    const data = {
        name: req.body.name,
        description: req.body.description
    }
    const sql ='INSERT INTO todo (name, description, inProcess, isDone) VALUES (?,?,?,?)'
    const params =[data.name, data.description, false, false]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
}

export const updateTodo = (req, res, next) => {
    const data = {
        name: req.body.name,
        description: req.body.description,
        inProcess : req.body.inProcess,
        isDone: req.body.isDone
    }
    db.run(
        `UPDATE todo set 
           name = COALESCE(?,name), 
           description = COALESCE(?,description), 
           inProcess = COALESCE(?,inProcess),
           isDone = COALESCE(?,isDone)  
           WHERE id = ?`,
        [data.name, data.description, data.inProcess, data.isDone, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
}


export const deleteTodo = (req, res, next) => {
    db.run(
        'DELETE FROM todo WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
}