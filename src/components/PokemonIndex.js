import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    filtered: []
  }

  // handleClick = id => {
  //   // console.log(id)
  //   const poke = this.state.pokemon.find(x => x.id === id)
  //   console.log(poke)
  // }
  handleSearch = (e, {value}) => {
    // e.persist()
    // console.log(value)
    const filtered = this.state.pokemon.filter(poke => poke.name.includes(value))
    console.log(filtered)
    this.setState({filtered})
  }

  handleSubmit = data => {
    const pokemon = [...this.state.pokemon, data]
    this.setState({
      pokemon: pokemon,
      filtered: pokemon
    })
  }

  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then(json => this.setState({
      pokemon: json,
      filtered: json
    }))
  } 

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearch, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.state.filtered} handleClick={this.handleClick}/>
        <br />
        <PokemonForm handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default PokemonPage
