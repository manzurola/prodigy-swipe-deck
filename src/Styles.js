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
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 5,
        shadowOpacity: 0.8,
        borderRadius: 3,
        // overflow: 'hidden',
    }
};

export default STYLES;