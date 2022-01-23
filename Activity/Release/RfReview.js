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
import RfreviewStyle from '../Css/RfReviewStyle';
import ponstyle from '../Css/PonInfoStyle';
import Loader from '../Dashboard/Loader';
import Autocomplete from 'react-native-autocomplete-input';

export default class RfReview extends Component {
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
    this.props.navigation.navigate('RfInfo');
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
    console.log('ticket' + Global_Attributes.RfBean['offenceNumber']);
    const OFFENCE_NUMBER = Global_Attributes.RfBean['offenceNumber'];
    const DEVICE_ID = DeviceInfo.getDeviceId();
    const USER_NAME = await AsyncStorage.getItem('userName');
    const PHONE_NUMBER = await AsyncStorage.getItem('phoneNumber');
    const USER = Global_Attributes.User;
    const PASS = Global_Attributes.Pass;
    var splashBody = {
      user: USER,
      pass: PASS,
      offence_no: OFFENCE_NUMBER,
      location_code: Global_Attributes.RfBean['locationCode'],
      curr_date: Global_Attributes.RfBean['date'],
      curr_time: Global_Attributes.RfBean['time'],
      family: Global_Attributes.RfBean['family'],
      given: Global_Attributes.RfBean['given'],
      initials: Global_Attributes.RfBean['initials'],
      street_no: Global_Attributes.RfBean['street'],
      municipality: Global_Attributes.RfBean['municipality'],
      po: Global_Attributes.RfBean['po'],
      province: Global_Attributes.RfBean['province'],
      postal_code: Global_Attributes.RfBean['postl'],
      licence_no: Global_Attributes.RfBean['lisenceNumber'],
      juris: Global_Attributes.RfBean['juris'],
      dob: Global_Attributes.RfBean['dob'],
      rad: Global_Attributes.RfBean['gender'],
      vehicle_involvement: Global_Attributes.RfBean['motorInvolved']
        ? 'Y'
        : 'N',
      witness: Global_Attributes.RfBean['withnesses'] ? 'Y' : 'N',
      collision_involve: Global_Attributes.RfBean['collision'] ? 'Y' : 'N',
      line1: Global_Attributes.RfBean['atOne'],
      line2: Global_Attributes.RfBean['atTwo'],
      near: Global_Attributes.RfBean['atTwo'],
      area: Global_Attributes.RfBean['atThree'],
      contr_to: Global_Attributes.RfBean['contrary'],
      speeding: Global_Attributes.RfBean['speeding'] ? 'Y' : 'N',
      km_over: Global_Attributes.RfBean['km_over'],
      schedule: Global_Attributes.RfBean['schedule'],
      actual_speed: Global_Attributes.RfBean['speedActual'],
      speed_limit: Global_Attributes.RfBean['speedLimit'],
      speed_over_limit: Global_Attributes.RfBean['chargedSpeed'],
      schedule_selected: Global_Attributes.RfBean['schedule'],
      speeding_zone: Global_Attributes.RfBean['schld2Rb'],
      did_comm: Global_Attributes.RfBean['didCommit'],
      sect: Global_Attributes.RfBean['sect'],
      plate_no: Global_Attributes.RfBean['plateNumber'],
      juris2: Global_Attributes.RfBean['juris'],
      code: Global_Attributes.RfBean['code'],
      commercial_stat: Global_Attributes.RfBean['commercial'] ? 'Y' : 'N',
      nsc: Global_Attributes.RfBean['nsc'] ? 'Y' : 'N',
      cvor: Global_Attributes.RfBean['cvor'] ? 'Y' : 'N',
      cvor_no: Global_Attributes.RfBean['covrNumer'],
      set_fine: Global_Attributes.RfBean['fine'],
      total_pay: Global_Attributes.RfBean['payable'],
      issued_date: Global_Attributes.RfBean['issuedDate'],
      uname: USER_NAME,
      mobile_no: PHONE_NUMBER,
      device_name: DEVICE_ID,
      device_version: packageJson.version,
      imei_no: DEVICE_ID,
      service_date: CURR_DATE,
      state: Global_Attributes.gpsAddress['gpsState'],
      pincode: Global_Attributes.gpsAddress['gpsPincode'],
      lat: Global_Attributes.RfBean['lat'],
      long: Global_Attributes.RfBean['long'],
      ticketState: Global_Attributes.gpsAddress['gpsState'],
      ticketDist: Global_Attributes.RfBean['gpsDistrict'],
      ticketCity: Global_Attributes.RfBean['gpsCity'],
      act_title: Global_Attributes.RfBean['didCommit'],
      titel_parent: Global_Attributes.RfBean['contrary'],
    };
    new TicketsModulesApi().api_call(splashBody, this.props, type, url);
    // Global_Attributes.loading= true;
  };

  next = () => {
    this.props.navigation.navigate('Add_r');
  };

  render() {
    console.log(Global_Attributes.RfBean['chargesCheck']);
    const {navigation} = this.props;

    return (
      <SafeAreaView style={RfreviewStyle.mainView}>
        <ScrollView style={RfreviewStyle.Scrollview}>
          <View style={RfreviewStyle.locationView}>
            <View style={RfreviewStyle.loc_code_view}>
              <Text style={RfreviewStyle.loc_code_text}>Location Code</Text>
              <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                {Global_Attributes.PonOneBean['locationCode']}
              </Text>
            </View>
            <View style={RfreviewStyle.offn_views}></View>
            <View style={RfreviewStyle.offn_view}>
              {/* <Text style={RfreviewStyle.offn_num}>Offence Number</Text>
                            <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>{Global_Attributes.RfBean['formatted']}</Text> */}
            </View>
          </View>

          <Text style={{color: '#000000', padding: 10}}>
            Officer Name : {Global_Attributes.RfBean['officerName']}
          </Text>
          <View style={{flex: 1, height: 60}}>
            <View style={RfreviewStyle.view_status}></View>
            <Text style={RfreviewStyle.first_status}>1</Text>
            <Text style={RfreviewStyle.sec_status}>2</Text>
            <Text style={RfreviewStyle.third_status}>3</Text>
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
          <View style={RfreviewStyle.main_text_view}>
            <View style={RfreviewStyle.main_text_views}>
              <TextInput
                style={RfreviewStyle.inputTextStyleTwo}
                label="DATE"
                underlineColor={'#787878'}
                editable={false}
                value={Global_Attributes.RfBean['date']}></TextInput>
              <Image
                source={require('../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  left: 120,
                  bottom: 3,
                }}
              />
            </View>
            <View style={RfreviewStyle.main_text_views}>
              <TextInput
                style={RfreviewStyle.inputTextStyleTwo}
                label="TIME"
                underlineColor={'#787878'}
                editable={false}
                value={Global_Attributes.RfBean['time']}></TextInput>
              <Image
                source={require('../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  left: 120,
                  bottom: 3,
                }}
              />
            </View>
          </View>
          <View style={RfreviewStyle.inputTextcodeView}>
            <TextInput
              style={RfreviewStyle.inputTextStyle}
              label="REGION*"
              underlineColor={'#787878'}
              editable={false}
              value={Global_Attributes.RfBean['region']}></TextInput>
          </View>
          {/* </View> */}
          {/* <View style={RfreviewStyle.main_text_view}> */}
          <View style={RfreviewStyle.inputTextcodeView}>
            <TextInput
              style={RfreviewStyle.inputTextStyle}
              label="CASE/FILE NO*"
              underlineColor={'#787878'}
              editable={false}
              value={Global_Attributes.RfBean['cfile']}></TextInput>
          </View>
          <View style={RfreviewStyle.main_text_view}>
            <View style={RfreviewStyle.main_text_views}>
              <TextInput
                style={RfreviewStyle.inputTextStyleTwo}
                label="FIRST NAME*"
                underlineColor={'#787878'}
                editable={false}
                value={Global_Attributes.RfBean['fname']}></TextInput>
            </View>
            <View style={RfreviewStyle.main_text_views}>
              <TextInput
                style={RfreviewStyle.inputTextStyleTwo}
                label="LAST NAME*"
                underlineColor={'#787878'}
                editable={false}
                value={Global_Attributes.RfBean['lname']}></TextInput>
            </View>
          </View>
          <View style={RfreviewStyle.inputTextcodeView}>
            <TextInput
              style={RfreviewStyle.inputTextStyle}
              label="ADDRESS*"
              underlineColor={'#787878'}
              editable={false}
              value={Global_Attributes.RfBean['address']}></TextInput>
          </View>

          <View style={RfreviewStyle.main_text_view}>
            <View style={RfreviewStyle.birthView}>
              <TextInput
                style={RfreviewStyle.inputTextStyleTwo}
                label="DATE OF BIRTH"
                underlineColor={'#787878'}
                editable={false}
                value={Global_Attributes.RfBean['dob']}></TextInput>
              <Image
                source={require('../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  left: 120,
                  bottom: 3,
                }}
              />
            </View>
            <View style={RfreviewStyle.birthView}>
              <TextInput
                style={RfreviewStyle.inputTextStyleTwo}
                label="AGE"
                underlineColor={'#787878'}
                editable={false}
                value={Global_Attributes.RfBean['age']}></TextInput>
            </View>
          </View>
          <View pointerEvents="none" style={RfreviewStyle.gend_view}>
            <Text style={RfreviewStyle.sex_txt}>SEX*</Text>

            <View style={RfreviewStyle.sec_gend_view}>
              <RadioButton.Group value={Global_Attributes.RfBean['gender']}>
                <View style={{flexDirection: 'row'}}>
                  <RadioButton value="MALE" color="grey"></RadioButton>
                  <Text
                    style={{alignSelf: 'center', color: 'grey', fontSize: 12}}>
                    MALE
                  </Text>
                  <RadioButton value="FEMALE" color="grey"></RadioButton>
                  <Text
                    style={{alignSelf: 'center', color: 'grey', fontSize: 12}}>
                    FEMALE
                  </Text>
                  <RadioButton value="OTHER" color="grey"></RadioButton>
                  <Text
                    style={{alignSelf: 'center', color: 'grey', fontSize: 12}}>
                    OTHER
                  </Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View style={RfreviewStyle.inputTextcodeView}>
            <TextInput
              style={RfreviewStyle.inputTextStyle}
              label="CONTRARY TO*"
              underlineColor={'#787878'}
              editable={false}
              value={Global_Attributes.RfBean['didcommit']}></TextInput>
          </View>
          <View style={RfreviewStyle.inputTextcodeView}>
            <TextInput
              style={RfreviewStyle.inputTextStyle}
              label="DID COMMIT*"
              underlineColor={'#787878'}
              editable={false}
              value={Global_Attributes.RfBean['didcommit']}></TextInput>
          </View>
          <View style={RfreviewStyle.inputTextcodeView}>
            <TextInput
              style={RfreviewStyle.inputTextStyle}
              label="SECT*"
              underlineColor={'#787878'}
              editable={false}
              value={Global_Attributes.RfBean['didcommit']}></TextInput>
          </View>

          {/* <View style={RfreviewStyle.autocompleteView}> */}
          {/* <Autocomplete
                            autoCorrect={false}
                            containerStyle={RfreviewStyle.autocompletecontainer}
                            inputContainerStyle={RfreviewStyle.autocompleteinnercontainer}
                            placeholder="DID COMMIT*"
                            placeholderTextColor='grey'
                            onChangeText={text => this.setState({ didCommit: text, acttitlevalue: text })}
                            value={this.state.didCommit}
                            style={{ fontSize: 12 }}
                        /> */}
          {/* <Image
                            source={require('../../assets/search.png')}
                            style={RfreviewStyle.searchIcon}
                        /> */}
          {/* </View>
                    <View style={RfreviewStyle.autocompleteView}> */}
          {/* <Autocomplete
                            autoCorrect={false}
                            containerStyle={RfreviewStyle.autocompletecontainer}
                            inputContainerStyle={RfreviewStyle.autocompleteinnercontainer}
                            placeholder="SECT*"
                            placeholderTextColor='grey'
                            onChangeText={text => this.setState({ sect: text, actnovalue: text })}
                            value={this.state.sect}
                            style={{ fontSize: 12 }}
                        /> */}

          {/* <Image
                            source={require('../../assets/search.png')}
                            style={RfreviewStyle.searchIcon}
                        /> */}
          {/* </View> */}
          {/* <View style={RfreviewStyle.tnCView}> */}
          <View pointerEvents="none" style={{marginTop: '-10%'}}>
            <CheckBox
              checked={Global_Attributes.RfBean['chargesCheck']}
              // style={{ marginTop: '5%' }}
              // textRight={'BY CHECKING THIS BOX, I ACKNOWLEDGE THAT I HAVE REVIEWED ALL THE INFORMATION CONTAINED WITHIN THIS DOCUMENT AND CONFIRM IT TO BE ACCURATE.'}
              onValueChange={() => this.checkBoxChanged()}
              checkedBackgroundColor={'#787878'}
              checkedBorderColor={'#787878'}
              borderWidth={2}
              checkMarkColor={'white'}
              unCheckedBorderColor={'#787878'}
              checkMarkSize={18}
              animationType={'left'}
              size={18}
              label="No new charges are being laid against you at this time but you are required to appear at a
                                    judicial referral hearing under section 523.1 for a failure under section 496."
              labelStyle={{
                color: '#787878',
                fontWeight: 'bold',
                marginTop: '12%',
                marginLeft: '-2%',
              }}
              rippleEffect={false}></CheckBox>
          </View>
          {/* <Text style={RfreviewStyle.tncText}>
                            No new charges are being laid against you at this time but you are required to appear at a
                            judicial referral hearing under section 523.1 for a failure under section 496.
                        </Text> */}
          {/* </View> */}

          <View>
            <Text style={{marginLeft: '3%'}}>CONDITIONS</Text>
          </View>

          <View style={RfreviewStyle.inputTextcodeView}>
            <TextInput
              style={RfreviewStyle.inputTextStyle}
              label="ADDRESS"
              underlineColor={'#787878'}
              editable={false}
              value={Global_Attributes.RfBean['cnAddress']}></TextInput>
          </View>
          <View style={RfreviewStyle.inputTextcodeView}>
            <TextInput
              style={RfreviewStyle.inputTextStyle}
              underlineColor={'#787878'}
              value={this.state.address}
              multiline={true}
              numberOfLines={2}
              editable={false}
              onChangeText={text => this.setState({address: text})}></TextInput>
          </View>
          <View style={RfreviewStyle.main_text_view}>
            <View style={RfreviewStyle.main_text_views}>
              <TextInput
                style={RfreviewStyle.inputTextStyleTwo}
                label="DATE"
                underlineColor={'#787878'}
                editable={false}
                value={Global_Attributes.RfBean['date']}></TextInput>
              <Image
                source={require('../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  left: 120,
                  bottom: 3,
                }}
              />
            </View>
            <View style={RfreviewStyle.main_text_views}>
              <TextInput
                style={RfreviewStyle.inputTextStyleTwo}
                label="TIME"
                underlineColor={'#787878'}
                value={Global_Attributes.RfBean['time']}
                editable={false}></TextInput>
              <Image
                source={require('../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  left: 120,
                  bottom: 3,
                }}
              />
            </View>
          </View>
          <View style={RfreviewStyle.inputTextcodeView}>
            <TextInput
              style={RfreviewStyle.inputTextStyle}
              label="CT. ROOM"
              underlineColor={'#787878'}
              value={Global_Attributes.RfBean['cnCTroom']}
              editable={false}></TextInput>
          </View>

          <View>
            <Text style={{margin: '2%', marginLeft: '3%'}}>
              IDENTIFICATION OF CRIMINALS ACT
            </Text>
          </View>
          <View style={RfreviewStyle.tnCView2}>
            <View pointerEvents="none" style={{marginTop: '-2%'}}>
              <CheckBox
                // style={{ marginTop: '5%' }}
                // textRight={'BY CHECKING THIS BOX, I ACKNOWLEDGE THAT I HAVE REVIEWED ALL THE INFORMATION CONTAINED WITHIN THIS DOCUMENT AND CONFIRM IT TO BE ACCURATE.'}
                checked={Global_Attributes.RfBean['pprCheck']}
                onValueChange={() => this.checkBoxChanged()}
                checkedBackgroundColor={'#787878'}
                checkedBorderColor={'#787878'}
                borderWidth={2}
                checkMarkColor={'white'}
                unCheckedBorderColor={'#787878'}
                checkMarkSize={18}
                animationType={'left'}
                size={18}
                label=" PHOTOS AND PRINTS REQUIRED"
                labelStyle={{marginLeft: '-5%', fontWeight: 'bold'}}
                rippleEffect={false}></CheckBox>
            </View>
            <Text style={RfreviewStyle.tncText2}>
              PHOTOS AND PRINTS REQUIRED
            </Text>
          </View>

          {Global_Attributes.RfBean['pprCheck'] == true && (
            <View>
              <View style={RfreviewStyle.main_text_view}>
                <View style={RfreviewStyle.main_text_views}>
                  <TextInput
                    style={RfreviewStyle.inputTextStyleTwo}
                    label="DATE"
                    underlineColor={'#787878'}
                    editable={false}
                    value={Global_Attributes.RfBean['date']}></TextInput>
                  <Image
                    source={require('../assets/ic_menu_my_calendar.png')}
                    style={{
                      width: 40,
                      height: 40,
                      position: 'absolute',
                      left: 120,
                      bottom: 3,
                    }}
                  />
                </View>
                <View style={RfreviewStyle.main_text_views}>
                  <TextInput
                    style={RfreviewStyle.inputTextStyleTwo}
                    label="TIME"
                    underlineColor={'#787878'}
                    value={Global_Attributes.RfBean['cnCTroom']}
                    editable={false}></TextInput>
                </View>
              </View>

              <View>
                <View style={RfreviewStyle.inputTextcodeView}>
                  <TextInput
                    style={RfreviewStyle.inputTextStyle}
                    value={Global_Attributes.RfBean['apAddress']}
                    editable={false}
                    label="ADDRESS*"
                    underlineColor={'#787878'}></TextInput>
                </View>
                <View style={RfreviewStyle.inputTextcodeView}>
                  <TextInput
                    style={RfreviewStyle.inputTextStyle}
                    editable={false}
                    underlineColor={'#787878'}></TextInput>
                </View>
              </View>
            </View>
          )}

          <View style={RfreviewStyle.inputTextcodeView}>
            <TextInput
              style={RfreviewStyle.inputTextStyle}
              label="DATE"
              underlineColor={'#787878'}
              // value={cDate}
              editable={false}
              onChangeText={text => {
                this.setState({date: text});
              }}
              onFocus={this.showDatepicker}
              keyboardType="numeric"></TextInput>
            <Image
              source={require('../assets/ic_menu_my_calendar.png')}
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                left: 280,
                bottom: -3,
              }}
            />
          </View>
          
          <View style={RfreviewStyle.inputTextcodeView}>
            <TextInput
              style={RfreviewStyle.inputTextStyle}
              label="ADDRESS"
              underlineColor={'#787878'}
              value={Global_Attributes.RfBean['sgAddress']}
              editable={false}></TextInput>
          </View>

          <View style={{flexDirection: 'row', flex: 1, marginTop: '5%'}}>
            <Button
              mode="contained"
              style={RfreviewStyle.backBtn}
              onPress={() => {
                this.back();
              }}>
              EDIT
            </Button>

            <Button
              mode="contained"
              style={RfreviewStyle.nxtBtn}
              onPress={() => {
                this.next();
              }}>
              PRINT
            </Button>
          </View>
        </ScrollView>
        <View style={ponstyle.bottomView}>
          <DashboardFooter navigation={navigation} />
          <Loader loading={this.state.loading} />
        </View>
      </SafeAreaView>
    );
  }
}
