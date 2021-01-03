<template>
  <div>    
    <div class="row justify-center">
      <div class="col-12">
        <h2 class="text-primary text-center" v-if="name">{{name}}</h2>
      </div>
        <q-img  v-bind:src="image" v-bind:alt="name" width="200px"/> 
    </div>
    <div class="row">
      <div class="col-6">
        <q-btn 
          class="float-left q-mt-md q-ml-xl" 
          v-bind:disable="id === 1" 
          round 
          color="primary" 
          icon="arrow_left" 
          v-on:click="id--">
          <q-tooltip>{{$t('previous')}}</q-tooltip>
        </q-btn>
      </div>
      <div class="col-6">
        <q-btn 
          class="float-right q-mt-md q-mr-xl" 
          v-bind:disable="id === 898" 
          round 
          color="primary" 
          icon="arrow_right" 
          v-on:click="id++">
           <q-tooltip>{{$t('next')}}</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="row justify-center full-width q-mt-xl">
      <q-input
          v-model.trim="search"
          filled
          autogrow 
          v-on:keyup.enter="getPokemonByName(search)"
        />
      <q-btn md color="primary" icon="search" v-model="name" v-on:click="getPokemonByName(search)"/>
      <q-btn class="q-ml-sm" v-if="hasRecognition" md color="primary" icon="mic" v-model="name" v-on:click="listenVoicer()"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component
export default class PokemonInfo extends Vue {
  private id  = 1;
  private name = '';
  private image = '';
  private search = '';
  private hasRecognition = false;
  private transcription = '';
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
    this.search = this.$t('listen').toString(); 
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
