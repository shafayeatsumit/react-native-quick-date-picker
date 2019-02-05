
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Image 
} from 'react-native';
const calenderIcon = require('../assets/icons/calender.png');
const clockIcon = require('../assets/icons/clock.png');

const options = {
  weekday: 'long',
  year: '2-digit',
  month: 'short',
  day: 'numeric',
  hour: "2-digit",
  minute: "2-digit",
};


export default class DateLabel extends React.Component {

  render() {
    const {title, date, active} = this.props
    const newDate = date.toLocaleString("en-US", options)
    const [day, month, year, time] = newDate.split(",")
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginHorizontal:10}}>
        <Text style={{ fontSize: 16, marginVertical: 5,fontWeight:'500' }}>{title}</Text>      
        <View style={{
          flex:1,          
          width: '100%',
          flexDirection: 'row',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center'
        }}>          
          {active && <View style={styles.activeIndecator} /> }         
          <Image source={calenderIcon} style={[styles.calenderImage, active ? { tintColor: '#C53135' } : { tintColor: '#B2B2B2' }]} />
          <Text style={[styles.dateText, active ? { color: '#C53135' } : { color: '#B2B2B2'}]}>
            {day}{'\n'}{month.trim()},{year}{'\n'}
            <Text style={[styles.timeText, active ? { color: '#C53135' } : { color: '#B2B2B2' } ]}>
              {time.trim()}
            </Text>                      
          </Text>

        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndecator: {
    width: 5, 
    backgroundColor: '#C53135', 
    position: 'absolute', 
    left: 0, 
    top: 0, 
    bottom: 0 
  },
  calenderImage: {    
    margin: 10, height: 25, width: 25,   
    marginHorizontal:15, 
  },
  dateText: {
    flex: 1,
    fontSize: 14,
    // backgroundColor: 'yellow',
    textAlign: 'left',  
    fontWeight: '500',
    flexDirection: 'column'    
  },
  timeText: {  
    fontSize: 12,
    textAlign: 'left',    
    fontWeight: '300',
  }
});

