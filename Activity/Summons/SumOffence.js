import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  LogBox,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-checkbox-animated';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import checkIn from '../assets/checkin.png';
import prevsLocation from '../assets/prs_location.png';
import Global_Attributes from '../../Utility/Global_Attributes';
// import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modals';
import Autocomplete from 'react-native-autocomplete-input';
import LawsController from '../Controller/LawsController';
import Dropdownarrow from '../assets/downarrow.png';
import Viewdetails from '../assets/cloud4.png';
import SearchIcon from '../assets/search.png';
// import Picker from 'react-native-dropdown-picker';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import DashboardFooter from '../Dashboard/DashboardFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TicketsModulesApi from '../Controller/TicketsModulesApi';
import LawsSearch from '../Laws/LawsSearch';
// import SearchableDropdown from 'react-native-searchable-dropdown';
import sumoffnStyle from '../Css/sumOffnStyle';
import {Picker} from '@react-native-picker/picker';
import FlatListPicker from 'react-native-flatlist-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const PLATEFORM_LOCATION_PERMISSION = {
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};
const REQUEST_PERMISSION_TYPE = {
  location: PLATEFORM_LOCATION_PERMISSION,
};

const PERMISSION_TYPE = {
  location: 'location',
};

let dataPicker = [];

for (let value = 5; value < 50; value++) {
  dataPicker.push({value});
  if (value == 49) {
    dataPicker.push({value: '50 or more'});
  }
}

console.log(dataPicker);

// const dataPicker = [{value:5},{value:6},{value:7},{value:8},{value:9},{value:10},
//                     {value:11},{value:12},{value:13},{value:14},{value:15},{value:16}]

export default class SumOffence extends Component {
  constructor(props) {
    super(props);

    this.next = this.next.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.prevLocation = this.prevLocation.bind(this);
    this.back = this.back.bind(this);

    this.state = {
      d: Global_Attributes.Summon3Bean['d'],
      r: Global_Attributes.Summon3Bean['r'],
      p: Global_Attributes.Summon3Bean['p'],
      pi: Global_Attributes.Summon3Bean['pi'],
      pd: Global_Attributes.Summon3Bean['pd'],
      witness: Global_Attributes.Summon3Bean['witness'],
      atOne: Global_Attributes.Summon3Bean['atOne'],
      atTwo: Global_Attributes.Summon3Bean['atTwo'],
      location: Global_Attributes.Summon3Bean['location'],
      // didCommit : Global_Attributes.Summon3Bean['didCommit'],
      contrary: Global_Attributes.Summon3Bean['contrary'],
      speeding: Global_Attributes.Summon3Bean['speeding'],
      km_over: Global_Attributes.Summon3Bean['km_over'],
      speedLimit: Global_Attributes.Summon3Bean['speedLimit'],
      actualSpeed: Global_Attributes.Summon3Bean['actualSpeed'],
      section: Global_Attributes.Summon3Bean['section'],
      plateNumber: Global_Attributes.Summon3Bean['plateNumber'],
      juris: Global_Attributes.Summon3Bean['juris'],
      code: Global_Attributes.Summon3Bean['code'],
      cvor: Global_Attributes.Summon3Bean['cvor'],
      nsc: Global_Attributes.Summon3Bean['nsc'],
      commercial: Global_Attributes.Summon3Bean['commercial'],
      courtDate: Global_Attributes.Summon3Bean['courtDate'],
      courtTime: Global_Attributes.Summon3Bean['courtTime'],
      ctRoom: Global_Attributes.Summon3Bean['ctRoom'],
      atThree: Global_Attributes.Summon3Bean['atThree'],
      issuedDate: Global_Attributes.Summon3Bean['issuedDate'],
      check: Global_Attributes.Summon3Bean['check'],
      covrNumer: Global_Attributes.Summon3Bean['covrNumer'],

      concent: false,
      acttitlevalue: '',
      actnovalue: '',
      ApiUrl: 'https://mdei.info/police_app_v1/api/laws/law',
      check: '',
      keyboardStatus: 'Keyboard Hidden',
      // query: "",
      // query1:"",
      act_title: '',
      setFine: '',
      totalPayable: '',
      AT: '',
      NEAR: '',
      attextinputvalue: '',
      neartextinputvalue: '',
      open: false,
      value: null,
      items: null,
      atmodalVisible: false,
      nearmodalVisible: false,
      ATfocus: false,
      NEARfocus: false,
      // kms:[],
      kms: [{value: 0, key: 1}],
      currDate: new Date(),
      show: false,
      mode: null,
      bde: new Date(new Date().setFullYear(new Date().getFullYear() - 16)),
      date: '',
      time: '9:00 AM',
      dobCal: false,
      dob: '',
      bd: null,
      courtDate: '',
    };
  }

  back = () => {
    this.props.navigation.navigate('SumInfo');
  };

