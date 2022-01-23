import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, View,Image,Text, TextInput, TouchableOpacity,} from 'react-native';
import RNSpeedometer from 'react-native-speedometer';
import Speedometer from 'react-native-speedometer-chart';
import pon from '../assets/pon.png'
export default class Mytickets_slide extends Component{
    static propTypes={
        ticketsLeft: PropTypes.number.isRequired,
        warningGenerated: PropTypes.number.isRequired,
        totalTickets: PropTypes.number.isRequired,
        ticketused:PropTypes.number.isRequired
      }
    
    render(){
       const{ticketsLeft,warningGenerated,totalTickets,ticketused} = this.props;
        return(
                    <SafeAreaView style={styles.mainContainer}>
                    <View style={styles.myticketView}>
                    <Image style={styles.ponImage}
                                        source={pon}>
                                    </Image>
                    <Text style = {styles.ticketText}>My Tickets </Text>
                    
                    </View >
                    <View style={{flex:2,flexDirection:'row',top:8}}>

                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

                    <View style={{width:60,height:60,borderRadius:60/2,backgroundColor:'#D81B60',
                    alignItems:'center',justifyContent:'center'}}>
                            <Text style={{ color:'#ffffff',fontSize:20,}}>{ticketsLeft}</Text>
                    </View>
                    <Text style={{color:'#ffffff',fontSize:12,top:20}}>Tickets Left</Text>
                    </View>

                   <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <View style={{width:60,height:60,borderRadius:60/2,backgroundColor:'#D81B60',
                    alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                            <Text style={{ color:'#ffffff',fontSize:20}}>{warningGenerated}</Text>
                    </View>
                    <Text style={{color:'#ffffff',fontSize:12,top:20,textAlign:'center'}}>Warnings{"\n"}Generated</Text>
                   </View>

                   <View style={{flex:1.5,alignItems:'center',justifyContent:'center'}}>
                <Text  style={{color:'#ffffff',fontSize:12,bottom:5}}>
                    {ticketused}/{totalTickets}
                </Text>
                <Speedometer
                    value={ticketused}
                    totalValue={totalTickets}
                    size={100}
                    outerColor="yellow"
                    internalColor="#D81B60"
                    showLabels={true}
                    labelStyle={{ fontSize:15,color:'white' }}
                    labelFormatter={number => `${number}`}
                    showIndicator
                    indicatorColor="white"
                    innerCircleStyle={{backgroundColor:"#040f39"}}
                />
                    <Text style={{color:'#ffffff',fontSize:12,bottom:0}}>Ticket Book</Text>
                    </View>
                    </View>
                
                        
                    </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor:'#040f39',
        borderRadius: 12,
        
       
    },
    cardViewStyle:{
        backgroundColor:'#040f39',
        flex:1
     
    },
    cardView_InsideText:{
 
        fontSize: 20, 
        color: '#000', 
        textAlign: 'center', 
        marginTop: 5   
     
    }, 
    myticketView:{
        top:8,
        width:"100%",
        flexDirection:'row',
        justifyContent:'center',
        // alignItems:'center',
       
    },
    ponImage:{
        // height:hp('3%'),
        // width:wp('4%'),
        height:30,
        width:30,
        tintColor:'#ffffff',
        paddingRight:10
    
    },
    ticketText:{
        color:'#ffffff',
        fontSize:18,
        justifyContent:"center",
        alignSelf:'center',
        paddingLeft:10
        // fontSize:hp('3%'),
        // start:20
    }, 
    mainticketView:{
        flexDirection:'row',
        
    },
    ticketleftView:{
        // height:hp('8%'),
        // width:wp('8%'),
        
        height:60,
        width:60,
       
        borderRadius:60/2,
        backgroundColor:'#D81B60',
        justifyContent:'center',
        padding:5,
        start:20,
        top:40
    },
    ticketleftNo:{
        color:'#ffffff',
        textAlign:'center',
        // fontSize:hp('5%'),
        fontSize:20,
        padding:8,
        
    },
    warningleftView:{
        height:60,
        width:60,
     
         borderRadius:60/2,
        backgroundColor:'#D81B60',
        justifyContent:'center',
        padding:5,
        start:62,
        top:40
    },
    warningNo:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:20,
        padding:8,
    },
    ticketlefText:{
        // height:hp('20%'),
        // width:wp('30%'),
        color:'#ffffff',
       // fontSize:hp('2.5%'),
        top:90,
        start:15
    },
    warningText:{
        // height:hp('20%'),
        // width:wp('23%'),
        color:'#ffffff',
        // fontSize:hp('2.5%'),
        fontSize:10,
        alignSelf:'center',
        end:20,
        bottom:75
    },
    
     
})

