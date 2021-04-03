/// <reference types="Cypress"/>
import {Ifavorite} from '../../src/components/home/models';
import {capitalize, checkInArray} from '../../src/components/home/helpers';

context('Iniciando testes funcionais em home > helpers', () => {
  describe('Iniciando teste na função capitalize', () => {
    it('Verificando se a função capitalize está retornando a string com a primeira letra maiúscula e o resto minúscula', () => {
      const strs = ['teste', 'TESTE', 'TeStE'];      
      strs.forEach(str => {
        expect(capitalize(str)).to.be.eql('Teste');
      })
    });
  });

  describe('Iniciando teste na função checkInArray', () => {
    it('Verificando se a função checkInArray está encontrando objetos através do id passado por parametro', () => {
      const favorites: Array<Ifavorite> = [
        {
          id: 1,
          image: '',
          name: 'Teste1'
        },
        {
          id: 2,
          image: '',
          name: 'Teste2'
        },
        {
          id: 3,
          image: '',
          name: 'Teste3'
        },
      ]; 

      favorites.forEach(f => {
        expect(checkInArray(f.id, favorites)).to.be.true;
      });
      expect(checkInArray(45, favorites)).to.be.false;
    });  
  }); 
});  