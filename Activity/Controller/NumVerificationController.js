import React, { Component } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global_Attributes from "../../Utility/Global_Attributes";
import { Alert } from 'react-native';
import { Linking } from "react-native";
import RNExitApp from 'react-native-exit-app';
import packageJson from "../../package.json";
//import { StackActions } from '@react-navigation/native';
import { StackActions, NavigationActions } from '@react-navigation/native';
import Loader from "../Dashboard/Loader";

// import App from "../../../app.json";



const TAG = "NumberveriController :"
var userName = " "


export default class NumVerificationController extends Component {

    constructor(props) {
            super(props);
        }
        //9136373912  

    _createLoginSession = async(userName, mobile_no, fingerPrint) => {
        try {
            await AsyncStorage.setItem("userName", userName);
            await AsyncStorage.setItem("phoneNumber", mobile_no);
            await AsyncStorage.setItem("fpenroll", fingerPrint);
            // console.log( TAG+"Session pass:"+fingerPrint); 
            console.log(TAG + "Session Values:" + userName + " : " + mobile_no + ":" + fingerPrint);
            this.props.navigation.replace('LoginPage');
        } catch (error) {
            console.log(TAG + error);
            //this.errorDialog(error);
        }
    };

    ProfileData = async(myAccountDetails) => {
        
        try {

            await AsyncStorage.setItem("locationCode", myAccountDetails['locationCode']);
            await AsyncStorage.setItem("officer_name", myAccountDetails['officer_name']);
            await AsyncStorage.setItem("officer_no", myAccountDetails['officer_no']);
            await AsyncStorage.setItem("platoon", myAccountDetails['platoon']);
            await AsyncStorage.setItem("fname", myAccountDetails['fname']);
            await AsyncStorage.setItem("lname", myAccountDetails['lname']);
            await AsyncStorage.setItem("email", myAccountDetails['email']);
            await AsyncStorage.setItem("signature", myAccountDetails['signature']);
            await AsyncStorage.setItem("user_id", myAccountDetails['user_id']);
            await AsyncStorage.setItem("level", myAccountDetails['level']);
            
            // await AsyncStorage.setItem("country_code",myAccountDetails['country_code']);
            // await AsyncStorage.setItem("branch",myAccountDetails['branch']);
            
            await AsyncStorage.setItem("city", myAccountDetails['city']);
            // await AsyncStorage.setItem("state",myAccountDetails['state']);
            await AsyncStorage.setItem("department", myAccountDetails['department']);
            await AsyncStorage.setItem("laws_version", myAccountDetails['laws_version']);
            await AsyncStorage.setItem("Sign_Path", "");

            await AsyncStorage.setItem('region', myAccountDetails['region'])
            await AsyncStorage.setItem('court_address', myAccountDetails['court_address'])
            await AsyncStorage.setItem('court_number', myAccountDetails['court_number'])
            await AsyncStorage.setItem('release_form_court_number', myAccountDetails['release_form_court_number'])
            await AsyncStorage.setItem('release_form_court_address', myAccountDetails['release_form_court_address'])
            await AsyncStorage.setItem('address', myAccountDetails['address']) 
            await AsyncStorage.setItem('release_form_station_address', myAccountDetails['release_form_station_address'])
            await AsyncStorage.setItem('summon3_court_dates', myAccountDetails['summon3_court_dates'])

            // console.log('profileData: ', await AsyncStorage.getItem("officer_name"))

            if (await AsyncStorage.getItem('signature')) {
                this.props.navigation.replace('Dashboard');
            } else {
                this.props.navigation.navigate('Profile');
            }
            
        } catch (error) {
            console.log(error);
            this.errorDialog(error);
        }
    }

    checkLogin = async() => {
        try {
            const uname = await AsyncStorage.getItem('userName');
            const phone = await AsyncStorage.getItem('phoneNumber');

            if (uname != null && phone != null) {

                this.props.navigation.replace('LoginPage');
            } else {
                this.props.navigation.replace('NumberVerification', { isVisible: false });
            }
        } catch (error) {
            console.log(error);
            this.errorDialog(error);
        }
    }


