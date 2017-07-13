/**
 * Created by guym on 24/06/2017.
 */
import QuestionDeck from "./QuestionDeck";
import {Card} from "react-native-elements";
import TrueFalseQuestion from "./TrueFalseQuestion";
import Deck from "./Deck";
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
            questionIndex: 0
        };
    }

    render() {
        return (
            <View style={[this.props.style]}>
                <QuestionDeck questions={this.props.questions}
                      renderCard={this.renderCard}/>
            </View>
        );
    }

    renderCard(card) {
        return (
            <Card
                key={card.id}
                title={card.body}
            >
                <Text style={{marginBottom: 10}}>I can customize the card further</Text>
            </Card>
        );
    };

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

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
});