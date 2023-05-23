<script setup>
import { computed } from 'vue'
import { useTodoStore } from '../store/todo';

const store = useTodoStore()

const props = defineProps({
    item: {
        type: Object,
        default: {
            name: "test",
            description: 'test description',
            inProcess: true,
            isDone: false
        }
    }
})

const backgroundColor = computed(() => {
    if(props.item.isDone) {
        return '#ADFF2F'
    }

    if(props.item.inProcess) {
        return '#00BFFF'
    }
})

const inProcessHander = (item) => {
    store.setInProcess(item)
}

const isDoneHandler = (item) => {
    store.setIsDone(item)
}

const deleteHandler = (id) => {
    store.delete(id)
}
</script>

<template>
    <div class="todo back">
        <div class="content">
            <div class="todo-name">
                {{item.name}}
            </div>
            <div class="todo-desc">
                {{item.description}}
            </div>
        </div>
        <div class="actions">
            <v-btn
            v-if="!item.isDone" 
            :icon="item.inProcess ? 'mdi-pause' : 'mdi-play'" 
            density="compact" 
            color="primary"
            @click="inProcessHander(item)"
            ></v-btn>

            <v-btn 
            :icon="item.isDone ? 'mdi-undo-variant' : 'mdi-check'" 
            color="green" 
            density="compact"
            @click="isDoneHandler(item)"
            ></v-btn>

            <v-btn 
            icon="mdi-delete" 
            color="red" 
            density="compact"
            @click="deleteHandler(item.id)"
            ></v-btn>
            
        </div>
    </div>
</template>

<style  scoped>
.todo {
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    justify-content: space-between;
}

.todo-name {
    font-weight: bold;
}

.todo-desc {
    font-size: small;
    font-style: italic;
}

.actions {
    display: flex;
    gap: 10px;
}

.back {
    background-color: v-bind(backgroundColor);
}
</style>