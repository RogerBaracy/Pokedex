<template>
  <q-select
    v-model="lang"
    :options="langOptions"
    v-bind:label="$t('select_lang')"  
    class="q-mt-sm"  
    label-color="white"
    outlined 
    filled
    bottom-slots
    emit-value
    map-options
    style="min-width: 175px;"
  />
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
type lang = {
  value: string,
  label: string
}
@Component
export default class SwitchLanguage extends Vue {
  private lang = this.$i18n.locale;
  private langOptions: Array<lang> = [
        { value: 'en-us', label: 'English' },
        { value: 'pt-br', label: 'Português - Br' }
      ];

  @Watch('lang') 
  langSwitch(newValue: string){ 
      this.$i18n.locale = newValue;
  }   
}
</script>
<style lang="scss" scope>
  .q-select__dropdown-icon {   
    color:white
  }
  .q-field--auto-height.q-field--labeled .q-field__native {
    min-height: 24px;
    color: white;
}

</style>
