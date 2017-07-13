import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Card} from "react-native-elements";
import Game from "./src/Game";
import TrueFalseQuestion from "./src/TrueFalseQuestion";
import Deck from "./src/Deck";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}/>
                <Game questions={Data} style={styles.game}/>
                {/*<Deck data={Data}*/}
                      {/*renderCard={this.renderCard}/>*/}
            </View>
        );
    }

    renderCard(card) {
        return (
            <Card
                key={card.id}
                title={card.body}
            >
                <Text style={{marginBottom: 10}}>I can customize the card further</Text>
            </Card>
        );
    };
}

const Data = [
    {
        id: 0,
        instructions: "fill in the blanks",
        body: "Will you have ___ more tea?",
        answer: ["some"],
        choices: [
            ["any", "some", "a"],
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 0.1,
        backgroundColor:'green'
    },
    game: {
        flex: 0.9
    }
});
