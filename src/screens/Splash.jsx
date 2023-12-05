import {Image, StyleSheet, Text, View, Images} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from '../constants';
import {BASE_URL_C} from '../global/utils/constantUrl';
import {getData} from '../global/services/apis/getApi';

const Splash = () => {
  const navigation = useNavigation();
  const retrieve_Access_Token = async () => {
    try {
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');
      if (token) {
        fetchUserData();
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 3000);
        console.log('Login');
      }
    } catch (error) {
      console.log('error');
    }
  };

  const fetchUserData = async () => {
    const userId = await AsyncStorage.getItem('USER_ID');
    const MobileNo = await AsyncStorage.getItem('MOBILE_NO');
    console.log(userId, MobileNo);
    const url = BASE_URL_C + `patient/userId/${userId}?mobile=${MobileNo}`;
    const data = await getData(url);
    console.log('fetchDisplayName called with userId:', userId);
    console.log('data received from API:', data.data);

    if (data.error) {
      console.log({'error getting User Data': data.error});
      if (data.data === null) {
        setTimeout(() => {
          navigation.replace('SetupProfile', {
            mobile: MobileNo,
          });
        }, 3000);
      }
    } else {
      if (
        data?.data?.name === '' ||
        data?.data?.name === null ||
        data.data === null ||
        data === ''
      ) {
        setTimeout(() => {
          navigation.replace('SetupProfile', {
            mobile: MobileNo,
          });
        }, 3000);
      } else {
        setTimeout(() => {
          navigation.replace('Drawer');
        }, 3000);
      }
    }
  };

  useEffect(() => {
    retrieve_Access_Token();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={images.unocareLogo} style={styles.logo} />
      <Text style={styles.slogan}>Sab Theek Ho Jaega</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '90%',
    height: 80,
    resizeMode: 'cover',
    objectFit: 'cover',
  },
  slogan: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500',
    lineHeight: 15,
    fontSize: 15,
    color: '#0A276B',
  },
});
