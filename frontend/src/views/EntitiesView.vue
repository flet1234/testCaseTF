<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import api from '@/api';
import AddEntityModal from '@/components/AddEntityModal.vue';
import axios from 'axios';

export interface Entity {
    id: number;
    name: string;
    type: 'Person' | 'Location';
    email?: string;
    address?: string;
    jobTitle?: string;
}

const entities = ref<Entity[]>([]);
const isLoading = ref(true);
const filterType = ref<'All' | 'Person' | 'Location'>('All');
const searchQuery = ref('');
const showModal = ref(false);
const entityToEdit = ref<Entity | null>(null);

const fetchEntities = async () => {
    try {
        const { data } = await api.get('/entities');
        entities.value = data;
    } catch (error) {
        console.error("Failed to fetch entities:", error);
    } finally {
        isLoading.value = false;
    }
};

const filteredEntities = computed(() => {
    return entities.value.filter(e => {
        const matchesType = filterType.value === 'All' || e.type === filterType.value;
        const matchesSearch = e.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesType && matchesSearch;
    });
});

onMounted(fetchEntities);

const openAdd = () => {
    entityToEdit.value = null;
    showModal.value = true;
};

const openEdit = (entity: Entity) => {
    entityToEdit.value = entity;
    showModal.value = true;
};

const handleDelete = async (id: number) => {
    if (!confirm('Are you sure? This will fail if they currently have items assigned.')) return;
    try {
        await api.delete(`/entities/delete`, { data: { id } });
        fetchEntities();
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data?.message || 'Failed to delete material. Ensure it is not currently assigned.')
        } else {
            alert("An unexpected error occurred");
        }
    }
};
</script>

<template>
    <div class="p-6">
        <div class="flex justify-between items-end mb-6">
            <div>
                <h1 class="text-2xl font-bold">Entities</h1>
                <p class="text-gray-500">Manage people and locations for assignments</p>
            </div>
            <button @click="openAdd" class="bg-blue-600 text-white px-4 py-2 rounded">
                + Add Entity
            </button>
        </div>

        <div class="flex flex-col md:flex-row gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
            <div class="flex-1">
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Search Name</label>
                <input v-model="searchQuery" type="text" placeholder="e.g. John Doe or Warehouse A"
                    class="w-full p-2 border rounded" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Filter Type</label>
                <select v-model="filterType" class="p-2 border rounded min-w-[150px]">
                    <option value="All">All Types</option>
                    <option value="Person">Persons</option>
                    <option value="Location">Locations</option>
                </select>
            </div>
        </div>

        <div class="flex gap-4 mb-4 text-sm">
            <span class="text-gray-600">Showing: <strong>{{ filteredEntities.length }}</strong> entities</span>
        </div>

        <div class="bg-white border rounded-lg overflow-hidden shadow-sm">
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="p-4 border-b">Name</th>
                        <th class="p-4 border-b">Type</th>
                        <th class="p-4 border-b">Details</th>
                        <th class="p-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entity in filteredEntities" :key="entity.id" class="hover:bg-gray-50 border-b">
                        <td class="p-4 font-medium">{{ entity.name }}</td>
                        <td class="p-4">
                            <span
                                :class="['px-2 py-1 rounded-full text-xs font-bold',
                                    entity.type === 'Person' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700']">
                                {{ entity.type }}
                            </span>
                        </td>
                        <td class="p-4 text-sm text-gray-600">
                            <div v-if="entity.type === 'Person'">
                                {{ entity.jobTitle || 'No Title' }} <br>
                                <span class="text-xs text-gray-400">{{ entity.email }}</span>
                            </div>
                            <div v-else>
                                {{ entity.address || 'No Address provided' }}
                            </div>
                        </td>
                        <td class="p-4 flex gap-2">
                            <button @click="openEdit(entity)"
                                class="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                            <button @click="handleDelete(entity.id)"
                                class="text-gray-400 hover:text-red-600">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="filteredEntities.length === 0">
                        <td colspan="4" class="p-10 text-center text-gray-400">
                            No entities found matching your criteria.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <AddEntityModal v-if="showModal" :initialData="entityToEdit" @close="showModal = false" @refresh="fetchEntities" />
</template>