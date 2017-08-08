/**
 * Created by guym on 24/06/2017.
 */
import QuestionDeck from "./QuestionDeck";
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
import STYLES from "./Styles";

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
            progress: 0,
            solved: [-1, -1, -1, -1, -1]  // 0 or 1 indicating mistake or correct respectively
        };

        this.totalQuestions = props.questions.length;
    }

    render() {
        return (
            <View style={[this.props.style]}>
                <View style={STYLES.questionStatusContainer}>
                    <View
                        style={this.getQuestionStatusStyle(0)}/>
                    <View
                        style={this.getQuestionStatusStyle(1)}/>
                    <View
                        style={this.getQuestionStatusStyle(2)}/>
                    <View
                        style={this.getQuestionStatusStyle(3)}/>
                    <View
                        style={this.getQuestionStatusStyle(4)}/>
                </View>
                <QuestionDeck data={this.props.questions}
                              onCorrect={() => this.onCorrect()}
                              onIncorrect={() => this.onIncorrect()}
                              renderNoMoreCards={() => this.renderLevelComplete()}
                />
            </View>
        );
    }

    getQuestionStatusStyle(index) {
        // if index references a question yet unsolved then return default style
        if (this.state.solved[index] === -1) return STYLES.questionStatus;
        return this.state.solved[index] === 1 ? STYLES.questionStatusCorrect : STYLES.questionStatusIncorrect;
    }

    renderLevelComplete() {
        let score = Math.floor((this.state.totalCorrect / this.props.questions.length) * 100);
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
        if (!event.isCorrect) {
            this.setState({totalIncorrect: this.state.totalIncorrect + 1});
            this.onIncorrect(event);
        } else {
            this.setState({totalCorrect: this.state.totalCorrect + 1});
            this.onCorrect(event);
        }
    }

    onCorrect() {
        console.log('that was correct');
        const newSolved = this.state.solved.slice();
        newSolved[this.state.questionIndex] = 1;
        this.setState({
            totalCorrect: this.state.totalCorrect + 1,
            progress: this.state.progress + 100 / this.props.questions.length,
            questionIndex: this.state.questionIndex + 1,
            solved: newSolved
        });
        // this.setState({score: this.state.score + 1});
    }

    onIncorrect() {
        console.log('that was incorrect');
        const newSolved = this.state.solved.slice();
        newSolved[this.state.questionIndex] = 0;
        this.setState({
            totalIncorrect: this.state.totalIncorrect + 1,
            questionIndex: this.state.questionIndex + 1,
            solved: newSolved
        });

        // this.setState({score: this.state.score - 1});
    }
}