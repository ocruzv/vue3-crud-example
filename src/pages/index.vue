<template>
  <div class="q-pa-md">
    <div class="row justify-end">
      <q-btn color="primary" label="Add a new perk" to="/manage-perk" />
    </div>
    <q-separator spaced />
    <div class="row q-col-gutter-md">
      <div v-for="perk in perks" :key="perk.id" class="col-4">
        <q-card>
          <q-img
            :src="
              perk.image_url
                ? perk.image_url
                : 'https://cdn.quasar.dev/img/parallax2.jpg'
            "
          >
            <div class="absolute-bottom">
              <div class="text-h6">{{ perk.title }}</div>
              <div class="text-subtitle2">{{ perk.description }}</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn flat :to="`/manage-perk?perk-id=${perk.id}`">Update</q-btn>
            <q-btn flat @click="deletePerk(perk.id)">Delete</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useQuasar } from 'quasar';

  import { usePerksStore } from '@/stores/perks';

  const perkStore = usePerksStore();
  const $q = useQuasar();

  const perks = computed(() => perkStore.perks);

  function deletePerk(perkId: number) {
    perkStore.removePerk(perkId);

    $q.notify('Perk removed!');
  }
</script>
