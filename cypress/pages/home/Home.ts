import { ELEMENTS as e } from './model';
const listNamesPokemons = ['Pikachu', 'Ditto', 'Abra'];

export default class Home {
  public isOnLine(): void {    
    cy.visit('/');
    cy.wait('2000');
    cy.title().should('equal', 'Pokedex App');
  }

  public alterTheme(): void {
    cy.get(e.body).should('have.class', e.light);
    cy.get(e.theme).click();
    cy.get(e.body).should('have.class', e.dark);
  }

  public isShowPokemonInfo(): void {
    cy.get(e.componentPokemonInfo).should('exist');
  }

  public searchPokemon(): void {
    listNamesPokemons.forEach((name) => {
      it(`Pesquisando e adicionando o Pokemon ${name} na lista de favoritos`, () => {
        cy.get(e.inputSearch).focus().type(name);
        cy.get(e.btnSearch).click();
        cy.get(e.namePokemon, { timeout: 1000 }).contains(name);
        cy.get(e.btnAddFavorite).click();
        cy.get(e.inputSearch).clear();
      });
    });
  }

  public isShowPokemonsFavorites(): void {
    cy.get(e.componentPokemonsFavorites).should('exist');
  }

  public checkPokemonsFavorites(): void {
    listNamesPokemons.forEach((name) => {
      it(`Verificando se o pokemon ${name} está na lista de favoritos`, () => {
        e.nameFavorite = name.toLowerCase();
        cy.get(`${e.nameFavorite}`).should('exist').contains(name);
      });
    });
  }
}
