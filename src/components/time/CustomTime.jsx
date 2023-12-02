import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS, SIZES, icons} from '../../constants';

const CustomTime = ({
  borderColor,
  heading,
  backgroundColor,
  textColor,
  formValues,
  setFormValues,
  propertyName,
  borderRadius,
  height,
  headingColor,
}) => {
  const [dateValue, setDateValue] = useState(
    formValues[propertyName] ? new Date(formValues[propertyName]) : new Date(),
  );
  const [showTimePicker, setShowTimePicker] = useState(false);

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const hideTimePicker = () => {
    setShowTimePicker(false);
  };

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      setDateValue(selectedDate);
      setFormValues({...formValues, [propertyName]: selectedDate});
      hideTimePicker();
    } else {
      hideTimePicker();
    }
  };

  return (
    <View>
      <Text style={{color: headingColor ? headingColor : '#000000'}}>
        {heading}
      </Text>
      <View
        style={{
          height: height ? height : 42,
          padding: 10,
          backgroundColor: backgroundColor ? backgroundColor : '#FFFFFF',
          fontSize: SIZES.small,
          marginVertical: 5,
          borderColor: borderColor ? borderColor : COLORS.gray,
          borderWidth: 1,
          borderRadius: borderRadius ? borderRadius : 10,
          width: 130,
        }}>
        <TouchableOpacity
          onPress={showTimepicker}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: textColor ? textColor : '#000000'}}>
            {dateValue.toLocaleTimeString()}
          </Text>
          <Image
            source={icons.clock}
            style={{height: 20, width: 20, marginLeft: 10}}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={dateValue}
            mode={'time'}
            is24Hour={false}
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
};

export default CustomTime;

const styles = StyleSheet.create({});
