<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api';

const props = defineProps<{
  id: string;
}>();

const material = ref<any>(null);
const history = ref<any[]>([]);
const isLoading = ref(true);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [matRes, histRes] = await Promise.all([
      api.get(`/materials/${props.id}`),
      api.post(`/assignments/history`, { materialId: props.id })
    ]);
    material.value = matRes.data;
    history.value = histRes.data;
  } catch (error) {
    console.error("Failed to fetch material details", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

const formatDate = (dateString: string) => {
  if (!dateString) return 'Present';
  return new Date(dateString).toLocaleDateString();
};
</script>

<template>
  <div v-if="isLoading" class="p-6">Loading details...</div>

  <div v-else-if="material" class="p-6 max-w-4xl mx-auto">
    <button @click="$router.back()" class="mb-4 text-blue-600 hover:underline">
      ← Back to Inventory
    </button>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div class="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
        <h1 class="text-2xl font-bold mb-4">{{ material.name }}</h1>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-500">Category</label>
            <p class="font-medium">{{ material.category }}</p>
          </div>
          <div>
            <label class="block text-sm text-gray-500">Serial Number</label>
            <p class="font-medium">{{ material.serialNumber }}</p>
          </div>
          <div class="col-span-2">
            <label class="block text-sm text-gray-500">Notes</label>
            <p class="text-gray-700">{{ material.notes || 'No notes available' }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg border">
        <h2 class="font-bold mb-3">Status</h2>
        <div :class="['inline-block px-3 py-1 rounded text-sm mb-4',
          material.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800']">
          {{ material.status }}
        </div>

        <div v-if="material.currentAssignment">
          <label class="block text-sm text-gray-500">Currently with:</label>
          <p class="font-bold text-lg">{{ material.currentAssignment.entityName }}</p>
          <p class="text-xs text-gray-400">Since {{ formatDate(material.currentAssignment.startDate) }}</p>
          <button class="mt-4 w-full bg-red-50 text-red-600 py-2 rounded border border-red-200 hover:bg-red-100">
            Unassign Item
          </button>
        </div>
      </div>

      <div class="md:col-span-3 mt-6">
        <h2 class="text-xl font-bold mb-4">Assignment History</h2>
        <div class="bg-white border rounded-lg overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead class="bg-gray-50">
              <tr>
                <th class="p-4 border-b">Assigned To</th>
                <th class="p-4 border-b">Start Date</th>
                <th class="p-4 border-b">End Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in history" :key="record.id" class="hover:bg-gray-50">
                <td class="p-4 border-b">{{ record.assignedTo }}</td>
                <td class="p-4 border-b">{{ formatDate(record.startDate) }}</td>
                <td class="p-4 border-b">{{ record.endDate ? formatDate(record.endDate) : 'Active' }}</td>
              </tr>
              <tr v-if="history.length === 0">
                <td colspan="3" class="p-8 text-center text-gray-400">No previous assignments found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>