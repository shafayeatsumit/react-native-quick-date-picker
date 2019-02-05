import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class DatePicker extends React.Component {

  render() {
    return (
      <View style={styles.container} >        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2.5, 
    width: '100%', 
    borderWidth: 2    
  },
});
