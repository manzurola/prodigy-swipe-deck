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

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            touch: 'touch',
        };

        let sentences = [];
        for (let i = 0; i < this.props.numOfChoices; i++) {

            console.log('here');
            let sentence = [];
            for (let j = 0; j < this.props.sentence.length; j++) {
                sentence.push(this.props.choiceAt === j ?
                    <Text style={styles.highlighted}>{this.props.choices[i]}</Text> :
                    <Text>{this.props.sentence[j]}</Text>
                )
            }
            sentences.push(sentence);
        }

        this.sentences = sentences;
    }

    render() {

        let sentence;

        switch (this.state.touch) {
            case 'start':
                return (
                    <View style={[this.props.style, styles.question]}>
                        <Text style={styles.questionText}>{this.sentences[this.state.index]}</Text>
                    </View>
                );
                break;
            case 'release':
                return (
                    <View style={[this.props.style, styles.question]}>
                        <Text style={styles.questionText}>{this.sentences[this.state.index]}</Text>
                    </View>
                );
                break;
            case 'cancel':
                return (
                    <View style={[this.props.style, styles.question]}>
                        <Text style={styles.questionText}>{this.sentences[this.state.index]}</Text>
                    </View>
                );
                break;
        }

        return (

            <View style={[this.props.style, styles.question]}>
                {/*<Text style={styles.questionText}>This is an example sentence, but not a very long one.</Text>*/}
                <Text style={styles.questionText}>{this.sentences[this.state.index]}</Text>
            </View>
        );
    }

    startTouch() {
        this.setState({
            touch: 'start'
        });
    }

    cancelTouch() {
        this.setState({
            touch: 'cancel'
        });
    }

    releaseTouch() {
        this.setState({
            touch: 'release'
        });
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
    },
    highlighted: {
        fontSize: 28,
        fontFamily: 'gloria-hallelujah-regular',
        textDecorationLine: 'underline',
    }
};
