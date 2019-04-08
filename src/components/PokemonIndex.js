import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  constructor(props) {
    super(props)

    this.state ={
      pokemon: [],
      searchTerm: ""
    }
  }

  handleSubmit = (e) => {
    const name = e.target.name.value
    const hp = e.target.hp.value
    const front = e.target.frontUrl.value
    const back = e.target.backUrl.value

    const pokemon = {
      name: name,
      stats: [{name:"hp", value:hp}],
      sprites: {front: front, back:back}
    }

    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pokemon)
    }).then(res => {
      if(res.ok){
        this.setState({pokemon: [...this.state.pokemon, pokemon]})
      }
    })
  }

  handleSearch = (e, {value}) => {
    
    this.setState({searchTerm: value})
  }

  filterPokemon(){
    const filterString = this.state.searchTerm
    const filteredPokemon = this.state.pokemon.filter((pokemon) => {
      return pokemon.name.includes(filterString)
    })
    return filteredPokemon
  }

  componentDidMount(){
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(data => {
      this.setState({pokemon:data})
    })
  }
  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearch, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.filterPokemon()} />
        <br />
        <PokemonForm handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default PokemonPage
