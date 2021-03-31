<template>
  <div>
    <div class="row justify-center">
      <div class="col-12">
        <h2 class="text-primary text-center" v-if="name">{{ name }}</h2>
      </div>
      <q-img v-bind:src="image" v-bind:alt="name" width="200px" />
    </div>
    <div class="row">
      <div class="col-6">
        <q-btn
          class="float-left q-mt-md q-ml-xl"
          v-bind:disable="_id === 1"
          round
          color="primary"
          icon="arrow_left"
          v-on:click="_id--"
        >
          <q-tooltip>{{ $t('previous') }}</q-tooltip>
        </q-btn>
      </div>
      <div class="col-6">
        <q-btn
          class="float-right q-mt-md q-mr-xl"
          v-bind:disable="_id === 898"
          round
          color="primary"
          icon="arrow_right"
          v-on:click="_id++"
        >
          <q-tooltip>{{ $t('next') }}</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator';
@Component
export default class ShowPokemon extends Vue {
  @Prop(String)
  private name!: string;

  @Prop(String)
  private image!: string;

  @PropSync('id', { type: Number })
  private _id!: number;

  
}
</script>
