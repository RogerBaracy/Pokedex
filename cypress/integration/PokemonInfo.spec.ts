/// <reference types="Cypress"/>

context('Iniciando Testes Funcionais entre os componentes PokemonInfo.vue e PokemonsFavorites.vue', () => {
  const listNamesPokemons = ['Pikachu', 'Ditto', 'Abra'];
  describe('Acessando a rota / da aplicação', () => {
    it('Verificando se a rota / está funcionando', () => {
      cy.visit('/');
      cy.wait(1000);
    });
  });

  describe('Montando o componente PokemonInfo', () =>{
    it('Verificando se o componente está sendo renderizado', () => {
      cy.get('[data-cy=component-pokemon-info]').should('exist');
    });
  });
  
  describe('Pesquisando e adicionando Pokemons na lista de favoritos', () => {
    listNamesPokemons.forEach(name => { 
      it(`Pesquisando e adicionando o Pokemon ${name} na lista de favoritos`, () => {      
        cy.get('[data-cy=input-search]').focus().type(name);
        cy.get('[data-cy=btn-search]').click();
        cy.wait(1000);
        cy.get('[data-cy=name-pokemon]').contains(name);
        cy.get('[data-cy=btn-add-favorite]').click();
        cy.get('[data-cy=input-search]').clear();
      });
    });
  });
});  

context('Iniciando testes no componente PokemonsFavorites.vue', () => {
  const listNamesPokemons = ['Pikachu', 'Ditto', 'Abra'];
  describe('Montando o componente PokemonsFavorites', () =>{
    it('Verificando se o componente está sendo renderizado', () => {
      cy.get('[data-cy=component-pokemons-favorites]').should('exist');
    });
  });
  
  describe('Verificando pokemons na lista de favoritos', () => {  
    listNamesPokemons.forEach(name => {
    it(`Verificando se o pokemon ${name} está na lista de favoritos`, () => {
        cy.get(`[data-cy=name-favorite-${name.toLowerCase()}]`).should('exist').contains(name);
      });
    });
  });

});