    handleClick = async(bodyParameters, props, previouScreen, apiUrl) => {

        this.props = props;
        let formBody = [];

        for (var key in bodyParameters) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(bodyParameters[key]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: formBody,

        };

        await fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                Global_Attributes.loading = false;
                if (responseJson.status == "200" || responseJson.status == "success") {

                    console.log(" Response" + responseJson.status);
                    console.log("MY DATA: ", responseJson);

                    switch (previouScreen) {

                        case "splash":
                            console.log(" Response" + responseJson.data["version"]);
                            this.checkUpdate(responseJson.data["version"], responseJson.data["url"]);
                            //let version = responseJson.data.version;
                            break;

                        case "NumberVerification":
                            var number = bodyParameters["mobile_no"];
                            this.toEnterOtp(number)
                                // this.props.navigation.navigate('Enter_Otp',{number:number});
                            break;

                        case "Enter_Otp":
                            userName = responseJson.data[0].pat_user_id;
                            phone = responseJson.data[1].pat_user_mobile_no;
                            this.toCreatePin(phone);
                            break;

                        case "Create_Pin":
                            const fpEnroll = bodyParameters["fingerprint_concent"];
                            this._createLoginSession(userName, phone, fpEnroll);
                            break;

                        case "Login":
                            let myAccountDetails = [];
                            Global_Attributes.PonOneBean['locationCode'] = responseJson.prefilled_data['location_code'];
                            Global_Attributes.PonOneBean['officerName'] = responseJson.data['fname'].charAt(0) + " " + responseJson.data['lname'];
                            myAccountDetails['locationCode'] = responseJson.prefilled_data['location_code'];
                            myAccountDetails['officer_name'] = responseJson.prefilled_data['officer_name'];
                            myAccountDetails['officer_no'] = responseJson.data['officer_no'];
                            myAccountDetails['platoon'] = responseJson.data['platoon'];
                            myAccountDetails['level'] = responseJson.data['level'];
                            myAccountDetails['fname'] = responseJson.data['fname'];
                            myAccountDetails['lname'] = responseJson.data['lname'];
                            myAccountDetails['email'] = responseJson.data['email'];
                            myAccountDetails['signature'] = responseJson.data['signature'];
                            myAccountDetails['user_id'] = responseJson.data['user_id'];
                            // myAccountDetails['country_code'] = responseJson.data['country_code'];
                            // myAccountDetails['branch'] = responseJson.data['branch'];
                            myAccountDetails['city'] = responseJson.data['city'];
                            // myAccountDetails['state'] = responseJson.data['state'];
                            myAccountDetails['department'] = responseJson.data['department'];
                            myAccountDetails['laws_version'] = responseJson.data['laws_version'];

                            console.log("REGION: ", responseJson.prefilled_data['region'])
                            console.log("COURT ADDRESS: ",responseJson.prefilled_data['court_address'])
                            console.log("RELEASE FORM COURT NUMBER: ",responseJson.prefilled_data['release_form_court_number'])
                            console.log("RELEASE FORM COURT ADDRESS: ",responseJson.prefilled_data['release_form_court_address'])
                            console.log("ADDRESS: ",responseJson.prefilled_data['address'])
                            console.log('release_form_station_address', responseJson.prefilled_data['release_form_station_address'])
                            console.log('summon3_court_dates', responseJson.summon3_court_dates[0])
                            console.log('officer_name: ', responseJson.prefilled_data['officer_name'])

                            myAccountDetails['region'] = responseJson.prefilled_data['region'];
                            myAccountDetails['court_address'] = responseJson.prefilled_data['court_address'];
                            myAccountDetails['court_number'] = responseJson.prefilled_data['court_number'];
                            myAccountDetails['release_form_court_number'] = responseJson.prefilled_data['release_form_court_number'];
                            myAccountDetails['release_form_court_address'] = responseJson.prefilled_data['release_form_court_address'];
                            myAccountDetails['address'] = responseJson.prefilled_data['address'];
                            myAccountDetails['release_form_station_address'] =  responseJson.prefilled_data['release_form_station_address'];
                            myAccountDetails['summon3_court_dates'] =  responseJson.summon3_court_dates[0];
                             
                            this.ProfileData(myAccountDetails);

                            break;
                        default:
                            break;
                    }

                } else {
                    alert(" " + responseJson.msg);
                }
            })
            .catch((error) => this.errorDialog(error));

    };
    playstore = (url) => {
        Linking.openURL(url);
        RNExitApp.exitApp();
    }
    checkUpdate = (apiVersion, url) => {
        // if(apiVersion.toString() > packageJson.version){
        //     Alert.alert("Update Available", "Please Update the app to continuew.",[{ text: 'update',onPress:()=>{this.playstore(url)} }]);
        // }
        // else 
        // {
        //     this.checkLogin();

        // }
        this.checkLogin();
    }
    static errorDialog = (error) => {
        console.log('error in response', error)
        Global_Attributes.loading = false;
        if (error instanceof TypeError) {
            alert("Please check your Internet Connection !");
        } else {
            alert("Failed to connect to the Server. Please try again !");
        }
    }

    toEnterOtp = (number) => {
        this.props.navigation.replace('Enter_Otp', { number: number });
    }
    toCreatePin = (number) => {
        this.props.navigation.replace('Create_Pin', { number: number });

    }
    toDashboard = (myAccountDetails) => {

        this.props.navigation.replace('Dashboard', { myAccountDetails: myAccountDetails });

    }
    render() {}

}