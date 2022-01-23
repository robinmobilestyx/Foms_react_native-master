import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const RfoffnStyle = StyleSheet.create({

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
        flexDirection: 'row', paddingTop: "3%"
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
        width: "6%",
        height: "10%",
        tintColor: 'grey',
        position: 'absolute',
        right: "2%",
        marginTop: "5%",
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
    main_view_loc: {
        flexDirection: 'column',
        width: "30%",
        marginStart: "4%",
    },
    loc_code_txt: {
        color: '#11246F',
        fontWeight: 'bold',
    },
    loc_code: {
        fontWeight: 'bold',
        alignSelf: 'center',
        color:'black'
    },
    sec_main_view: {
        backgroundColor: "#000000",
        width: "0.4%",
        height: "100%",
        marginStart: "5%",
    },
    secc_main_view: {
        flexDirection: 'column',
        flex: 0,
        width: "40%",
        marginStart: "5%"
    },
    offn_no: {
        color: '#11246F',
        fontWeight: 'bold'
    },
    formt_txt: {
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    offr_name_view:{
        width:'60%',
    },

    offr_name: {
        color: '#000000',
        padding: "4%",
        marginStart:'2%'
    },

    main_view_status: {
        flex: 1,
        height: 60
    },

    view_status: {
        backgroundColor: '#DEE6E1',
        height: 4,
        width: '65%',
        alignSelf: 'center',
        marginTop: "5%"
    },

    first_status: {
        backgroundColor: '#30D20D',
        color: 'white',
        borderRadius: 60 / 2,
        height: 20,
        width: "5.5%",
        textAlign: 'center',
        marginStart: "15%",
        bottom: "20%"
    },
    sec_status: {
        backgroundColor: '#30D20D',
        color: 'white',
        borderRadius: 60 / 2,
        height: 20,
        width: "5.5%",
        textAlign: 'center',
        alignSelf: 'center',
        bottom: "55%"
    },
    third_status: {
        backgroundColor: '#DEE6E1',
        color: 'white',
        borderRadius: 60 / 2,
        height: 20,
        width: "5.5%",
        textAlign: 'center',
        bottom: "86%",
        alignSelf: 'flex-end',
        marginRight: "16%"
    },

    info_txt: {
        color: '#11246F',
        bottom: "80%",
        start: '15%',
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
        start: '76%',
        fontSize: 12
    },
    mv_view: {
        flexDirection: 'row',
    },

    mvi_view: {
        flexDirection: 'column',
        width: "34%",
        paddingTop: "2%",
    },
    mvi_txt: {
        textAlign: 'center',
        color: '#7B7B7B',
        fontSize: 14,
    },
    colsn_txt: {
        textAlign: 'center',
        color: '#7B7B7B',
        fontSize: 14,
        paddingTop: "11%",
    },

    firstCheckbx: {
        marginStart: "8%",
        flexDirection: 'row'
    },
    secCheckbx: {
        paddingTop: "0%",
        flexDirection: 'row'
    },
    thirdCheckbx: {
        paddingTop: "0%",
        marginStart: "18%",
        flexDirection: 'row'
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
        marginTop: "-5%",
        // backgroundColor:'red'
    },
    main_text_viewss: {
        flex: 0.5,
        flexDirection: 'column',
    },

    cols_view: {
        flexDirection: 'column',
        width: "34%",
        paddingTop: "2.5%",
    },
    // wittn_view: {
    //     flexDirection: 'column', width: "34%", paddingTop: "2.5%",
    // },
    atNearView: {
        flexDirection: 'row',
        height: 55,
        marginTop: "4%",
        marginStart: "3%",
        marginEnd: "4%",
    },


    at_txt: {
        flex: 1,
        maxWidth: '50%',
        borderRadius: 0.5,
        shadowColor: 'black',
        backgroundColor: 'white',
        shadowOpacity: "100%",
        elevation: "10%",
        alignSelf: 'flex-start',
        marginLeft: "10%",

    },
    // near_txt: {
    //     flex: 1,
    //     maxWidth: '50%',
    //     borderRadius: 0.5,
    //     shadowColor: 'black',
    //     backgroundColor: 'white',
    //     shadowOpacity: 100,
    //     elevation: 10,
    //     alignSelf: 'flex-end',
    //     marginRight: "10%"
    // },
    inputAT: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginLeft: "1%",
        fontSize: 12,
        marginEnd: "2%",
        // flex: 1, backgroundColor: '#ffffff', marginLeft: "2%",marginStart:"2%", fontSize: 12
    },
    blankTextView: {
        flexDirection: 'row',
        height: 55,
        marginTop: "2%",
        marginStart: "4%",
        marginEnd: "4%",
        bottom: "1%"
    },

    // speedView: {
    //     flex: 1, flexDirection: 'row',
    //     // flex: 1, backgroundColor: '#ffffff', marginLeft: "2%",marginStart:"2%", fontSize: 12
    // },

    inputTextView: {
        flexDirection: 'row',
        height: "6%",
        marginTop: "4%",
        marginStart: "3%",
        marginEnd: "4%",
    },



    inputTextStyle: {
        flex: 1, backgroundColor: '#ffffff',
        marginLeft: "2%",
        marginRight: "2%",
        fontSize: 12,
        marginBottom: "2%"
    },

    inputTextStyleTwo: {
        // flex: 0.5,
        height: 60,
        // width: '46%',
        backgroundColor: '#ffffff',
        margin: "5%",
        fontSize: 12,
        // backgroundColor:'red'
    },

    // inputTextStyleThree: {
    //     flex: 1, backgroundColor: '#ffffff', marginLeft: "0.1", fontSize: 12
    // },

    loc_img: {
        height: '65%',
        width: '70%',
        alignSelf: 'flex-end',
        marginStart: "15%",
        marginTop: "40%"
    },

    refr_img: {
        height: '65%',
        width: '80%',
        alignSelf: 'flex-end',
        marginStart: "12%",
        marginTop: "50%"
    },
    contrView: {
        flexDirection: 'column',
        height: 50,
        // justifyContent:'center'
        marginTop: "4%",
        marginLeft: "4%",
        // marginEnd: "2%",
        // marginBottom: "1%"
    },

    drpImgStyle: {
        width: "3%",
        height: 12,
        position: 'absolute',
        right: "10%"
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

    cvorText: {
        textAlign: 'center',
        color: '#7B7B7B',
        fontSize: 14
    },
    nscText: {
        textAlign: 'center',
        color: '#7B7B7B',
        marginStart: "-7%",
        fontSize: 14
    },
    commrText: {
        textAlign: 'center',
        color: '#7B7B7B',
        marginStart: "5%",
        fontSize: 14
    },
    secCheckboxView: {
        flexDirection: 'row',
        flex: 1,
        marginTop: "4%",
        marginEnd: "10%",
    },
    fineBoxView: {
        flexDirection: 'row',
        flex: 1,
        marginTop: "5%",
        justifyContent: 'center',
    },
    insidefineBoxView: {
        flexDirection: 'column',
        flex: 0.5,
        marginStart: "4%",
        marginEnd: "4%"
    },
    boxstyle: {
        height: 40,
        width: "100%",
        backgroundColor: '#ffffff',
        bottom: 5,
        alignSelf: 'flex-end'
    },
    tnCView: {
        flexDirection: 'row',
        flex: 1,
        marginTop: "26%",
        marginLeft: "1%",
        marginEnd: "10%",
        height: 110,
    },
    tnCView2:{
        flexDirection: 'row',
        flex: 1,
        marginTop: "30%",
        marginLeft: "1%",
        marginEnd: "10%",
        height: 110,
    },
    tncText: {
        color: 'darkblue',
        fontWeight: 'bold',
        textAlign: 'justify',
        marginTop: "5%",
        marginRight:'5%'
    },
    tnCView2: {
        flexDirection: 'row',
        flex: 1,
        height: 60,
        // marginTop: "10%",
        marginStart: "1%",
        // marginEnd: "10%",
        // backgroundColor:'red'
        // height:110,
    },
    tncText2: {
        color: 'darkblue',
        fontWeight: 'bold',
        textAlign: 'justify',
        marginTop: "4%",
    },

    backBtn: {
        backgroundColor: '#CF1043',
        alignSelf: 'flex-start',
        width: '31%',
        marginStart: "4%",
        marginTop: 10,
        borderRadius: 10,
    },
    nxtBtn: {
        backgroundColor: '#30D20D',
        alignSelf: 'flex-end',
        width: '31%',
        marginStart: "30%",
        marginTop: "2%",
        borderRadius: 10,
    },




});

export default RfoffnStyle;