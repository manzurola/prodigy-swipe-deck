/**
 * Created by guym on 23/06/2017.
 */
import STYLES from "./styles.js";
import React, {Component} from "react";
import Question from "./question.js";
import TrueFalseQuestion from "./true-false-question.js";
import Swiper from "react-native-deck-swiper";
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

    renderCard = card => {
        return (
            <View style={styles.card}>
                <TrueFalseQuestion {...card}/>
            </View>
        );
    };

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        });
    };

    swipeBack = () => {
        if (!this.state.isSwipingBack) {
            this.setIsSwipingBack(true, () => {
                this.swiper.swipeBack(() => {
                    this.setIsSwipingBack(false);
                });
            });
        }
    };

    setIsSwipingBack = (isSwipingBack, cb) => {
        this.setState(
            {
                isSwipingBack: isSwipingBack
            },
            cb
        );
    };

    jumpTo = () => {
        this.swiper.jumpToCardIndex(2);
    };

    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    ref={swiper => {
            this.swiper = swiper;
          }}
                    onSwiped={this.onSwiped}
                    cards={this.props.questions}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={80}
                    renderCard={this.renderCard}
                    onSwipedAll={this.onSwipedAllCards}
                    showSecondCard={false}
                    verticalSwipe={false}
                    overlayLabels={{
            bottom: {
              title: 'BLEAH',
              swipeColor: '#9262C2',
              backgroundOpacity: '0.75',
              fontColor: '#FFF'
            },
            left: {
              title: 'FALSE',
              swipeColor: '#FF6C6C',
              backgroundOpacity: '0.75',
              fontColor: '#FFF'
            },
            right: {
              title: 'TRUE',
              swipeColor: '#4CCC93',
              backgroundOpacity: '0.75',
              fontColor: '#FFF'
            },
            top: {
              title: 'SUPER LIKE',
              swipeColor: '#4EB8B7',
              backgroundOpacity: '0.75',
              fontColor: '#FFF'
            }
          }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                >
                </Swiper>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    box1: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    },
    done: {
        textAlign: "center",
        fontSize: 30,
        color: "white",
        backgroundColor: "transparent"
    }
});