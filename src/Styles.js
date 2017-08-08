import {
    StyleSheet,
    Dimensions
} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const STYLES = {
    container: {
        flex: 1
    },
    header: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: (1 / 10) * SCREEN_HEIGHT
    },
    game: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        // top: (1 / 10) * SCREEN_HEIGHT
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: 'pacifico-regular'
    },
    score: {
        position: 'absolute',
        right: 0,
        width: SCREEN_WIDTH / 4,
        height: (1 / 10) * SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        horizontal: {
            position: 'absolute',
            top: (1 / 10) * SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            borderWidth: 0.2,
            height: 1
        }
    },
    question: {
        margin: 10,
        // shadowColor: 'black',
        // shadowOffset: {
        //     width: 0,
        //     height: 0
        // },
        // shadowRadius: 5,
        // shadowOpacity: 0.8,
        borderRadius: 3,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        // overflow: 'hidden',
    },
    questionTouched: {
        margin: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 5,
        shadowOpacity: 0.8,
        borderRadius: 3,
        paddingLeft: 50,
        paddingRight: 50,
        // overflow: 'hidden',
    },
    questionText: {
        fontSize: 24,
        fontFamily: 'gloria-hallelujah-regular',
        textAlign: 'center',
        width: (9/10) * SCREEN_WIDTH,
    },
    highlightedQuestionText: {
        fontSize: 28,
        fontFamily: 'gloria-hallelujah-regular',
        textDecorationLine: 'underline',
    },
    questionDeck: {
        position: 'absolute',
        top: (1/10) * SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        height: (9/10) * SCREEN_HEIGHT
    },
    progressBarContainer: {
        position: 'absolute',
        top: 0,
        width: SCREEN_WIDTH,
        height: (1/10) * SCREEN_HEIGHT
    },
    questionStatusContainer: {
        position: 'absolute',
        top: 0,
        width: SCREEN_WIDTH,
        height: (1/10) * SCREEN_HEIGHT,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionStatus: {
        width: 30,
        height: 30,
        margin: 5,
        borderWidth: 1,
        // flex:1,
    },
    questionStatusCorrect: {
        width: 30,
        height: 30,
        margin: 5,
        borderWidth: 1,
        // flex:1,
        backgroundColor: 'rgb(76,217,100)'
    },
    questionStatusIncorrect: {
        width: 30,
        height: 30,
        margin: 5,
        borderWidth: 1,
        backgroundColor: 'rgb(255,59,48)'
        // flex:1,
    }
};

export default STYLES;