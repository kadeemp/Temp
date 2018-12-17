import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={styles.constinerStyle}>
      {props.children}
       </View>
  );
};


const styles = {
  constinerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    borderColor: '#fff',
    flexDirection: 'row',
    position: 'relative'
  }
}

export default CardSection ;
