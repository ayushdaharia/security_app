import React, {Fragment} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {COLORS} from '../../constants';

const CustomButton = ({onPress, label, style}) => {
  return (
    <View
      style={{
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
      }}>
      <Pressable onPress={onPress}>
        <View
          style={{
            backgroundColor: '#127DDD',
            borderWidth: 1,
            borderColor: '#127DDD',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            ...style,
          }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 20,
              lineHeight: 30,
              color: '#FFFFFF',
            }}>
            {label}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
export default CustomButton;
