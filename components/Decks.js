import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../utils/api'
import { DisplayDecks } from '../actions'
import DeckListCard from './DeckListCard'
import styles from '../utils/styles'

class Decks extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    getAllDecks()
      .then((decks) => dispatch(DisplayDecks(decks)))
  }


  render() {
    const { decks } = this.props
    
    return (
      <View style={ styles.Deckscontainer }>
        <ScrollView>
          <Text style={ styles.Decksheader }>Decks</Text>
          { Object.keys(decks).map((deckName) => (
            <DeckListCard
              key={ deckName }
              title={ decks[deckName].title }
              navigation={ this.props.navigation }
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}



const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)
