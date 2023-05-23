import { defineStore } from 'pinia'
import { getAllTodos, updateTodo, deleteTodo, createTodo } from '../service'

export const useTodoStore = defineStore('todos', {
    state: () => ({
        todos: []
    }),

    actions: {
        async setTodos(){
            const result = await getAllTodos()
            this.todos = result.data.data
        },

        async createTodo(name, description) {
            const result = await createTodo(name, description)
           
            const todo = {
                id: result.data.id,
                name: result.data.data.name,
                description: result.data.data.description,
                inProcess: false,
                isDone: false
            }
            
            this.todos.push(todo)
        },

        setInProcess(todo){
            this.todos.forEach(t => {
                if(t.id == todo.id) {
                    todo.inProcess = !todo.inProcess
                    updateTodo(todo)
                }
            })
        },

        setIsDone(todo){
            this.todos.forEach(t => {
                if(t.id == todo.id) {
                    todo.isDone = !todo.isDone
                    updateTodo(todo)
                }
            })
        },

        delete(id) {
            this.todos = this.todos.filter(t => t.id != id)
            deleteTodo(id)
        }
    }
})