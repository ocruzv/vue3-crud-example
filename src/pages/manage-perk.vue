<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step :name="1" title="Campaign" icon="settings" :done="step > 1">
        Please select the campaign of this perk

        <q-select
          v-model="campaign"
          :options="campaigns"
          label="Choose campaign..."
        />

        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="Continue"
            :disable="!campaign"
            @click="step = 2"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Perk Information"
        icon="create_new_folder"
        :done="step > 2"
      >
        <div class="q-gutter-y-md column">
          <q-input v-model="perk.title" label="Title" />
          <q-input
            v-model="perk.description"
            type="textarea"
            label="Description"
          />
          <q-input v-model="perk.image_url" label="Image Url" />
          <q-input v-model.number="perk.price" label="Price" type="number">
            <template #prepend>
              <q-icon name="attach_money" />
            </template>
          </q-input>
        </div>

        <q-stepper-navigation>
          <q-btn color="primary" label="Continue" @click="step = 3" />
          <q-btn
            flat
            color="primary"
            label="Back"
            class="q-ml-sm"
            @click="step = 1"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Rewards" icon="assignment">
        <div class="q-gutter-y-md column">
          <q-input
            v-model="perk.included_items"
            type="textarea"
            label="Included items"
          />
          <q-input
            v-model.number="perk.quantity_available"
            label="Quantity Available"
            type="number"
          />
        </div>

        <q-stepper-navigation>
          <q-btn color="primary" label="Save" @click="savePerk" />
          <q-btn
            flat
            color="primary"
            label="Back"
            class="q-ml-sm"
            @click="step = 2"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { QSelectProps, useQuasar } from 'quasar';

  import { Perk } from '@/types/Perk';
  import { usePerksStore } from '@/stores/perks';

  const perksStore = usePerksStore();
  const router = useRouter();
  const route = useRoute();
  const $q = useQuasar();

  const step = ref<number>(1);
  const perk = ref<Perk>({
    id: 0,
    campaign_id: 0,
    active: true,
    title: '',
    image_url: '',
    price: 0,
    included_items: '',
    description: '',
    quantity_available: 10,
  });
  const campaigns = ref<QSelectProps['options']>([
    { label: 'Campaign 1', value: 1 },
    { label: 'Campaign 2', value: 2 },
    { label: 'Campaign 3', value: 3 },
  ]);
  const campaign = ref({ label: 'Campaign 1', value: 1 });

  function savePerk() {
    if (perk.value.id) {
      perksStore.updatePerk(perk.value.id, {
        ...perk.value,
        campaign_id: campaign.value.value,
      });

      $q.notify('Perk Updated!');
    } else {
      perksStore.addPerk({
        ...perk.value,
        id: Math.floor(Math.random() * 10000000 + 1),
        campaign_id: campaign.value.value,
      });

      $q.notify('Perk Added!');
    }

    router.push('/');
  }

  onMounted(() => {
    if (route.query['perk-id']) {
      const existentPerk = perksStore.getPerkById(
        Number(route.query['perk-id'])
      );

      if (existentPerk?.id) {
        perk.value = {
          ...perk.value,
          ...existentPerk,
        };

        campaign.value = campaigns.value?.find(
          (campaign) => campaign.value === perk.value.campaign_id
        );
      }
    }
  });
</script>
