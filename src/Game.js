/**
 * Created by guym on 24/06/2017.
 */
import QuestionDeck from "./QuestionDeck";
import Score from "./Score";
import LessonComplete from "./LessonComplete";
import {Card} from "react-native-elements";
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    ListView,
    Dimensions,
    TouchableHighlight,
    TouchableWithoutFeedback
} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isGameOver: false,
            questionIndex: 0,
            score: 0
        };
    }

    render() {
        return (
            <View style={[this.props.style]}>
                <Score style={this.props.scoreStyle}
                       score={this.state.score}
                />
                <QuestionDeck data={this.props.questions}

                              renderNoMoreCards={this.renderLevelComplete}
                />
            </View>
        );
    }

    renderLevelComplete() {
        return (
            <LessonComplete/>
        )
    }

    onQuestionCompleted(question) {
        this.setState((previousState) => {
            let gameOver = this.props.questions.length === previousState.questionIndex + 1;
            return {
                isGameOver: gameOver,
                questionIndex: gameOver ? previousState.questionIndex : previousState.questionIndex + 1
            }
        });
    }

    onSwipeRight(question) {
        if (question.selectedChoice() === question.correctChoice()) {
            this.onCorrect(question);
        } else this.onIncorrect(question);
    }

    onSwipeLeft(question) {
        if (question.selectedChoice() !== question.correctChoice()) {
            this.onIncorrect(question);
        } else this.onCorrect(question);
    }

    onCorrect(question) {
        // console.log('that was correct');
        // this.setState({score: this.state.score + 1});
    }

    onIncorrect(question) {
        // console.log('that was incorrect');
        // this.setState({score: this.state.score - 1});
    }
}