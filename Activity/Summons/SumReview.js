import React, {Component} from 'react';
import Global_Attributes from '../../Utility/Global_Attributes';
import TicketsModulesApi from '../Controller/TicketsModulesApi';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Picker,
} from 'react-native';
import CheckBox from 'react-native-checkbox-animated';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton, TextInput, Button} from 'react-native-paper';
// import {lightBlue200} from 'react-native-paper/lib/typescript/styles/colors';
import DashboardFooter from '../Dashboard/DashboardFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import packageJson from '../../package.json';
// import sumreviewStyle from "../Css/ponsumreviewStyle";
import ponstyle from '../Css/PonInfoStyle';
import Loader from '../Dashboard/Loader';
import sumoffnStyle from '../Css/sumOffnStyle';
import sumreviewStyle from '../Css/sumReviewStyle';

export default class SumReview extends Component {
  constructor(props) {
    super(props);
    this.generatePon = this.generatePon.bind(this);
    this.back = this.back.bind(this);
    this.state = {
      apiUrl: 'https://fomsuat.mobilestyx.ca/foms_app_v1/api/cases/submit_form',
      motorInvolved: null,
      collision: null,
      withnesses: null,
      cvor: null,
      nsc: null,
      commercial: null,
      loading: Global_Attributes.loading,
    };
  }

  back = () => {
    this.props.navigation.navigate('SumInfo');
  };
  generatePon = async (url, type) => {
    const DATE = new Date();
    let hours = DATE.getHours();
    let am_pm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
      hours -= 12;
    } else if (hours == '00') {
      hours = 12;
    }
    const CURR_TIME = hours + ':' + DATE.getMinutes() + ' ' + am_pm;
    const CURR_DATE =
      DATE.getFullYear() + '/' + (DATE.getMonth() + 1) + '/' + DATE.getDate();
    console.log('ticket' + Global_Attributes.PonOneBean['offenceNumber']);
    const OFFENCE_NUMBER = Global_Attributes.PonOneBean['offenceNumber'];
    const DEVICE_ID = DeviceInfo.getDeviceId();
    const USER_NAME = await AsyncStorage.getItem('userName');
    const PHONE_NUMBER = await AsyncStorage.getItem('phoneNumber');
    const USER = Global_Attributes.User;
    const PASS = Global_Attributes.Pass;
    var splashBody = {
      user: USER,
      pass: PASS,
      offence_no: OFFENCE_NUMBER,
      location_code: Global_Attributes.PonOneBean['locationCode'],
      curr_date: Global_Attributes.PonOneBean['date'],
      curr_time: Global_Attributes.PonOneBean['time'],
      family: Global_Attributes.PonOneBean['family'],
      given: Global_Attributes.PonOneBean['given'],
      initials: Global_Attributes.PonOneBean['initials'],
      street_no: Global_Attributes.PonOneBean['street'],
      municipality: Global_Attributes.PonOneBean['municipality'],
      po: Global_Attributes.PonOneBean['po'],
      province: Global_Attributes.PonOneBean['province'],
      postal_code: Global_Attributes.PonOneBean['postl'],
      licence_no: Global_Attributes.PonOneBean['lisenceNumber'],
      juris: Global_Attributes.PonOneBean['juris'],
      dob: Global_Attributes.PonOneBean['dob'],
      rad: Global_Attributes.PonOneBean['gender'],
      vehicle_involvement: Global_Attributes.PonOneBean['motorInvolved']
        ? 'Y'
        : 'N',
      witness: Global_Attributes.PonOneBean['withnesses'] ? 'Y' : 'N',
      collision_involve: Global_Attributes.PonOneBean['collision'] ? 'Y' : 'N',
      line1: Global_Attributes.PonOneBean['atOne'],
      line2: Global_Attributes.PonOneBean['atTwo'],
      near: Global_Attributes.PonOneBean['atTwo'],
      area: Global_Attributes.PonOneBean['atThree'],
      contr_to: Global_Attributes.PonOneBean['contrary'],
      speeding: Global_Attributes.PonOneBean['speeding'] ? 'Y' : 'N',
      km_over: Global_Attributes.PonOneBean['km_over'],
      schedule: Global_Attributes.PonOneBean['schedule'],
      actual_speed: Global_Attributes.PonOneBean['speedActual'],
      speed_limit: Global_Attributes.PonOneBean['speedLimit'],
      speed_over_limit: Global_Attributes.PonOneBean['chargedSpeed'],
      schedule_selected: Global_Attributes.PonOneBean['schedule'],
      speeding_zone: Global_Attributes.PonOneBean['schld2Rb'],
      did_comm: Global_Attributes.PonOneBean['didCommit'],
      sect: Global_Attributes.PonOneBean['sect'],
      plate_no: Global_Attributes.PonOneBean['plateNumber'],
      juris2: Global_Attributes.PonOneBean['juris'],
      code: Global_Attributes.PonOneBean['code'],
      commercial_stat: Global_Attributes.PonOneBean['commercial'] ? 'Y' : 'N',
      nsc: Global_Attributes.PonOneBean['nsc'] ? 'Y' : 'N',
      cvor: Global_Attributes.PonOneBean['cvor'] ? 'Y' : 'N',
      cvor_no: Global_Attributes.PonOneBean['covrNumer'],
      set_fine: Global_Attributes.PonOneBean['fine'],
      total_pay: Global_Attributes.PonOneBean['payable'],
      issued_date: Global_Attributes.PonOneBean['issuedDate'],
      uname: USER_NAME,
      mobile_no: PHONE_NUMBER,
      device_name: DEVICE_ID,
      device_version: packageJson.version,
      imei_no: DEVICE_ID,
      service_date: CURR_DATE,
      state: Global_Attributes.gpsAddress['gpsState'],
      pincode: Global_Attributes.gpsAddress['gpsPincode'],
      lat: Global_Attributes.PonOneBean['lat'],
      long: Global_Attributes.PonOneBean['long'],
      ticketState: Global_Attributes.gpsAddress['gpsState'],
      ticketDist: Global_Attributes.PonOneBean['gpsDistrict'],
      ticketCity: Global_Attributes.PonOneBean['gpsCity'],
      act_title: Global_Attributes.PonOneBean['didCommit'],
      titel_parent: Global_Attributes.PonOneBean['contrary'],
    };
    new TicketsModulesApi().api_call(splashBody, this.props, type, url);

