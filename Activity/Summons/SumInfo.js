import React, {Component} from 'react';
import Global_Attributes from '../../Utility/Global_Attributes';
import TicketsModulesApi from '../Controller/TicketsModulesApi';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';

import Checkbox from 'react-native-checkbox-animated';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import camera from '../assets/ic_menu_camera.png';
import DatePicker from '@react-native-community/datetimepicker';
import LawsController from '../Controller/LawsController';
import DateTimePicker from '@react-native-community/datetimepicker';
import checkIn from '../assets/checkin.png';

import {NativeModules} from 'react-native';
const {BarcodeScanModule} = NativeModules;
import DashboardFooter from '../Dashboard/DashboardFooter';
import suminfoStyle from '../Css/sumInfoStyle';
// import Scanner from '../View/Scanner';

import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';

const New_DL_CustomerFirstName = 'DAC',
  New_DL_CustomerMiddleName = 'DAD',
  Customer_Family_Name = 'DCS',
  Customer_Given_Name = 'DCT',
  Name_Suffix = 'DCU',
  Street_Address_1 = 'DAG',
  City = 'DAI',
  Jurisdction_Code = 'DAJ',
  Postal_Code = 'DAK',
  Country_Identification = 'DCG',
  Customer_Id_Number = 'DAQ',
  Class = 'DCA',
  Restrictions = 'DCB',
  Date_Of_Birth = 'DBB',
  Sex = 'DBC',
  Issue_Date = 'DBD';

var allKeys = [
  New_DL_CustomerFirstName,
  New_DL_CustomerMiddleName,
  Customer_Family_Name,
  Street_Address_1,
  Customer_Given_Name,
  Name_Suffix,
  City,
  Jurisdction_Code,
  Postal_Code,
  Country_Identification,
  Customer_Id_Number,
  Class,
  Restrictions,
  Date_Of_Birth,
  Sex,
  Issue_Date,
];

var myData = {};

const PLATEFORM_PERMISSION = {
  android: PERMISSIONS.ANDROID.CAMERA,
};
const REQUEST_PERMISSION_TYPE = {
  camera: PLATEFORM_PERMISSION,
};

const PERMISSION_TYPE = {
  camera: 'camera',
};

