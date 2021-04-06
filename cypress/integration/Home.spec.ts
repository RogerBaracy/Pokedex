/// <reference types='Cypress'/>
import Home from '../pages/home/Home';

context('Iniciando Testes na Page Home da aplicação Pokedex', () => {
  const home = new Home();
  describe('Iniciando teste na Aplicação', () => {
    it('Verificando se a aplicação está rodando', () => {
      home.isOnLine();
    });
    it('O botão "data-cy=alter-theme" deve alternar o tema da aplicação ao ser clicado', () => {
      home.alterTheme();
    });
  });

  it('Verificando se o componente PokemonInfo está sendo renderizado', () => {
    home.isOnLine();
    home.isShowPokemonInfo();
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
