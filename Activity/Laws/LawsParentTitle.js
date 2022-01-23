import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView,Image,View, TextInput,TouchableOpacity,Div,ActivityIndicator,Alert,FlatList} from 'react-native';
import Global_Attributes from '../../Utility/Global_Attributes';
import Loader from '../Dashboard/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import NetInfo from "@react-native-community/netinfo";
import Autocomplete from "react-native-autocomplete-input";
import LawsParentTitleStyle from '../Css/LawsParentTitleStyele'
//import LawsParentTitleStyle from '../Css/LawsActTitleStyle';
import LawsController from '../Controller/LawsController';
import LawsSearch from '../Laws/LawsSearch';


class LawsParentTitle extends Component{


  constructor(props)
  {
    super(props);
    this.state={
      query: "",
      isLoading:Global_Attributes.loading,
 
    }
  }
      LawSection=async(type,id)=>{
        try{
           Global_Attributes.loading = true;
           this.setState({isLoading:true});
           var user = Global_Attributes.User;
           var pass = Global_Attributes.Pass;
        
            let numberVerBody = {
                       user: user,
                       pass: pass,
                       id:id,
               }
        const abc= await new LawsController().handleClick(numberVerBody,this.props,type,Global_Attributes.laws);
        abc;
        this.setState({isLoading:false});
        }
        catch(error){
          console.log(error);
          }
      }

  render(){

      const respdataobj = this.props.route.params.Respdata;
      const respdataidobj = this.props.route.params.Respdataid;
      const Length = this.props.route.params.Length;
      const ActLength = this.props.route.params.ActLength;
    var output=[];
     for (let i= 0; i <Length; i++) 
     {
        let title =(respdataobj['title'+i]);
        // console.log("Title = "+title);
        let id =(respdataidobj['id'+i]);
        // console.log("id = "+id);
       var tempItem=  (
       
             <View key={i} style={LawsParentTitleStyle.compulsoryautomobilecontainer}>
             <TouchableOpacity
             style={LawsParentTitleStyle.touchbleopacity}
              onPress={()=> this.LawSection("ActLawsTitle",id)}
             >
              <Text style={LawsParentTitleStyle.text}>{title}</Text>
             <Image 
             source={require('../assets/downarrow.png')}
             style={LawsParentTitleStyle.downarrow}
             />
             </TouchableOpacity>
         </View>
      );
     output[i] = (tempItem);
   
  }
    return (
         <>
          {/*Main Container */}
          <View style={LawsParentTitleStyle.maincontainer}>
            <View style={LawsParentTitleStyle.container}>
              <LawsSearch PonOffence={false} actlength={ActLength} navigation={this.props.navigation}/>
              <FlatList
                data={[{key: 'i'}]}
                renderItem={() => output}
              />
              <Loader loading={Global_Attributes.loading} />
            </View>
          </View>
         </>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  itemText: {
    fontSize: 17,
    fontWeight:'700',
    marginVertical:10,
    alignSelf:'stretch',
    marginRight:30,
    marginLeft:15,
    color:'black'
  },
  cardview:{
    flexDirection: 'row',
    alignItems: 'center',
   
  }
});


export default LawsParentTitle;
