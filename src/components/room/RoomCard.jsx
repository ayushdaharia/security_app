import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const RoomCard = ({data}) => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <View
        style={{
          height: 30,
          width: 5,
          backgroundColor: data.bgC,
          borderRadius: 3,
          marginTop: 5,
        }}></View>
      <View
        style={{
          // height: 123,
          width: '97%',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: COLORS.lightWhite,
          padding: 10,
          borderRadius: 5,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}>
        <View style={{marginBottom: 5}}>
          <Text
            style={{
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            Occupant Name: {data.occupantName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <Text
            style={{
              width: '50%',
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {`Room No: ${data.roomNumber}  `}
          </Text>
          <Text
            style={{
              width: '50%',
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {`Room Type: ${data.roomType}  `}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(155, 149, 149, 0.74)',
            height: 1,
            width: '100%',
            marginVertical: 10,
          }}></View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                color: '#494444',
                fontSize: 13,
                fontWeight: '400',
              }}>
              {`# Visitors: ${data.noOfVisitors || 0}`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('VisitorListInRoom', {
                roomId: data?.id,
              });
            }}>
            <Image
              source={icons.eyeIcon}
              style={{height: 27, width: 27}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({});
