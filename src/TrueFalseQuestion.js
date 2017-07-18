
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
            <View style={[this.props.style, styles.question]}>
                <Text style={styles.questionText}>This is an example sentence, but not a very long one.</Text>
            </View>
        );
    }
}

const styles = {
    question: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 24,
        fontFamily: 'gloria-hallelujah-regular',
        textAlign: 'center',
        paddingLeft: 50,
        paddingRight: 50,
    }
};
