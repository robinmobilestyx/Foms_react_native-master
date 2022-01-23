import { StyleSheet } from 'react-native';

const sumreviewStyle = StyleSheet.create({
    mainView: {
        backgroundColor: '#DEE6E1',
        flex: 1
    },
    Scrollview: {
        alignSelf: 'center',
        margin: '3%',
        width: '95%',
        flex: 1,
        // marginBottom: "4%",
        backgroundColor: '#FFFFFF',
    },
    locationView: {
        flexDirection: 'row',
        paddingTop: "3%"
    },

    loc_code_view: {
        flexDirection: 'column',
        width: "25%",
        marginStart: "3%"
    },
    loc_code_text: {
        color: '#11246F',
        fontWeight: 'bold'
    },
    loc_code_no: {
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    offn_views: {
        backgroundColor: "#000000",
        width: "0.4%",
        height: "100%",
        marginStart: "2%",
        top: 3
    },
    offn_view: {
        flexDirection: 'column',
        flex: 0,
        width: "30%",
        marginStart: "2%",
    },
    offn_num: {
        color: '#11246F',
        fontWeight: 'bold'
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




    inputTextStyleView: {
        flexDirection: 'row',
        height: 55,
        flex: 1,
        marginTop: "2%",
        marginStart: "2%",
        marginEnd: "1%",
    },

    inputTextStyleOne: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginLeft: "2%",
        fontSize: 12
    },

    inputTextStyleTwo: {
        flex: 1,
        backgroundColor: '#ffffff',
        fontSize: 12,
        marginStart: "2%",
        marginEnd: "4%",
    },

    inputTextStyleThree: {
        flex: 1,
        backgroundColor: '#ffffff',
        fontSize: 12,
        marginStart: "2%",
        marginEnd: "4%",

    },
    inputTextStyleThrees: {
        flex: 1,
        backgroundColor: '#ffffff',
        fontSize: 12,
        marginStart: "1%",
        marginEnd: "4%"
    },

    sexStyle: {
        width: '50%',
        marginLeft: "4%",
        flexDirection: 'column',
        marginTop: "5%"
    },
    blankInputTextStyle: {
        width: '95%',
        backgroundColor: '#ffffff',
        fontSize: 12,
        marginLeft: "1%"
    },


    mv_view: {
        flex: 1,
        flexDirection: 'row',
        marginStart: "4%",
        paddingTop: "8%",

    },

    mvi_view: {
        flexDirection: 'column',
        width: "34%",
        paddingTop: "1%",

    },
    mvi_txt: {
        textAlign: 'center',
        color: '#7B7B7B',
        fontSize: 14,

    },

    cols_view: {
        flexDirection: 'column',
        width: "34%",
        paddingTop: "2.5%",
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
        // paddingTop: "0%",
        flexDirection: 'row'
    },
    thirdCheckbx: {
        // paddingTop: "0%",
        marginStart: "18%",
        flexDirection: 'row'
    },

    atNearView: {
        flexDirection: 'row',
        height: 55,
        marginTop: "4%",
        marginStart: "2%",
        marginEnd: "1%",
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
    inputAT: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginLeft: "1%",
        fontSize: 12,
        marginEnd: "2%",
    },
    blankTextView: {
        flexDirection: 'row',
        height: 55,
        marginTop: "2%",
        marginStart: "4%",
        marginEnd: "4%",
        marginBottom: "-4%"
        // flexDirection: 'row', height: 55, marginTop: 10, marginStart: 12, marginEnd: 12, bottom: 5
    },

    inputTextcodeView: {
        flexDirection: 'column',
        height: 55,
        marginTop: "4%",
        marginStart: "2%",
        marginEnd: "4%",
        marginBottom: "-2%"
    },
    cvorView: {
        flexDirection: 'column',
        height: 55,
        marginTop: "1%",
        marginStart: "2%",
        marginEnd: "4%",
    },
    inputTextStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginLeft: "2%",
        marginRight: "2%",
        fontSize: 12,
        marginEnd: "1%",
    },

    secCheckboxView: {
        flexDirection: 'row',
        flex: 1,
        marginTop: "4%",
        marginEnd: "10%",
        marginBottom: "2%"
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

    inputTextcodeVieww: {
        flexDirection: 'column',
        height: 55,
        marginTop: "-2%",
        marginStart: "2%",
        marginEnd: "4%",
    },
    inputTextStylee: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginLeft: "2%",
        marginRight: "2%",
        fontSize: 12,
        marginEnd: "1%"
    },


    fineBoxView: {
        flexDirection: 'row',
        flex: 1,
        marginTop: "5%",
        justifyContent: 'center',
        marginBottom: "5%"
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
        marginBottom: "5%",
        alignSelf: 'flex-end'
    },

    btnView: {
       flex:1,
       flexDirection:'row',
       margin:"4%",
    },
    editBtn: {
        backgroundColor: '#CF1043',
        alignSelf: 'flex-start',
        width: "44%",
        height: 40,
        borderRadius: 10
    },
    insideBtnView: {
        flex:0.5,
        flexDirection:'column',
    },
    warBtn: {
        backgroundColor: '#CF1043',
        alignSelf: 'center',
        justifyContent: 'center',
        width: "80%",
        marginLeft: "-10%",
        height: 40,
        borderRadius: 10
    },
    tckBtn: {
        backgroundColor: '#30D20D',
        justifyContent: 'center',
        width: "90%",
        height: 40,
        borderRadius: 10,
        marginLeft: "6%",


    },
    warBtntxt: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 13
    },
   



    bottomView: {
        flex: 0.1
    },
    locationView: {
        flexDirection: 'row', paddingTop: "3%"
    },
   
    main_view_loc: {
        flexDirection: 'column',
        width: "25%",
        marginStart: "4%"
    },
    loc_code_txt: {
        color: '#11246F',
        fontWeight: 'bold',
    },
    loc_code: {
        fontWeight: 'bold',
        alignSelf: 'center'
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
        width: "30%",
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

    offr_name: {
        color: '#000000',
        padding: "4%"
    },
    main_view_status: {
        flex: 1,
        height: 60
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




    cols_view: {
        flexDirection: 'column',
        width: "34%",
        paddingTop: "2.5%",
    },
    // wittn_view: {
    //     flexDirection: 'column', width: "34%", paddingTop: "2.5%",
    // },
    atNearView: {
        flex: 1,
        flexDirection: 'row'

    },
    atNearView1: {
        flex: 0.5,
        flexDirection: 'column',
        height: 55,
        // margin: "2%",
        marginLeft: "3%",
        marginRight: "3%",
        // marginTop: "4%",
        // marginStart: "3%",
        // marginEnd: "4%",

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
        flex:1,
        flexDirection: 'row',
        marginLeft:"3%",
        // height: 55,
        // marginTop: "2%",
        // marginStart: "4%",
        // marginEnd: "4%",
        // bottom: "1%"
    },
    img1:{
        flex:0.8,
        flexDirection: 'column',
       
    },
    img2:{
        flex:0.1,
        flexDirection: 'column',
        // alignSelf:'center',
    },
    // img3:{
    //     flex:0.1,
    //     flexDirection: 'column',
    //     alignSelf:'center'
    // },

    // speedView: {
    //     flex: 1, flexDirection: 'row',
    //     // flex: 1, backgroundColor: '#ffffff', marginLeft: "2%",marginStart:"2%", fontSize: 12
    // },

    inputTextView: {
        flex: 0.5,
        flexDirection: 'row',
        marginLeft: "3%",
        marginRight: "3%",
        marginTop:"2%"
        // height:,
        // marginTop: "4%",
        // marginStart: "3%",
        // marginEnd: "4%",
    },



    inputTextStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginLeft: "4%",
        marginRight: "4%",
        fontSize: 12,
        marginBottom: "2%"
    },

    // inputTextStyleTwo: {
    //     flex: 1,
    //     backgroundColor: '#ffffff',
    //     marginLeft: "1%",
    //     fontSize: 12,
    //     marginEnd: "2%",
    //     marginBottom: "2%"
    //     // flex: 1, backgroundColor: '#ffffff', marginLeft: "2%",marginStart:"2%", fontSize: 12
    // },

    // inputTextStyleThree: {
    //     flex: 1, backgroundColor: '#ffffff', marginLeft: "0.1", fontSize: 12
    // },

    loc_img: {
        height: '50%',
        width: '85%',
        // alignSelf: 'flex-end',
        // marginStart: "1%",
        marginTop: "80%"
    },

    refr_img: {
        height: '55%',
        width: '85%',
        // alignSelf: 'flex-end',
        // marginStart: "8%",
        marginTop: "70%"
    },
    contrView: {
        flexDirection: 'column',
        height: 55,
        marginTop: "10%",
        marginStart: "4%",
        marginEnd: "2%",
        marginBottom: "1%"
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
        // height: "6%",
        // marginTop: "0%",
        // marginStart: "2.5%",
        // marginEnd: "4%",
    },

    cvorText: {
        textAlign: 'center',
        color: '#7B7B7B',
        fontSize: 14,
        marginLeft:"-24%"
    },
    nscText: {
        textAlign: 'center',
        color: '#7B7B7B',
        marginLeft:"-24%",
        fontSize: 14
    },
    commrText: {
        textAlign: 'center',
        color: '#7B7B7B',
        marginLeft:"-50%",
        fontSize: 14
    },
    commrText1: {
        textAlign: 'center',
        color: '#7B7B7B',
        marginLeft:"-24%",
        fontSize: 14
    },

    cvorText2: {
        textAlign: 'center',
        color: '#7B7B7B',
        fontSize: 14,
        // marginLeft:"-10%"
    },
    nscText2: {
        textAlign: 'center',
        color: '#7B7B7B',
        marginLeft:"-12%",
        fontSize: 14
    },
    commrText2: {
        textAlign: 'center',
        color: '#7B7B7B',
        marginLeft:"-20%",
        fontSize: 14
    },
    secCheckboxView: {
        flexDirection: 'row',
        flex: 1,
        marginTop: "2%",
        // marginEnd: "10%",
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
        // marginTop: "2%",
        marginStart: "2%",
        marginEnd: "10%",
        height: 120,
    },
    tncText: {
        color: 'darkblue',
        fontWeight: 'bold',
        textAlign: 'justify',
        marginTop: "4%",
    },
    backBtn: {
        backgroundColor: '#CF1043',
        alignSelf: 'flex-start',
        width: '42%',
        // marginStart: "1%",
        // marginTop: 10,
        borderRadius: 10,
    },
    nxtBtn: {
        backgroundColor: '#30D20D',
        // alignSelf: 'flex-end',
        width: '57%',
        marginStart: "2%",
        // marginTop: "2%",
        borderRadius: 10,
    },


});

export default sumreviewStyle;