  getLocation = () => {
    this.checkPermission(PERMISSION_TYPE.location).catch(error =>
      alert('your error is:' + error),
    );
    Geolocation.getCurrentPosition(
      position => {
        console.log('latitude:' + position.coords.latitude);
        console.log('longitude:' + position.coords.longitude);
        Global_Attributes.PonOneBean['lat'] = position.coords.latitude;
        Global_Attributes.PonOneBean['long'] = position.coords.longitude;
        this.setState({lat: position.coords.latitude});
        this.setState({lon: position.coords.longitude});

        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        Geocoder.geocodePosition(pos)
          .then(res => {
            console.log(res[0]);
            const pinCode = res[0].pincode;
            Global_Attributes.gpsAddress['gpsPincode'] = pinCode;
            let loc = res[0].locality;
            Global_Attributes.gpsAddress['gpsCity'] = loc;
            if (loc != null) {
              console.log('city:' + loc.toUpperCase());
              this.setState({atThree: loc.toUpperCase()});
            }

            let Streen_name = res[0].streetName;
            if (Streen_name != null) {
              console.log('street name:' + Streen_name.toUpperCase());
              this.setState({attextinputvalue: Streen_name.toUpperCase()});
            }

            let state = res[0].adminArea;
            this.setState({states: state});
            console.log('State:' + state);
            Global_Attributes.gpsAddress['gpsState'] = state;

            let subA = res[0].subAdminArea;
            this.setState({district: res[0].subAdminArea});
            console.log('district:' + subA);
            Global_Attributes.gpsAddress['gpsDistrict'] = subA;
          })
          .catch(error => console.log('your error is:' + error));
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
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

  checkPermission = async type => {
    const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    console.log(permission);
    if (!permission) {
      return true;
    }
    try {
      const result = await check(permission);
      console.log('permission check ', result);
      if (result === RESULTS.GRANTED) {
        // Geolocation.setRNConfiguration(config);
        // Geolocation.getCurrentPosition(info => console.log("geolocation:"+info['country']));
        return true;
      }

      return this.requestPermission(permission);
    } catch (error) {
      console.log(error);
    }
  };

  requestPermission = async permission => {
    try {
      const result = await request(permission);
      console.log('permission request', result);
      Geolocation.getCurrentPosition(info =>
        console.log('geolocation:' + info),
      );
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('App permission result fail ' + error);
      return false;
    }
  };

  // componentDidMount(){
  //     this.checkPermission(PERMISSION_TYPE.location)
  //     }

  checkBoxChanged() {
    this.setState({check: !this.state.check});
  }

  sppeedigCheckBoxChanged() {
    this.setState({speeding: !this.state.speeding});
  }

  CBd() {
    this.setState({d: !this.state.d});
  }

  CBr() {
    this.setState({r: !this.state.r});
  }
  CBp() {
    this.setState({p: !this.state.p});
  }

  CBpi() {
    this.setState({pi: !this.state.pi});
  }

  CBpd() {
    this.setState({pd: !this.state.pd});
  }

  CBwitness() {
    this.setState({witness: !this.state.witness});
  }

  CvorCheckBoxChanged() {
    this.setState({cvor: !this.state.cvor});
  }

  NscCheckBoxChanged() {
    this.setState({nsc: !this.state.nsc});
  }

  commercialCheckBoxChanged() {
    this.setState({commercial: !this.state.commercial});
  }

  setBeans = () => {
    Global_Attributes.Summon3Bean['d'] = this.state.d;
    Global_Attributes.Summon3Bean['r'] = this.state.r;
    Global_Attributes.Summon3Bean['p'] = this.state.p;
    Global_Attributes.Summon3Bean['pi'] = this.state.pi;
    Global_Attributes.Summon3Bean['pd'] = this.state.pd;
    Global_Attributes.Summon3Bean['witness'] = this.state.witness;
    Global_Attributes.Summon3Bean['atOne'] = this.state.atOne;
    Global_Attributes.Summon3Bean['atTwo'] = this.state.atTwo;
    Global_Attributes.Summon3Bean['location'] = this.state.location;
    Global_Attributes.Summon3Bean['contrary'] = this.state.contrary;
    // Global_Attributes.Summon3Bean['contrary']=Global_Attributes.PonLaws['parent_law'][0];
    Global_Attributes.Summon3Bean['speeding'] = this.state.speeding;
    Global_Attributes.Summon3Bean['km_over'] = this.state.km_over;
    Global_Attributes.Summon3Bean['speedLimit'] = this.state.speedLimit;
    Global_Attributes.Summon3Bean['actualSpeed'] = this.state.actualSpeed;
    Global_Attributes.Summon3Bean['section'] = this.state.section;
    Global_Attributes.Summon3Bean['plateNumber'] = this.state.plateNumber;
    Global_Attributes.Summon3Bean['juris'] = this.state.juris;
    Global_Attributes.Summon3Bean['code'] = this.state.code;
    Global_Attributes.Summon3Bean['cvor'] = this.state.cvor;
    Global_Attributes.Summon3Bean['nsc'] = this.state.nsc;
    Global_Attributes.Summon3Bean['commercial'] = this.state.commercial;
    Global_Attributes.Summon3Bean['courtDate'] = this.state.courtDate;
    Global_Attributes.Summon3Bean['courtTime'] = this.state.courtTime;
    Global_Attributes.Summon3Bean['ctRoom'] = this.state.ctRoom;
    Global_Attributes.Summon3Bean['atThree'] = this.state.atThree;
    Global_Attributes.Summon3Bean['covrNumer'] = this.state.covrNumer;
    Global_Attributes.Summon3Bean['issuedDate'] = this.state.issuedDate;
    Global_Attributes.Summon3Bean['check'] = this.state.check;
    this.props.navigation.navigate('SumReview');
    console.log(
      'chckbox value' + Global_Attributes.Summon3Bean['motorInvolved'],
    );
  };

  async componentDidMount() {
    this.setState({ctRoom: await AsyncStorage.getItem('court_number')});
    this.setState({
      AT: await AsyncStorage.getItem('release_form_court_address'),
    });
    this.setState({
      courtDate: await AsyncStorage.getItem('summon3_court_dates'),
    });

    this.timing();
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
        this.setState({nearmodalVisible: false, atmodalVisible: false});
        // this._keyboardDidHide
      },
    );
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['Encountered two children with the same key']);
    this.fetchLawsTitle(Global_Attributes.PonLaws['parent_law_id'][0]);
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',this._keyboardDidHide);
  }
  _keyboardDidHide = () => {
    this.setState({nearmodalVisible: false, atmodalVisible: false});
  };
  componentWillUnmount() {
    this.keyboardDidShowSubscription.remove();
    this.keyboardDidHideSubscription.remove();
    Global_Attributes.PonOffencePayable = '';
    Global_Attributes.PonffenceFine = '';
  }
  fetchLawsTitle = id => {
    // console.log(id)
    var user = Global_Attributes.User;
    var pass = Global_Attributes.Pass;

    let All_acts = {
      user: user,
      pass: pass,
      id: id,
    };
    new LawsController().getAllActs(
      All_acts,
      this.props,
      'PonOffence',
      Global_Attributes.laws,
    );
  };

