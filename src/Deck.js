/**
 * Created by guym on 03/07/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const CLICK_THRESHOLD = 5;
const SWIPE_OUT_DURATION = 250;
const INITIAL_CARD_ANIMATED_VALUE_XY = {x: 0, y: (1 / 10 * SCREEN_HEIGHT)};

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
            onPanResponderGrant: (event, gesture) => {
                this.setState({
                    touch: 'touch'
                });
                this.onTouch('start', this.state.index);
                console.log('grant');
            },
            onPanResponderMove: (event, gesture) => {
                let dx = INITIAL_CARD_ANIMATED_VALUE_XY.x + gesture.dx;
                position.setValue({x: dx, y: INITIAL_CARD_ANIMATED_VALUE_XY.y + gesture.dy});
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx <= CLICK_THRESHOLD && gesture.dy <= CLICK_THRESHOLD) {
                    this.setState({
                        touch: 'click'
                    });
                    this.onTouch('relase', this.state.index);
                    console.log('click');
                }
                else {
                    this.setState({
                        touch: 'idle'
                    });
                    this.onTouch('cancel', this.state.index);
                }

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

    onTouch(touch, index) {
        this.props.onTouch('cancel', index);
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

    getCardsStyle(index) {

        if (index === 1) {
            // const stretch = this.
        }

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

            // don't display swiped cards

            if (i < this.state.index) return null;

            // first card in deck

            if (i === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[styles.cardStyle, this.getCardsStyle(), {zIndex: 99}]}
                        {...this.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            // second card in deck

            const firstChildCardOffset = 50;

            if (i === this.state.index + 1) {
                return (
                    <Animated.View

                        key={item.id}
                        style={[styles.cardStyle, {
                            top: styles.cardStyle.top + firstChildCardOffset / 2,
                            width: styles.cardStyle.width - firstChildCardOffset,
                            left: styles.cardStyle.left + firstChildCardOffset / 2,
                            height: styles.cardStyle.height - firstChildCardOffset,
                            zIndex: 5,
                        }]}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }

            // third child in deck

            const secondChildCardOffset = firstChildCardOffset * 2;

            return (
                <Animated.View

                    key={item.id}
                    style={[styles.cardStyle, {
                        top: styles.cardStyle.top + secondChildCardOffset / 2,
                        width: styles.cardStyle.width - secondChildCardOffset,
                        left: styles.cardStyle.left + secondChildCardOffset / 2,
                        height: styles.cardStyle.height - secondChildCardOffset,
                        zIndex: 1
                    }]}
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            )
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
        left: 0,
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: (9 / 10) * SCREEN_HEIGHT
    }
};