/**
 * Created by guym on 22/07/2017.
 */

import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";
import STYLES from "./Styles";

export default class LessonComplete extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Lesson Complete!</Text>
                <Text>Score: {this.props.score}</Text>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
};
