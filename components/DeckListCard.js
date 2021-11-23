import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from '../utils/styles'

class DeckListCard extends Component {
  handleDeckCardRoute = () => {
    const { cardsCount, title, navigation } = this.props

    navigation.navigate('Deck', {
      title,
      cardsCount
    })
  }

  render() {
    const { title, cardsCount } = this.props

    return (
      <View style={ styles.card }>
        <TouchableOpacity onPress={ this.handleDeckCardRoute }>
            <Text style={ styles.cardHeader }>
            { title }
          </Text>
          <Text style={ styles.cardSubHeader }>
            { cardsCount <= 1
              ? cardsCount + ' card'
              : cardsCount + ' cards'
            }
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

 const mapStateToProps = (decks, { title, navigation }) => {
  const cardsCount = decks[title].questions.length

  return {
    title,
    cardsCount,
    navigation
  }
}

export default connect(mapStateToProps)(DeckListCard)