  searchActs = (query, bool) => {
    if (bool) {
      if (query === '') {
        return [];
      } else {
        var acttitle = [];
        const Length = Global_Attributes.PonLaws['act_length'];
        for (let i = 0; i < Length; i++) {
          acttitle[i] = Global_Attributes.PonLaws['act_title'][i];
        }
        const regex = new RegExp(`${query}`, 'i');
        const act_title = acttitle.filter(data => data.search(regex) >= 0);
        return act_title;
      }
    } else {
      if (query === '') {
        return [];
      } else {
        var actno = [];
        let actArray = [];
        const Length = Global_Attributes.PonLaws['act_length'];
        for (let i = 0; i < Length; i++) {
          actno[i] = Global_Attributes.PonLaws['act_no'][i];
        }
        const regex = new RegExp(`${query}`, 'i');
        const act_no = actno.filter(data => data.search(regex) >= 0);
        act_no.forEach(index => {
          var i = Global_Attributes.PonLaws['act_no'].indexOf(index);
          actArray.push(
            Global_Attributes.PonLaws['act_no'][i] +
              ' : ' +
              Global_Attributes.PonLaws['act_title'][i],
          );
        });
        return actArray;
      }
    }
  };

  setAct = item => {
    var index = Global_Attributes.PonLaws['act_title'].indexOf(item);
    this.setState({
      setFine: Global_Attributes.PonLaws['set_fine'][index],
      totalPayable: Global_Attributes.PonLaws['total_payable'][index],
    });
    return Global_Attributes.PonLaws['act_no'][index];
  };

  setActNo = item => {
    var sec_reg = item.match(/.*(?=\s:)/);
    var index = Global_Attributes.PonLaws['act_no'].indexOf(sec_reg[0]);
    this.setState({
      setFine: Global_Attributes.PonLaws['set_fine'][index],
      totalPayable: Global_Attributes.PonLaws['total_payable'][index],
    });
    return Global_Attributes.PonLaws['act_title'][index];
  };

  lawDescription = item => {
    var sec_reg = item.match(/.*(?=\s:)/);
    var index = Global_Attributes.PonLaws['act_no'].indexOf(sec_reg[0]);

    var actno = Global_Attributes.PonLaws['act_no'][index];
    var acttitle = Global_Attributes.PonLaws['act_title'][index];
    var setfine = Global_Attributes.PonLaws['set_fine'][index];
    var totalpayable = Global_Attributes.PonLaws['total_payable'][index];
    var description = Global_Attributes.PonLaws['act_des'][index];
    var demerits = Global_Attributes.PonLaws['demerits'][index];
    this.props.navigation.navigate('LawsDescription', {
      actno: actno,
      acttitle: acttitle,
      setfine: setfine,
      totalpayable: totalpayable,
      description: description,
      demerits: demerits,
    });
  };

  AT = searchvalue => {
    if (searchvalue) {
      var user = Global_Attributes.User;
      var pass = Global_Attributes.Pass;

      let All_acts = {
        user: user,
        pass: pass,
        search_value: searchvalue,
      };
      new LawsController().getATvalues(
        All_acts,
        this.props,
        'AT',
        Global_Attributes.nearValues,
      );
      this.setState({
        AT: Global_Attributes.PonLaws['ATNEARvalues'],
        atmodalVisible: true,
        ATfocus: true,
      });
    } else {
      this.setState({AT: '', atmodalVisible: false, ATfocus: true});
    }
  };

  NEAR = searchvalue => {
    if (searchvalue) {
      var user = Global_Attributes.User;
      var pass = Global_Attributes.Pass;

      let All_acts = {
        user: user,
        pass: pass,
        search_value: searchvalue,
      };
      new LawsController().getATvalues(
        All_acts,
        this.props,
        'AT',
        Global_Attributes.nearValues,
      );
      this.setState({
        NEAR: Global_Attributes.PonLaws['ATNEARvalues'],
        nearmodalVisible: true,
        NEARfocus: true,
      });
    } else {
      this.setState({NEAR: '', nearmodalVisible: false, NEARfocus: true});
    }
  };

  timing() {
    setInterval(() => {
      this.setState({
        fine: Global_Attributes.PonffenceFine,
        payable: Global_Attributes.PonOffencePayable,
      });
    }, 1000);
  }

  setOpen(open) {
    this.setState({
      open,
    });
  }

  setValue(callback) {
    this.setState(state => ({
      value: state,
    }));
  }

  setItems(callback) {
    this.setState(state => ({
      items: state,
    }));
  }

  emptyFields = () => {
    var fields = [];
    if (this.state.atOne == '') {
      fields.push('2ND Street Name');
    }
    if (this.state.plateNumber.trim() == '') {
      fields.push('Plate Number');
    }

    return fields;
  };

