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

export default class Score extends Component {
    constructor(props) {
        super(props);

        this.state = {
            score: 0
        }
    }

    render() {
        return (
            <View style={this.props.style}>
                <Text>{this.state.score}</Text>
            </View>
        );
    }
}