import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, icons, images} from '../../constants';

const CustomTextField = ({
  multiline,
  numberOfLines,
  textAlignVertical,
  textFieldheight,
  backgroundColor,
  editable,
  maxLength,
  headingColor,
  textColor,
  borderColor,
  heading,
  placeHolder,
  value,
  onChangeText,
  width,
  unit,
  type,
}) => {
  return (
    <View>
      <Text style={{color: headingColor ? headingColor : '#000000'}}>
        {heading}
      </Text>
      <View
        style={{
          width: width,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: backgroundColor ? backgroundColor : '#FFFFFF',
          borderColor: borderColor ? borderColor : COLORS.gray,
          borderWidth: 1,
          borderRadius: 10,
          marginVertical: 5,
        }}>
        {type === 'mobile' ? (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={icons.flag}
              style={{width: 30, height: 20, marginHorizontal: 10}}
            />
            <View
              style={{
                borderRightWidth: 0.5,
                height: 20,
                borderColor: COLORS.gray,
              }}></View>
          </View>
        ) : null}

        <TextInput
          multiline={multiline}
          placeholder={placeHolder}
          placeholderTextColor={COLORS.gray}
          editable={editable}
          numberOfLines={numberOfLines}
          style={{
            height: textFieldheight ? textFieldheight : 40,
            padding: 10,
            textAlignVertical: textAlignVertical,
            flex: 1,
            color: textColor ? textColor : '#000000',
          }}
          value={value}
          onChangeText={onChangeText}
          keyboardType={
            type === 'mobile' || type === 'numeric' ? 'numeric' : 'default'
          } // Set keyboardType to numeric for mobile type
          maxLength={
            type === 'mobile' ? 10 : type === 'numeric' ? maxLength : undefined
          } // Set maxLength to 10 for mobile type
        />
        <Text style={{fontSize: SIZES.small, paddingRight: 10}}>{unit}</Text>
      </View>
    </View>
  );
};

export default CustomTextField;
