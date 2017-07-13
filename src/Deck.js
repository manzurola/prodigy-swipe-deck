/**
 * Created by guym on 03/07/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;
const INITIAL_CARD_ANIMATED_VALUE_XY = {x: 0, y: 50};

export default class Deck extends Component {
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
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: INITIAL_CARD_ANIMATED_VALUE_XY.x + gesture.dx, y: INITIAL_CARD_ANIMATED_VALUE_XY.y + gesture.dy});
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });

        this.position = position;
        this.panResponder = panResponder;

        this.state = {
            index: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({index: 0});
        }
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        const y = INITIAL_CARD_ANIMATED_VALUE_XY.y;
        Animated.timing(this.position, {
            toValue: {x, y},
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const {onSwipeLeft, onSwipeRight, data} = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        this.position.setValue(INITIAL_CARD_ANIMATED_VALUE_XY);
        this.setState({index: this.state.index + 1});
    }

    getCardsStyle() {
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.position.getLayout(),
            transform: [{rotate}]
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
            if (i < this.state.index) return null;

            if (i === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardsStyle(), styles.cardStyle, {zIndex: 99}]}
                        {...this.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            return (
                <Animated.View
                    key={item.id}
                    style={[styles.cardStyle, {top: INITIAL_CARD_ANIMATED_VALUE_XY.y + 10 * (i - this.state.index), zIndex: 5}]}
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            )
        }).reverse();
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = {
    container: {
        // width: SCREEN_WIDTH
        flex: 1
    },
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: (6 / 10) * SCREEN_HEIGHT,
    }
};