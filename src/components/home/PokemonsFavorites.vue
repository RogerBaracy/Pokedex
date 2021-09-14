<template>
  <div data-cy="component-pokemons-favorites" class="row justify-center">
    <div class="fit row wrap justify-start items-start content-start">
      <div v-for="(f, index) in _favorites" v-bind:key="index" class="q-ma-xl">
        <q-img v-bind:src="f.image" v-bind:alt="f.name" width="50px" />
        <q-icon
          name="delete_outline"
          size="xs"
          v-on:click="deleteFavorite(f.id)"
          class="pointer"
          color="primary"
          v-bind:title="$t('remove_favorite')"
        />
        <p
          v-bind:data-cy="`name-favorite-${f.name.toLowerCase()}`"
          class="text-primary text-center"
        >
          {{ f.name }}
        </p>
      </div>
    </div>   
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';
import { Ifavorite } from 'components/home/models';

@Component
export default class PokemonsFavorites extends Vue {
  @PropSync('favorites', { type: Array })
  private _favorites!: Array<Ifavorite>;
  private value = ''

  private deleteFavorite(id: number) {
    const index = this._favorites.findIndex((f) => {
      return f.id == id;
    });
    this._favorites.splice(index, 1);
  }
}
</script>
<style>
.pointer {
  cursor: pointer;
}
</style>
