import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import Global_Attributes from '../../Utility/Global_Attributes';
import DashboardFooter from './DashboardFooter';
import Myaccount_slide from './Myaccount_slide';
import Mytickets_slide from './Mytickets_slide';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import pon from '../assets/pon.png';
import releaseForm from '../assets/release_form.png';
import summon from '../assets/summons.png';
import warning from '../assets/warnings.png';
// import highway_traffic from "../assets/traffic.png";
// import liquor_licence_act from '../assets/liquor_license_act.png';
// import safe_street_act from '../assets/safe_streets_act.png';
import fireCode from '../assets/firecode.png';
import TicketController from '../Controller/TicketController';
import Carousel from 'pinar';
import Dashboardstyle from '../Css/Dashboardstyle';
import {ReportsController} from '../Controller/ReportsController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LawsController from '../Controller/LawsController';
import Loader from './Loader';
import {ScrollView} from 'react-native-gesture-handler';

export default class Dashboard extends Component {
  static router = DashboardFooter.router;

  constructor(props) {
    super(props);
    this.updateTicketBucket('update', Global_Attributes.updateApiUrl);
    this.updateTicketBucket('User_Tickets', Global_Attributes.userTickets);
    this.Profiledata();
    this.state = {
      warning_gen: '',
      tickets_used: '',
      total_tickets: '',
      currentIndex: '1',
      searchVal: '',
      officer_name: null,
      officer_number: null,
      platoon: null,
      level: null,
      isLoading: Global_Attributes.loading,
    };
  }

  backAction = () => {
    this.props.navigation.goBack();
    // RNExitApp.exitApp();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
    // this.backAction()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);

    // RNExitApp.exitApp();
  }

  Profiledata = async () => {
    try {
      const officername = await AsyncStorage.getItem('officer_name');
      //   console.log("Officer Name:"+officername);

      const officerno = await AsyncStorage.getItem('officer_no');
      //   console.log("Session Values on login:"+officerno);
      const platoon = await AsyncStorage.getItem('platoon');
      const level = await AsyncStorage.getItem('level');

      this.setState({
        officer_name: officername,
        officer_number: officerno,
        platoon: platoon,
        platoon: platoon,
        level: level,
      });
    } catch (error) {
      console.log('hey' + error);
      this.errorDialog(error);
    }
  };

  getUserTicket = userTickets => {
    //  this.setState({warning_gen: userTickets['warning_tickets_count']},
    //  {tickets_used:userTickets['total_tickets_used']},
    //  {total_tickets:userTickets['total_tickets']}
    //  )
    console.log('tickets details:' + userTickets);
  };

  updateTicketBucket = async (type, url) => {
    try {
      Global_Attributes.loading = true;
      this.setState({isLoading: true});

      const uname = await AsyncStorage.getItem('userName');

      if (uname != null) {
        let paramsBody = {
          user: Global_Attributes.User,
          pass: Global_Attributes.Pass,
          pat_user_id: uname,
        };

        const abc = await new TicketController().ticketApi(
          paramsBody,
          this.props,
          type,
          url,
        );
        abc;
        this.setState({isLoading: false});
      } else {
        alert('Failed to get data!');
      }
    } catch (error) {
      console.log(error);
      // this.errorDialog(error);
    }
  };

  LawSection = async (type, id) => {
    console.log('show data' + id);
    try {
      Global_Attributes.loading = true;
      this.setState({isLoading: true});
      var user = Global_Attributes.User;
      var pass = Global_Attributes.Pass;

      let numberVerBody = {
        user: user,
        pass: pass,
        id: id,
      };
      console.log('lawdata:', numberVerBody);
      const abc = await new LawsController().handleClick(
        numberVerBody,
        this.props,
        type,
        Global_Attributes.laws,
      );
      abc;
      this.setState({isLoading: false});
    } catch (error) {
      console.log(error);
    }
  };

