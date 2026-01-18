<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api'
import AddMaterialModal from '@/components/AddMaterialModal.vue';
import AssignModal from '@/components/AssignModal.vue';
import axios from 'axios';
import { useMaterialStore } from '@/stores/materialStore';


export interface MaterialListItem {
    id: number
    name: string
    category: string
    status: string
    assignedToName?: string
    assignedToType?: "Person" | "Location"
}

const materialStore = useMaterialStore();

const showModal = ref(false);
const materialToEdit = ref<MaterialListItem | null>(null);
const showAssignModal = ref(false);
const materialToAssign = ref<MaterialListItem | null>(null)

const openAssign = (item: MaterialListItem) => {
    materialToAssign.value = item;
    showAssignModal.value = true;
};

const openAddModal = () => {
    materialToEdit.value = null;
    showModal.value = true;
};

const openEditModal = (material: MaterialListItem) => {
    materialToEdit.value = material;
    showModal.value = true;
};

const handleModalClose = () => {
    showModal.value = false;
    materialToEdit.value = null;
};

// const fetchMaterials = async () => {
//     try {
//         const { data } = await api.get('/materials')
//         materials.value = data
//     } catch (error) {
//         console.error('Error fetching materials:', error)
//     } finally {
//         isLoading.value = false
//     }
// }

onMounted(() => {
    if (materialStore.materials.length === 0) {
        materialStore.fetchMaterials();
    }
});

const handleUnassign = async (id: number) => {
    if (confirm('Are you sure you want to unassign this item?')) {
        await api.post(`/assignments/unassign/`, { materialId: id })
        await materialStore.fetchMaterials()
    }
}
const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to permanently delete this material? This cannot be undone.')) {
        return;
    }
    try {
        await api.delete(`/materials/delete`, { data: { id } });
        await materialStore.fetchMaterials();
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
    <div class="materials-page">
        <header class="flex justify-between items-center mb-6">
            <h1>Materials Inventory</h1>
            <button @click="openAddModal()" class="bg-blue-600 text-white px-4 py-2 rounded">
                + Add Material
            </button>
        </header>

        <div v-if="materialStore.isLoading" class="loading">Loading inventory...</div>

        <table v-else class="inventory-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in materialStore.materials" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.category }}</td>
                    <td>
                        <span :class="['status-badge', item.status.toLowerCase().replace(' ', '-')]">
                            {{ item.status }}
                        </span>
                    </td>
                    <td>{{ item.assignedToName || '—' }}</td>
                    <td>{{ item.assignedToType || '—' }}</td>
                    <td class="actions">
                        <router-link :to="`/materials/${item.id}`" class="btn-text">View</router-link>

                        <button v-if="item.status === 'Assigned'" @click="handleUnassign(item.id)"
                            class="btn-text danger">
                            Unassign
                        </button>

                        <button v-if="item.status === 'Available'" @click="openAssign(item)" class="btn-text success">
                            Assign
                        </button>
                        <button @click="handleDelete(item.id)" class="btn-text danger">
                            Delete
                        </button>
                        <button @click="openEditModal(item)" class="btn-text">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <AddMaterialModal v-if="showModal" :initialData="materialToEdit" @close="handleModalClose"
            @refresh="materialStore.fetchMaterials()" />
        <AssignModal v-if="showAssignModal && materialToAssign" :materialId="materialToAssign.id"
            :materialName="materialToAssign.name" @close="showAssignModal = false"
            @refresh="materialStore.fetchMaterials()" />
    </div>
</template>

<style scoped>
/* Simple styling to get started */
.inventory-table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.85rem;
}

.available {
    background: #e6fffa;
    color: #2c7a7b;
}

.assigned {
    background: #ebf8ff;
    color: #2b6cb0;
}

.under-maintenance {
    background: #fff5f5;
    color: #c53030;
}

.btn-text {
    margin-right: 10px;
    cursor: pointer;
    background: none;
    border: none;
    color: #4a5568;
}

.danger {
    color: #e53e3e;
}

.success {
    color: #38a169;
}
</style>