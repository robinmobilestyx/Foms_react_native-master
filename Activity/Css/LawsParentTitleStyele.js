import { StyleSheet } from 'react-native';


const LawsParentTitleStyle = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    headercontainer: {
        height: 80,
        backgroundColor: "#112470",
    },
    container: {
        backgroundColor: '#ffffff',
        marginBottom: 70,
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },
    inputContainer: {
        color:'black',
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 0,
    },
    searchSection: {
        height: 45,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        shadowColor: '#f0f0f0',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        elevation: 1.5,
        margin: 10,
        borderWidth: 0.5
    },
    searchIcon: {
        width: 25,
        height: 25,
        tintColor: 'grey'
    },

    compulsoryautomobilecontainer: {
        flex: 1,
        paddingTop: 15,
    },
    touchbleopacity: {
        borderBottomWidth: 0.8,
        borderBottomColor: '#11246F',
        flexDirection: 'row',
        paddingTop: 10
    },
    text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
    },
    downarrow: {
        width: 25,
        height: 25,
        position: 'absolute',
        right: 10,
        top: 10
    },

});

export default LawsParentTitleStyle;