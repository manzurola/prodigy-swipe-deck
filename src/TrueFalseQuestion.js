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
import STYLES from "./Styles";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class TrueFalseQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: props.selectedChoice,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            index: nextProps.selectedChoice
        });
    }

    render() {
        let sentences = [];
        for (let i = 0; i < this.props.numOfSentences; i++) {
            let sentence = [];
            for (let j = 0; j < this.props.sentences[i].length; j++) {

                sentence.push(
                    this.props.choice === j ?
                    <Text key={j} style={this.props.highlightedTextStyle}>{this.props.sentences[i][j]}</Text> :
                    <Text key={j}>{this.props.sentences[i][j]}</Text>
                );
            }

            sentences.push(sentence);
        }

        return (

            <View style={[this.props.style, styles.container]}>
                <Text style={[this.props.textStyle]}>{sentences[this.state.index]}</Text>
            </View>
        );
    }

    id () {
        return this.props;
    }

    selectedChoice() {
        return this.props.selectedChoice;
    }

    correctChoice(){
        return this.props.correct;
    }

    difficulty() {
        return this.props.difficulty;
    }

}

const styles = {
    container: {
        flex: 1,
        // position:'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
};
