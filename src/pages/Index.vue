<template>
  <q-page>
    <PokemonInfo v-bind:favorites.sync="favorites"/>
    <PokemonsFavorites v-bind:favorites.sync="favorites" />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import PokemonInfo from 'components/home/PokemonInfo.vue';
import PokemonsFavorites from 'components/home/PokemonsFavorites.vue';
import { Ifavorite } from 'components/home/models';

@Component({
  components: {
    PokemonInfo,
    PokemonsFavorites,
  },
})
export default class PageIndex extends Vue {
  private favorites: Array<Ifavorite> = [];
}
</script>
