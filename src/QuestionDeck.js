/**
 * Created by guym on 23/06/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager} from "react-native";
import TrueFalseQuestion from "./TrueFalseQuestion";
import STYLES from "./Styles";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.15 * SCREEN_WIDTH;
const CLICK_THRESHOLD = 5;
const SWIPE_OUT_DURATION = 250;
const INITIAL_CARD_ANIMATED_VALUE_XY = {x: 0, y: (1 / 10 * SCREEN_HEIGHT)};

export default class QuestionDeck extends Component {

    static defaultProps = {
        onSwipeRight: () => {
        },
        onSwipeLeft: () => {
        }
    };

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY(INITIAL_CARD_ANIMATED_VALUE_XY);
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true, // disable if we don't want to move the cards
            onPanResponderGrant: (event, gesture) => {
                // this.onTouch('start', this.state.index);
                this.setState({responderMovePoint: {x: gesture.dx, y: gesture.dy}})
            },
            onPanResponderMove: (event, gesture) => {
                let dx = INITIAL_CARD_ANIMATED_VALUE_XY.x + gesture.dx;
                let dy = INITIAL_CARD_ANIMATED_VALUE_XY.y + gesture.dy;
                position.setValue({x: dx, y: dy});
            },
            onPanResponderRelease: (event, gesture) => {
                // if (gesture.dx <= CLICK_THRESHOLD && gesture.dy <= CLICK_THRESHOLD) {
                //     this.onTouch('release', this.state.index);
                // }
                // else {
                //     this.onTouch('cancel', this.state.index);
                // }

                let vector = {
                    x1: this.state.responderMovePoint.x,
                    y1: this.state.responderMovePoint.y,
                    x2: gesture.dx,
                    y2: gesture.dy

                };

                console.log("here");

                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right', vector);
                    // this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left', vector);
                    // this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });

        this.position = position;
        this.panResponder = panResponder;

        this.state = {
            index: 0,
            touch: "",
            selectedChoice: 0,
            responderMovePoint: {x: 0, y: 0}
        };

        this.questions = {};
    }

    renderCard(card) {
        return (
            <TrueFalseQuestion style={STYLES.question}
                               highlightedTextStyle={STYLES.highlightedQuestionText}
                               textStyle={STYLES.questionText}
                               {...card}
                               selectedChoice={this.state.selectedChoice}

            />
        )
    };

    onTouch(touch) {
        // this.props.onTouch('cancel', index);
        // this.setState({
        //     touch: touch
        // });

        if (touch === 'release') {
            this.changeChoices();
        }
    }

    changeChoices() {
        this.setState({
            selectedChoice: this.state.selectedChoice + 1 === this.props.data[this.state.index].numOfSentences ? 0 :
                this.state.selectedChoice + 1
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({index: 0, selectedChoice: 0});
        }
    }

    // componentWillUpdate() {
    //     UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    //     LayoutAnimation.spring();
    // }

    // forceSwipe(direction) {
    //     const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    //     const y = INITIAL_CARD_ANIMATED_VALUE_XY.y;
    //     Animated.timing(this.position, {
    //         toValue: {x, y},
    //         duration: SWIPE_OUT_DURATION
    //     }).start(() => this.onSwipeComplete(direction));
    // }

    forceSwipe(direction, vector) {

        console.log(vector.x1);
        console.log(vector.y1);

        //calculate point on same vector but out of screen

        let dx = vector.x2 - vector.x1;
        let dy = vector.y2 - vector.y1;
        let m = dx/dy;

        // const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        // const y = vector.y1 + m * (x - vector.x1);

        const x = vector.x2 * 5;
        const y = vector.y2 * 5;

        console.log(x);
        console.log(y);

        // const y = INITIAL_CARD_ANIMATED_VALUE_XY.y;
        Animated.timing(this.position, {
            toValue: {x, y},
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const {onSwipeLeft, onSwipeRight, data} = this.props;
        const item = data[this.state.index];
        let question = this.questions[item.id];

        direction === 'right' ? onSwipeRight(question) : onSwipeLeft(question);

        this.position.setValue(INITIAL_CARD_ANIMATED_VALUE_XY);
        this.setState({index: this.state.index + 1});
    }

    getCardsStyle() {
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-60deg', '0deg', '60deg']
        });

        return {
            ...this.position.getLayout(),
            transform: [{rotate}]
        };
    }

    getSecondCardStyle() {

        const cardWidth = styles.cardStyle.width;
        const cardHeight = styles.cardStyle.height;
        const cardLeft = styles.cardStyle.left;
        const cardTop = styles.cardStyle.top;

        const inputRange = [-50, 0, 50];

        const width = this.position.x.interpolate({
            inputRange: inputRange,
            outputRange: [cardWidth, styles.secondCardStyle.width, cardWidth]
        });
        const height = this.position.x.interpolate({
            inputRange: inputRange,
            outputRange: [cardHeight, styles.secondCardStyle.height, cardHeight]
        });
        const left = this.position.x.interpolate({
            inputRange: inputRange,
            outputRange: [cardLeft, styles.secondCardStyle.left, cardLeft]
        });
        const top = this.position.x.interpolate({
            inputRange: inputRange,
            outputRange: [cardTop, styles.secondCardStyle.top, cardTop]
        });

        return {
            width: width,
            height: height,
            left: left,
            top: top,
        };
    }

    resetPosition() {
        Animated.spring(this.position, {
            toValue: INITIAL_CARD_ANIMATED_VALUE_XY
        }).start();
    }

    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }

        return this.props.data.map((item, i) => {

            // don't display swiped cards

            if (i < this.state.index) return null;

            // don't display third+ cards

            if (i > this.state.index + 1) return null;

            // first card in deck

            if (i === this.state.index) {

                return (
                    <Animated.View
                        key={item.id}
                        style={[styles.cardStyle, this.getCardsStyle(), {zIndex: 99}]}
                        {...this.panResponder.panHandlers}
                    >
                        {this.renderCard(item)}
                    </Animated.View>
                );
            }

            // second card up in deck

            const childOffset = 20;

            if (i === this.state.index + 1) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[styles.cardStyle, {zIndex: 5}]}
                    >
                        {this.renderCard(item)}
                    </Animated.View>
                )
            }
        }).reverse();
    }

    render() {
        return (
            <View style={[this.props.style]}>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = {

    cardStyle: {
        top: INITIAL_CARD_ANIMATED_VALUE_XY.y,
        // left: 0,
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: (9 / 10) * SCREEN_HEIGHT
    },
    secondCardStyle: {
        top: INITIAL_CARD_ANIMATED_VALUE_XY.y + 10,
        left: 10,
        position: 'absolute',
        width: SCREEN_WIDTH - 20,
        height: (9 / 10) * SCREEN_HEIGHT - 20

    }
};