    // Global_Attributes.loading= true;
  };

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={sumreviewStyle.mainView}>
        <ScrollView style={sumreviewStyle.Scrollview}>
          <View style={sumreviewStyle.locationView}>
            <View style={sumreviewStyle.loc_code_view}>
              <Text style={sumreviewStyle.loc_code_text}>Location Code</Text>
              <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                {Global_Attributes.PonOneBean['locationCode']}
              </Text>
            </View>
            <View style={sumreviewStyle.offn_views}></View>
            <View style={sumreviewStyle.offn_view}>
              <Text style={sumreviewStyle.offn_num}>Offence Number</Text>
              <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                {Global_Attributes.PonOneBean['formatted']}
              </Text>
            </View>
          </View>

          <Text style={{color: '#000000', padding: 10}}>
            Officer Name : {Global_Attributes.PonOneBean['officerName']}
          </Text>
          <View style={{flex: 1, height: 60}}>
            <View style={sumreviewStyle.view_status}></View>
            <Text style={sumreviewStyle.first_status}>1</Text>
            <Text style={sumreviewStyle.sec_status}>2</Text>
            <Text style={sumreviewStyle.third_status}>3</Text>
            <Text
              style={{
                color: '#11246F',
                bottom: '80%',
                start: '23%',
                fontSize: 12,
              }}>
              Info
            </Text>
            <Text
              style={{
                color: '#11246F',
                bottom: '105%',
                alignSelf: 'center',
                fontSize: 12,
              }}>
              Offence
            </Text>
            <Text
              style={{
                color: '#11246F',
                bottom: '130%',
                start: '68%',
                fontSize: 12,
              }}>
              Review
            </Text>
          </View>
          <View style={sumreviewStyle.inputTextStyleView}>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              value={Global_Attributes.PonOneBean['date']}
              editable={false}
              label="DATE"
              underlineColor={'#7B7B7B'}></TextInput>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              value={Global_Attributes.PonOneBean['time']}
              editable={false}
              label="TIME"
              underlineColor={'#7B7B7B'}></TextInput>
          </View>
          <View style={sumreviewStyle.inputTextStyleView}>
            <TextInput
              style={sumreviewStyle.inputTextStyleThree}
              editable={false}
              value={Global_Attributes.PonOneBean['family']}
              label="FAMILY*"
              underlineColor={'#7B7B7B'}></TextInput>
            <TextInput
              style={sumreviewStyle.inputTextStyleThree}
              editable={false}
              label="GIVEN"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['given']}></TextInput>
            <TextInput
              style={sumreviewStyle.inputTextStyleThree}
              editable={false}
              label="INITIALS"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['initials']}></TextInput>
          </View>
          <View style={sumreviewStyle.inputTextStyleView}>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              editable={false}
              value={Global_Attributes.PonOneBean['street']}
              label="NUMBER AND STREET"
              underlineColor={'#7B7B7B'}></TextInput>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              editable={false}
              label="MUNCIPALITY"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['muncipality']}></TextInput>
          </View>
          <View style={sumreviewStyle.inputTextStyleView}>
            <TextInput
              style={sumreviewStyle.inputTextStyleThree}
              editable={false}
              value={Global_Attributes.PonOneBean['po']}
              label="PO"
              underlineColor={'#7B7B7B'}></TextInput>
            <TextInput
              style={sumreviewStyle.inputTextStyleThree}
              editable={false}
              label="PROVINCE"
              underlineColor={'#7B7B7B'}></TextInput>
            <TextInput
              style={sumreviewStyle.inputTextStyleThree}
              editable={false}
              value={Global_Attributes.PonOneBean['postl']}
              label="POSTAL CODE"
              underlineColor={'#7B7B7B'}></TextInput>
          </View>
          <View style={sumreviewStyle.inputTextStyleView}>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              editable={false}
              value={Global_Attributes.PonOneBean['lisenceNumber']}
              label="DRIVERS LICENSE NUMBER"
              underlineColor={'#7B7B7B'}></TextInput>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              editable={false}
              value={Global_Attributes.PonOneBean['juris']}
              label="JURIS"
              underlineColor={'#7B7B7B'}></TextInput>
          </View>
          <View style={sumreviewStyle.inputTextStyleView}>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              editable={false}
              value={Global_Attributes.PonOneBean['class']}
              label="CLASS"
              underlineColor={'#7B7B7B'}></TextInput>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              editable={false}
              label="CONDITION"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['condition']}></TextInput>
          </View>
          <View style={sumreviewStyle.inputTextStyleView}>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              editable={false}
              value={Global_Attributes.PonOneBean['dob']}
              label="DATE OF BIRTH"
              underlineColor={'#7B7B7B'}></TextInput>
            <View style={sumreviewStyle.sexStyle}>
              <Text style={{fontSize: 12, color: '#7B7B7B'}}>SEX*</Text>
              <Text style={{fontSize: 18, color: '#7B7B7B'}}>
                {Global_Attributes.PonOneBean['gender']}
              </Text>
            </View>
          </View>
          <View pointerEvents="none" style={sumoffnStyle.secCheckboxView}>
            <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
              <Text style={sumoffnStyle.cvorText}>D</Text>
              <View style={{marginStart: '25%', flexDirection: 'row'}}>
                <CheckBox
                  checked={this.state.cvor}
                  style={{marginStart: 30, marginTop: 10}}
                  checkBoxColor={'#7B7B7B'}
                  onValueChange={() => this.CvorCheckBoxChanged()}
                  checkedBackgroundColor={'#7B7B7B'}
                  checkedBorderColor="#7B7B7B"
                  borderWidth={2}
                  unCheckedBorderColor={'#7B7B7B'}
                  checkMarkColor={'white'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}
                  label="YES"
                  labelStyle={{color: '#7B7B7B'}}></CheckBox>
                <Text style={{paddingTop: '8%', color: '#7B7B7B'}}>YES</Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
              <Text style={sumoffnStyle.nscText}>R</Text>
              <View style={{marginStart: '25%', flexDirection: 'row'}}>
                <CheckBox
                  checked={this.state.nsc}
                  style={{marginStart: 30, marginTop: 10}}
                  checkBoxColor={'#7B7B7B'}
                  onValueChange={() => this.NscCheckBoxChanged()}
                  checkedBackgroundColor={'#7B7B7B'}
                  checkedBorderColor="#7B7B7B"
                  borderWidth={2}
                  unCheckedBorderColor={'#7B7B7B'}
                  checkMarkColor={'white'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}
                  label="YES"
                  labelStyle={{color: '#7B7B7B'}}></CheckBox>
                <Text style={{paddingTop: '8%', color: '#7B7B7B'}}>YES</Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
              <Text style={sumoffnStyle.commrText}>P</Text>
              <View style={{marginStart: '10%', flexDirection: 'row'}}>
                <CheckBox
                  checked={this.state.commercial}
                  style={{marginStart: 30, marginTop: 10}}
                  checkBoxColor={'#7B7B7B'}
                  onValueChange={() => this.commercialCheckBoxChanged()}
                  checkedBackgroundColor={'#7B7B7B'}
                  checkedBorderColor="#7B7B7B"
                  borderWidth={2}
                  unCheckedBorderColor={'#7B7B7B'}
                  checkMarkColor={'white'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}
                  label="YES"
                  labelStyle={{color: '#7B7B7B'}}></CheckBox>
                <Text style={{paddingTop: '8%', color: '#7B7B7B'}}>YES</Text>
              </View>
            </View>
          </View>

          <View pointerEvents="none" style={sumoffnStyle.secCheckboxView}>
            <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
              <Text style={sumoffnStyle.cvorText}>PI</Text>
              <View style={{marginStart: '25%', flexDirection: 'row'}}>
                <CheckBox
                  checked={this.state.cvor}
                  style={{marginStart: 30, marginTop: 10}}
                  checkBoxColor={'#7B7B7B'}
                  onValueChange={() => this.CvorCheckBoxChanged()}
                  checkedBackgroundColor={'#7B7B7B'}
                  checkedBorderColor="#7B7B7B"
                  borderWidth={2}
                  unCheckedBorderColor={'#7B7B7B'}
                  checkMarkColor={'white'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}
                  label="YES"
                  labelStyle={{color: '#7B7B7B'}}></CheckBox>
                <Text style={{paddingTop: '8%', color: '#7B7B7B'}}>YES</Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
              <Text style={sumoffnStyle.nscText}>PD</Text>
              <View style={{marginStart: '25%', flexDirection: 'row'}}>
                <CheckBox
                  checked={this.state.nsc}
                  style={{marginStart: 30, marginTop: 10}}
                  checkBoxColor={'#7B7B7B'}
                  onValueChange={() => this.NscCheckBoxChanged()}
                  checkedBackgroundColor={'#7B7B7B'}
                  checkedBorderColor="#7B7B7B"
                  borderWidth={2}
                  unCheckedBorderColor={'#7B7B7B'}
                  checkMarkColor={'white'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}
                  label="YES"
                  labelStyle={{color: '#7B7B7B'}}></CheckBox>
                <Text style={{paddingTop: '8%', color: '#7B7B7B'}}>YES</Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
              <Text style={sumoffnStyle.commrText1}>WITNESSES</Text>
              <View style={{marginStart: '10%', flexDirection: 'row'}}>
                <CheckBox
                  checked={this.state.commercial}
                  style={{marginStart: 30, marginTop: 10}}
                  checkBoxColor={'#7B7B7B'}
                  onValueChange={() => this.commercialCheckBoxChanged()}
                  checkedBackgroundColor={'#7B7B7B'}
                  checkedBorderColor="#7B7B7B"
                  borderWidth={2}
                  unCheckedBorderColor={'#7B7B7B'}
                  checkMarkColor={'white'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}
                  label="YES"
                  labelStyle={{color: '#7B7B7B'}}></CheckBox>
                <Text style={{paddingTop: '8%', color: '#7B7B7B'}}>YES</Text>
              </View>
            </View>
          </View>

          <View style={sumreviewStyle.inputTextStyleView}>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              editable={false}
              value={Global_Attributes.PonOneBean['class']}
              label="AT*"
              underlineColor={'#7B7B7B'}></TextInput>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              editable={false}
              label="NEAR"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['condition']}></TextInput>
          </View>

          <View style={sumreviewStyle.blankTextView}>
            <TextInput
              style={sumreviewStyle.blankInputTextStyle}
              editable={false}
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['atThree']}></TextInput>
          </View>

          <View style={sumreviewStyle.inputTextcodeView}>
            <TextInput
              style={sumreviewStyle.inputTextStyle}
              editable={false}
              label="CONTRARY TO"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['contrary']}></TextInput>
          </View>
          <View style={sumreviewStyle.inputTextcodeView}>
            <TextInput
              style={sumreviewStyle.inputTextStyle}
              editable={false}
              label="DID COMMIT"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['didCommit']}></TextInput>
          </View>
          {/* <View style={{flexDirection:'row',height:70,marginStart:12,marginEnd:12,marginTop:10}}>
                            <View style={{flexDirection:'row',width:'40%'}}>
                                <Text style={{alignSelf:'center',color:'#7B7B7B',flex:1}}>KM OVER</Text>
                                <Text style={{alignSelf:'center',color:'#7B7B7B',flex:1,fontSize:18}}>5KM</Text>
                            </View>
                            <View style={{flexDirection:'column',width:'60%'}}>
                                <View style={{flexDirection:'row',height:'30%'}}> 
                                    <Text style={{color:'#7B7B7B',alignSelf:'center',flex:1}}>Schedule</Text>
                                    <Text style={{color:'#7B7B7B',alignSelf:'center',flex:1}}>Schedule</Text>
                                </View>
                                <View style={{flexDirection:'row',flex:1}}>                                        
                                        <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                                        <RadioButton></RadioButton>
                                        <Text style={{alignSelf:'center',color:'#7B7B7B',fontSize:12,}}>1</Text>
                                        </View>
                                        <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                                        <RadioButton></RadioButton>
                                        <Text style={{alignSelf:'center',color:'#7B7B7B',fontSize:12}}>2</Text>
                                        </View>
                                </View>
                            </View>    
                        </View>  */}
          {/* <View style={{flexDirection:'row',height:55,marginStart:12,marginEnd:12,bottom:5}}>
                                <TextInput style={{flex:1,backgroundColor:'#ffffff',fontSize:12}} 
                                   label='SPEED LIMIT*' underlineColor={'#7B7B7B'} value={ Global_Attributes.PonOneBean['speedLimit']}></TextInput>
                                <TextInput style={{flex:1,backgroundColor:'#ffffff',marginLeft:5,fontSize:11}} 
                                   label='CHARGED SPEED' underlineColor={'#7B7B7B'} value={Global_Attributes.PonOneBean['chargedSpeed']}></TextInput>
                                <TextInput style={{flex:1,backgroundColor:'#ffffff',marginLeft:5,fontSize:12}} 
                                   label='ACTUAL SPEED' underlineColor={'#7B7B7B'} value={Global_Attributes.PonOneBean['speedActual']}></TextInput>   
                        </View> */}
          <View style={sumreviewStyle.inputTextcodeView}>
            <TextInput
              style={sumreviewStyle.inputTextStyle}
              editable={false}
              label="SECT"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['sect']}></TextInput>
          </View>
          <View style={sumreviewStyle.inputTextStyleView}>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              editable={false}
              label="PLATE NUMBER"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['plateNumber']}></TextInput>
            <TextInput
              style={sumreviewStyle.inputTextStyleTwo}
              editable={false}
              label="JURIS"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['juris']}></TextInput>
          </View>
          <View style={sumreviewStyle.inputTextcodeView}>
            <TextInput
              style={sumreviewStyle.inputTextStyle}
              editable={false}
              label="CODE"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['code']}></TextInput>
          </View>

          <View style={sumreviewStyle.secCheckboxView}>
            <View style={{flexDirection: 'column', flex: 1, marginTop: 22}}>
              <Text style={sumreviewStyle.cvorText}>CVOR</Text>
              <View style={{marginStart: '25%', flexDirection: 'row'}}>
                <View pointerEvents="none" style={{flex: 1}}>
                  <CheckBox
                    checked={Global_Attributes.PonOneBean['cvor']}
                    style={{marginStart: 30, marginTop: 20}}
                    unCheckedBorderColor={'#7B7B7B'}
                    checkedBackgroundColor={'#7B7B7B'}
                    checkedBorderColor={'#7B7B7B'}
                    borderWidth={2}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{
                      color: '#7B7B7B',
                      marginLeft: '-10%',
                    }}></CheckBox>
                </View>
                {/* <Text style={{ paddingTop: "8%", color: '#7B7B7B' }}>Yes</Text> */}
              </View>
            </View>
            <View style={{flexDirection: 'column', flex: 1, marginTop: 22}}>
              <Text style={sumreviewStyle.nscText}>NSC</Text>
              <View style={{marginStart: '25%', flexDirection: 'row'}}>
                <View pointerEvents="none" style={{flex: 1}}>
                  <CheckBox
                    checked={Global_Attributes.PonOneBean['nsc']}
                    style={{marginStart: 30, marginTop: 20}}
                    unCheckedBorderColor={'#7B7B7B'}
                    checkedBackgroundColor={'#7B7B7B'}
                    checkedBorderColor={'#7B7B7B'}
                    borderWidth={2}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{
                      color: '#7B7B7B',
                      marginLeft: '-10%',
                    }}></CheckBox>
                </View>
                {/* <Text style={{ paddingTop: "8%", color: '#7B7B7B' }}>Yes</Text> */}
              </View>
            </View>
            <View style={{flexDirection: 'column', flex: 1, marginTop: 22}}>
              <Text style={sumreviewStyle.commrText}>Commercial</Text>
              <View style={{marginStart: '10%', flexDirection: 'row'}}>
                <View pointerEvents="none" style={{flex: 1}}>
                  <CheckBox
                    checked={Global_Attributes.PonOneBean['commercial']}
                    style={{marginStart: 30, marginTop: 20}}
                    unCheckedBorderColor={'#7B7B7B'}
                    checkedBackgroundColor={'#7B7B7B'}
                    checkedBorderColor={'#7B7B7B'}
                    borderWidth={2}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{
                      color: '#7B7B7B',
                      marginLeft: '-10%',
                    }}></CheckBox>
                </View>
                {/* <Text style={{ paddingTop: "8%", color: '#7B7B7B' }}>Yes</Text> */}
              </View>
            </View>
          </View>

          {Global_Attributes.PonOneBean['nsc'] ? (
            <View
              style={{
                flexDirection: 'row',
                flex: 55,
                marginTop: 10,
                marginStart: 12,
                marginEnd: 12,
                bottom: 5,
              }}>
              <TextInput
                style={{flex: 1, backgroundColor: '#ffffff', fontSize: 12}}
                label="CVOR/NSC Number*"
                underlineColor={'#7B7B7B'}
                editable={false}
                value={Global_Attributes.PonOneBean['covrNumer']}></TextInput>
            </View>
          ) : null}

          <View style={sumoffnStyle.fineBoxView}>
            <Text
              style={{flex: 1, flexDirection: 'row', left: '2%', margin: '2%'}}>
              Date to appear in Ontario Court of Justice*
            </Text>
          </View>
          <View style={sumoffnStyle.atNearView}>
            <View style={sumoffnStyle.atNearView1}>
              <TextInput
                value={this.state.attextinputvalue}
                style={sumoffnStyle.inputAT}
                editable={false}
                label="DATE"
                labelStyle={{fontSize: 12}}
                underlineColor={'#7B7B7B'}
              />
            </View>
            <View style={sumoffnStyle.atNearView1}>
              <TextInput
                value={this.state.neartextinputvalue}
                style={sumoffnStyle.inputAT}
                editable={false}
                label="TIME"
                labelStyle={{fontSize: 12}}
                underlineColor={'#7B7B7B'}
              />
            </View>
          </View>
          <View style={sumoffnStyle.inputTextcodeView}>
            <TextInput
              style={sumoffnStyle.inputTextStyle}
              value={this.state.code}
              editable={false}
              label="Ct. Room*"
              underlineColor={'#7B7B7B'}></TextInput>
          </View>
          <View style={sumoffnStyle.inputTextcodeView}>
            <TextInput
              style={sumoffnStyle.inputTextStyle}
              value={this.state.code}
              editable={false}
              label="AT*"
              underlineColor={'#7B7B7B'}></TextInput>
          </View>
          <View style={sumoffnStyle.inputTextcodeView}>
            <TextInput
              style={sumoffnStyle.inputTextStyle}
              value={this.state.code}
              editable={false}
              label="ISSUED DATE"
              underlineColor={'#7B7B7B'}></TextInput>
          </View>

          {/* <View style={{ flexDirection: 'row', flex: 1, margin: "4%", marginTop: "5%" }}>
                            <Button mode='contained' style={sumreviewStyle.backBtn}
                                onPress={() => { this.back() }}
                            >EDIT</Button>

                            <Button mode='contained' style={sumreviewStyle.nxtBtn}
                                onPress={() => { this.next() }}>SUMMONS</Button>
              </View> */}

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              margin: '4%',
              marginTop: '4%',
            }}>
            <Button
              mode="contained"
              style={sumreviewStyle.backBtn}
              onPress={() => {
                this.back();
              }}>
              EDIT
            </Button>

            <Button
              mode="contained"
              style={sumreviewStyle.nxtBtn}
              onPress={() => {
                this.next();
              }}>
              GENERATE SUMMONS
            </Button>
          </View>

          {/* <View style={sumreviewStyle.btnView}>

                        <View style={sumreviewStyle.insideBtnView}>
                            <TouchableOpacity style={sumreviewStyle.warBtn}
                               onPress={() => { this.back() }}>
                                <Text style={sumreviewStyle.warBtntxt}>EDIT</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={sumreviewStyle.insideBtnView}>
                            <TouchableOpacity style={sumreviewStyle.tckBtn}
                                onPress={() => { this.generatePon(Global_Attributes.submitPon, "PonInfo") }}>
                                <Text style={sumreviewStyle.warBtntxt}
                                >GENERATE SUMMONS</Text>
                            </TouchableOpacity>
                        </View>
                        
            </View> */}
        </ScrollView>
        <View style={sumreviewStyle.bottomView}>
          <DashboardFooter navigation={navigation} />
          <Loader loading={this.state.loading} />
        </View>
      </SafeAreaView>
    );
  }
}
