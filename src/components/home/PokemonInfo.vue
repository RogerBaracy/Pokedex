<template>
  <div>
    <ShowPokemon v-bind:id.sync="id" v-bind:name="name" v-bind:image="image" />
    <div class="row justify-center full-width q-mt-xl">
      <q-input
        v-model.trim="search"
        v-bind:label="$t('label_search').toString()"
        filled
        v-on:keyup.enter="getPokemonByName(search)"
      >
        <q-tooltip>{{ $t('toltip_search') }}</q-tooltip>
      </q-input>
      <q-btn
        md
        color="primary"
        icon="search"
        v-model="name"
        v-on:click="getPokemonByName(search)"
      />
      <q-btn
        v-if="hasRecognition"
        v-bind:loading="loading"
        class="q-ml-sm"
        md
        color="primary"
        icon="mic"
        v-model="name"
        v-on:click="listenVoicer()"
      >
        <template v-slot:loading>
          <q-spinner-audio color="white" />
        </template>
      </q-btn>
      <q-btn
        v-if="!checkInFavorite(id)"
        class="q-ml-sm"
        md
        color="primary"
        icon="favorite"
        v-on:click="addFavorite(id, name, image)"
      />      
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, PropSync } from 'vue-property-decorator';
import ShowPokemon from './ShowPokemon.vue';
import {Ifavorite} from './models';
@Component({
  components: {
    ShowPokemon,
  },
})
export default class PokemonInfo extends Vue {
  private id = 1;
  private name = '';
  private image = '';
  private search = '';
  private hasRecognition = false;
  private loading = false;

  @PropSync('favorites', { type: Array })
  private _favorites!: Array<Ifavorite>;

  mounted() {
    this.getPokemonByID(this.id);
    //@ts-ignore
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    SpeechRecognition
      ? (this.hasRecognition = true)
      : (this.hasRecognition = false);
  }

  @Watch('id')
  changeId(newValue: number) {
    this.getPokemonByID(newValue);
  }

  private getPokemonByID(id: number) {
    this.$q.loading.show({
      spinnerColor: 'primary',
      spinnerSize: 100,
    });
    this.$axios
      .get(`${process.env.POKEAPI}/${id}`)
      .then(response => {
        this.name = this.capitalize(response.data.name);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.image =
          response.data.sprites.other['official-artwork'].front_default;
      })
      .catch(error => {
        console.error(error);
        this.$q.notify({
          message: this.$t('not_found').toString(),
          color: 'negative',
          position: 'center',
        });
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  private getPokemonByName(name: string, voicer = false) {
    if (name === '') return;
    this.$q.loading.show({
      spinnerColor: 'primary',
      spinnerSize: 100,
    });
    this.$axios
      .get(`${process.env.POKEAPI}/${name.toLowerCase()}`)
      .then(response => {
        this.name = this.capitalize(response.data.name);
        this.id = parseInt(response.data.id);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.image =
          response.data.sprites.other['official-artwork'].front_default;
      })
      .catch(error => {
        console.error(error);
        if (!voicer) {
          this.$q.notify({
            message: this.$t('not_found').toString(),
            color: 'negative',
            position: 'center',
          });
        }
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  private listenVoicer() {
    this.loading = true;
    // @ts-ignore
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = this.$i18n.locale;
    recognition.continuous = true;
    recognition.start();
    var transcript = '';
    recognition.onresult = (event: any) => {
      if (event.results) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript = event.results[i][0].transcript.trim();
          } else {
            transcript += event.results[i][0].transcript;
          }
        }
        setTimeout(() => {
          recognition.stop();
          this.search = transcript;
          this.loading = false;
          this.getPokemonByName(this.search, true);
        }, 500);
      }
    };
  }

  private addFavorite(id: number, name: string, image: string){
    this._favorites.push({
      id: id,
      name: name,
      image: image
    })
  }

  private checkInFavorite(id: number){ 
    if(this._favorites.length == 0) return false; 

    const findId = this._favorites.find(f =>{
      return f.id == id
    })    
    return findId? true : false;
        
  }
  private capitalize(str: string) {
    return str[0].toUpperCase() + str.substr(1);
  }
}
</script>
