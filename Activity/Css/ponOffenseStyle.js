import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const height = Dimensions.get("window").height;

const
    ponsoffnStyle = StyleSheet.create({

        mainView: {
            backgroundColor: '#DEE6E1',
            flex: 1
        },
        Scrollview: {
            // alignSelf: 'center',
            margin: '3%',
            width: '95%',
            flex: 0.8,
            // marginBottom: "3%",
            backgroundColor: '#FFFFFF',
            marginBottom: "17.5%"
        },
        bottomView: {
            flex: 0.1,
        },

        autocompleteView: {
            marginTop: "4%",
            width: wp("86%"),
            borderBottomWidth: 1,
            fontSize: 12,
            // paddingLeft:"10%",
            marginLeft: "4%",
            marginRight: "2%",
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
            width: "8%",
            height: "40%",
            tintColor: 'grey',
            position: 'absolute',
            right: "1%",
            marginTop: "3%",
        },
        itemText: {
            fontSize: 15,
            fontWeight: '800',
            marginVertical: "5%",
            color: 'black',
            alignSelf: 'stretch',
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
        locationView: {
            flex: 1,
            flexDirection: 'row',
            padding: "3%",
        },
        main_view_loc: {
            flex: 1,
            flexDirection: 'column',
          alignItems:'center'
            // flexDirection: 'column',
            // width: "25%",
            // marginStart: "4%"
        },
        loc_code_txt: {
            color: '#11246F',
            fontWeight: 'bold',
        },
        loc_code: {
            fontWeight: 'bold',
            color:'black',
           
            alignSelf:'center'
        },
        loc_code1: {
            fontWeight: 'bold',
            color:'black',
            alignItems: 'center',
            marginLeft: 20,
         
        },
        sec_main_view: {
            flex: 0,
            flexDirection: 'column',
            backgroundColor: "#000000",
            width: "0.4%",
            height: "100%",
            marginRight: "5%"
        },
        secc_main_view: {
            flex: 2,
            flexDirection: 'column',
           
        },
        offn_no: {
            color: '#11246F',
            fontWeight: 'bold',
          
          
        },
        // formt_txt: {
        //     fontWeight: 'bold',
        //     // alignSelf: 'center'
        // },
        offr_name_view: {
            flex: 1,
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
            flex: 1,
            flexDirection: 'row',
            paddingTop: "-2%",
            // backgroundColor:'yellow',
        },

        mvi_view: {
            flex: 0.9,
            flexDirection: 'column',
            // justifyContent:'center',
            // width: "34%",
            padding: "4%",
            paddingLeft: "8%",
            // paddingTop: "2%",
        },
        mvi_txt: {
            justifyContent: 'flex-start',
            // paddingLeft:"2%",
            color: '#7B7B7B',
            fontSize: 14,
        },
        colsn_txt: {
            // textAlign: 'center',
            justifyContent: 'center',
            color: '#7B7B7B',
            fontSize: 14,
            // paddingTop: "11%",
        },

        firstCheckbx: {
            // justifyContent: 'flex-start'
            marginLeft: "-9%",
            // flex:1,
            // flexDirection: 'row'
        },
        secCheckbx: {
            // justifyContent: 'flex-start',
            marginLeft: "-9%",
        },
        thirdCheckbx: {
            // flexDirection: 'column',
            // justifyContent: 'flex-start'
            marginLeft: "-9%",
        },




        cols_view: {
            flex: 1.3,
            flexDirection: 'column',
            justifyContent: 'center',
            // margin:"0%",
            // width: "34%",
            paddingTop: "5%",
        },
        wittn_view: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            // margin:"0%",
            // width: "34%",
            paddingTop: "5%",
        },

        atNearView: {
            flex: 1,
            flexDirection: 'row',
            marginTop: "-5%"
                // paddingTop: "-10%",
                // backgroundColor:'red',
        },
        main_text_views: {
            flex: 0.5,
            flexDirection: 'column',
            margin: "3%",
            width: "90%"
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
            height: 55
                // flex: 1, backgroundColor: '#ffffff', marginLeft: "2%",marginStart:"2%", fontSize: 12
        },
        blankTextView: {
            flex: 1,
            flexDirection: 'row',
            marginTop: "-2%",
            height: 60,
            // marginTop: "2%",
            // marginStart: "4%",
            // marginEnd: "4%",
            // bottom: "1%"
        },
        blankTextView1: {
            flex: 0.77,
            flexDirection: 'column',
            marginLeft: "3%",
        },
        blankTextView2: {
            flex: 0.1,
            flexDirection: 'column',
        },
        blankTextView3: {
            flex: 0.1,
            flexDirection: 'column',
        },

        // speedView: {
        //     flex: 1, flexDirection: 'row',
        //     // flex: 1, backgroundColor: '#ffffff', marginLeft: "2%",marginStart:"2%", fontSize: 12
        // },

        inputTextView: {
            flex: 1,
            flexDirection: 'row',
            marginTop: "-2%",
        },



        inputTextStyle: {
            flex: 1,
            backgroundColor: '#ffffff',
            marginLeft: "2%",
            marginRight: "2%",
            fontSize: 12,
            // marginBottom: "2%",
            height: 55,
        },

        inputTextStyleTwo: {
            flex: 1,
            backgroundColor: '#ffffff',
            marginLeft: "1%",
            fontSize: 12,
            marginEnd: "2%",
            height: 60,
           
            
            
            
            // marginBottom: "2%"
            // flex: 1, backgroundColor: '#ffffff', marginLeft: "2%",marginStart:"2%", fontSize: 12
        },

        // inputTextStyleThree: {
        //     flex: 1, backgroundColor: '#ffffff', marginLeft: "0.1", fontSize: 12
        // },

        loc_img: {
            height: '60%',
            width: '94%',
            alignSelf: 'flex-end',
            // marginStart: "15%",
            marginTop: "56%"
        },

        refr_img: {
            height: '60%',
            width: '100%',
            alignSelf: 'flex-end',
            // marginStart: "12%",
            marginTop: "56%"
        },
        contrView: {
            flexDirection: 'column',
            height: 55,
            marginTop: "10%",
            marginStart: "4%",
            marginEnd: "2%",
            // marginBottom: "1%"
        },

        drpImgStyle: {
            width: "4%",
            height: 12,
            position: 'absolute',
            right: "9%"
        },


        inputTextcodeView: {
            flex: 1,
            flexDirection: 'row',
            margin: "2%",
            marginTop: "-2%",
            // height: "6%",
            // marginTop: "0%",
            // marginStart: "2.5%",
            // marginEnd: "4%",
        },

        cvorText: {
            // textAlign: 'center',
            paddingLeft: "23%",
            color: '#7B7B7B',
            fontSize: 14
        },
        nscText: {
            // textAlign: 'center',
            paddingLeft: "25%",
            color: '#7B7B7B',
            // marginStart: "-7%",
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
            justifyContent: 'flex-start',
            // marginTop: "4%",
            // marginEnd: "10%",
        },
        fineBoxView: {
            flexDirection: 'row',
            flex: 1,
            paddingTop: "1%",
            paddingLeft: "1%",
            // marginTop: "5%",
            // justifyContent: 'center',
            // marginBottom: "5%"
        },
        insidefineBoxView: {
            flexDirection: 'column',
            flex: 0.5,
            justifyContent: 'center',
            margin: "4%",
            // marginStart: "4%",
            // marginEnd: "4%"
        },
        insidefineBoxView1: {
            flexDirection: 'column',
            flex: 0.5,
            margin: "4%",
            paddingRight: "1%",
            // marginStart: "4%",
            // marginEnd: "4%"
        },
        boxstyle: {
            height: 40,
            width: "100%",
            backgroundColor: '#ffffff',
            marginBottom: "5%",
        
            alignSelf: 'flex-end'
        },
        // boxstyle: {
        //     height: 35,
        //     width: "100%",
        //     backgroundColor: '#ffffff',
        //     marginBottom: "5%",
        //     borderRadius:10,
        //     borderWidth:1,
        //     alignSelf: 'flex-end',
        //     borderColor:'#11246F',
            
        //     fontSize:16,
        //     padding:6
          
        // },
        tnCView: {
            flexDirection: 'row',
            flex: 1,
            marginTop: "2%",
            marginStart: "2%",
            marginEnd: "10%"
        },
        tncText: {
            color: 'darkblue',
            fontWeight: 'bold',
            textAlign: 'justify',
            marginTop: "-5%",
            paddingRight:'5%'
        },
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

export default ponsoffnStyle;