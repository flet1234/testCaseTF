<script setup lang="ts">
import { ref } from 'vue';
import api from '@/api';

const props = defineProps<{
    initialData?: any;
}>();

const emit = defineEmits(['close', 'refresh']);

const isEditMode = !!props.initialData;
const form = ref({
    id: props.initialData?.id || null,
    name: props.initialData?.name || '',
    type: props.initialData?.type || 'Person',
    email: props.initialData?.email || '',
    jobTitle: props.initialData?.jobTitle || '',
    address: props.initialData?.address || ''
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
    isSubmitting.value = true;
    try {
        if (isEditMode) {
            await api.put(`/entities/update`, form.value);
        } else {
            await api.post('/entities/create', form.value);
        }
        emit('refresh');
        emit('close');
    } catch (error: any) {
        alert(error.response?.data?.message || "Operation failed");
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 class="text-xl font-bold mb-6">{{ isEditMode ? 'Edit Entity' : 'Add New Entity' }}</h2>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Full Name / Location Name</label>
                    <input v-model="form.name" type="text" class="w-full p-2 border rounded" required />
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Entity Type</label>
                    <select v-model="form.type" class="w-full p-2 border rounded" :disabled="isEditMode">
                        <option value="Person">Person</option>
                        <option value="Location">Location</option>
                    </select>
                </div>

                <template v-if="form.type === 'Person'">
                    <div>
                        <label class="block text-sm font-medium mb-1">Job Title</label>
                        <input v-model="form.jobTitle" type="text" class="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Email</label>
                        <input v-model="form.email" type="email" class="w-full p-2 border rounded" />
                    </div>
                </template>

                <template v-else>
                    <div>
                        <label class="block text-sm font-medium mb-1">Address</label>
                        <textarea v-model="form.address" class="w-full p-2 border rounded" rows="3"></textarea>
                    </div>
                </template>

                <div class="flex justify-end gap-3 mt-6">
                    <button type="button" @click="$emit('close')" class="px-4 py-2 text-gray-500">Cancel</button>
                    <button type="submit" :disabled="isSubmitting"
                        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>