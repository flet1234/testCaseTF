<script setup lang="ts">
import { ref } from 'vue';
import api from '@/api';

const props = defineProps<{
    initialData?: any;
}>();

const emit = defineEmits(['close', 'refresh']);

const form = ref({
    id: props.initialData?.id || null,
    name: props.initialData?.name || '',
    category: props.initialData?.category || 'Laptop',
    serialNumber: props.initialData?.serialNumber || '',
    purchaseDate: props.initialData?.purchaseDate
        ? new Date(props.initialData.purchaseDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
    notes: props.initialData?.notes || ''
});

const isSubmitting = ref(false);
const isEditMode = !!props.initialData;

const handleSubmit = async () => {
    isSubmitting.value = true;
    try {
        if (isEditMode) {
            await api.put(`/materials/update`, form.value);
        } else {
            await api.post('/materials/create', form.value);
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
        <div class="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6">
                {{ isEditMode ? 'Edit Material' : 'Add New Material' }}
            </h2>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-1">Item Name *</label>
                    <input v-model="form.name" type="text" placeholder="e.g. MacBook Pro 14"
                        class="w-full p-2 border rounded" required />

                </div>

                <div>
                    <label class="block text-sm font-semibold mb-1">Purchase Date</label>
                    <input v-model="form.purchaseDate" type="date"
                        class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label class="block text-sm font-semibold mb-1">Category</label>
                    <select v-model="form.category" class="w-full p-2 border rounded">
                        <option>Laptop</option>
                        <option>Screen</option>
                        <option>Phone</option>
                        <option>Furniture</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-semibold mb-1">Serial Number</label>
                    <input v-model="form.serialNumber" type="text" placeholder="SN-123456"
                        class="w-full p-2 border rounded" />
                </div>

                <div>
                    <label class="block text-sm font-semibold mb-1">Notes</label>
                    <textarea v-model="form.notes" class="w-full p-2 border rounded" rows="3"></textarea>
                </div>

                <div class="flex justify-end gap-3 pt-4">
                    <button type="button" @click="$emit('close')" class="px-4 py-2 text-gray-500">Cancel</button>
                    <button type="submit" :disabled="isSubmitting"
                        :class="['px-6 py-2 text-white rounded', isEditMode ? 'bg-blue-600' : 'bg-green-600']">
                        {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Add to Inventory') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>