  next = () => {
    // if(this.state.location == "")
    // {
    //     alert("Enter Location!")
    // }
    // else if(Global_Attributes.Summon3Bean['didCommit'] == "")
    // {
    //     alert("Enter Did Commmit !")
    // }
    // else if(Global_Attributes.Summon3Bean['section'] == "")
    // {
    //     alert("Enter Section !")
    // }
    // else

    if (!this.state.check) {
      alert('Please Accept Terms And Conditions !');
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

  prevLocation = async () => {
    const ticketId = await AsyncStorage.getItem('insertId');
    const uname = await AsyncStorage.getItem('userName');

    console.log('ticketId: ', ticketId);

    let ticketBody = {
      // user: 'TempUser',
      // pass: 'TempUserPass@1234',
      user: Global_Attributes.User,
      pass: Global_Attributes.Pass,
      ticket_no: ticketId,
      uname: uname,
    };

    new TicketsModulesApi().api_call(
      ticketBody,
      this.props,
      'prevLocation',
      Global_Attributes.prsLocation,
    );
  };

  render() {

    const {navigation} = this.props;
    const {didCommit, sect, keyboardStatus} = this.state;
    const act_title = this.searchActs(didCommit, true);
    const act_no = this.searchActs(sect, false);

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
      <SafeAreaView style={sumoffnStyle.mainView}>
        <ScrollView scrollEnabled={true} style={sumoffnStyle.Scrollview}>
          <View>
            <View style={sumoffnStyle.locationView}>
              <View style={sumoffnStyle.main_view_loc}>
                <Text style={sumoffnStyle.loc_code_txt}>Location Code</Text>
                <Text style={sumoffnStyle.loc_code}>
                  {Global_Attributes.PonOneBean['locationCode']}
                </Text>
              </View>
              <View style={sumoffnStyle.sec_main_view}></View>
              <View style={sumoffnStyle.secc_main_view}>
                <Text style={sumoffnStyle.offn_no}>Offence Number</Text>
                <Text style={sumoffnStyle.formt_txt}>
                  {Global_Attributes.PonOneBean['formatted']}
                </Text>
              </View>
            </View>
            <Text style={sumoffnStyle.offr_name}>
              Officer Name : {Global_Attributes.PonOneBean['officerName']}
            </Text>
            <View style={sumoffnStyle.main_view_status}>
              <View style={sumoffnStyle.view_status}></View>
              <Text style={sumoffnStyle.first_status}>1</Text>
              <Text style={sumoffnStyle.sec_status}>2</Text>
              <Text style={sumoffnStyle.third_status}>3</Text>
              <Text style={sumoffnStyle.info_txt}>Info</Text>
              <Text style={sumoffnStyle.offn_txt}>Offence</Text>
              <Text style={sumoffnStyle.review_txt}>Review</Text>
            </View>

            <View style={sumoffnStyle.secCheckboxView}>
              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                <Text style={sumoffnStyle.cvorText}>D</Text>
                <View style={{marginStart: '25%', flexDirection: 'row'}}>
                  <CheckBox
                    checked={this.state.cvor}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.CvorCheckBoxChanged()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#11246F'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{color: '#11246F'}}></CheckBox>
                  <Text style={{paddingTop: '8%', color: 'darkblue'}}>YES</Text>
                </View>
              </View>

              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                <Text style={sumoffnStyle.nscText}>R</Text>
                <View style={{marginStart: '25%', flexDirection: 'row'}}>
                  <CheckBox
                    checked={this.state.nsc}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.NscCheckBoxChanged()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#11246F'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{color: '#11246F'}}></CheckBox>
                  <Text style={{paddingTop: '8%', color: 'darkblue'}}>YES</Text>
                </View>
              </View>

              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                <Text style={sumoffnStyle.commrText}>P</Text>
                <View style={{marginStart: '10%', flexDirection: 'row'}}>
                  <CheckBox
                    checked={this.state.commercial}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.commercialCheckBoxChanged()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#11246F'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{color: '#11246F'}}></CheckBox>
                  <Text style={{paddingTop: '8%', color: 'darkblue'}}>YES</Text>
                </View>
              </View>
            </View>

            <View style={sumoffnStyle.secCheckboxView}>
              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                <Text style={sumoffnStyle.cvorText}>PI</Text>
                <View style={{marginStart: '25%', flexDirection: 'row'}}>
                  <CheckBox
                    checked={this.state.pi}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.CBpi()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#11246F'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{color: '#11246F'}}></CheckBox>
                  <Text style={{paddingTop: '8%', color: 'darkblue'}}>YES</Text>
                </View>
              </View>

              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                <Text style={sumoffnStyle.nscText}>PD</Text>
                <View style={{marginStart: '25%', flexDirection: 'row'}}>
                  <CheckBox
                    checked={this.state.pd}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.CBpd()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#11246F'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{color: '#11246F'}}></CheckBox>
                  <Text style={{paddingTop: '8%', color: 'darkblue'}}>YES</Text>
                </View>
              </View>

              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                <Text style={sumoffnStyle.commrText1}>WITNESSES</Text>
                <View style={{marginStart: '10%', flexDirection: 'row'}}>
                  <CheckBox
                    checked={this.state.witness}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.CBwitness()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#11246F'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{color: '#11246F'}}></CheckBox>
                  <Text style={{paddingTop: '8%', color: 'darkblue'}}>YES</Text>
                </View>
              </View>
            </View>

            <Modal
              visible={this.state.atmodalVisible}
              onTouchOutside={() => {
                this.setState({atmodalVisible: false, ATfocus: true});
              }}
              animationDuration={0}
              onHardwareBackPress={() => {
                this.setState({
                  LawSectATfocusionfocus: true,
                  atmodalVisible: false,
                });
              }}
              onShow={() => {
                this.setState({ATfocus: true});
              }}
              onModalHide={() => {
                this.setState({ATfocus: true, atmodalVisible: false});
              }}
              overlayBackgroundColor=""
              style={{
                position: 'absolute',
                justifyContent: 'flex-end',
                bottom: hp('20&'),
                marginStart: '5%',
              }}
              hasOverlay={false}>
              <View
                style={{
                  width: '100%',
                  maxHeight: '100%',
                  borderRadius: 0.5,
                  shadowColor: 'black',
                  backgroundColor: 'white',
                  elevation: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  marginTop: 10,
                }}>
                <FlatList
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps={'handled'}
                  maxHeight={250}
                  data={this.state.AT}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          borderBottomWidth: 0.5,
                          borderColor: 'black',
                          marginRight: 15,
                          marginLeft: 15,
                          alignSelf: 'stretch',
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({attextinputvalue: item, AT: ''})
                          }>
                          <Text style={sumoffnStyle.itemText}>{item}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={item => item}
                />
              </View>
            </Modal>

            <Modal
              visible={this.state.nearmodalVisible}
              onTouchOutside={() => {
                this.setState({nearmodalVisible: false, NEARfocus: true});
              }}
              animationDuration={0}
              onHardwareBackPress={() => {
                this.setState({NEARfocus: true, nearmodalVisible: false});
              }}
              onShow={() => {
                this.setState({NEARfocus: true});
              }}
              onModalHide={() => {
                this.setState({NEARfocus: true, nearmodalVisible: false});
              }}
              overlayBackgroundColor=""
              style={{
                position: 'absolute',
                marginStart: '45%',
                justifyContent: 'flex-end',
                bottom: hp('20%'),
              }}
              hasOverlay={false}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 0.5,
                  shadowColor: 'black',
                  backgroundColor: 'white',
                  shadowOpacity: 100,
                  elevation: 10,
                }}>
                <FlatList
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps={'handled'}
                  maxHeight={250}
                  data={this.state.NEAR}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          borderBottomWidth: 0.5,
                          borderColor: 'black',
                          marginRight: 15,
                          marginLeft: 15,
                          alignSelf: 'stretch',
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({neartextinputvalue: item, NEAR: ''})
                          }>
                          <Text style={sumoffnStyle.itemText}>{item}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={item => item}
                />
              </View>
            </Modal>

            <View style={sumoffnStyle.atNearView}>
              <View style={sumoffnStyle.atNearView1}>
                <TextInput
                  value={this.state.attextinputvalue}
                  style={sumoffnStyle.inputAT}
                  onChangeText={text =>
                    this.setState({attextinputvalue: this.AT(text)})
                  }
                  label="AT*"
                  labelStyle={{fontSize: 12}}
                  underlineColor={'#000000'}
                />
              </View>
              <View style={sumoffnStyle.atNearView1}>
                <TextInput
                  value={this.state.neartextinputvalue}
                  style={sumoffnStyle.inputAT}
                  onChangeText={text =>
                    this.setState({neartextinputvalue: this.NEAR(text)})
                  }
                  label="NEAR"
                  labelStyle={{fontSize: 12}}
                  underlineColor={'#000000'}
                />
              </View>
            </View>
            <View style={sumoffnStyle.blankTextView}>
              <View style={sumoffnStyle.img1}>
                <TextInput
                  style={{
                    width: '96%',
                    backgroundColor: '#ffffff',
                    fontSize: 12,
                  }}
                  underlineColor={'#000000'}
                  value={this.state.atThree}
                  onChangeText={text => {
                    this.setState({atThree: text});
                  }}></TextInput>
              </View>
              <View style={sumoffnStyle.img2}>
                <TouchableOpacity onPress={() => this.getLocation()}>
                  <Image style={sumoffnStyle.loc_img} source={checkIn}></Image>
                </TouchableOpacity>
              </View>
              <View style={sumoffnStyle.img2}>
                <TouchableOpacity onPress={() => this.prevLocation()}>
                  <Image
                    style={sumoffnStyle.refr_img}
                    source={prevsLocation}></Image>
                </TouchableOpacity>
              </View>
            </View>

            <View style={sumoffnStyle.contrView}>
              <Text style={{color: '#7B7B7B', fontSize: 12, flex: 0.5}}>
                CONTRARY TO*
              </Text>
              <View>
                <ModalDropdown
                  dropdownStyle={{
                    width: '90%',
                    height: 50,
                    borderRadius: 0.5,
                    shadowColor: 'black',
                    shadowOpacity: 100,
                    elevation: 20,
                  }}
                  dropdownTextStyle={{fontSize: 17, color: 'black'}}
                  textStyle={{color: 'black', fontSize: 17}}
                  animated={true}
                  defaultIndex={0}
                  defaultValue={Global_Attributes.PonLaws['parent_law'][0]}
                  options={Global_Attributes.PonLaws['parent_law']}
                  onSelect={id => {
                    this.fetchLawsTitle(
                      Global_Attributes.PonLaws['parent_law_id'][id],
                    );
                  }}
                />
                <Image
                  source={Dropdownarrow}
                  style={sumoffnStyle.drpImgStyle}
                />
              </View>
            </View>

            <View style={{marginLeft: '2%'}}>
              <CheckBox
                checked={this.state.speeding}
                style={{marginStart: 30, marginTop: 10}}
                rightText={'SPEEDING'}
                //checkBoxColor='#11246F'
                onValueChange={() => this.sppeedigCheckBoxChanged()}
                unCheckedBorderColor={'#11246F'}
                checkedBackgroundColor={'#11246F'}
                checkedBorderColor={'#11246F'}
                borderWidth={2}
                checkMarkColor={'white'}
                checkMarkSize={18}
                animationType={'left'}
                size={18}
                rippleEffect={false}
                label="SPEEDING"
                labelStyle={{color: '#11246e', left: '-2%'}}></CheckBox>
            </View>

            {/* {this.state.speeding ? 
                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                        <FlatListPicker
                        // ref={ref => { this.FlatListPicker = ref }}
                        data={dataPicker}
                        containerStyle={styles.container}
                        dropdownStyle={{ width: 100 }}
                        dropdownTextStyle={{ fontSize: 12 }}
                        pickedTextStyle={{ color: 'black', fontWeight: 'bold' }}
                        // animated="slide"
                        defaultValue={5}
                        onValueChange={(value, index) => alert(`Selected ${value}`)}
                        />
                    </View>:null} */}

            {this.state.speeding ? (
              <View style={sumoffnStyle.autocompleteView}>
                <Autocomplete
                  autoCorrect={false}
                  containerStyle={sumoffnStyle.autocompletecontainer}
                  inputContainerStyle={sumoffnStyle.autocompleteinnercontainer}
                  placeholder="DID COMMIT*"
                  placeholderTextColor="grey"
                  onChangeText={text =>
                    this.setState({didCommit: text, acttitlevalue: text})
                  }
                  value={this.state.didCommit}
                  style={{fontSize: 12}}
                />
                <Image
                  source={require('../assets/search.png')}
                  style={sumoffnStyle.searchIcon}
                />
              </View>
            ) : null}

            {/* <View style={{ flexDirection: 'row', height: 70, marginStart: 12, marginEnd: 12 }}>
                            <View style={{ flexDirection: 'column', width: '35%' }}>
                                <Text style={{ alignSelf: 'center', color: '#7B7B7B' }}>KM OVER</Text>
                                <Picker style={{ flex: 1 }}
                               selectedValue = {this.state.km_over}
                               onValueChange={(itemValue, itemIndex) =>
                                this.setState({km_over : itemValue})}
                                >
                                    <Picker.Item label='5' value='5'/>
                                    <Picker.Item label='10' value='10'/>
                                </Picker>
                </View> */}

            {this.state.speeding ? (
              <View>
                <View style={sumoffnStyle.atNearView}>
                  <View style={sumoffnStyle.atNearView2}>
                    <Text style={{alignSelf: 'center', color: '#7B7B7B'}}>
                      KM OVER :
                    </Text>

                    <View
                      style={{
                        flex: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FlatListPicker
                        // ref={ref => { this.FlatListPicker = ref }}
                        data={dataPicker}
                        containerStyle={sumoffnStyle.FlatlistDrpcontainer}
                        dropdownStyle={{width: 100}}
                        dropdownTextStyle={{fontSize: 12}}
                        pickedTextStyle={{color: 'black', fontWeight: 'bold'}}
                        // animated="slide"
                        defaultValue={5}
                        onValueChange={(value, index) =>
                          alert(`Selected ${value}`)
                        }
                      />
                      <Image
                        source={Dropdownarrow}
                        style={sumoffnStyle.drpImgStyle1}
                      />
                    </View>

                    {/* 
                           <Picker 
                            selectedValue={this.state.km_over}
                            onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}>{
                            dataPicker.map( (v)=>{
                               return <Picker.Item data={v} />
                              })
                             }  */}

                    {/* selectedValue={this.state.km_over}

                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({km_over : itemValue})}
                                        
                                {/* <Picker.Item label="KM OVER" />
                                <Picker.Item label='5' value='5'/> */}
                    {/* </Picker>  */}
                    
                  </View>
                  <View style={sumoffnStyle.atNearView2}>
                    <TextInput
                      value={this.state.neartextinputvalue}
                      style={sumoffnStyle.inputAT2}
                      onChangeText={text => this.setState({})}
                      label="SPEED LIMIT"
                      labelStyle={{fontSize: 12}}
                      underlineColor={'#000000'}
                    />
                  </View>
                </View>

                <View style={sumoffnStyle.atNearView}>
                  <View style={sumoffnStyle.atNearView2}>
                    <TextInput
                      value={this.state.attextinputvalue}
                      style={sumoffnStyle.inputAT2}
                      onChangeText={text => this.setState({})}
                      label="CHARGES SPEED"
                      labelStyle={{fontSize: 12}}
                      underlineColor={'#000000'}
                    />
                  </View>
                  <View style={sumoffnStyle.atNearView2}>
                    <TextInput
                      value={this.state.neartextinputvalue}
                      style={sumoffnStyle.inputAT2}
                      onChangeText={text => this.setState({})}
                      label="ACTUAL SPEED"
                      labelStyle={{fontSize: 12}}
                      underlineColor={'#000000'}
                    />
                  </View>
                </View>
              </View>
            ) : null}
            {this.state.speeding ? (
              <View style={sumoffnStyle.autocompleteView}>
                <Autocomplete
                  autoCorrect={false}
                  containerStyle={sumoffnStyle.autocompletecontainer}
                  inputContainerStyle={sumoffnStyle.autocompleteinnercontainer}
                  placeholder="SECT*"
                  placeholderTextColor="grey"
                  onChangeText={text =>
                    this.setState({didCommit: text, acttitlevalue: text})
                  }
                  value={this.state.didCommit}
                  style={{fontSize: 12}}
                />
                <Image
                  source={require('../assets/search.png')}
                  style={sumoffnStyle.searchIcon}
                />
              </View>
            ) : null}

            {this.state.speeding ? null : (
              <LawsSearch
                PonOffence={true}
                navigation={this.props.navigation}
              />
            )}

            <View style={sumoffnStyle.inputTextView}>
              <TextInput
                style={sumoffnStyle.inputTextStyleTwo}
                label="PLATE NUMBER"
                underlineColor={'#000000'}
                value={this.state.plateNumber}
                onChangeText={text => {
                  this.setState({plateNumber: text});
                }}></TextInput>
              <TextInput
                style={sumoffnStyle.inputTextStyleTwo}
                label="JURIS"
                value="ON"
                underlineColor={'#000000'}></TextInput>
            </View>

            <View style={sumoffnStyle.inputTextcodeView}>
              <TextInput
                style={sumoffnStyle.inputTextStyle}
                value={this.state.code}
                onChangeText={text => {
                  this.setState({code: text});
                }}
                label="CODE"
                underlineColor={'#000000'}></TextInput>
            </View>

            {/* {this.state.didCommit != '' ?
                        <View  style={this.state.didCommit != '' ? sumoffnStyle.actTitleFlatlist : null}>
                        <FlatList
                               nestedScrollEnabled={true}
                               maxHeight={250}
                               data={act_title}
                               style={{flex:1,}}
                               renderItem={({item}) => {
                                   return (
                                   <View style={{flex: 1, borderBottomWidth: 0.5,borderColor: 'black', marginRight:15,marginLeft:15}}>
                                   <TouchableOpacity
                                       onPress={()=>{this.setState({acttitlevalue:item,query:'',actnovalue:this.setAct(item)})}}>
                                   <Text style={sumoffnStyle.itemText}>{item}</Text>
                                   </TouchableOpacity>
                                   </View>
                                   );
                               }}
                               keyExtractor={(item) => item}  
                            />
                            </View>
                            :
                            <View></View>
                           } */}

            {/* <View style={sumoffnStyle.autocompleteView}>
                            <Autocomplete
                                autoCorrect={false}
                                containerStyle={sumoffnStyle.autocompletecontainer}
                                inputContainerStyle={sumoffnStyle.autocompleteinnercontainer}
                                placeholder="DID COMMIT*"
                                placeholderTextColor='grey'
                                onChangeText={text => this.setState({didCommit:text,acttitlevalue:text})}
                                value={this.state.didCommit}
                                style={{fontSize:15}}
                            />
                            <Image 
                                source={require('../View/assets/search.png')}
                                style={sumoffnStyle.searchIcon}
                            /> 
                            </View>
                             
                            {this.state.sect != '' ?
                            <View  style={this.state.sect != '' ? sumoffnStyle.actTitleFlatlist : null}>
                             <FlatList
                                nestedScrollEnabled={true}
                                maxHeight={200}
                                data={act_no}
                                style={{flex:1,}}
                                renderItem={({item}) => {
                                    return (
                                        <View style={{flex: 1,borderBottomWidth: 0.5,borderColor: 'black', marginRight:15,marginLeft:15}}>
                                    <TouchableOpacity 
                                        onPress={()=>{this.setState({actnovalue:(item.match(/.*(?=\s:)/))[0],query1:'',acttitlevalue:this.setActNo(item)})}}>
                                    <Text style={sumoffnStyle.itemText}>{item}</Text>
                                    </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={()=>this.lawDescription(item)}
                                                style={{flex:1,position:'absolute',right:0,}}
                                            >
                                                <Image source={Viewdetails} style={{height:35,width:35,tintColor:'red',alignSelf:'center'}}/>
                                        </TouchableOpacity>
                                    </View>
                                    
                                    );
                                }}
                             keyExtractor={(item) => item}
                             />
                             </View>
                            :
                            null
                            }
                            */}
            {/* <View style={sumoffnStyle.autocompleteView}>
                            <Autocomplete
                                autoCorrect={false}
                                containerStyle={sumoffnStyle.autocompletecontainer}
                                inputContainerStyle={sumoffnStyle.autocompleteinnercontainer}
                                placeholder="SECT*"
                                placeholderTextColor='grey'
                                onChangeText={text => this.setState({ sect: text,actnovalue:text })}
                                value={this.state.sect}
                                style={{fontSize:15}}
                            />
                              
                            <Image 
                                source={require('../View/assets/search.png')}
                                style={sumoffnStyle.searchIcon}
                            /> 
                            </View> */}

            <View style={sumoffnStyle.secCheckboxView}>
              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                <Text style={sumoffnStyle.cvorText2}>CVOR</Text>
                <View style={{marginStart: '25%', flexDirection: 'row'}}>
                  <CheckBox
                    checked={this.state.cvor}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.CvorCheckBoxChanged()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#11246F'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{color: '#11246F'}}></CheckBox>
                  <Text style={{paddingTop: '8%', color: 'darkblue'}}>YES</Text>
                </View>
              </View>

              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                <Text style={sumoffnStyle.nscText2}>NSC</Text>
                <View style={{marginStart: '25%', flexDirection: 'row'}}>
                  <CheckBox
                    checked={this.state.nsc}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.NscCheckBoxChanged()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#11246F'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{color: '#11246F'}}></CheckBox>
                  <Text style={{paddingTop: '8%', color: 'darkblue'}}>YES</Text>
                </View>
              </View>

              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                <Text style={sumoffnStyle.commrText2}>Commercial</Text>
                <View style={{marginStart: '10%', flexDirection: 'row'}}>
                  <CheckBox
                    checked={this.state.commercial}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.commercialCheckBoxChanged()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#11246F'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{color: '#11246F'}}></CheckBox>
                  <Text style={{paddingTop: '8%', color: 'darkblue'}}>YES</Text>
                </View>
              </View>
            </View>
            {this.state.nsc || this.state.cvor ? (
              <View style={sumoffnStyle.inputTextcodeView}>
                <TextInput
                  style={sumoffnStyle.inputTextStyle}
                  value={this.state.covrNumer}
                  onChangeText={text => {
                    this.setState({covrNumer: text});
                  }}
                  label="CVOR/NSC Number*"
                  underlineColor={'#000000'}></TextInput>
              </View>
            ) : null}

            <View style={sumoffnStyle.fineBoxView}>
              {/* <View style={sumoffnStyle.insidefineBoxView}>
                      <Text style={{ color: '#7B7B7B', fontSize: 12 }}>SET FINE OF*</Text>
                      <TextInput value={this.state.fine} mode='outlined' outlineColor='#11246F' selectionColor={"#7B7B7B"} style={sumoffnStyle.boxstyle}></TextInput>
                  </View>
                  <View style={sumoffnStyle.insidefineBoxView}>
                      <Text style={{ color: '#7B7B7B', fontSize: 12 }}>Total Payable*</Text>
                      <TextInput value={this.state.payable} mode='outlined' outlineColor='#11246F' selectionColor={"#7B7B7B"} style={sumoffnStyle.boxstyle}></TextInput>
                  </View> 
              */}
              <Text
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  left: '4%',
                  color: 'grey',
                  marginBottom: 10,
                  marginTop: 10,
                }}>
                Date to appear in Ontario Court of Justice*
              </Text>
            </View>
            <View style={sumoffnStyle.atNearView}>
              <View style={sumoffnStyle.atNearView1}>
                <TextInput
                  value={this.state.courtDate}
                  style={sumoffnStyle.inputAT}
                  onChangeText={text => this.setState({currDate: text})}
                  label="DATE"
                  labelStyle={{fontSize: 12}}
                  underlineColor={'#000000'}
                  onFocus={this.showDatepicker}
                />
                <Image
                  source={require('../assets/ic_menu_my_calendar.png')}
                  style={{
                    width: 40,
                    height: 40,
                    position: 'absolute',
                    left: 115,
                    bottom: -2,
                  }}
                />
              </View>
              <View style={sumoffnStyle.atNearView1}>
                <TextInput
                  value={this.state.time}
                  style={sumoffnStyle.inputAT}
                  onChangeText={text => this.setState({})}
                  label="TIME"
                  labelStyle={{fontSize: 12}}
                  underlineColor={'#000000'}
                  onFocus={this.showTimepicker}
                />
                <Image
                  source={require('../assets/ic_menu_my_calendar.png')}
                  style={{
                    width: 40,
                    height: 40,
                    position: 'absolute',
                    left: 115,
                    bottom: -2,
                  }}
                />
              </View>
            </View>
            <View style={sumoffnStyle.inputTextcodeView}>
              <TextInput
                style={sumoffnStyle.inputTextStyle}
                value={this.state.ctRoom}
                onChangeText={text => {
                  this.setState({code: text});
                }}
                label="Ct. Room*"
                underlineColor={'#000000'}></TextInput>
            </View>
            <View style={sumoffnStyle.inputTextcodeView}>
              <TextInput
                style={sumoffnStyle.inputTextStyle}
                value={this.state.AT}
                onChangeText={text => {
                  this.setState({code: text});
                }}
                label="AT*"
                underlineColor={'#000000'}></TextInput>
            </View>
            <View style={sumoffnStyle.inputTextcodeView}>
              <TextInput
                style={sumoffnStyle.inputTextStyle}
                value={cDate}
                onChangeText={text => {
                  this.setState({code: text});
                }}
                label="ISSUED DATE"
                underlineColor={'#000000'}></TextInput>
              <Image
                source={require('../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  left: 290,
                  bottom: 6,
                }}
              />
            </View>

            <View style={sumoffnStyle.tnCView}>
              {/* <CheckBox style={{marginStart:10,flex:1}} rightText={'BY CHECKING THIS BOX, I ACKNOWLEDGE THAT I HAVE REVIEWED ALL 
                            THE INFORMATION CONTAINED WITHIN THIS DOCUMENT AND CONFIRM IT TO BE ACCURATE.'} checkBoxColor='#11246F'></CheckBox>
              */}

              <View style={{marginTop: '-22%'}}>
                <CheckBox
                  // style={{ marginTop: '5%' }}
                  textRight={
                    'BY CHECKING THIS BOX, I ACKNOWLEDGE THAT I HAVE REVIEWED ALL THE INFORMATION CONTAINED WITHIN THIS DOCUMENT AND CONFIRM IT TO BE ACCURATE.'
                  }
                  checked={this.state.concent}
                  onValueChange={() => this.checkBoxChanged()}
                  checkedBackgroundColor={'#11246F'}
                  checkedBorderColor={'#11246F'}
                  borderWidth={2}
                  checkMarkColor={'white'}
                  unCheckedBorderColor={'#11246F'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}></CheckBox>
              </View>
              <Text style={sumoffnStyle.tncText}>
                BY CHECKING THIS BOX, I ACKNOWLEDGE THAT I HAVE REVIEWED ALL THE
                INFORMATION CONTAINED WITHIN THIS DOCUMENT AND CONFIRM IT TO BE
                ACCURATE.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                margin: '4%',
                marginTop: '2%',
              }}>
              <Button
                mode="contained"
                style={sumoffnStyle.backBtn}
                onPress={() => {
                  this.back();
                }}>
                BACK
              </Button>

              <Button
                mode="contained"
                style={sumoffnStyle.nxtBtn}
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
          <View style={sumoffnStyle.bottomView}>
            <DashboardFooter navigation={navigation} />
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

