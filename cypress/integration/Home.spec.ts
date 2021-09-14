/// <reference types='Cypress'/>
import Home from '../pages/home/Home';
// import { mount } from '@cypress/vue';
// import PokemonInfo from '../../src/components/home/PokemonInfo.vue';

context('Iniciando Testes na Page Home da aplicação Pokedex', () => {
  const home = new Home();
  describe('Iniciando teste na Aplicação', () => {
    it('Verificando se a aplicação está rodando', function() {
      cy.fixture('homeData')
        .as('data')
        .then(() => {
          home.isOnLine(this.data.title);
        });
    });
    it('O botão "data-cy=alter-theme" deve alternar o tema da aplicação ao ser clicado', () => {
      // mount(PokemonInfo);
      home.alterTheme();
    });
  });

  it('Verificando se o componente PokemonInfo está sendo renderizado', function() {
    cy.fixture('homeData')
      .as('data')
      .then(() => {
        home.isOnLine(this.data.title);
        home.isShowPokemonInfo();
      });
  });

  describe('Pesquisando e adicionando Pokemons na lista de favoritos', () => {
    home.searchPokemon();
  });

  describe('Iniciando testes no componente PokemonsFavorites.vue', () => {
    it('Verificando se o componente está sendo renderizado', () => {
      home.isShowPokemonsFavorites();
    });
  });

  describe('Verificando pokemons na lista de favoritos', () => {
    home.checkPokemonsFavorites();
  });
});
