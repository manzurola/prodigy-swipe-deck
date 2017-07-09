/**
 * Created by guym on 24/06/2017.
 */
import STYLES from "./styles.js";
import QuestionDeck from "./questiondeck.js";
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


export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isGameOver: false,
            questionIndex: 0
        };

        let winSize = Dimensions.get('window');
        console.log(winSize);
    }

    render() {
        return (
            <View style={STYLES.gameScreen}>
                <View style={STYLES.header}/>
                <QuestionDeck questions={this.props.questions}/>
                <View style={STYLES.footer}/>
            </View>
        );
    }

    onQuestionCompleted(question) {
        console.log('question completed:');
        console.log(question);
        this.setState((previousState) => {
            let gameOver = this.props.questions.length === previousState.questionIndex + 1;
            return {
                isGameOver: gameOver,
                questionIndex: gameOver ? previousState.questionIndex : previousState.questionIndex + 1
            }
        });
    }

}