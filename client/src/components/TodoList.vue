<script setup>
import TodoItem from './TodoItem.vue';

defineProps({
    items: {
        type: Array,
        default: []
    }
})
</script>

<template>
    <v-list lines="one">
        <TransitionGroup name="list" tag="ul">
            <v-list-item
                v-for="item in items"
                :key="item.id"
            >
                <TodoItem :item="item"/>
            </v-list-item>
        </TransitionGroup>
    </v-list>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>