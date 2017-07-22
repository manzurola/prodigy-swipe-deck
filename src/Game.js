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
            score: 0,
            // swipedRightCorrect : [],
            // swipedRightIncorrect : [],
            // swipedLeftCorrect : [],
            // swipedLeftIncorrect : [],
            totalCorrect: 0,
            totalIncorrect: 0,
            totalQuestions: props.questions.length,
        };
    }

    render() {
        return (
            <View style={[this.props.style]}>
                <Score style={this.props.scoreStyle}
                       score={this.state.score}
                />
                <QuestionDeck data={this.props.questions}
                              onCorrect={() => this.onCorrect()}
                              onIncorrect={() => this.onIncorrect()}
                              renderNoMoreCards={() => this.renderLevelComplete()}
                />
            </View>
        );
    }

    renderLevelComplete() {
        let score = Math.floor((this.state.totalCorrect / this.state.totalQuestions) * 100);
        return (
            <LessonComplete score={score}/>
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

    onSwipeRight(event) {
        if (event.isCorrect) {
            this.setState({totalCorrect: this.state.totalCorrect + 1});
            this.onCorrect(event);
        } else {
            this.setState({totalIncorrect: this.state.totalIncorrect + 1});
            this.onIncorrect(event);
        }
    }

    onSwipeLeft(event) {
        if (event.selectedChoice() !== event.correctChoice()) {
            this.setState({totalIncorrect: this.state.totalIncorrect + 1});
            this.onIncorrect(event);
        } else {
            this.setState({totalCorrect: this.state.totalCorrect + 1});
            this.onCorrect(event);
        }
    }

    onCorrect() {
        console.log('that was correct');
        this.setState({totalCorrect: this.state.totalCorrect + 1});
        // this.setState({score: this.state.score + 1});
    }

    onIncorrect() {
        console.log('that was incorrect');
        this.setState({totalIncorrect: this.state.totalIncorrect + 1});

        // this.setState({score: this.state.score - 1});
    }
}