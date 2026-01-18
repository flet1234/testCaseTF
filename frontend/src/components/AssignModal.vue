<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api';

const props = defineProps<{
    materialId: number;
    materialName: string;
}>();

const emit = defineEmits(['close', 'refresh']);

const entities = ref<any[]>([]);
const selectedEntityId = ref<number | null>(null);
const assignmentDate = ref(new Date().toISOString().split('T')[0]);
const isLoadingEntities = ref(true);
const isSubmitting = ref(false);

onMounted(async () => {
    try {
        const { data } = await api.get('/entities');
        entities.value = data;
    } finally {
        isLoadingEntities.value = false;
    }
});

const handleAssign = async () => {
    if (!selectedEntityId.value) return alert("Please select a person or location.");

    isSubmitting.value = true;
    try {
        await api.post('/assignments/assign', {
            materialId: props.materialId,
            entityId: selectedEntityId.value,
            startDate: assignmentDate.value
        });
        emit('refresh');
        emit('close');
    } catch (error: any) {
        alert(error.response?.data?.message || "Assignment failed");
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 class="text-xl font-bold mb-2">Assign Item</h2>
            <p class="text-gray-600 mb-6 italic">Item: {{ materialName }}</p>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Assign To:</label>
                    <select v-model="selectedEntityId" class="w-full p-2 border rounded" :disabled="isLoadingEntities">
                        <option :value="null">-- Select a Person or Location --</option>
                        <option v-for="e in entities" :key="e.id" :value="e.id">
                            {{ e.name }} ({{ e.type }})
                        </option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Assignment Date:</label>
                    <input v-model="assignmentDate" type="date" class="w-full p-2 border rounded" />
                </div>
            </div>

            <div class="flex justify-end gap-3 mt-8">
                <button @click="$emit('close')"
                    class="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Cancel</button>
                <button @click="handleAssign" :disabled="isSubmitting || !selectedEntityId"
                    class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                    {{ isSubmitting ? 'Assigning...' : 'Confirm Assignment' }}
                </button>
            </div>
        </div>
    </div>
</template>