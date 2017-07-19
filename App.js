import React from "react";
import {StyleSheet, Text, View, Dimensions, StatusBar} from "react-native";
import {Card} from "react-native-elements";
import Game from "./src/Game";
import {Font} from "expo";
import STYLES from "./src/Styles";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class App extends React.Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'gloria-hallelujah-regular': require('./assets/fonts/gloriahallelujah.ttf'),
            'pacifico-regular': require('./assets/fonts/Pacifico.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    render() {
        return (
            this.state.fontLoaded ? (
                    <View style={STYLES.container}>
                        <StatusBar hidden={true} />
                        <View style={STYLES.header}>
                            <View style={STYLES.divider.horizontal}/>
                            <View style={STYLES.title}>
                                <Text style={STYLES.titleText}>PRODIGY</Text>
                            </View>
                        </View>
                        <Game questions={Data} style={STYLES.game}/>
                    </View>
                ) : null
        );
    }
}

const Data = [
    {
        id: 0,
        instructions: "fill in the blanks",
        numOfChoices: 3,
        sentence: ["Will you have ","", " more tea?"],
        answer: ["some"],
        choiceAt: 1,
        choices: [
            "any", "some", "a",
        ]
    },
    {
        id: 1,
        instructions: "fill in the blanks",
        body: "I ___ you for a long time.",
        answer: ["haven't seen"],
        choices: [
            ["did not see", "haven't seen", "didn't saw"],
        ]
    },
    {
        id: 2,
        instructions: "fill in the blanks",
        body: "He ___ here since Christmas; I wonder where he ___ since then.",
        answer: ["hasn't been, has lived"],
        choices: [
            ["hasn't been / has lived", "wasn't / lived", "hasn't be / has live"]
        ]
    },
    {
        id: 3,
        instructions: "rewrite the sentence into the plural",
        body: "A dog is cute.",
        answer: ["dogs", "are", "cute"],
        choices: [
            ["dogs", "dog", "a"],
            ["is", "are", "cute"],
            ["cutes", "a", "cute"]
        ]
    },
    {
        id: 4,
        instructions: "rewrite the sentence into the plural",
        body: "Exercises are not always easy for beginners.",
        answer: ["an", "exercise", "is", "not", "always", "easy", "for", "a", "beginner"],
        choices: [
            ["exercise", "a", "an"],
            ["is", "are", "exercise"],
            ["is", "not", "are"],
            ["always", "not", "isn't"],
            ["is", "easy", "always"],
            ["easy", "for", "always"],
            ["beginners", "for", "beginner"],
            ["a", "beginners", "beginner"],
            ["beginners", "beginner", ""]
        ]
    }
];
