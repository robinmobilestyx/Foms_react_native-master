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
  Pressable,
  LayoutAnimation,
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
import ic_menu_my_calendar from '../assets/ic_menu_my_calendar.png';

import Global_Attributes from '../../Utility/Global_Attributes';

// import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modals';
import Autocomplete from 'react-native-autocomplete-input';
import LawsController from '../Controller/LawsController';
import Dropdownarrow from '../assets/downarrow.png';
import Viewdetails from '../assets/cloud4.png';
// import SearchIcon from '../assets/search.png';
import DropDownPicker from 'react-native-dropdown-picker';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import DashboardFooter from '../Dashboard/DashboardFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TicketsModulesApi from '../Controller/TicketsModulesApi';
import LawsSearch from '../Laws/LawsSearch';
import RfoffnStyle from '../Css/RfOffenseStyle';
// import RfoffnStyle from '../Css/RfInfoStyle';
import RfInfoStyle from '../Css/RfInfoStyle';
import SearchIcon from '../assets/search.png';
// import Item from './Item';
import Lawsearch from './Lawsearch';
import DateTimePicker from '@react-native-community/datetimepicker';

// import SearchableDropdown from 'react-native-searchable-dropdown';

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

export default class RfOffence extends Component {
  constructor(props) {
    super(props);

    this.next = this.next.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.prevLocation = this.prevLocation.bind(this);
    this.back = this.back.bind(this);

    this.state = {
      cnAddress: Global_Attributes.RfBean['cnAddress'],
      cnCTroom: Global_Attributes.RfBean['cnCTroom'],
      apAddress: Global_Attributes.RfBean['apAddress'],
      sgAddress: Global_Attributes.RfBean['sgAddress'],

      didCommit: Global_Attributes.RfBean['didCommit'],
      // contrary: Global_Attributes.RfBean['contrary'],
      sect: Global_Attributes.RfBean['sect'],

      cvor: Global_Attributes.RfBean['cvor'],
      nsc: Global_Attributes.RfBean['nsc'],

      chargesCheck: Global_Attributes.RfBean['chargesCheck'],
      pprCheck: Global_Attributes.RfBean['pprCheck'],
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
      modalVisible: false,
      atmodalVisible: false,
      nearmodalVisible: false,
      ATfocus: false,
      NEARfocus: false,
      time: '9:00 AM',
      times: '8:30 to 10:30 AM',
      valueArray: Global_Attributes.RfBean['valueArray'],
      // valueArray: [],
      disabled: false,
      // name1: "",
      // name2: ""

      off2: false,
      off3: false,
      off4: false,
      off5: false,
      off6: false,

      deletHideShow2: false,
      deletHideShow3: false,
      deletHideShow4: false,
      deletHideShow5: false,
      deletHideShow6: false,
      hideButton: true,
      // index :1,
      show: false,
      mode: null,
      currDate: new Date(),
      newDate: '',
      courtDates: '',
      locationCode:'',
      officerName:''
    };
    this.addNewEle = false;
    this.index = 1;
  }

  back = () => {
    this.props.navigation.navigate('RfInfo');
  };

