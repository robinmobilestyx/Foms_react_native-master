import React, { Component } from 'react';
import { SafeAreaView,StyleSheet,Text,View,TouchableOpacity,Image, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Global_Attributes from '../../Utility/Global_Attributes';
import SignaturePad from 'react-native-signature-pad';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetch_blob from 'rn-fetch-blob';




export default class SignPad extends Component{
    constructor(props){
        super(props);

        this.state={
            key: 1,
            signImage:"data:image/png;base64,",
            signcature:'',
        }
    }

    _signaturePadError = (error) => {
        console.error(error);
      };
     
    _signaturePadChange = async({base64DataUrl}) => {
        // console.log("Got new signature: " + base64DataUrl);
        // var ImageUrl = base64DataUrl;
        this.setState({signImage:base64DataUrl});
        //  Global_Attributes.PonOneBean['Sign'] = this.state.signImage;
        //  await AsyncStorage.setItem('Sign',this.state.signImage);

        if(this.state.signcature == ''){
            this.setState({signcature:'yes'});
            console.log("capture")
        }
    };

        clearSignBtn = () => {
            this.setState({
                key: this.state.key + 1,
            });

            if(!this.state.signcature == ''){
                this.setState({signcature:''});
                console.log("clear")
            }
           
        }

        Submit= async()=>{
             
        if(!this.state.signcature == '')
        {
            var Signature_image = this.state.signImage.split('data:image/png;base64,');
            Signature_image = Signature_image[1];
            // console.log(Signature_image)
            
            const fs = fetch_blob.fs
            const dirs = fetch_blob.fs.dirs      
            const timestamp = new Date().getTime().toString();
        //  console.log(timestamp);

            // var file_name = "sig "+await AsyncStorage.getItem('user_id')+" "+await AsyncStorage.getItem('officer_name')+" "+timestamp;
            var file_name = "ProfileSign"+timestamp;
            file_name = file_name.replace(/ /g,"_");
            await AsyncStorage.setItem('Sign_Name',file_name);
            // console.log(file_name);
            
            const file_path = dirs.DCIMDir+"/"+file_name+".png";            
            await AsyncStorage.setItem('Sign_Path',file_path);
            // console.log(" after signcature " +await AsyncStorage.getItem('Sign_Path'))

            fs.writeFile(file_path, Signature_image,'base64')
                 .catch((error) => {
                 alert(JSON.stringify("file not found :"+error));
                 console.log(error)
             });
             this.props.navigation.navigate("Profile");
            }
        
        else
        {
            Alert.alert("Alert !","Signature is empty");
            
        }
    }
        
       
  
    render(){
        return(
            <SafeAreaView style={styles.mainContainer}>
                <Text style={styles.text}>Carefully sign in the box below ( Covering the maximum signature area )</Text>
                {/* <Image style={{width: 100, height: 100,borderWidth:1,borderColor:'black'}} source={{uri: this.state.signImage}}/> */}
                <View style={styles.signpadView}>
              
                    <SignaturePad 
                                  key={this.state.key}
                                  clearButton="true"
                                  onError={this._signaturePadError}
                                  onChange={this._signaturePadChange}
                                  saveImageFileInExtStorage={true}
                                  style={{flex:1,backgroundColor: 'white'}}>
                    </SignaturePad>
                </View>
                <TouchableOpacity style={styles.clearBtn}
                    onPress={() => {this.clearSignBtn()}}
                >
                    <Text style={{color:'white',alignSelf:'center',fontSize:15,fontWeight:'400'}}>CLEAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn}
                    onPress={()=>{this.Submit()}}>
                    <Text style={{color:'white',alignSelf:'center',fontSize:15,fontWeight:'400'}}>SUBMIT</Text>
                </TouchableOpacity>
               
            </SafeAreaView>

            
        )
    }
} 

const styles= StyleSheet.create({
        mainContainer:{
            flex: 1,
        },
        text:{
            alignContent:'center',
            marginTop:hp("15%"),
            margin:wp("5%"),
            color:'black',
           
        },
        signpadView:{
            borderRadius:10,
            borderWidth:1,
            height:hp("40%"),
            width:wp("95%"),
            alignSelf:'center',
            padding:2
        },
        clearBtn:{
            backgroundColor:'#11246f',
            height:40,
            width:90,
            start:wp("15%"),
            top:hp("15%"),
            borderRadius:8,
            justifyContent:'center',
        },
        submitBtn:{
            backgroundColor:'#30D20D',
            height:40,
            width:90,
            start:wp("60%"),
            top:hp("9%"),
            borderRadius:8,
            justifyContent:'center',
        }
    }
)

