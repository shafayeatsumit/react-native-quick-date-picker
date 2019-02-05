import React from 'react';
import { 
  StyleSheet, 
  Image, 
  Text, 
  View,
  TouchableHighlight,
  DatePickerIOS,
  Alert,
  TimePickerAndroid,
  DatePickerAndroid,   
} from 'react-native';
import DateLable from './DateLabel';


export default class DatePicker extends React.Component {
  constructor(props){
    super(props)
    this.state={
      startDate: new Date(),
      endDate: new Date(),
      activeTab: 'startDate',
      hoursToSubtract: 0
    }
    this.onDateChange  = this.onDateChange.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.rangeToday = this.rangeToday.bind(this);
    this.rangeYesterday = this.rangeYesterday.bind(this);
    this.rangeSubtractHour = this.rangeSubtractHour.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {startDate, endDate} = this.state;
    Alert.alert(`Start Date: ${startDate.toLocaleString()} \n End Date: ${endDate.toLocaleString()}`)
  }

  handleReset() {
    this.setState({
      startDate: new Date(),
      endDate: new Date(),
      activeTab: 'startDate',
      hoursToSubtract: 0      
    })
  }
  rangeToday() {
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let end = new Date();
    this.setState({
      hoursToSubtract: 0,
      startDate: start,
      endDate: end,      
    })
  }

  rangeYesterday(){
    var d = new Date(); //now
    d.setDate(d.getDate() - 1); //yesterday
    const start = d.setHours(0, 0, 0, 0);
    const end = d.setHours(23, 59, 59, 999);    
    this.setState({
      hoursToSubtract:0,
      startDate: new Date(start),
      endDate: new Date(end)
    })
  }

  rangeSubtractHour() {
    const {hoursToSubtract} = this.state;
    var d = new Date(); //now
    d.setHours(d.getHours() - hoursToSubtract);
    this.setState({
      hoursToSubtract: hoursToSubtract+1,
      startDate: d,
      endDate: new Date()
    })
  }

  onDateChange(date) {
    const {startDate, endDate, activeTab} = this.state
    activeTab === 'startDate' ? 
      this.setState({ startDate:date })
      :
      this.setState({ endDate: date })      
  }  

  switchTab(tabName) {
    this.setState({
      activeTab: tabName
    })
  }

  render() {
    const { startDate, endDate, activeTab, hoursToSubtract } = this.state;
    console.log('end ',startDate)
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Pick a date range</Text>
        </View>
        <View style={styles.dateContainer} >
          <TouchableHighlight 
            style={{flex:1}} 
            onPress={this.switchTab.bind(this,"startDate")}   
            underlayColor="transparent"         
          >
            <DateLable
              title="start date"
              date={startDate}
              active={activeTab === 'startDate'}
            />
          </TouchableHighlight>
          <TouchableHighlight 
            style={{ flex: 1 }} 
            underlayColor="transparent"       
            onPress={this.switchTab.bind(this, "endDate")}            
          >
            <DateLable
              title="end date"
              date={endDate}
              active={activeTab === 'endDate'}
            />
          </TouchableHighlight>
        </View>
        <View style={{ flex: 2.5, width: '100%'}} >
          <DatePickerIOS
            style={styles.iosPicker}
            date={this.state[activeTab]}
            mode="datetime"
            minuteInterval={10}
            onDateChange={this.onDateChange}
          />
        </View>
        <View style={styles.dateRangeContainer} >
          <TouchableHighlight style={styles.badgeContainer} underlayColor='#e49294' onPress={this.rangeToday}>
            <Text style={styles.badgeText}>TODAY</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.badgeContainer} underlayColor='#e49294' onPress={this.rangeYesterday}>
            <Text style={styles.badgeText}>YESTERDAY</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.badgeContainer} underlayColor='#e49294' onPress={this.rangeSubtractHour}>
            <Text style={styles.badgeText}> LAST {hoursToSubtract } {hoursToSubtract > 1 ? "HOURS" : "HOUR" }</Text>
          </TouchableHighlight>          
        </View>
        <View style={styles.buttonContainer} >
          <TouchableHighlight style={styles.buttonReset} underlayColor='#e49294' onPress={this.handleReset}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonSubmit} underlayColor='#e49294' onPress={this.handleSubmit}>          
            <Text style={styles.buttonText}>SUBMIT</Text>          
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:'70%',
    width:'90%',
    borderRadius:5,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'hidden'
  },
  headerContainer: {
    flex: 1,     
    justifyContent:'center',
    alignItems:'center'
  },
  headerText:{
    fontSize: 22,
    color: '#C53135'    
  },
  dateContainer: {
    flex: 1.2, 
    width: '100%', 
    flexDirection: 'row'    
  },
  iosPicker: {
    margin: 10,
    backgroundColor: 'white',              
  },
  dateRangeContainer: {
    flex: 1,
    marginTop:5, 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center'
  },
  badgeContainer: {
    height: 40, 
    width: 93, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    borderWidth:1.2,
    borderColor: '#C53135'    ,
    borderRadius: 30    
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '300',
    color: '#C53135'    
  },
  buttonContainer: {
    flex: 0.8, 
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'    
  },
  buttonSubmit: {
    height: '70%',
    width: '40%',
    backgroundColor: '#d55558',
    marginBottom: 10,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonReset: {
    height: '70%',
    width: '40%',
    backgroundColor: '#B2B2B2',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }  ,
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white'    
  }
});
