import React from "react";
import {StyleSheet, Text, View, Dimensions, StatusBar} from "react-native";
import {Card} from "react-native-elements";
import Game from "./src/Game";
import {Font} from "expo";
import Score from "./src/Score";
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
                        <StatusBar hidden={true}/>
                        <View style={STYLES.header}>
                            <View style={STYLES.divider.horizontal}/>
                            <View style={STYLES.title}>
                                <Text style={STYLES.titleText}>PRODIGY</Text>
                            </View>
                        </View>
                        <Game questions={Questions}
                              style={STYLES.game}
                              scoreStyle={STYLES.score}
                        />
                    </View>
                ) : null
        );
    }
}

const Questions = [
    {
        "id": "4695185c-34d6-4b52-a368-cfa9e6b23df6",
        "sentences": [
            [
                "what",
                " is your name?"
            ],
            [
                "which",
                " is your name?"
            ],
            [
                "who",
                " is your name?"
            ]
        ],
        "difficulty": 0.0023516666666666885,
        "numOfSentences": 3,
        "correct": 0,
        "choice": 0
    },
    {
        "id": "48a2886f-1f20-46ad-b29b-69720ab312bd",
        "sentences": [
            [
                "I like ",
                "",
                " music very much."
            ],
            [
                "I like ",
                "an",
                " music very much."
            ],
            [
                "I like ",
                "some",
                " music very much."
            ]
        ],
        "difficulty": 0.0027695000000000055,
        "numOfSentences": 3,
        "correct": 0,
        "choice": 1
    },
    {
        "id": "05a7b39c-34dd-43cc-a0b8-5dc58a611a6a",
        "sentences": [
            [
                "We",
                " all went with them"
            ],
            [
                "Us",
                " all went with them"
            ]
        ],
        "difficulty": 0.0028024999999999942,
        "numOfSentences": 2,
        "correct": 0,
        "choice": 0
    },
    {
        "id": "10a4ee91-e732-405d-a91f-41ab9217699a",
        "sentences": [
            [
                "An old man asked my friend and ",
                "me",
                " what the time was"
            ],
            [
                "An old man asked my friend and ",
                "I",
                " what the time was"
            ]
        ],
        "difficulty": 0.0029293181818181796,
        "numOfSentences": 2,
        "correct": 0,
        "choice": 1
    },
    {
        "id": "f9524180-a53f-48a7-9c2b-bb6405f97cb9",
        "sentences": [
            [
                "Let you and ",
                "me",
                " be friends!"
            ],
            [
                "Let you and ",
                "I",
                " be friends!"
            ]
        ],
        "difficulty": 0.0030574999999999995,
        "numOfSentences": 2,
        "correct": 0,
        "choice": 1
    },
    {
        "id": "b35b677a-c5c1-4c46-bc88-63535f0599c4",
        "sentences": [
            [
                "There are some letters for you and ",
                "I, [me]"
            ]
        ],
        "difficulty": 0.0033325,
        "numOfSentences": 1,
        "correct": 0,
        "choice": 1
    },
    {
        "id": "a9030062-e28c-418e-a053-9f422fe981f6",
        "sentences": [
            [
                "a book about philosophy is not good for ",
                "a",
                " child."
            ],
            [
                "a book about philosophy is not good for ",
                "an",
                " child."
            ],
            [
                "a book about philosophy is not good for ",
                "some",
                " child."
            ]
        ],
        "difficulty": 0.003544444444444441,
        "numOfSentences": 3,
        "correct": 0,
        "choice": 1
    },
    {
        "id": "d33714e1-8e7c-4ed3-a4fb-6fd7388293e0",
        "sentences": [
            [
                "a",
                " book about philosophy is not good for a child."
            ],
            [
                "an",
                " book about philosophy is not good for a child."
            ],
            [
                "some",
                " book about philosophy is not good for a child."
            ]
        ],
        "difficulty": 0.003544444444444441,
        "numOfSentences": 3,
        "correct": 0,
        "choice": 0
    },
    {
        "id": "dd941f01-49d7-41b6-9491-dd56b257287f",
        "sentences": [
            [
                "a garden usually has ",
                "a",
                " flowers in it."
            ],
            [
                "a garden usually has ",
                "an",
                " flowers in it."
            ],
            [
                "a garden usually has ",
                "some",
                " flowers in it."
            ]
        ],
        "difficulty": 0.0035585714285714266,
        "numOfSentences": 3,
        "correct": 2,
        "choice": 1
    },

];