  getLocation = () => {
    this.checkPermission(PERMISSION_TYPE.location).catch(error =>
      alert('your error is:' + error),
    );
    Geolocation.getCurrentPosition(
      position => {
        console.log('latitude:' + position.coords.latitude);
        console.log('longitude:' + position.coords.longitude);
        Global_Attributes.RfBean['lat'] = position.coords.latitude;
        Global_Attributes.RfBean['long'] = position.coords.longitude;
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
    this.setState({pprCheck: !this.state.pprCheck});
  }

  chargesCheckBoxChanged() {
    this.setState({chargesCheck: !this.state.chargesCheck});
  }

  setBeans = () => {
    Global_Attributes.RfBean['cnAddress'] = this.state.cnAddress;
    Global_Attributes.RfBean['cnCTroom'] = this.state.cnCTroom;
    Global_Attributes.RfBean['apAddress'] = this.state.apAddress;
    Global_Attributes.RfBean['sgAddress'] = this.state.sgAddress;
    Global_Attributes.RfBean['chargesCheck'] = this.state.chargesCheck;
    Global_Attributes.RfBean['pprCheck'] = this.state.pprCheck;

    Global_Attributes.RfBean['didCommit'] = this.state.didCommit;
    Global_Attributes.RfBean['contrary'] =
      Global_Attributes.PonLaws['parent_law'][0];
    Global_Attributes.RfBean['sect'] = this.state.sect;

    Global_Attributes.RfBean['cvor'] = this.state.cvor;
    Global_Attributes.RfBean['nsc'] = this.state.nsc;

    // this.props.navigation.navigate('PonPreview')
    // console.log("chckbox value" + Global_Attributes.RfBean['motorInvolved']);
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
    let ages = new Date().getFullYear() - selectedDate.getFullYear();
    console.log('ages', ages);
    this.setState({dobCal: Platform.OS === 'ios'});
    this.setState({dob: BdDate});
    this.setState({bd: selectedDate});
    this.setState({age: ages.toString()});
    console.log('state age', this.state.age);
  };

  async componentDidMount() {
    this.setState({
      cnAddress: await AsyncStorage.getItem('release_form_court_address'),
    });
    this.setState({
      cnCTroom: await AsyncStorage.getItem('release_form_court_number'),
    });
    this.setState({sgAddress: await AsyncStorage.getItem('address')});
    this.setState({
      apAddress: await AsyncStorage.getItem('release_form_station_address'),
    });
    this.setState({locationCode: await AsyncStorage.getItem("locationCode")})
    this.setState({officerName: await AsyncStorage.getItem('officer_name')})

    this.timing();

    // add 21 days
    var ndate = new Date();
    var x = new Date(ndate.setDate(ndate.getDate() + 21));

    var cd = x.getFullYear() + '/' + (x.getMonth() + 1) + '/' + x.getDate();
    console.log('cd21', cd);
    this.setState({newDate: cd});

    // add 14 days
    var courtdate = new Date();
    var y = new Date(courtdate.setDate(courtdate.getDate() + 14));

    var cds = y.getFullYear() + '/' + (y.getMonth() + 1) + '/' + y.getDate();
    console.log('cd14', cds);
    this.setState({courtDates: cds});

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
    if (this.state.atTwo == '') {
      fields.push('2ND Street Name');
    }
    if (this.state.plateNumber.trim() == '') {
      fields.push('Plate Number');
    }

    return fields;
  };

  next = () => {
    // console.log(this.state.name1, "hello")
    // console.log(Global_Attributes.PonOneBean['didCommit']);

    if (Global_Attributes.PonOneBean['didCommit'] == '') {
      alert('Enter Did Commit !');
    }

    // else if (this.state.sect.trim() == "") {
    //     alert("Enter Section !")
    // }
    // else
    else if (this.state.cnAddress.trim() == '') {
      alert('Enter Condition Address !');
    } else if (this.state.cnCTroom.trim() == '') {
      alert('Enter Condition Court Room No. !');
    } else if (this.state.sgAddress.trim() == '') {
      alert('Enter Signature Address !');
    } else if (
      this.state.pprCheck == true &&
      this.state.apAddress.trim() == ''
    ) {
      alert('Enter Apppear Address !');
    } else {
      this.setBeans();
      this.props.navigation.navigate('RfReview');
    }

    // else {
    //     if (this.emptyFields().length > 0) {
    //         Alert.alert("Notice", "The following field(s) are missing:\n\n" + this.emptyFields() + "\n\n Do you wish to continue?", [{ text: 'YES', onPress: () => { this.setBeans() } },
    //         {
    //             text: "No",
    //             onPress: () => console.log("Cancel Pressed"),
    //             style: "cancel"
    //         }]);
    //     }
    //     else {
    //         this.setBeans()
    //     }

    // }
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

  // afterAnimationComplete = () => {
  //     this.index += 1;
  //     this.setState({ disabled: false });
  // }

  delete2offence = () => {
    this.index--;
    this.setState({off2: false});
  };

  delete3offence = () => {
    this.index--;
    this.setState({off3: false});
    this.setState({deletHideShow2: true});
  };

  delete4offence = () => {
    this.index--;
    this.setState({off4: false});
    this.setState({deletHideShow3: true});
  };

  delete5offence = () => {
    this.index--;
    this.setState({off5: false});
    this.setState({deletHideShow4: true});
  };

  delete6offence = () => {
    this.index--;
    this.setState({off6: false});
    this.setState({deletHideShow5: true});
    this.setState({hideButton: true});
  };

  addMore = () => {
    console.log(this.state.index);
    this.index++;

    if (this.index == 2) {
      this.setState({off2: true});
      this.setState({deletHideShow2: true});
    }
    if (this.index == 3) {
      this.setState({off3: true});
      this.setState({deletHideShow2: false});
      this.setState({deletHideShow3: true});
    }
    if (this.index == 4) {
      this.setState({off4: true});
      this.setState({deletHideShow3: false});
      this.setState({deletHideShow4: true});
    }
    if (this.index == 5) {
      this.setState({off5: true});
      this.setState({deletHideShow4: false});
      this.setState({deletHideShow5: true});
    }
    if (this.index == 6) {
      this.setState({off6: true});
      this.setState({deletHideShow5: false});
      this.setState({deletHideShow6: true});
      this.setState({hideButton: false});
    }
  };

  // addMore = () => {
  // this.state.off2 = true;
  // this.state.off3 = false;
  // this.state.off4 = false;
  // this.state.off5 = false;
  // this.state.off6 = false;

  // console.log(this.index);
  // if (this.index < 6) {

  // this.addNewEle = true;

  // const newlyAddedValue = {
  //     // id: "id_" + this.index, //use fr id
  //     id: this.index, //use fr id
  //     text: this.index + 1 //use fr incrmnt
  // };
  // console.log(newlyAddedValue);

  // this.setState({
  //     disabled: true,
  //     valueArray: [...this.state.valueArray, newlyAddedValue] //add blnk arr nd newvarr in varr[]
  // });
  // Global_Attributes.RfBean['valueArray'] = this.state.valueArray;

  // }

  // console.log(this.state.valueArray);
  // console.log(this.state.valueArray.length);

  // }

  addMore2 = () => {
    this.state.off2 = true;
    this.state.off3 = true;
    this.state.off4 = false;
    this.state.off5 = false;
    this.state.off6 = false;
  };

  addMore3 = () => {
    this.state.off2 = true;
    this.state.off3 = true;
    this.state.off4 = true;
    this.state.off5 = false;
    this.state.off6 = false;
  };

  addMore4 = () => {
    this.state.off2 = true;
    this.state.off3 = true;
    this.state.off4 = true;
    this.state.off5 = true;
    this.state.off6 = false;
  };

  addMore5 = () => {
    this.state.off2 = true;
    this.state.off3 = true;
    this.state.off4 = true;
    this.state.off5 = true;
    this.state.off6 = true;
  };

  removeItem = () => {
    this.state.off6 = false;
  };
  removeItem2 = () => {
    this.state.off5 = false;
  };
  removeItem3 = () => {
    this.state.off4 = false;
  };
  removeItem4 = () => {
    this.state.off3 = false;
  };
  removeItem5 = () => {
    this.state.off2 = false;
  };

  // remove(id) {
  //     this.index--;
  //     this.addNewEle = false;
  //     const newArray = [...this.state.valueArray];

  //     newArray.splice(newArray.findIndex(ele => ele.id === id), 1);

  //     this.setState(() => {
  //         return {
  //             valueArray: newArray
  //         }
  //     },
  //         () => {
  //             LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //         });
  // }

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

    //  console.log("officer name: ", Global_Attributes.RfBean['officerName']) 


    return (
      <SafeAreaView style={RfoffnStyle.mainView}>
        <ScrollView scrollEnabled={true} style={RfoffnStyle.Scrollview}>

          <View>
            <View style={RfoffnStyle.locationView}>
              <View style={RfoffnStyle.main_view_loc}>
                <Text style={RfoffnStyle.loc_code_txt}>Location Code</Text>
                <Text style={RfoffnStyle.loc_code}>
                  {Global_Attributes.PonOneBean['locationCode']}
                </Text>
              </View>
              <View style={RfoffnStyle.sec_main_view}></View>
              <View style={RfoffnStyle.secc_main_view}>
                {/* <Text style={RfoffnStyle.offn_no}>Offence Number</Text> */}
                <Text style={RfoffnStyle.loc_code}>
                  {Global_Attributes.RfBean['formatted']}
                </Text>
              </View>
            </View>

            <View style={RfoffnStyle.offr_name_view}>
              <Text style={RfoffnStyle.offr_name}>
                Officer Name : {this.state.officerName}
              </Text>
            </View>

            <View style={RfoffnStyle.main_view_status}>
              <View style={RfoffnStyle.view_status}></View>
              <Text style={RfoffnStyle.first_status}>1</Text>
              <Text style={RfoffnStyle.sec_status}>2</Text>
              <Text style={RfoffnStyle.third_status}>3</Text>
              <Text style={RfoffnStyle.info_txt}>Info</Text>
              <Text style={RfoffnStyle.offn_txt}>Offence</Text>
              <Text style={RfoffnStyle.review_txt}>Review</Text>
            </View>

            {/* <View style={RfoffnStyle.contrView}>
                            <Text style={{ color: '#7B7B7B', fontSize: 12, flex: 0.5 }}>CONTRARY TO*</Text>
                            <View>
                                <ModalDropdown
                                    dropdownStyle={{ width: '90%', height: 50, borderRadius: 0.5, shadowColor: 'black', shadowOpacity: 100, elevation: 20, }}
                                    dropdownTextStyle={{ fontSize: 17, color: 'black' }}
                                    textStyle={{ color: "black", fontSize: 17 }}
                                    animated={true}
                                    defaultIndex={0}
                                    defaultValue={Global_Attributes.PonLaws['parent_law'][0]}
                                    options={Global_Attributes.PonLaws['parent_law']}
                                    onSelect={(id) => { this.fetchLawsTitle(Global_Attributes.PonLaws['parent_law_id'][id]) }}
                                />
                                <Image source={Dropdownarrow} style={RfoffnStyle.drpImgStyle} />
                            </View>

                </View> */}

            {/* <View style={RfoffnStyle.autocompleteView}>
                            <Autocomplete
                                autoCorrect={false}
                                containerStyle={RfoffnStyle.autocompletecontainer}
                                inputContainerStyle={RfoffnStyle.autocompleteinnercontainer}
                                placeholder="DID COMMIT*"
                                placeholderTextColor='grey'
                                onChangeText={text => this.setState({ didCommit: text, acttitlevalue: text })}
                                value={this.state.didCommit}
                                style={{ fontSize: 12 }}
                            />
                            <Image
                                source={require('../../assets/search.png')}
                                style={RfoffnStyle.searchIcon}
                            />
                        </View>
                        <View style={RfoffnStyle.autocompleteView}>
                            <Autocomplete
                                autoCorrect={false}
                                containerStyle={RfoffnStyle.autocompletecontainer}
                                inputContainerStyle={RfoffnStyle.autocompleteinnercontainer}
                                placeholder="SECT*"
                                placeholderTextColor='grey'
                                onChangeText={text => this.setState({ sect: text, actnovalue: text })}
                                value={this.state.sect}
                                style={{ fontSize: 12 }}
                            />

                            {/* <Image
                                source={require('../../assets/search.png')}
                                style={RfoffnStyle.searchIcon}
                            /> */}
            {/* </View> */}

            {/* <ScrollView
                            ref={scrollView => this.scrollView = scrollView}
                            onContentSizeChange={() => {
                                this.addNewEle && this.scrollView.scrollToEnd();
                            }}
                        >
                            <View style={{ flex: 1, padding: 4, }}>
                                {this.state.valueArray.map(ele => {
                                    return (
                                        <View style={{ paddingTop: 20 }}>
                                            <Item
                                                key={ele.id}
                                                item={ele}
                                                removeItem={(id) => this.remove(id)}
                                                afterAnimationComplete={this.afterAnimationComplete}
                                            />
                                        </View>
                                    )
                                })}

                            </View>
                        </ScrollView>

                        {this.index < 6 ?
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', top: "8%", }}>
                                <Button mode='contained' style={{ width: "40%", backgroundColor: '#CF1043', borderRadius: 10 }}
                                    onPress={this.addMore}
                                >+ ADD OFFENCE</Button>
                            </View> :
                            <View></View>
                        } */}
            <View style={{}}>
              <Text
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  color: 'red',
                  fontWeight: 'bold',
                  fontSize: 17,
                }}></Text>
              <View style={styles.contrView}>
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
                  <Image source={Dropdownarrow} style={styles.drpImgStyle} />
                </View>
              </View>
              <View style={{top: '-4%'}}>
                <Lawsearch
                  PonOffence={true}
                  navigation={this.props.navigation}
                />
              </View>
            </View>

            {this.state.off2 ? (
              <View style={{top: '1%'}}>
                <Text
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}>
                  OFFENCE 2
                </Text>
                <View style={styles.contrView}>
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
                    <Image source={Dropdownarrow} style={styles.drpImgStyle} />
                  </View>
                </View>
                <View style={{top: '-4%'}}>
                  <Lawsearch
                    PonOffence={true}
                    navigation={this.props.navigation}
                  />
                </View>

                {this.state.deletHideShow2 ? (
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={this.delete2offence}>
                    {/* <Image
                      source={require('../assets/cancelimg.png')}
                      style={styles.btnImage}
                    /> */}
                  </TouchableOpacity>
                ) : null}
                {/* {this.state.off3 ?
                        null : <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', top: "2%", }}>
                            <Button mode='contained' style={{ width: "40%", backgroundColor: '#CF1043', borderRadius: 10 }}
                              onPress={this.addMore2}>+ ADD OFFENCE
                            </Button>
                       </View>
                 } */}
              </View>
            ) : null}

            {this.state.off3 ? (
              <View style={{top: '2%'}}>
                <Text
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}>
                  OFFENCE 3
                </Text>
                <View style={styles.contrView}>
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
                    <Image source={Dropdownarrow} style={styles.drpImgStyle} />
                  </View>
                </View>
                <View style={{top: '-4%'}}>
                  <Lawsearch
                    PonOffence={true}
                    navigation={this.props.navigation}
                  />
                </View>

                {this.state.deletHideShow3 ? (
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={this.delete3offence}>
                    {/* <Image
                      source={require('../assets/cancelimg.png')}
                      style={styles.btnImage}
                    /> */}
                  </TouchableOpacity>
                ) : null}

                {/* {this.state.off4 ?
                        null : <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', top: "2%", }}>
                         <Button mode='contained' style={{ width: "40%", backgroundColor: '#CF1043', borderRadius: 10 }}
                          onPress={this.addMore3}>+ ADD OFFENCE
                         </Button>
                       </View>
                } */}
              </View>
            ) : null}
            {this.state.off4 ? (
              <View style={{top: '3%'}}>
                <Text
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}>
                  OFFENCE 4
                </Text>
                <View style={styles.contrView}>
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
                    <Image source={Dropdownarrow} style={styles.drpImgStyle} />
                  </View>
                </View>
                <View style={{top: '-4%'}}>
                  <Lawsearch
                    PonOffence={true}
                    navigation={this.props.navigation}
                  />
                </View>

                {this.state.deletHideShow4 ? (
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={this.delete4offence}>
                    {/* <Image
                      source={require('../assets/cancelimg.png')}
                      style={styles.btnImage}
                    /> */}
                  </TouchableOpacity>
                ) : null}

                {/* {this.state.off5 ?
                                    null :
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', top: "2%", }}>
                                        <Button mode='contained' style={{ width: "40%", backgroundColor: '#CF1043', borderRadius: 10 }}
                                            onPress={this.addMore4}>+ ADD OFFENCE
                                        </Button>
                                    </View>
                                } */}
              </View>
            ) : null}

            {this.state.off5 ? (
              <View style={{top: '4%'}}>
                <Text
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}>
                  OFFENCE 5
                </Text>
                <View style={styles.contrView}>
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
                    <Image source={Dropdownarrow} style={styles.drpImgStyle} />
                  </View>
                </View>
                <View style={{top: '-4%'}}>
                  <Lawsearch
                    PonOffence={true}
                    navigation={this.props.navigation}
                  />
                </View>

                {this.state.deletHideShow5 ? (
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={this.delete5offence}>
                    {/* <Image
                      source={require('../assets/cancelimg.png')}
                      style={styles.btnImage}
                    /> */}
                  </TouchableOpacity>
                ) : null}
                {/* {this.state.off6 ?
                                    null :
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', top: "2%", }}>
                                        <Button mode='contained' style={{ width: "40%", backgroundColor: '#CF1043', borderRadius: 10 }}
                                            onPress={this.addMore5}>+ ADD OFFENCE
                                        </Button>
                                    </View>
                  } */}
              </View>
            ) : null}
            {this.state.off6 ? (
              <View style={{top: '5%'}}>
                <Text
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}>
                  OFFENCE 6
                </Text>
                <View style={styles.contrView}>
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
                    <Image source={Dropdownarrow} style={styles.drpImgStyle} />
                  </View>
                </View>
                <View style={{top: '-4%'}}>
                  <Lawsearch
                    PonOffence={true}
                    navigation={this.props.navigation}
                  />
                </View>

                {this.state.deletHideShow6 ? (
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={this.delete6offence}>
                    {/* <Image
                      source={require('../assets/cancelimg.png')}
                      style={styles.btnImage}
                    /> */}
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}

            {this.state.hideButton == true && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  top: '22%',
                }}>
                <Button
                  mode="contained"
                  style={{
                    width: '50%',
                    backgroundColor: '#CF1043',
                    borderRadius: 10,
                  }}
                  onPress={this.addMore}>
                  + ADD OFFENCE
                </Button>
              </View>
            )}

            <View style={RfoffnStyle.tnCView}>
              <View style={{marginTop: '-15%'}}>
                <CheckBox
                  // style={{ marginTop: '-20%' }}
                  // textRight={'BY CHECKING THIS BOX, I ACKNOWLEDGE THAT I HAVE REVIEWED ALL THE INFORMATION CONTAINED WITHIN THIS DOCUMENT AND CONFIRM IT TO BE ACCURATE.'}

                  checked={this.state.chargesCheck}
                  onValueChange={() => this.chargesCheckBoxChanged()}
                  checkedBackgroundColor={'#11246F'}
                  checkedBorderColor={'#11246F'}
                  borderWidth={2}
                  checkMarkColor={'white'}
                  unCheckedBorderColor={'#11246F'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}
                  label={
                    'No new charges are being laid against you at this time but you are required to appear at a judicial referral hearing under section 523.1 for a failure under section 496.'
                  }
                  labelStyle={{
                    color: 'darkblue',
                    fontWeight: 'bold',
                    marginTop: '13%',
                    marginLeft: '-2%',
                  }}></CheckBox>
              </View>
              <Text style={RfoffnStyle.tncText}>
                No new charges are being laid against you at this time but you
                are required to appear at a judicial referral hearing under
                section 523.1 for a failure under section 496.
              </Text>
            </View>

            <View>
              <Text style={{marginLeft: '3%', color: 'grey'}}>CONDITIONS</Text>
            </View>

            <View style={RfoffnStyle.inputTextcodeView}>
              <TextInput
                style={RfoffnStyle.inputTextStyle}
                label="ADDRESS"
                underlineColor={'#000000'}
                value={this.state.cnAddress}
                multiline={true}
                numberOfLines={2}
                onChangeText={text =>
                  this.setState({cnAddress: text})
                }></TextInput>
            </View>
            <View style={RfoffnStyle.inputTextcodeView}>
              <TextInput
                style={RfoffnStyle.inputTextStyle}
                underlineColor={'#000000'}
                // value={this.state.cnAddress}
                multiline={true}
                numberOfLines={2}
                onChangeText={text =>
                  this.setState({cnAddress: text})
                }></TextInput>
            </View>
            <View style={RfoffnStyle.main_text_view}>
              <View style={RfoffnStyle.main_text_views}>
                <TextInput
                  style={RfoffnStyle.inputTextStyleTwo}
                  label="DATE"
                  underlineColor={'#000000'}
                  value={this.state.newDate}
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
                    left: 120,
                    bottom: 3,
                  }}
                />
              </View>
              <View style={RfoffnStyle.main_text_views}>
                <TextInput
                  style={RfoffnStyle.inputTextStyleTwo}
                  label="TIME"
                  underlineColor={'#000000'}
                  value={this.state.time}
                  onFocus={this.showTimepicker}
                  onChangeText={text => {
                    this.setState({time: text});
                  }}
                  // value={cTime}
                  keyboardType="numeric"></TextInput>
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
            <View style={RfoffnStyle.inputTextcodeView}>
              <TextInput
                style={RfoffnStyle.inputTextStyle}
                label="CT. ROOM*"
                underlineColor={'#000000'}
                value={this.state.cnCTroom}
                multiline={true}
                numberOfLines={2}
                keyboardType="numeric"
                onChangeText={text =>
                  this.setState({cnCTroom: text})
                }></TextInput>
            </View>

            <View>
              <Text style={{margin: '2%', marginLeft: '3%', color: 'grey'}}>
                IDENTIFICATION OF CRIMINALS ACT
              </Text>
            </View>
            {/* <View style={RfoffnStyle.tnCView2}> */}
            <View style={{marginLeft: '1%'}}>
              <CheckBox
                // style={{ marginTop: '5%' }}
                // textRight={'BY CHECKING THIS BOX, I ACKNOWLEDGE THAT I HAVE REVIEWED ALL THE INFORMATION CONTAINED WITHIN THIS DOCUMENT AND CONFIRM IT TO BE ACCURATE.'}
                checked={this.state.pprCheck}
                onValueChange={() => this.checkBoxChanged()}
                checkedBackgroundColor={'#11246F'}
                checkedBorderColor={'#11246F'}
                borderWidth={2}
                checkMarkColor={'white'}
                unCheckedBorderColor={'#11246F'}
                checkMarkSize={18}
                animationType={'left'}
                size={18}
                rippleEffect={false}
                label={'PHOTOS AND PRINTS REQUIRED'}
                labelStyle={{
                  color: 'darkblue',
                  fontWeight: 'bold',
                  marginTop: '0%',
                  marginLeft: '-3%',
                }}></CheckBox>
            </View>

            {/* <Text style={RfoffnStyle.tncText2}>
                  PHOTOS AND PRINTS REQUIRED
                </Text> 
            */}
            {/* </View> */}

            {this.state.pprCheck ? (
              <View style={RfoffnStyle.main_text_view}>
                <View style={RfoffnStyle.main_text_views}>
                  <TextInput
                    style={RfoffnStyle.inputTextStyleTwo}
                    label="DATE"
                    underlineColor={'#000000'}
                    value={this.state.courtDates}
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
                      left: 120,
                      bottom: 3,
                    }}
                  />
                </View>
                <View style={RfoffnStyle.main_text_views}>
                  <TextInput
                    style={RfoffnStyle.inputTextStyleTwo}
                    label="TIME"
                    value={this.state.times}
                    underlineColor={'#000000'}
                    onFocus={this.showTimepicker}
                    onChangeText={text => {
                      this.setState({time: text});
                    }}
                    // value={cTime}
                  ></TextInput>
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
            ) : null}
            
            {this.state.pprCheck ? (
              <View>
                <View style={RfoffnStyle.inputTextcodeView}>
                  <TextInput
                    style={RfoffnStyle.inputTextStyle}
                    label="AT*"
                    underlineColor={'#000000'}
                    value={this.state.apAddress}
                    onChangeText={text => {
                      this.setState({apAddress: text});
                    }}></TextInput>
                </View>
                <View style={RfoffnStyle.inputTextcodeView}>
                  <TextInput
                    style={RfoffnStyle.inputTextStyle}
                    underlineColor={'#000000'}
                    // value={this.state.apAddress}
                    onChangeText={text => {
                      this.setState({apAddress: text});
                    }}></TextInput>
                </View>
              </View>
            ) : null}

            <View style={RfoffnStyle.inputTextcodeView}>
              <TextInput
                style={RfoffnStyle.inputTextStyle}
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
                  left: 285,
                  bottom: -4,
                }}
              />
            </View>

            <View style={RfoffnStyle.inputTextcodeView}>
              <TextInput
                style={RfoffnStyle.inputTextStyle}
                label="ADDRESS"
                underlineColor={'#000000'}
                value={this.state.sgAddress}
                multiline={true}
                numberOfLines={2}
                onChangeText={text =>
                  this.setState({sgAddress: text})
                }></TextInput>
            </View>

            {/* {this.state.cvor || this.state.nsc ?
                            <View style={RfoffnStyle.inputTextcodeView}>
                                <TextInput style={RfoffnStyle.inputTextStyle}
                                    value={this.state.covrNumer}
                                    onChangeText={(text) => { this.setState({ covrNumer: text }) }}
                                    label='CVOR/NSC Number*' underlineColor={'#000000'}></TextInput>
                </View> : null} 
            */}

            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                margin: '4%',
                marginTop: '5%',
              }}>
              <Button
                mode="contained"
                style={RfoffnStyle.backBtn}
                onPress={() => {
                  this.back();
                }}>
                BACK
              </Button>

              <Button
                mode="contained"
                style={RfoffnStyle.nxtBtn}
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
          <View style={RfoffnStyle.bottomView}>
            <DashboardFooter navigation={navigation} />
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  container: {
    flex: 1,
  },
  addBtn: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
  },
  btnImage: {
    resizeMode: 'contain',
    width: '100%',
  },

  displayText: {
    color: 'white',
    fontSize: 25,
    paddingRight: 17,
  },
  removeBtn: {
    position: 'absolute',
    right: 13,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white'
  },
  btnImage: {
    resizeMode: 'contain',
    width: '80%',
    height: 50,
    // backgroundColor:'lightblue'
  },
  inputsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginLeft: '3%',
    marginRight: '3%',
  },
  inputTextcodeView: {
    flex: 1,
    flexDirection: 'row',
    margin: '3%',
    marginTop: '2%',
  },
  inputTextStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    fontSize: 12,
    height: 45,
  },
  contrView: {
    flexDirection: 'column',
    height: 55,
    marginTop: '2%',
    marginLeft: '4%',
  },

  drpImgStyle: {
    width: '3%',
    height: 15,
    position: 'absolute',
    right: '10%',
    bottom: '80%',
  },

  searchIcon: {
    width: '6%',
    height: '10%',
    tintColor: 'grey',
    position: 'absolute',
    right: '2%',
    marginTop: '5%',
  },
});
