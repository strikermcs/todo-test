<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTodoStore } from '../store/todo';
import Loader from '../components/Loader.vue';
import TodoList from '../components/TodoList.vue';
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore()

const filter = ref("All")
const loading = ref(true)
const dialog = ref(false) 

const name = ref('')
const description = ref('')

const { todos } = storeToRefs(todoStore)

const filteredTodos = computed(() => {
    if(filter.value === "All"){
        return todos.value
    }

    if(filter.value === "Done"){
        return todos.value.filter(t => t.isDone == true)
    }

    if(filter.value === "In Process"){
        return todos.value.filter(t => t.inProcess == true)
    }

})


const addTodoHandler =  async() => {
    await todoStore.createTodo(name.value, description.value)
    dialog.value = false
}

onMounted(async () => {
    await todoStore.setTodos()
    loading.value = false
})
</script>

<template>
     <v-row justify="center">
        <v-card min-width="400">
            <v-toolbar>
                <v-toolbar-title class="text-h6">
                Todos
                </v-toolbar-title>

            <template v-slot:append>  
                <v-dialog
                v-model="dialog"
                persistent
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                        color="primary"
                        v-bind="props"
                        >
                        Create Todo
                        </v-btn>
                    </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Create Todo</span>
                            </v-card-title>
                            <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                        label="Name"
                                        required
                                        v-model="name"
                                        ></v-text-field>
                                        <v-text-field
                                        label="Description"
                                        required
                                        v-model="description"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue-darken-1"
                                variant="text"
                                @click="dialog = false"
                            >
                                Close
                            </v-btn>
                            <v-btn
                                color="blue-darken-1"
                                variant="text"
                                @click="addTodoHandler"
                            >
                                Add Todo
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                </v-dialog>
            </template>
          </v-toolbar>
          <div class="content">
            <div class="filter">
                <v-select
                    :items="['All', 'Done', 'In Process']"
                    variant="outlined"
                    value="All"
                    v-model="filter"
                ></v-select> 
            </div>
            <div class="todos">
                <Loader v-if="loading"/>
                <div v-else>
                    <div v-if="filteredTodos.length == 0">No items</div>
                    <TodoList v-else :items="filteredTodos"/>
                </div> 
            </div>
          </div>
           
        </v-card>
     </v-row>
</template>

<style scoped>
.content {
    padding: 10px;
}
</style>