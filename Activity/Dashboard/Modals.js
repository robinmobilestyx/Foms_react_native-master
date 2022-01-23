import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,ScrollView
} from 'react-native';
import { Popover, PopoverContainer } from 'react-native-simple-popover';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 
export default class Modasl extends Component {
 
  state = {
    isPopoverVisible: true,
    popoverPlacement: 'auto',
  };
 
  render() {
    return (
      
      <PopoverContainer padding={20}>
        <View style={styles.container}>
          <Popover
            placement={this.state.popoverPlacement}
            arrowColor="#114B5F"
            arrowWidth={16}
            arrowHeight={0}
            isVisible={this.state.isPopoverVisible}
            component={() => (
              <View style={styles.popoverContainer}>
                <Text style={styles.popoverText}>
                  This is a very long popover text.
                  Container padding affects max width and height of this popover.
                </Text>
              </View>
            )}
          >
            <Text style={styles.welcome}>
              Welcome to React Native!
            </Text>
          </Popover>
          <View style={styles.buttons}>
            <Button
              title="Toggle Popover"
              onPress={() => {
                this.setState({ isPopoverVisible: !this.state.isPopoverVisible });
              }}
            />
            <Button
              title="Toggle Placement"
              onPress={() => {
                this.setState({
                  popoverPlacement: this.state.popoverPlacement === 'top' ? 'bottom': 'top'
                });
              }}
            />
          </View>
        </View>
      </PopoverContainer>
      
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    top: 0,
    left: 0,
    marginTop: 20,
  },
  popoverContainer: {
    width: wp("90%"),
    maxHeight: hp("60%"),
    shadowColor: 'black',
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: "black",
    marginLeft: 10,
    marginRight: 10,
  },
  popoverText: {
    color:'black',
  }
});