/// <reference types="Cypress"/>

const listNamesPokemons = ['Pikachu', 'Ditto', 'Abra'];
const API = 'https://pokeapi.co/api/v2/pokemon';

context('Testando a api PokeAPI', () => { 
  describe('Testando as rotas da API', () => {
    listNamesPokemons.forEach(name => { 
      const n = name.toLowerCase();
      it(`Testando a rota ${API}/${n}`, () => { 
          cy.request('GET',`${API}/${n}`).as(n);
          // Testa o status code do retorno
          cy.get(`@${n}`).its('status').should('eq',200);
          // Verifica se há a propriedade id no retorno da API
          cy.get(`@${n}`).its('body').should('have.property', 'id');
          // Verifica se há a propriedade name no retorno da API
          cy.get(`@${n}`).its('body').should('have.property', 'name');
          // Verifica se há a propriedade front_default no retorno da API
          cy.get(`@${n}`).its('body')
          .should('have.property', 'sprites')
          .should('have.property','other')
          .should('have.property', 'official-artwork')
          .should('have.property', 'front_default');
        });
    });
  });
})