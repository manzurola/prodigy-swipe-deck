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
                        {/*<View style={STYLES.header}>*/}
                            {/*<View style={STYLES.divider.horizontal}/>*/}
                            {/*<View style={STYLES.title}>*/}
                                {/*<Text style={STYLES.titleText}>PRODIGY</Text>*/}
                            {/*</View>*/}
                        {/*</View>*/}
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
        "choice": 0,
        "selectedChoice": 1,
    },
    {
        "id": "4695135c-34d6-4b52-a368-cfa9e6b23df6",
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
        "choice": 0,
        "selectedChoice": 2,
    },
    {
        "id": "4622185c-34d6-4b52-a368-cfa9e6b23df6",
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
        "choice": 0,
        "selectedChoice": 0,
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
        "choice": 1,
        "selectedChoice": 0,
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
        "choice": 0,
        "selectedChoice": 0,
    },
];
