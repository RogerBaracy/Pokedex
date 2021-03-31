<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="mobile-hide">
          {{ appName }}
        </q-toolbar-title>
        <div class="q-mr-md">
          <q-toggle
            :label="$t('enable_dark')"
            color="black"
            v-bind:false-value="false"
            v-bind:true-value="true"
            v-model="isDark"
          />
        </div>
        <div><SwitchLanguage /></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          {{ appName }}
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';
import SwitchLanguage from 'components/_partial/SwitchLanguage.vue';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  components: { EssentialLink, SwitchLanguage },
})
export default class MainLayout extends Vue {
  private appName = process.env.NAME;
  private isDark = false;
  leftDrawerOpen = false;
  essentialLinks = [
    {
      title: this.$t('github'),
      caption: 'github.com/RogerBaracy/Pokedex',
      icon: 'fab fa-github',
      link: 'https://github.com/RogerBaracy/Pokedex',
    },
  ];

  @Watch('isDark')
  changeIsDark(newValue: boolean) {
    this.$q.dark.set(newValue);
  }
}
</script>
