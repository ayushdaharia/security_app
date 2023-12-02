import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const HomeCard = ({data}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: data.bgC,
        height: 140,
        width: '46%',
        borderRadius: 5,
        padding: 15,
        gap: 5,
      }}>
      <Pressable
        style={{width: '100%'}}
        onPress={() => navigation.navigate(data.navigate)}>
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={data?.icon} style={{height: 30, width: 30}} />
        </View>
        <Text
          style={{
            color: '#FFF',
            fontSize: 20,
            fontWeight: '500',
          }}>
          {data?.title}
        </Text>
        <Text
          style={{
            color: '#FFF',
            fontSize: 16,
            fontWeight: '500',
          }}>
          {data?.value}
        </Text>
      </Pressable>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({});
