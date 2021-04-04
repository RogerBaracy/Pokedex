/// <reference types="Cypress"/>

context('Iniciando Testes Funcionais na aplicação Pokedex', () => {
  describe('Iniciando teste na Aplicação', () => {
    it('Verificando se a aplicação está rodando', () => {
      cy.visit('/');
      cy.wait(1000);
    });
    it('Testando botão para alternar tema da aplicação', () => {
      cy.get('body').should('have.class', 'body--light');
      cy.get('[data-cy=alter-theme]').click();
      cy.get('body').should('have.class', 'body--dark');
    });    
  });
});    