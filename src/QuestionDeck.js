/**
 * Created by guym on 23/06/2017.
 */
import React, {Component} from "react";
import TrueFalseQuestion from "./TrueFalseQuestion";
import Deck from "./Deck";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    ListView,
    TouchableHighlight,
    TouchableWithoutFeedback
} from "react-native";

export default class QuestionDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swipedAllCards: false,
            swipeDirection: "",
            isSwipingBack: false,
            cardIndex: 0
        };
    }

    renderCard(card) {
        return (
            <TrueFalseQuestion {...card}/>
        );
    };

    render() {
        return (
            <View>
                <Deck data={this.props.questions}
                      renderCard={this.renderCard}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});