  //Reports section
  reportSection = async (type, url) => {
    try {
      Global_Attributes.loading = true;
      this.setState({isLoading: true});
      const uname = await AsyncStorage.getItem('userName');
      if (uname != null) {
        let paramsBody = {
          user: Global_Attributes.User,
          pass: Global_Attributes.Pass,
          index: this.state.currentIndex,
          uname: uname,
          search_val: this.state.searchVal,
        };
        const abc = await new ReportsController().getTicketDetails(
          paramsBody,
          this.props,
          type,
          url,
        );
        abc;
        this.setState({isLoading: false});
      } else {
        alert('Failed to get data!');
      }
    } catch (error) {
      console.log(error);
      // this.errorDialog(error);
    }
  };

  FirstRoute = () => (
    <View style={Dashboardstyle.gridMainView}>
      <View style={Dashboardstyle.gridrowView}>
        {/* first row */}
        <View style={{flex: 1, height: 125}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.updateTicketBucket(
                  'PonTicket',
                  Global_Attributes.ponTicketApiUrl,
                );
              }}>
              <Image source={pon} style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>Part One</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1, height: 125}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.updateTicketBucket(
                  'Release',
                  Global_Attributes.summon3TicketApiUrl,
                );
              }}>
              <Image source={pon} style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>Release Form</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1, height: 125}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.updateTicketBucket(
                  'Summon3',
                  Global_Attributes.summon3TicketApiUrl,
                );
              }}>
              <Image source={summon} style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>Part 3 Summons</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Second Row           */}

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems1}></View>
          {/* <Text style={{color:'#ffffff',fontSize:12,top:20}}>Tickets Left</Text> */}
        </View>

        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems1}></View>
        </View>

        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems1}></View>

          {/* Third Row  */}
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems1}></View>
          <Text style={{color: '#ffffff', fontSize: 12, top: 20}}></Text>
        </View>

        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems1}></View>
        </View>

        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems1}></View>
        </View>
      </View>
    </View>
  );

  SecondRoute = () => (
    <ScrollView style={Dashboardstyle.gridMainView}>
      <View style={Dashboardstyle.gridrowView}>
        {/* first row */}
        <View style={{flex: 1, height: 125}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.LawSection('ParentLawsTitle', '1');
              }}>
              <Image source={fireCode} style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>
                Compulsory {'\n'}Automobile {'\n'}Insurance Act
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.LawSection('ParentLawsTitle', '3');
              }}>
              <Image
                source={require('../assets/location.png')}
                style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>Hignway Traffic Act</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.LawSection('ParentLawsTitle', '34');
              }}>
              <Image
                source={require('../assets/location.png')}
                style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>Liqour Licence Act</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Second Row */}
      </View>
      <View style={{flex: 1, flexDirection: 'row', height: 125}}>
        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.LawSection('ParentLawsTitle', '35');
              }}>
              <Image source={fireCode} style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>
                Trespass to {'\n'}Property Act
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.LawSection('ParentLawsTitle', '36');
              }}>
              <Image source={fireCode} style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>Cannabis Control Act</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.LawSection('ParentLawsTitle', '37');
              }}>
              <Image
                source={require('../assets/location.png')}
                style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>Safe Streets Act</Text>
            </TouchableOpacity>
          </View>

          {/* Third Row  */}
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row', height: 125}}>
        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.LawSection('ParentLawsTitle', '47');
              }}>
              <Image source={fireCode} style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>By Laws</Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: '#ffffff', fontSize: 12, top: 20}}></Text>
        </View>

        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems1}></View>
        </View>

        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems1}></View>
        </View>
      </View>
    </ScrollView>
  );

  ThirdRoute = () => (
    <View style={Dashboardstyle.gridMainView}>
      <View style={Dashboardstyle.gridrowView}>
        {/* first row */}
        <View style={{flex: 1, height: 125}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.reportSection('PonReports', Global_Attributes.ponReports);
              }}>
              <Image source={pon} style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>Part One</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, height: 125}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.reportSection('PonWarning', Global_Attributes.warning);
              }}>
              <Image source={warning} style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>Warnings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1, height: 125}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.reportSection(
                  'PonReleaseForm',
                  Global_Attributes.releaseForm,
                );
              }}>
              <Image
                source={releaseForm}
                style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>Release Form</Text>
            </TouchableOpacity>
          </View>

          {/* Second Row */}
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, height: 125}}>
          <View style={Dashboardstyle.gridItems}>
            <TouchableOpacity
              onPress={() => {
                this.reportSection('PonSummons', Global_Attributes.summon);
              }}>
              <Image source={summon} style={Dashboardstyle.gridImage}></Image>
              <Text style={Dashboardstyle.gridText}>Part 3 Summons</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1, height: 125}}>
          <View style={Dashboardstyle.gridItems1}></View>
        </View>

        <View style={{flex: 1, height: 125}}>
          <View style={Dashboardstyle.gridItems1}></View>

          {/* Third Row  */}
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems1}></View>
          <Text style={{color: '#ffffff', fontSize: 12, top: 20}}></Text>
        </View>

        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems1}></View>
        </View>

        <View style={{flex: 1}}>
          <View style={Dashboardstyle.gridItems1}></View>
        </View>
      </View>
    </View>
  );

  navState = {
    index: 0,
    routes: [
      {key: 'tickets', title: 'Tickets'},
      {key: 'laws', title: 'Laws'},
      {key: 'report', title: 'Reports'},
    ],
  };

  _handleIndexChange = index => this.setState({index});
  
  _renderLabel = ({route, focused}) => {
    if (focused) {
      return (
        <Text
          style={{
            color: 'white',
            fontSize: 17,
            borderRadius: 5,
            minWidth: '100%',
            textAlign: 'center',
            bottom: 10.5,
            padding: 3,
          }}>
          {' '}
          {route.title}{' '}
        </Text>
      );
    }
    return (
      <Text
        style={{
          color: 'grey',
          fontSize: 17,
          borderColor: '#d81a60',
          minWidth: '125%',
          textAlign: 'center',
          borderWidth: 1,
          backgroundColor: 'white',
          borderRadius: 5,
          bottom: 10.5,
          padding: 3,
        }}>
        {route.title}
      </Text>
    );
  };

  render() {
    const {navigation} = this.props;
    const {officer_name, officer_number, level, platoon} = this.state;
    const total = Global_Attributes.myticketDetails['total_tickets'];
    const used = Global_Attributes.myticketDetails['total_tickets_used'];
    const left = total - used;
    const warning = Global_Attributes.myticketDetails['warning_tickets_count'];

    return (
      <SafeAreaView style={styles.mainContainer}>
        <View
          style={{
            height: 210,
            width: '100%',
            paddingTop: 10,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 10,
          }}>
          <Carousel
            showsControls={false}
            showsDots={false}
            styles={{borderRadius: 15}}>
            <View style={styles.slide1}>
              <Mytickets_slide
                ticketused={used}
                ticketsLeft={left}
                warningGenerated={warning}
                totalTickets={total}
              />
            </View>
            <View style={styles.slide2}>
              <Myaccount_slide
                officer_name={officer_name}
                level={level}
                officer_number={officer_number}
                platoon={platoon}
              />
              {/* <Myaccount_slide/> */}
            </View>
          </Carousel>
        </View>

        <View
          style={{
            margin: 20,
            height: '50%',
            shadowOpacity: 5,
            elevation: 20,
            shadowColor: 'black',
            bottom: 5,
          }}>
          <TabView
            navigationState={this.navState}
            renderScene={SceneMap({
              tickets: this.FirstRoute,
              laws: this.SecondRoute,
              report: this.ThirdRoute,
            })}
            renderTabBar={props => (
              <TabBar
                {...props}
                renderLabel={this._renderLabel}
                indicatorStyle={{backgroundColor: '#d81a60'}}
                style={{
                  backgroundColor: '#d81a60',
                  borderRadius: 5,
                  height: 30,
                  borderWidth: 1,
                  borderColor: '#d81a60',
                }}
              />
            )}
            onIndexChange={this._handleIndexChange}
          />
        </View>

        <Loader loading={Global_Attributes.loading} />

        <DashboardFooter navigation={navigation} />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bgView: {
    position: 'relative',
  },
  bg_image: {
    height: 150,
    width: 420,
    resizeMode: 'stretch',
  },
  loginBtn2: {
    // backgroundColor: "#11246f",
    borderRadius: 10,
    borderColor: 'transparent',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    // width:200,
    bottom: 10,
  },
  slide1: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#a3c9a8"
  },
  slide2: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#84b59f"
  },
});
