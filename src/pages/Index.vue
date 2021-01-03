<template>
  <q-page>
   <PokemonInfo/>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import PokemonInfo from 'components/home/PokemonInfo.vue';

@Component({
  components: {
    PokemonInfo
  }
})
export default class PageIndex extends Vue {
  
};
</script>
