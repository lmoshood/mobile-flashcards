import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import QuizScore from './QuizScore'
import {pink, water} from '../utils/colors'
import styles from '../utils/styles'

class Quiz extends Component {
  state = {
    index: 0,
    counter: 1,
    viewAnswer: false,
    correctAnsCount: 0,
    incorrectAnsCount: 0
  }
  handleQuestionAnswer = () => {
    this.setState((previousState) => ({
      viewAnswer: !previousState.viewAnswer
    }))
  }
  handleCorrectAnswer = () => {
    this.setState((previousState) => ({
      index: previousState.index + 1,
      counter: previousState.counter + 1,
      correctAnsCount: previousState.correctAnsCount + 1,
      viewAnswer: false
    }))
  }
  handleGoBackToDeck = () => {
    const { deck, navigation } = this.props
    const title = deck.title
    navigation.navigate('Deck', { title })
  }
  
  handleIncorrectAnswer = () => {
    this.setState((previousState) => ({
      index: previousState.index + 1,
      counter: previousState.counter + 1,
      incorrectAnsCount: previousState.incorrectAnsCount + 1,
      viewAnswer: false
    }))
  }
  handleRestartQuiz = () => {
    this.setState(() => ({
      index: 0,
      counter: 1,
      viewAnswer: false,
      correctAnsCount: 0,
      incorrectAnsCount: 0
    }))
  }
 

  render() {
    const { deck } = this.props
    const { index, counter, viewAnswer, correctAnsCount, incorrectAnsCount } = this.state
    const questions = deck.questions
    const QuizCount = questions.length

    if (counter > QuizCount) {
      return (
        <QuizScore
          correctAnsCount={ correctAnsCount }
          incorrectAnsCount={ incorrectAnsCount }
          restartQuiz={ this.handleRestartQuiz }
          backToDeck={ this.handleGoBackToDeck }
        />
      )
    }

    return(
      <View style={ styles.Quizcontainer }>
        <View style={ styles.QuizprogressContainer }>
          <Text style={ styles.Quizprogress }>{ counter }/{ QuizCount }</Text>
        </View>
        <View style={ styles.quizContainer }>
          <View style={{ justifyContent: 'center' }}>
            <Text style={
                [styles.question, { fontSize: (questions[index].question.length > 50 || 
                questions[index].answer.length > 50) ? 33 : 44 }] }>
              { viewAnswer
                ? questions[index].answer
                : questions[index].question
              }
            </Text>
            <TextButton
              style={ [styles.QuizanswerBtn,
              { backgroundColor: water, justifyContent: 'center' }] }
              onPress={ this.handleQuestionAnswer }>
                { viewAnswer
                  ? 'View Question'
                  : 'View Answer'
                }
                
            </TextButton>
          
          </View>
          <View style={ styles.QuizbuttonContainer }>
            <TextButton
              style={ [styles.QuizoptionBtn, { backgroundColor: water }] }
              onPress={ this.handleCorrectAnswer }>
                Correct
            </TextButton>
            <TextButton
              style={ [styles.QuizoptionBtn, { backgroundColor: water }] }
              onPress={ this.handleIncorrectAnswer }>
                Incorrect
            </TextButton>
          </View>
        </View>
      </View>
    )
  }
}


const mapStateToProps = (decks, { navigation }) => {
  const { title } = navigation.state.params
  const deck = decks[title]

  return {
    deck
  }
}

export default connect(mapStateToProps)(Quiz)