// const sumoffnStyle = StyleSheet.create({
//     mainView: {
//         backgroundColor: '#DEE6E1',
//         flex: 1
//     },

//     Scrollview: {
//         alignSelf:'center',
//             // marginTop:12,
//             // width:'95%',
//             margin:'3%',
//             marginBottom:'5%',
//             flex:0.8,

//             backgroundColor:'#FFFFFF',
//     },
//     bottomView:{
//         flex: 0.1
//     }
//     ,
//     locationView: {
//         flexDirection: 'row',
//     },
//     autocompleteView:{
//         marginTop:15,
//         width:wp("90%"),
//         borderBottomWidth:1,
//         marginLeft:15,
//         marginRight:15

//     },
//     autocompletecontainer:{
//         backgroundColor: '#ffffff',
//         borderColor: '#ffffff',
//         borderWidth: 0,
//     },
//     autocompleteinnercontainer:{
//         backgroundColor: '#ffffff',
//         borderColor: '#ffffff',
//         borderBottomWidth:1,
//         maxWidth:'85%',
//     },
//     searchIcon: {
//         width: 25,
//         height: 25,
//         tintColor: 'grey',
//         position:'absolute',
//         right:25
//     },
//     itemText: {
//         fontSize: 15,
//         fontWeight:'800',
//         marginVertical:10,
//         color:'black',
//         alignSelf:'stretch',
//         marginRight:25,
//       },
//       actTitleFlatlist:{
//         maxWidth:'100%',
//         borderRadius: 0.5,
//         shadowColor: 'black',
//         shadowOpacity: 100,
//         elevation: 10,
//         paddingTop:15,
//         paddingBottom:8
//       },
// })