export default class SumInfo extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.discoverDeviceHandler = this.discoverDeviceHandler.bind(this);
    this.state = {
      family: Global_Attributes.Summon3Bean['family'],
      given: Global_Attributes.Summon3Bean['given'],
      initials: Global_Attributes.Summon3Bean['initials'],
      street: Global_Attributes.Summon3Bean['street'],
      muncipality: Global_Attributes.Summon3Bean['muncipality'],
      po: Global_Attributes.Summon3Bean['po'],
      province: Global_Attributes.Summon3Bean['province'],
      postal: Global_Attributes.Summon3Bean['postal'],
      lisenceNumber: Global_Attributes.Summon3Bean['lisenceNumber'],
      juris: Global_Attributes.Summon3Bean['juris'],
      clas: Global_Attributes.Summon3Bean['clas'],
      condition: Global_Attributes.Summon3Bean['condition'],

      dob: Global_Attributes.Summon3Bean['dob'],
      gender: Global_Attributes.Summon3Bean['gender'],
      date: Global_Attributes.Summon3Bean['date'],
      time: Global_Attributes.Summon3Bean['time'],
      show: false,
      mode: null,
      currDate: new Date(),
      flash: false,
      showTimeCal: false,
      dobCal: false,
      bd: null,
      bde: new Date(new Date().setFullYear(new Date().getFullYear() - 16)),
      keyboardStatus: 'Keyboard Hidden',
      policedt: '',
      courtdt: '',
    };
  }
  comp;
  checkBoxChanged() {
    this.setState({flash: !this.state.flash});
  }
  parsScanData = rawValues => {
    const lines = rawValues.split(' , ');
    for (var i = 0; i < lines.length; i++) {
      let values = lines[i];
      if (values.includes('ANSI')) {
        values = values.substring(values.indexOf('DL'));
        let str = values.split('DL');
        if (str.length > 1) {
          values = str[str.length - 1];
        }
      }
      if (values.length > 3) {
        var key = values.substring(0, 3);
        var value = values.substring(3);
        console.log('value' + value);
        if (allKeys.includes(key)) {
          if (!value.localeCompare('None') == -1) {
            const key = allKeys.find(data => data.indexOf(key));
            myData[allKeys.find(allKeys.indexOf(key))] = value;
            console.log('myData values:' + key + '=' + value);
          }
        }
      }
    }
    console.log('myData values:' + myData[Date_Of_Birth]);
  };
  discoverDeviceHandler = async flash => {
    try {
      //         loader = true;
      const result = await BarcodeScanModule.callDeviceDiscovery(flash);
      console.log('Android Result:' + ' ' + result);
      // this.parsScanData(result);
      const lines = result.split(', '); //\\r?\\n
      console.log('Lines' + lines + lines.length);
      for (var i = 0; i < lines.length; i++) {
        let values = lines[i];
        if (values.includes('ANSI')) {
          values = values.substring(values.indexOf('DL'));
          let str = values.split('DL');
          if (str.length > 1) {
            values = str[str.length - 1];
          }
        }
        if (values.length > 3) {
          var key = values.substring(0, 3);
          var value = values.substring(3);
          console.log('value' + value);
          if (allKeys.includes(key)) {
            if (value.localeCompare('None') == -1) {
              const key = allKeys.find(data => data.indexOf(key));
              myData[key] = value;
              console.log('myData values:' + key + '=' + value);
            }
          }
        }
      }

      console.log('myData:' + myData[Date_Of_Birth]);
    } catch (error) {
      console.log('failed' + ' ' + error);
    }
  };

  scanBarcode = () => {
    if (Platform.OS == 'android') {
      //  BarcodeScanModule.getBarcodeDetails(this.state.flash);
    } else {
      // for ios native code..
    }
  };
  courtdate21 = days => {
    var ndate = new Date();
    var x = new Date(ndate.setDate(ndate.getDate() + days));

    var cd = x.getFullYear() + '/' + (x.getMonth() + 1) + '/' + x.getDate();
    console.log('cd21', cd);
    this.setState({courtdt: cd});
  };

  policedate14 = days => {
    var ndate = new Date();
    var y = new Date(ndate.setDate(ndate.getDate() + days));
    var pd = y.getFullYear() + '/' + (y.getMonth() + 1) + '/' + y.getDate();
    console.log('pd14', pd);
    this.setState({policedt: pd});
  };

  check = i => {
    let ndate = new Date();
    var d = ndate.getDay();

    var count = 0;
    while (d < i) {
      d++;
      count++;
    }
    if (d > i) {
      while (d <= 6) {
        d++;
        count++;
      }
      count = count + i;
      this.courtdate21(21 + count);
      this.policedate14(14 + count);
    } else if (d == i) {
      this.courtdate21(21 + count);
      this.policedate14(14 + count);
    }
  };

  componentDidMount() {

    let fname = 'afd';
    let f = fname.slice(0, 1);

    if (f.match(/[a-g]/i)) {
      var i = 2;
      this.check(i);
      console.log(fname, i);
    } else if (f.match(/[h-o]/i)) {
      var i = 3;
      this.check(i);
    } else if (f.match(/[p-z]/i)) {
      var i = 4;
      this.check(i);
    } else {
      console.log('no valid name');
    }

    let setcurTime = new Date();
    //Global_Attributes.PonOneBean['time'] ;
    // alert(setcurTime);

    let hours = setcurTime.getHours();
    let am_pm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
      hours -= 12;
    } else if (hours == '00') {
      hours = 12;
    }

    let getTime = hours + ':' + setcurTime.getMinutes() + ' ' + am_pm;
    // alert(getTime);
    this.setState({time: getTime});

    this.keyboardDidShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({keyboardStatus: 'Keyboard Shown'});
      },
    );

    this.keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({keyboardStatus: 'Keyboard Hidden'});
      },
    );

    console.log('getting Parents Laws title .....Done');

    let All_acts = {
      user: Global_Attributes.User,
      pass: Global_Attributes.Pass,
      id: 'all_acts',
    };

    new LawsController().getAllActs(
      All_acts,
      this.props,
      'SumInfo',
      Global_Attributes.laws,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSubscription.remove();
    this.keyboardDidHideSubscription.remove();
  }

  emptyFields = () => {

    var fields = [];

    if (this.state.given.trim() == '') {
      fields.push('Given Name');
    }
    if (this.state.initials.trim() == '') {
      fields.push('Initials Name');
    }
    if (this.state.street.trim() == '') {
      fields.push('Number & Street');
    }
    if (this.state.muncipality.trim() == '') {
      fields.push('Muncipality');
    }
    if (this.state.province.trim() == '') {
      fields.push('Province');
    }
    if (this.state.postal.trim() == '') {
      fields.push('Postal code');
    }
    if (this.state.lisenceNumber.trim() == '') {
      fields.push('DL Number');
    }
    if (this.state.juris.trim() == '') {
      fields.push('Juris');
    }
    if (this.state.dob == null) {
      fields.push('Date of Birth');
    }
    if (this.state.clas.trim() == '') {
      fields.push('Class');
    }
    if (this.state.condition.trim() == '') {
      fields.push('Condition');
    } else {
    }
    return fields;
  };

  next = () => {
    this.emptyFields();
    if (this.state.family.trim() == '') {
      alert('Enter family name !');
    } else {
      if (this.emptyFields().length > 0) {
        Alert.alert(
          'Notice',
          'The following field(s) are missing:\n\n' +
            this.emptyFields() +
            '\n\n Do you wish to continue?',
          [
            {
              text: 'YES',
              onPress: () => {
                this.setBeans();
              },
            },
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
        );
      } else {
        this.setBeans();
      }
    }
  };

  setBeans = () => {
    
    Global_Attributes.Summon3Bean['date'] = this.state.date;
    Global_Attributes.Summon3Bean['time'] = this.state.time;
    Global_Attributes.Summon3Bean['family'] = this.state.family;
    Global_Attributes.Summon3Bean['given'] = this.state.given;
    Global_Attributes.Summon3Bean['initials'] = this.state.initials;
    Global_Attributes.Summon3Bean['street'] = this.state.street;
    Global_Attributes.Summon3Bean['muncipality'] = this.state.muncipality;
    Global_Attributes.Summon3Bean['po'] = this.state.po;
    Global_Attributes.Summon3Bean['province'] = this.state.province;
    Global_Attributes.Summon3Bean['postal'] = this.state.postal;
    Global_Attributes.Summon3Bean['lisenceNumber'] = this.state.lisenceNumber;
    Global_Attributes.Summon3Bean['juris'] = this.state.juris;
    Global_Attributes.Summon3Bean['clas'] = this.state.clas;
    Global_Attributes.Summon3Bean['condition'] = this.state.condition;
    Global_Attributes.Summon3Bean['dob'] = this.state.dob;
    Global_Attributes.Summon3Bean['gender'] = this.state.gender;
    this.props.navigation.navigate('SumOffence');
  };

  checkPermission = async type => {

    const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];

    console.log('permission', permission);

    if (!permission) {
      return true;
    }
    try {
      const result = await check(permission);
      console.log('permission check ', result);

      if (result === RESULTS.GRANTED) {
        // BarcodeScanModule.getBarcodeDetails()
        return true;
      }
      return this.requestPermission(permission);
    } catch (error) {
      console.log('error while check' + error);
    }

  };

  requestPermission = async permission => {
    try {
      const result = await request(permission);
      console.log('permission request', result);
      BarcodeScanModule.getBarcodeDetails();
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('App permission result fail ' + error);
      return false;
    }
  };

  showDatepicker = () => {
    // this.showMode('date');
    this.setState({show: true});
    this.setState({mode: 'date'});
  };

  showTimepicker = () => {
    //  this.showMode('Time');
    this.setState({show: true});
    this.setState({mode: 'time'});
  };

  onDateTimeChange = (_event, selectedDate) => {
    const currentDate = selectedDate || this.state.currDate;
    let storeDate =
      currentDate.getFullYear() +
      '/' +
      (currentDate.getMonth() + 1) +
      '/' +
      currentDate.getDate();
    // alert(storeDate);

    let hours = currentDate.getHours();
    let am_pm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
      hours -= 12;
    } else if (hours == '00') {
      hours = 12;
    }
    let storeTime = hours + ':' + currentDate.getMinutes() + ' ' + am_pm;
    this.setState({show: Platform.OS === 'ios'});
    this.setState({date: storeDate});
    this.setState({time: storeTime});
    this.setState({currDate: currentDate});
  };

  dobChange = (_event, selectedDate) => {
    //  this.setState({shw : false});
    let BdDate =
      selectedDate.getFullYear() +
      '/' +
      (selectedDate.getMonth() + 1) +
      '/' +
      selectedDate.getDate();
    // alert(BdDate);

    this.setState({dobCal: Platform.OS === 'ios'});
    this.setState({dob: BdDate});
    this.setState({bd: selectedDate});
  };

  render() {
    const {navigation} = this.props;
    //let bd = this.state.dob;
    // bd.getFullYear() + "/" + (bd.getMonth() + 1) + "/" + bd.getDate()
    const {keyboardStatus, bd} = this.state;
    // let time =  this.state;
    // let date =  this.state;

    let current = this.state.currDate;
    let hours = current.getHours();
    let am_pm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
      hours -= 12;
    } else if (hours == '00') {
      hours = 12;
    }
    let cTime = hours + ':' + current.getMinutes() + ' ' + am_pm;
    // console.log(this.state.time);
    let cDate =
      current.getFullYear() +
      '/' +
      (current.getMonth() + 1) +
      '/' +
      current.getDate();

    return (
      <SafeAreaView style={suminfoStyle.mainView}>
        <ScrollView style={suminfoStyle.Scrollview}>
          <View style={suminfoStyle.locationView}>
            <View style={suminfoStyle.loc_code_view}>
              <Text style={suminfoStyle.loc_code_text}>Location Code</Text>
              <Text style={suminfoStyle.loc_code_no}>
                {Global_Attributes.PonOneBean['locationCode']}
              </Text>
            </View>
            <View style={suminfoStyle.offn_views}></View>
            <View style={suminfoStyle.offn_view}>
              <Text style={suminfoStyle.loc_code_text}>Offence Number</Text>
              <Text style={suminfoStyle.loc_code_no}>
                {Global_Attributes.PonOneBean['formatted']}
              </Text>
            </View>
          </View>

          <View style={suminfoStyle.offr_name_view}>
            <Text style={suminfoStyle.offr_name}>
              Officer Name : {Global_Attributes.PonOneBean['officerName']}
            </Text>
          </View>

          <View style={suminfoStyle.main_view_status}>
            <View style={suminfoStyle.view_status}></View>
            <Text style={suminfoStyle.first_status}>1</Text>
            <Text style={suminfoStyle.sec_status}>2</Text>
            <Text style={suminfoStyle.third_status}>3</Text>
            <Text style={suminfoStyle.info_txt}>Info</Text>
            <Text style={suminfoStyle.offn_txt}>Offence</Text>
            <Text style={suminfoStyle.review_txt}>Review</Text>
          </View>

          <View style={suminfoStyle.main_text_view}>
            <View style={suminfoStyle.main_text_views}>
              <TextInput
                style={suminfoStyle.inputTextStyleTwo}
                label="DATE"
                underlineColor={'#000000'}
                value={cDate}
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
                  left: 130,
                  bottom: 2,
                }}
              />
            </View>
            <View style={suminfoStyle.main_text_views}>
              <TextInput
                style={suminfoStyle.inputTextStyleTwo}
                label="TIME"
                underlineColor={'#000000'}
                onFocus={this.showTimepicker}
                onChangeText={text => {
                  this.setState({time: text});
                }}
                value={cTime}
                keyboardType="numeric">
              </TextInput>
              <Image
                source={require('../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  left: 130,
                  bottom: 2,
                }}
              />
            </View>
          </View>

          {/* <View style={suminfoStyle.main_text_view}>
                        <View style={suminfoStyle.main_text_views}>
                            <TextInput style={suminfoStyle.inputTextStyleTwo}
                                label='Court Date' underlineColor={'#000000'}
                                value={this.state.courtdt}
                                editable={false}
                                //onChangeText={(text) => { this.setState({ date: text }) }}
                                //  onFocus={this.showDatepicker}
                                keyboardType="numeric"
                            ></TextInput>
                        </View>
                        <View style={suminfoStyle.main_text_views}>
                            <TextInput style={suminfoStyle.inputTextStyleTwo}
                                label='Police Stn Date' underlineColor={'#000000'}
                                //onFocus={this.showTimepicker}
                                //  onChangeText={(text) => { this.setState({ time: text }) }}
                                value={this.state.policedt}
                                editable={false}
                                keyboardType="numeric"
                            ></TextInput>
                        </View>
              </View> */}

          <View style={suminfoStyle.flash_view}>
            <Text style={suminfoStyle.sdl_txt}>Scan Driving License</Text>
            <Checkbox
              onValueChange={() => this.checkBoxChanged()}
              label="Flash"
              labelStyle={{color: '#11246F'}}
              checked={this.state.flash}
              style={{marginTop: '5%', alignSelf: 'center'}}
              checkedBackgroundColor={'#11246F'}
              checkedBorderColor={'#11246F'}
              borderWidth={2}
              checkMarkColor={'white'}
              checkMarkSize={16}
              animationType={'left'}
              unCheckedBorderColor={'#11246F'}
              size={16}
              rippleEffect={false}>
            </Checkbox>
            <Text style={suminfoStyle.flash_txt}>Flash</Text>

            <View style={suminfoStyle.scan_btn}>
              <TouchableOpacity
                onPress={() => {
                  alert('Module under dovelopment!');
                }}>
                {/* this.discoverDeviceHandler(this.state.flash)  */}
                <Text style={suminfoStyle.scan_txt}>SCAN</Text>
                <Image source={camera} style={suminfoStyle.scan_img}></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={suminfoStyle.main_text_view}>
            <View style={suminfoStyle.inputTextStyleThreeView}>
              <TextInput
                style={suminfoStyle.inputTextStyleThree}
                label="FAMILY*"
                underlineColor={'#000000'}
                value={this.state.family}
                onChangeText={text =>
                  this.setState({family: text})
                }></TextInput>
            </View>

            <View style={suminfoStyle.inputTextStyleThreeView}>
              <TextInput
                style={suminfoStyle.inputTextStyleThree}
                label="GIVEN"
                underlineColor={'#000000'}
                value={this.state.given}
                onChangeText={text => this.setState({given: text})}></TextInput>
            </View>
            <View style={suminfoStyle.inputTextStyleThreeView}>
              <TextInput
                style={suminfoStyle.inputTextStyleThree}
                label="INITIALS"
                underlineColor={'#000000'}
                value={this.state.initials}
                onChangeText={text =>
                  this.setState({initials: text})
                }></TextInput>
            </View>
          </View>
          <View style={suminfoStyle.main_text_view}>
            <View style={suminfoStyle.main_text_views}>
              <TextInput
                style={suminfoStyle.inputTextStyleTwo}
                label="NUMBER AND STREET"
                underlineColor={'#000000'}
                value={this.state.street}
                onChangeText={text =>
                  this.setState({street: text})
                }></TextInput>
            </View>
            <View style={suminfoStyle.main_text_views}>
              <TextInput
                style={suminfoStyle.inputTextStyleTwo}
                label="MUNICIPALITY"
                underlineColor={'#000000'}
                value={this.state.muncipality}
                onChangeText={text =>
                  this.setState({muncipality: text})
                }></TextInput>
            </View>
          </View>
          <View style={suminfoStyle.main_text_view}>
            <View style={suminfoStyle.inputTextStyleThreeView}>
              <TextInput
                style={suminfoStyle.inputTextStyleThree}
                label="PO"
                underlineColor={'#000000'}
                value={this.state.po}
                onChangeText={text => this.setState({po: text})}></TextInput>
            </View>
            <View style={suminfoStyle.inputTextStyleThreeView}>
              <TextInput
                style={suminfoStyle.inputTextStyleThree}
                label="PROVINCE"
                underlineColor={'#000000'}
                value={this.state.province}
                onChangeText={text =>
                  this.setState({province: text})
                }></TextInput>
            </View>
            <View style={suminfoStyle.inputTextStyleThreeView}>
              <TextInput
                style={suminfoStyle.inputTextStyleThree}
                label="POSTAL CODE"
                underlineColor={'#000000'}
                value={this.state.postl}
                onChangeText={text => this.setState({postl: text})}></TextInput>
            </View>
          </View>
          <View style={suminfoStyle.main_text_view}>
            <View style={suminfoStyle.main_text_views}>
              <TextInput
                style={suminfoStyle.inputTextStyleTwo}
                label="DRIVERS LICENSE NUMBER"
                underlineColor={'#000000'}
                value={this.state.lisenceNumber}
                onChangeText={text =>
                  this.setState({lisenceNumber: text})
                }></TextInput>
            </View>
            <View style={suminfoStyle.main_text_views}>
              <TextInput
                style={suminfoStyle.inputTextStyleTwo}
                label="JURIS"
                value="ON"
                underlineColor={'#000000'}
                value={this.state.juris}
                onChangeText={text => this.setState({juris: text})}></TextInput>
            </View>
          </View>
          <View style={suminfoStyle.main_text_view}>
            <View style={suminfoStyle.main_text_views}>
              <TextInput
                style={suminfoStyle.inputTextStyleTwos}
                label="CLASS"
                underlineColor={'#000000'}
                value={this.state.lisenceNumber}
                onChangeText={text =>
                  this.setState({lisenceNumber: text})
                }></TextInput>
            </View>
            <View style={suminfoStyle.main_text_views}>
              <TextInput
                style={suminfoStyle.inputTextStyleTwos}
                label="CONDITION"
                underlineColor={'#000000'}
                value={this.state.juris}
                onChangeText={text => this.setState({juris: text})}></TextInput>
            </View>
          </View>
          <View style={suminfoStyle.main_text_view}>
            <View style={suminfoStyle.birthView}>
              <TextInput
                style={suminfoStyle.inputTextStyleTwo}
                label="DATE OF BIRTH"
                underlineColor={'#000000'}
                editable={true}
                value={
                  bd &&
                  bd.getFullYear() +
                    '/' +
                    (bd.getMonth() + 1) +
                    '/' +
                    bd.getDate()
                }
                onFocus={() => this.setState({dobCal: true})}
                onChangeText={text => this.setState({dob: text})}></TextInput>
                <Image
                source={require('../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  left: 130,
                  top:25
                }}
              />
            </View>

            <View style={suminfoStyle.gend_view}>
              <Text style={suminfoStyle.sex_txt}>SEX*</Text>

              <View style={suminfoStyle.sec_gend_view}>
                <RadioButton.Group
                  onValueChange={value => this.setState({gender: value})}
                  value={this.state.gender}>
                  <View style={{flexDirection: 'row'}}>
                    <RadioButton value="M" color="#11246F"></RadioButton>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#11246F',
                        fontSize: 12,
                      }}>
                      M
                    </Text>
                    <RadioButton value="F" color="#11246F"></RadioButton>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#11246F',
                        fontSize: 12,
                      }}>
                      F
                    </Text>
                    <RadioButton value="O" color="#11246F"></RadioButton>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#11246F',
                        fontSize: 12,
                      }}>
                      OTHER
                    </Text>
                  </View>
                </RadioButton.Group>
              </View>
            </View>
          </View>

          <View style={suminfoStyle.nxt_btnView}>
            <View style={suminfoStyle.nxt_btnView1}></View>
            <View style={suminfoStyle.nxt_btnView1}>
              <Button
                mode="contained"
                style={suminfoStyle.nxt_btn}
                // style={{
                //     backgroundColor: '#30D20D', alignSelf: 'flex-end', width: '30%'
                //     , marginEnd: 12, marginTop: 25, borderRadius: 10
                // }}
                onPress={() => {
                  this.next();
                }}>
                NEXT
              </Button>
            </View>
          </View>

          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.currDate}
              mode={this.state.mode}
              is24Hour={false}
              display="default"
              onChange={this.onDateTimeChange}
              maximumDate={new Date()}
            />
          )}
          {this.state.dobCal ? (
            <DateTimePicker
              testID="datePicker"
              value={this.state.bde}
              mode="date"
              display="default"
              onChange={this.dobChange}
              maximumDate={this.state.bde}
            />
          ) : null}

        </ScrollView>
        {keyboardStatus === 'Keyboard Hidden' ? (
          <View style={suminfoStyle.bottomView}>
            <DashboardFooter navigation={navigation} />
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}
