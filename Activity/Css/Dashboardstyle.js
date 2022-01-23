import { StyleSheet } from 'react-native';


const Dashboardstyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 30
    },
    gridMainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e5e5e5',
        borderWidth: 0.5,
        borderColor: '#e5e5e5',
        // marginBottom: 25
    },
    gridrowView: {
        flex: 1,
        flexDirection: 'row',

    },
    gridItems: {
        backgroundColor: 'white',
        width: "100%",
        height: "100%",
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        padding: 10,
    },
    gridItems1: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        alignSelf: 'center',
        // borderWidth: 0,
        // borderColor: 'grey'
        margin: 10
    },
    gridText: {
        color: '#11246f',
        fontSize: 9,
        top: 30,
        alignSelf: 'center'
    },
    gridImage: {
        height: 40,
        width: 40,
        alignSelf: 'center',
        top: 15
    }

});

export default Dashboardstyle;