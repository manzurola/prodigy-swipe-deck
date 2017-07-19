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
        console.log("question received props " + nextProps.selectedChoice);
        this.setState({
            index: nextProps.selectedChoice
        });
        // if (nextProps.data !== this.props.data) {
        //     this.setState({index: nextProps.selectedChoice});
        // }
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
        console.log(this.state);
    }

    render() {
        console.log('render question with index ' + this.state.index);
        let sentences = [];
        for (let i = 0; i < this.props.numOfChoices; i++) {

            let sentence = [];
            for (let j = 0; j < this.props.sentence.length; j++) {
                sentence.push(
                    this.props.choiceAt === j ?
                    <Text key={j} style={this.props.highlightedTextStyle}>{this.props.choices[i]}</Text> :
                    <Text key={j}>{this.props.sentence[j]}</Text>
                );
                // console.log(sentence[this.props.choiceAt]);
            }
            sentences.push(sentence);

            // console.log(sentences);
        }

        return (

            <View style={[this.props.style, styles.container]}>
                <Text style={[this.props.textStyle]}>{sentences[this.state.index]}</Text>
            </View>
        );
    }

}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};
