export const ELEMENTS = {
  body: 'body',
  light: 'body--light',
  dark: 'body--dark',
  theme: '[data-cy=alter-theme]',
  componentPokemonInfo: '[data-cy=component-pokemon-info]',
  inputSearch: '[data-cy=input-search]',
  btnSearch:'[data-cy=btn-search]',
  namePokemon:'[data-cy=name-pokemon]',
  btnAddFavorite:'[data-cy=btn-add-favorite]',
  componentPokemonsFavorites:'[data-cy=component-pokemons-favorites]',
  name: '',
  get nameFavorite() {
    return `[data-cy=name-favorite-${this.name}]`
  },
  set nameFavorite(name) {
    this.name = name
  }
}