import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  Image,
  View,
  LogBox,
  FlatList,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  TouchableOpacityBase,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Global_Attribues from '../../Utility/Global_Attributes';
import NetInfo from '@react-native-community/netinfo';
import Autocomplete from 'react-native-autocomplete-input';
import LawsParentTitleStyle from '../Css/LawsParentTitleStyele';
import Viewdetails from '../assets/cloud4.png';
import PropTypes from 'prop-types';
import Modal from 'react-native-modals';

class Lawsearch extends Component {

  static propTypes = {
    actlength: PropTypes.number,
    PonOffence: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    // this.apiCall = this.apiCall.bind(this);
    // var abc=[];
    // abc = this.props.route.respdata;
    // console.log('hello'+abc);
    this.state = {
      modalVisible: false,
      DidCommitmodalVisible: false,
      SECTmodalVisible: false,
      DidCommitfocus: false,
      Sectfocus: false,
      LawSectionfocus: false,
      acttitlevalue: '',
      actnovalue: '',
      check: '',
      query: '',
      query1: '',
      act_title: '',
      setFine: '',
      totalPayable: '',
      AT: '',
      NEAR: '',
      attextinputvalue: '',
      neartextinputvalue: '',
    };
  }

  componentDidMount() {

    this.checkConnection();

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['Encountered two children with the same key']);

    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );

  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide = () => {
    this.setState({
      DidCommitmodalVisible: false,
      SECTmodalVisible: false,
      modalVisible: false,
    });
  };

  checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        // this.apiCall();
      } else {
        Alert.alert('Alert', 'Please check your internet connection !', [
          {
            text: 'OK',
            onPress: () => console.log('ok button pressed!'),
          },
        ]);
      }
    });
  };

  // apiCall=()=>{

  //       var user = Global_Attribues.User;
  //       var pass = Global_Attribues.Pass;

  //        let numberVerBody = {
  //                   user: user,
  //                   pass: pass,
  //                   id:"all_acts",
  //         }
  //       new  LawsController().handleClick(numberVerBody,this.props,"LawsSearch",Global_Attribues.Laws);
  //     }

  LawSection_searchActs(query) {

    if (query === '') {
      return [];
    }
    const {actlength} = this.props;

    var acttitle = [];
    var actArray = [];

    for (let i = 0; i < actlength; i++) {
      acttitle[i] = Global_Attribues.LawSection['acttitle'][i];
    }

    const regex = new RegExp(`${query}`, 'i');

    const act = acttitle.filter(data => data.search(regex) >= 0);

    act.forEach(index => {

      var i = Global_Attribues.LawSection['acttitle'].indexOf(index);

      actArray.push(
          Global_Attribues.LawSection['actno'][i] +
          ' : ' +
          Global_Attribues.LawSection['acttitle'][i],
      );

    });

    return actArray;

  }

  LawSection_lawDescription = item => {

    var sec_reg = /:\s(.+)/.exec(item)[1];
    var index = Global_Attribues.LawSection['acttitle'].indexOf(sec_reg);

    var actno = Global_Attribues.LawSection['actno'][index];
    var acttitle = Global_Attribues.LawSection['acttitle'][index];
    var setfine = Global_Attribues.LawSection['actsetfine'][index];
    var totalpayable = Global_Attribues.LawSection['actpayble'][index];
    var description = Global_Attribues.LawSection['actdes'][index];
    var demerits = Global_Attribues.LawSection['actdemerits'][index];

    this.setState({query: '', modalVisible: false});

    this.props.navigation.navigate('LawsDescription', {
      actno: actno,
      acttitle: acttitle,
      set_fine: setfine,
      payment: totalpayable,
      description: description,
      demerit_points: demerits,
    });

  };

  PonOffence_searchActs = (query, bool) => {

    if (bool) {
      if (query === '') {
        return [];
      } else {
        var acttitle = [];
        const Length = Global_Attribues.PonLaws['act_length'];
        for (let i = 0; i < Length; i++) {
          acttitle[i] = Global_Attribues.PonLaws['act_title'][i];
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
        const Length = Global_Attribues.PonLaws['act_length'];
        // const regex = new RegExp(/[\(\)]|[\(]|[\)]|,/g);

        query = query.replace(/\(/gi, '[\\(]');
        query = query.replace(/\)/gi, '[\\)]');
        for (let i = 0; i < Length; i++) {
          actno[i] = Global_Attribues.PonLaws['act_no'][i];
        }
        const regex = `${query}`;
        const act_no = actno.filter(data => data.search(regex) >= 0);
        act_no.forEach(index => {
          var i = Global_Attribues.PonLaws['act_no'].indexOf(index);
          actArray.push(
            Global_Attribues.PonLaws['act_no'][i] +
              ' : ' +
              Global_Attribues.PonLaws['act_title'][i],
          );
        });
        return actArray;
      }
    }

  };

  setAct = item => {

    var index = Global_Attribues.PonLaws['act_title'].indexOf(item);

    this.setState({
      setFine: Global_Attribues.PonLaws['set_fine'][index],
      totalPayable: Global_Attribues.PonLaws['total_payable'][index],
    });

    Global_Attribues.PonffenceFine =
      Global_Attribues.PonLaws['set_fine'][index];
    Global_Attribues.PonOffencePayable =
      Global_Attribues.PonLaws['total_payable'][index];
    Global_Attribues.PonOneBean['sect'] =
      Global_Attribues.PonLaws['act_no'][index];
    Global_Attribues.PonOneBean['didCommit'] =
      Global_Attribues.PonLaws['act_title'][index];

    return Global_Attribues.PonLaws['act_no'][index];

  };

  setActNo = item => {

    var sec_reg = item.match(/.*(?=\s:)/);
    var index = Global_Attribues.PonLaws['act_no'].indexOf(sec_reg[0]);

    this.setState({
      setFine: Global_Attribues.PonLaws['set_fine'][index],
      totalPayable: Global_Attribues.PonLaws['total_payable'][index],
    });

    Global_Attribues.PonffenceFine =
      Global_Attribues.PonLaws['set_fine'][index];
    Global_Attribues.PonOffencePayable =
      Global_Attribues.PonLaws['total_payable'][index];
    Global_Attribues.PonOneBean['sect'] =
      Global_Attribues.PonLaws['act_no'][index];
    Global_Attribues.PonOneBean['didCommit'] =
      Global_Attribues.PonLaws['act_title'][index];

    return Global_Attribues.PonLaws['act_title'][index];

  };

  PonOffence_lawDescription = item => {

    var sec_reg = item.match(/.*(?=\s:)/);
    var index = Global_Attribues.PonLaws['act_no'].indexOf(sec_reg[0]);

    var actno = Global_Attribues.PonLaws['act_no'][index];
    var acttitle = Global_Attribues.PonLaws['act_title'][index];
    var setfine = Global_Attribues.PonLaws['set_fine'][index];
    var totalpayable = Global_Attribues.PonLaws['total_payable'][index];
    var description = Global_Attribues.PonLaws['act_des'][index];
    var demerits = Global_Attribues.PonLaws['demerits'][index];

    this.setState({SECTmodalVisible: false});

    this.props.navigation.navigate('LawsDescription', {
      actno: actno,
      acttitle: acttitle,
      set_fine: setfine,
      payment: totalpayable,
      description: description,
      demerit_points: demerits,
    });

  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: wp('100%'),
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  handleLawSectionSearch = text => {
    if (text.length > 1) {
      this.setState({query: text, modalVisible: true});
    } else {
      this.setState({query: text, modalVisible: false});
    }
  };

  handleDIDCommitSearch = text => {
    if (text.length > 1) {
      this.setState({
        query: text,
        acttitlevalue: text,
        DidCommitmodalVisible: true,
      });
      Global_Attribues.PonOneBean['didCommit'] = text;
    } else {
      this.setState({
        query: text,
        acttitlevalue: text,
        DidCommitmodalVisible: false,
      });
      Global_Attribues.PonOneBean['didCommit'] = text;
    }
  };

  handleSECTSearch = text => {
    if (text) {
      this.setState({query1: text, actnovalue: text, SECTmodalVisible: true});
      Global_Attribues.PonOneBean['sect'] = text;
    } else {
      this.setState({query: text, actnovalue: text, SECTmodalVisible: false});
      Global_Attribues.PonOneBean['sect'] = text;
    }
  };

  render() {

    const {query, query1} = this.state;
    
    const actArray = this.LawSection_searchActs(query);
    const act_title = this.PonOffence_searchActs(query, true);
    const act_no = this.PonOffence_searchActs(query1, false);

    const {PonOffence} = this.props;

    return (
      <SafeAreaView>
        {!PonOffence ? (
          <>
            <View style={LawsParentTitleStyle.searchSection}>
              <Autocomplete
                autoCorrect={false}
                autoFocus={this.state.LawSectionfocus}
                containerStyle={LawsParentTitleStyle.autocompleteContainer}
                inputContainerStyle={LawsParentTitleStyle.inputContainer}
                placeholder="Search Acts"
                placeholderTextColor="#000000"
                onChangeText={text => {
                  this.handleLawSectionSearch(text);
                }}
                value={this.state.query}
              />
              <Image
                source={require('../assets/search.png')}
                style={LawsParentTitleStyle.searchIcon}
              />
            </View>
            <Modal
              visible={this.state.modalVisible}
              onTouchOutside={() => {
                this.setState({modalVisible: false, LawSectionfocus: true});
              }}
              animationDuration={0}
              onHardwareBackPress={() => {
                this.setState({LawSectionfocus: true, modalVisible: false});
              }}
              onShow={() => {
                this.setState({LawSectionfocus: true});
              }}
              onModalHide={() => {
                this.setState({LawSectionfocus: true, modalVisible: false});
              }}
              style={{top: '35%', position: 'absolute', marginLeft: 15}}
              overlayBackgroundColor=""
              hasOverlay={false}>
              <View style={actArray != '' ? styles.LawSectionFlatList : null}>
                <FlatList
                  data={actArray}
                  keyboardShouldPersistTaps={'handled'}
                  renderItem={({item}) => {
                    return (
                      <View>
                        <TouchableOpacity
                          onPress={() => this.LawSection_lawDescription(item)}>
                          <Text style={styles.itemText}>{item}</Text>
                          <Image
                            source={require('../assets/search.png')}
                            style={{
                              width: 20,
                              height: 20,
                              tintColor: 'grey',
                              position: 'absolute',
                              right: 5,
                              top: 10,
                            }}></Image>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  ItemSeparatorComponent={this.renderSeparator}
                  keyExtractor={item => item}
                />
              </View>
            </Modal>
          </>
        ) : null}

        {PonOffence ? (
          <>
            <Modal
              visible={this.state.DidCommitmodalVisible}
              onTouchOutside={() => {
                this.setState({
                  DidCommitmodalVisible: false,
                  DidCommitfocus: true,
                });
              }}
              animationDuration={10}
              // modalAnimation=""
              // onRequestClose={()=>{this.setState({LawSectionfocus:true,modalVisible:false})}}
              // onDismiss={()=>{this.setState({DidCommitfocus:true,DidCommitmodalVisible:false})}}
              onShow={() => {
                this.setState({DidCommitfocus: true});
              }}
              onModalHide={() => {
                this.setState({
                  DidCommitfocus: true,
                  DidCommitmodalVisible: false,
                });
              }}
              overlayBackgroundColor=""
              avoidKeyboard={false}
              style={styles.cartModal}>
              <View
                style={act_title != '' ? styles.DidCommitFlatList : {flex: 1}}>
                <FlatList
                  keyboardShouldPersistTaps={'handled'}
                  nestedScrollEnabled={true}
                  data={act_title}
                  renderItem={({item}) => {
                    return (
                      <View style={{marginLeft: 10, marginRight: 10}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              acttitlevalue: item,
                              query: '',
                              actnovalue: this.setAct(item),
                              DidCommitmodalVisible: false,
                            });
                          }}>
                          <Text style={styles.itemText}>{item}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={item => item}
                  ItemSeparatorComponent={this.renderSeparator}
                />
              </View>
            </Modal>

            <View style={styles.autocompleteView}>
              <Autocomplete
                autoCorrect={false}
                autoFocus={this.state.DidCommitfocus}
                containerStyle={styles.autocompletecontainer}
                inputContainerStyle={styles.autocompleteinnercontainer}
                placeholder="DID COMMIT*"
                placeholderTextColor="grey"
                onChangeText={text => {
                  this.handleDIDCommitSearch(text);
                }}
                value={this.state.acttitlevalue}
                style={{fontSize: 12, color:'black'}}
              />
              <Image
                source={require('../assets/search.png')}
                style={styles.searchIcon}
              />
            </View>
          </>
        ) : null}

        {PonOffence ? (
          <View style={{flex: 1}}>
            <Modal
              visible={this.state.SECTmodalVisible}
              onTouchOutside={() => {
                this.setState({SECTmodalVisible: false, Sectfocus: true});
              }}
              animationDuration={10}
              onHardwareBackPress={() => {
                this.setState({SECTmodalVisible: false});
              }}
              // modalAnimation=""
              // onRequestClose={()=>{this.setState({LawSectionfocus:true,modalVisible:false})}}
              // onDismiss={()=>{this.setState({Sectfocus:true,SECTmodalVisible:false})}}
              onShow={() => {
                this.setState({Sectfocus: true});
              }}
              onModalHide={() => {
                this.setState({Sectfocus: true, SECTmodalVisible: false});
              }}
              style={styles.cartModal}
              overlayBackgroundColor="">
              <View style={act_no ? styles.DidCommitFlatList : {flex: 1}}>
                <FlatList
                  keyboardShouldPersistTaps={'handled'}
                  nestedScrollEnabled={true}
                  data={act_no}
                  extraData={this.state.query1}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '90%',
                        }}>
                        <TouchableOpacity
                          style={{width: '95%'}}
                          onPress={() => {
                            this.setState({
                              actnovalue: item.match(/.*(?=\s:)/)[0],
                              query1: '',
                              acttitlevalue: this.setActNo(item),
                              SECTmodalVisible: false,
                            });
                          }}>
                          <Text style={styles.itemText}>{item}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{width: '5%'}}
                          onPress={() => this.PonOffence_lawDescription(item)}>
                          <Image
                            source={Viewdetails}
                            style={{height: 35, width: 35, tintColor: 'red'}}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={item => item}
                  ItemSeparatorComponent={this.renderSeparator}
                />
              </View>
            </Modal>

            <View style={styles.autocompleteView}>
              <Autocomplete
                autoCorrect={false}
                autoFocus={this.state.Sectfocus}
                containerStyle={styles.autocompletecontainer}
                inputContainerStyle={styles.autocompleteinnercontainer}
                placeholder="SECT*"
                placeholderTextColor="grey"
                onChangeText={text => {
                  this.handleSECTSearch(text);
                }}
                value={this.state.actnovalue}
                style={{fontSize: 12, color:'black'}}
              />
              <Image
                source={require('../assets/search.png')}
                style={styles.searchIcon}
              />
            </View>
          </View>
        ) : null}

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 17,
    fontWeight: '700',
    marginVertical: 10,
    marginLeft: 5,
    marginRight: 20,
    color: 'black',
  },
  cartModal: {
    position: 'absolute',
    justifyContent: 'flex-end',
    bottom: 50,
    left: 0,
    right: 0,
  },

  autocompleteView: {
    marginTop: 12,
    width: wp('88%'),
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  autocompletecontainer: {
    color:'black',
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 0,
  },
  autocompleteinnercontainer: {
    color:'black',
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderBottomWidth: 1,
    maxWidth: '85%',
  },
  searchIcon: {
    width: 22,
    height: 22,
    tintColor: 'grey',
    position: 'absolute',
    right: 10,
    marginTop: 20,
  },
  actTitleFlatlist: {
    flex: 1,
    maxWidth: '90%',
    borderRadius: 0.5,
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOpacity: 100,
    elevation: 10,
    alignSelf: 'center',
    marginLeft: 10,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '800',
    marginVertical: 10,
    color: 'black',
    alignSelf: 'stretch',
    marginRight: 25,
    marginLeft: 10,
  },
  modal_container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
    // height: hp("120%")
  },
  LawSectionFlatList: {
    width: wp('90%'),
    maxHeight: hp('60%'),
    shadowColor: 'black',
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'black',
    marginLeft: 10,
    marginRight: 10,
  },
  DidCommitFlatList: {
    width: wp('90%'),
    maxHeight: hp('40%'),
    shadowColor: 'black',
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    elevation: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    marginTop: 15,
    zIndex: 1,
  },
  SECTFlatList: {
    width: wp('90%'),
    maxHeight: hp('25%'),
    shadowColor: 'black',
    shadowOpacity: 0.5,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
  },
});

export default Lawsearch;
