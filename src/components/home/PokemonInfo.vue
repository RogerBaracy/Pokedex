<template>
  <div>    
    <ShowPokemon 
      v-bind:id.sync="id"
      v-bind:name="name"
      v-bind:image="image"
      />
    <div class="row justify-center full-width q-mt-xl">
      <q-input
          v-model.trim="search"
          v-bind:label="labelSearch"
          filled
          autogrow 
          v-on:keyup.enter="getPokemonByName(search)"
        >
          <q-tooltip>{{$t('toltip_search')}}</q-tooltip>
        </q-input>
      <q-btn md color="primary" icon="search" v-model="name" v-on:click="getPokemonByName(search)"/>
      <q-btn class="q-ml-sm" v-if="hasRecognition" md color="primary" icon="mic" v-model="name" v-on:click="listenVoicer()"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import ShowPokemon from './ShowPokemon.vue'
@Component({
  components: {
    ShowPokemon
  }
})
export default class PokemonInfo extends Vue {
  private id  = 1;
  private name = '';
  private image = '';
  private search = '';
  private hasRecognition = false;
  private transcription = '';
  private labelSearch = this.$t('label_search');
  mounted() {    
    this.getPokemonByID(this.id)
    //@ts-ignore  
     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
     SpeechRecognition
     ? this.hasRecognition = true 
     : this.hasRecognition = false
  }

  @Watch('id')
  changeId(newValue: number) {
    this.getPokemonByID(newValue)
  }

  private getPokemonByID(id: number){
    this.$q.loading.show({
      spinnerColor: 'primary',
      spinnerSize: 100
    });
    this.$axios.get(`${process.env.API}/${id}`)
    .then(response => {
      this.name = this.capitalize(response.data.name)      
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.image = response.data.sprites.other['official-artwork'].front_default
    })
    .catch(error => {
      console.error(error);
      this.$q.notify({
        message: this.$t('not_found').toString(),
        color: 'negative',
        position: 'center'
      })
    }).finally(() => {
      this.$q.loading.hide();
    })
  }

  private getPokemonByName(name: string, voicer = false){
    if(name === '') return
    this.$q.loading.show({
      spinnerColor: 'primary',
      spinnerSize: 100
    });
    this.$axios.get(`${process.env.API}/${name.toLowerCase()}`)
    .then(response => {
      this.name = this.capitalize(response.data.name) 
      this.id = parseInt(response.data.id)   
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment    
      this.image = response.data.sprites.other['official-artwork'].front_default
    })
    .catch(error => {
      console.error(error);
      if(!voicer){
          this.$q.notify({
          message: this.$t('not_found').toString(),
          color: 'negative',
          position: 'center'
        })
      }      
    }).finally(() => {
      this.$q.loading.hide();
    })
  }

  private listenVoicer() { 
    this.labelSearch = this.$t('listen').toString(); 
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition(); 
    recognition.interimResults = true;
    recognition.lang = this.$i18n.locale;
    recognition.continuous = true;
    recognition.start();
    var transcript = '';
    recognition.onresult = (event) => { 
      if(event.results){        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if(event.results[i].isFinal){          
            transcript = event.results[i][0].transcript.trim();
          }else{
            transcript += event.results[i][0].transcript;
          }
        }
        setTimeout(()=>{
          recognition.stop();
          this.labelSearch = this.$t('label_search')
          this.search = transcript; 
          this.getPokemonByName(this.search, true);
        }, 500); 
      } 
    } 
  }

  private capitalize(str: string) {
    return str[0].toUpperCase() + str.substr(1);
  }
}
</script>
