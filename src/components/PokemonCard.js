import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    flipped: false
  }

  handleClick = () => {
    this.setState({
      flipped: !this.state.flipped
    })
  }

  render() {
    // console.log(this.props.stats.length)
    // const hp = this.props.stats.find(stat => stat.name === "hp")
    const img = this.state.flipped ? this.props.sprites.back : this.props.sprites.front

    return (
      <Card>
        <div onClick={this.handleClick}>
          <div className="image">
            <img src={img} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.stats.find(stat => stat.name === "hp").value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
