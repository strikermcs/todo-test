import express from 'express'
import cors from 'cors'


import 'dotenv/config'

import todoRouter from './router/todo.router.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.use('/api/todos', todoRouter)

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log('Starting Todo List Server...')
            console.log(`http://localhost:${PORT}`)
        })
    } catch (error) {
        console.warn('Starting Todo List Server Error', error)
    }
}

start()