
import {Card} from "react-native-elements";
import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    ListView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class TrueFalseQuestion extends Component {

    render() {
        return (
            <View style={styles.question}>
                {/*<Text>some text</Text>*/}
            </View>
        );
    }
}

const styles = {
    question: {
        // position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 2
    }
};
