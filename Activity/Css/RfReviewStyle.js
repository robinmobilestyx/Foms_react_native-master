import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RfreviewStyle = StyleSheet.create({

    mainView: {
        backgroundColor: '#DEE6E1',
        flex: 1
    },
    Scrollview: {
        alignSelf: 'center',
        margin: '3%',
        width: '95%',
        flex: 0.8,
        // marginBottom: "3%",
        backgroundColor: '#FFFFFF',
    },
    bottomView: {
        flex: 0.1
    },
    locationView: {
        flex: 1,
        flexDirection: 'row',
        padding: "3%",
    },
    loc_code_view: {
        flex: 1,
        flexDirection: 'column',
        // width: "25%",
        // marginStart: "4%",
    },
    loc_code_text: {
        color: '#11246F',
        fontWeight: 'bold'
    },
    loc_code_no: {
        fontWeight: 'bold',
        //    alignSelf: 'start',
        justifyContent: 'flex-start'
    },

    offn_views: {
        flex: 0,
        flexDirection: 'column',
        backgroundColor: "#000000",
        width: "0.4%",
        height: "100%",
        marginRight: "5%"
        // marginStart: "2%",
    },
    offn_view: {
        flex: 2,
        flexDirection: 'column',
        // width: "30%",
        // marginStart: "2%"
    },
    offr_name_view: {
        flex: 1,
    },
    offr_name: {
        color: '#000000',
        padding: "4%"
    },
    main_view_status: {
        flex: 1,
        height: 60,
        marginTop: "-4%",
        marginBottom: "4%",
        // backgroundColor:'red'

    },
    view_status: {
        backgroundColor: '#DEE6E1',
        height: 4,
        width: '50%',
        alignSelf: 'center',
        marginTop: "6%"
    },

    first_status: {
        backgroundColor: '#30D20D',
        color: 'white',
        borderRadius: 60 / 2,
        height: 20,
        width: "5.5%",
        textAlign: 'center',
        marginStart: "23%",
        bottom: 12
    },
    sec_status: {
        backgroundColor: '#30D20D',
        color: 'white',
        borderRadius: 60 / 2,
        height: 20,
        width: "5.5%",
        textAlign: 'center',
        alignSelf: 'center',
        bottom: 32
    },
    third_status: {
        backgroundColor: '#30D20D',
        color: 'white',
        borderRadius: 60 / 2,
        height: 20,
        width: "5.5%",
        textAlign: 'center',
        bottom: "86%",
        alignSelf: 'flex-end',
        marginRight: "24%"
    },



    info_txt: {
        color: '#11246F',
        bottom: "80%",
        start: '23%',
        fontSize: 12
    },
    offn_txt: {
        color: '#11246F',
        bottom: "105%",
        alignSelf: 'center',
        fontSize: 12
    },
    review_txt: {
        color: '#11246F',
        bottom: "130%",
        start: '68%',
        fontSize: 12
    },

    flash_view: {
        flexDirection: 'row',
        height: 55,
        marginTop: "4%",
        marginStart: "5%",
        marginEnd: "5%"
    },
    sdl_txt: {
        color: '#11246F',
        marginTop: '5%'
    },
    flash_txt: {
        marginTop: '5%',
        color: '#11246F'
    },
    scan_btn: {
        borderWidth: 1.2,
        borderColor: '#11246F',
        borderRadius: 9,
        height: '80%',
        width: 110,
        alignSelf: 'center',
        marginStart: "2%"
    },
    scan_txt: {
        color: '#11246F',
        textAlign: 'left',
        marginTop: "10%",
        marginStart: "4%",
        position: 'absolute',
        width: '50%'
    },
    scan_img: {
        height: '100%',
        width: '40%',
        alignSelf: 'flex-end'
    },

    inputTextcodeView: {
        flex: 1,
        flexDirection: 'row',
        margin: "3%",
        marginTop: "2%",
    },
    inputTextStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        // marginLeft: "1%",
        // marginRight: "1%",
        fontSize: 12,
        // marginBottom: "2%",
        height: 45,
        // backgroundColor:'red'
    },





    main_text_view: {
        flex: 1,
        flexDirection: 'row',
        // height: 55, 
        // marginTop: "1%",
        // marginStart: "3%",
        // marginEnd: "3%",
        // bottom: "1%",
    },
    main_text_views: {
        flex: 0.5,
        flexDirection: 'column',
        // marginTop:"-5%",
        // backgroundColor:'red'
    },
    main_text_viewss: {
        flex: 0.5,
        flexDirection: 'column',
    },
    birthView: {
        flex: 0.5,
        flexDirection: 'column',
        top: "-3%",
        // height:50,
        // backgroundColor:'red'
        // marginTop:"-20%",
    },

    inputTextStyleTwo: {
        // flex: 0.5,
        height: 50,
        // width: '46%',
        backgroundColor: '#ffffff',
        margin: "5%",
        fontSize: 12,
        // backgroundColor:'red'
    },
    // inputTextStyleTwos: {
    //     flex: 0.5,
    //     // width: '46%',
    //     backgroundColor: '#ffffff',
    //     // marginLeft: "2%",
    //     fontSize: 12
    // },
    inputTextStyleThreeView: {
        flex: 0.335,
        flexDirection: 'column',
        top: "-2%",
    },
    inputTextStyleThreeViews: {
        flex: 0.33,
        flexDirection: 'column',
        top: "-2%",
    },
    inputTextStyleThreeViewss: {
        flex: 0.33,
        flexDirection: 'column',
        top: "-2%",
    },

    inputTextStyleThree: {
        height: 55,
        // width: '30%',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        margin: "6%",
        fontSize: 12

    },
    mainbirthView: {
        flex: 1,
        direction: 'row',
        // backgroundColor:'red'

    },


    gend_view: {
        flex: 0.5,
        // width: '50%',
        // marginLeft: "2%",
        flexDirection: 'column',
        marginLeft: "2%",
        // marginTop: "0%"

    },
    sex_txt: {
        paddingLeft: "4%",
        fontSize: 12,
        color: 'grey'
    },
    sec_gend_view: {
        flexDirection: 'row'

    },
    tnCView: {
        flexDirection: 'row',
        flex: 1,
        marginTop: "2%",
        marginLeft: "1%",
        marginEnd: "10%",
        height:110,
    },
    tncText: {
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'justify',
        marginTop: "4%",
    },
    tnCView2:{
        flexDirection: 'row',
        flex: 1,
        height:60,
        // marginTop: "10%",
        marginStart: "1%",
        // marginEnd: "10%",
        // backgroundColor:'red'
        // height:110,
    },
    tncText2:{
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'justify',
        marginTop: "4.5%",
    },
    

    nxt_btnView: {
        flex: 1
    },
    nxt_btnView1: {
        flex: 0.5,
        flexDirection: 'column',

    },
    nxt_btnView1: {
        flex: 0.5,
        flexDirection: 'column',
    },
    nxt_btn: {
        backgroundColor: '#30D20D',
        alignSelf: 'flex-end',
        width: '30%',
        // marginEnd: "4%",
        // marginTop: "10%",
        borderRadius: 10,
        margin: "4%",
        // marginBottom: '2%'
    },
    autocompleteView: {
        marginTop: "2%",
        width: wp("88%"),
        borderBottomWidth: 1,
        fontSize: 12,
        // paddingLeft:"10%",
        marginLeft: "4%",
        // marginRight: "2%",
    },
    autocompleteViews: {
        marginTop: "2%",
        width: wp("86%"),
        borderBottomWidth: 1,
        fontSize: 12,
        // paddingLeft:"10%",
        marginLeft: "4%",
        marginRight: "2%",
        marginTop: "4%"
    },
    autocompletecontainer: {
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 0,
    },
    autocompleteinnercontainer: {
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        borderBottomWidth: 1,
        maxWidth: '85%',
    },
    searchIcon: {
        width: "7%",
        height: "15%",
        tintColor: 'grey',
        position: 'absolute',
        right: "1%",
        marginTop: "6%",
    },
    itemText: {
        fontSize: 15,
        fontWeight: '800',
        marginVertical: "10%",
        color: 'black',
        alignSelf: 'stretch',
        marginRight: "25%",
    },
    actTitleFlatlist: {
        maxWidth: '100%',
        borderRadius: 0.5,
        shadowColor: 'black',
        shadowOpacity: "100%",
        elevation: "10%",
        paddingTop: "15%",
        paddingBottom: "8%"
    },
    btnView: {
        flex:1,
        flexDirection: 'row',
        // marginBottom: "3%"
    },
    insideBtnView: {
        flex:0.5,
        flexDirection: 'column',
        backgroundColor:'red'
        // marginTop: "3%"
    },
    // editBtn: {
    //     backgroundColor: '#CF1043',
    //     alignSelf: 'flex-start',
    //     width: "35%",
    //     height: 40,
    //     borderRadius: 10
    // },
    // warBtn: {
    //     backgroundColor: '#f4c20d',
    //     alignSelf: 'flex-start',
    //     justifyContent: 'center',
    //     width: "118%",
    //     height: 40,
    //     borderRadius: 10
    // },
    // tckBtn: {
    //     backgroundColor: '#30D20D',
    //     justifyContent: 'center',
    //     width: "100%",
    //     height: 40,
    //     borderRadius: 10,
    //     marginStart: "24%"

    // },
    // warBtntxt: {
    //     textAlign: 'center',
    //     color: '#FFFFFF',
    //     fontWeight: 'bold',
    //     fontSize: 13
    // },

    backBtn: {
        backgroundColor: '#CF1043',
        alignSelf: 'flex-start',
        width: '31%',
        margin: "4%",
        borderRadius: 10,
    },
    nxtBtn: {
        backgroundColor: '#30D20D',
        justifyContent: 'flex-end',
        margin: "4%",
        width: '31%',
        marginLeft: "26%",
        borderRadius: 10,
    }




});

export default RfreviewStyle;