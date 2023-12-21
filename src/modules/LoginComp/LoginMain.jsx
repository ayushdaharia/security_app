import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import images from '../../constants/images';
import icons from '../../constants/icons';
import LoginWithOTP from './LoginWithOTP';
import {BASE_URL, BASE_URL_C} from '../../global/utils/constantUrl';
import {getData} from '../../global/services/apis/getApi';
import {getOTPByMobile} from '../../global/services/apis/apiCalls';
import axios from 'axios';

const LoginMain = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(false);

  // const OTPRequest = async () => {
  //   if (
  //     userName !== '' &&
  //     userName.length === 10 &&
  //     isNaN(userName) === false
  //   ) {
  //     const params = {
  //       mobile: userName,
  //       portal: 'SECURITY_APP',
  //     };

  //     const url = BASE_URL + 'send/patient/otp';
  //     const user = await getOTPByMobile(url, params);
  //     if (user.error) {
  //       console.log({'auth data error': 'error'});
  //       console.log('#. login() error : ', err);
  //     } else {
  //       console.log({'auth data success': 'success'});
  //       console.log('OTP Request', user.data);

  //       setIsOTPReceived(true);
  //     }
  //   } else {
  //   ToastAndroid.showWithGravityAndOffset(
  //     'Please enter a valid mobile number.',
  //     ToastAndroid.SHORT,
  //     ToastAndroid.BOTTOM,
  //     0,
  //     60,
  //   );
  // }
  // };

  const OTPRequest = async () => {
    if (userName !== '' && userName.length === 10 && !isNaN(userName)) {
      const params = {
        mobile: userName,
        portal: 'SECURITY_APP',
      };

      const url = BASE_URL + 'send/patient/otp';

      try {
        const user = await axios({
          method: 'post',
          url: url,
          data: params,
        });
        console.log({'auth data success': 'success'});
        console.log('OTP Request', user);
        setIsOTPReceived(true);
        ToastAndroid.showWithGravityAndOffset(
          'OTP Sent Successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          60,
        );
      } catch (error) {
        console.log({'auth data error': 'error'});
        console.log('#. login() error : ', error);

        // Log the entire error object to inspect its structure
        console.log('Error Object:', error);

        // Update the code to handle the error based on its structure
        if (error.response && error.response.status === 400) {
          // Handle 400 status code
          const errorMessage = error.response.data.message;
          ToastAndroid.showWithGravityAndOffset(
            `${errorMessage}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            60,
          );
        }
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter a valid mobile number.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
    }
  };

  // const fetchOTPHandler = useCallback(async (url, data, userName) => {}, []);

  const retrieve_Access_Token = async () => {
    try {
      const value = await AsyncStorage.getItem('ACCESS_TOKEN');
      const userId = await AsyncStorage.getItem('USER_ID');

      if (value) {
        // We have data!!
        getPatientDEtails(userId);
        navigation.replace('SetupProfile');
        console.log('Access_Token', value);
      } else {
        null;
      }
    } catch (error) {
      // Error retrieving data
      console.log('error');
    }
  };

  const getPatientDEtails = async userId => {
    const url = BASE_URL_C + 'patient/userId/' + userId;
    const patient = await getData(url);

    if (patient.error) {
      console.log({'error getting display name': patient.error});
    } else {
      console.log({'success getting display name': patient.data});
      const patientId = patient.data.patientId;
      console.log({patientId});
      storeData('PATIENT_ID', patientId.toString());
    }
  };

  useEffect(() => {
    retrieve_Access_Token;
  }, []);

  const [isOTPReceived, setIsOTPReceived] = useState(false);

  if (isOTPReceived) {
    return (
      <LoginWithOTP
        setIsOTPReceived={setIsOTPReceived}
        mobile={userName}
        OTPRequest={OTPRequest}
      />
    );
  }
  return (
    <SafeAreaView
      style={{
        // flex: 1,
        // paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={
          {
            // flex: 1
          }
        }>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={images.unocareLogo}
            style={{height: 60, width: '60%', resizeMode: 'contain'}}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={images.loginBanner}
            style={{height: 270, width: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: '#127DDD',
              textAlign: 'center',
              fontSize: 25,
              fontWeight: '600',
              textShadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              fontFamily: 'Montserrat',
            }}>
            Your Health, Simplified with Uno Care
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}>
          <Text
            style={{
              color: '#333',
              fontSize: 14,
              fontWeight: '500',
              fontFamily: 'Helvetica Neue',
            }}>
            Let’s get started! enter your 10 digit mobile number
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#F6F6F6',
              marginVertical: 10,
              borderRadius: 8,
              height: 50,
              width: '100%',
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderWidth: 0.5,
              borderColor: 'rgba(0, 0, 0, 0.12)',
            }}>
            <View>
              <Image
                source={icons.flag}
                style={{height: 40, width: 40, alignItems: 'center'}}
              />
            </View>
            <View
              style={{
                height: 40,
                marginHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0.5,
                borderColor: 'rgba(0, 0, 0, 0.12)',
              }}></View>
            <TextInput
              placeholder="Enter the phone Number"
              style={{
                fontSize: 17,
                fontWeight: '600',
                lineHeight: 17,
                color: '#000000',
              }}
              keyboardType="numeric"
              autoCapitalize="none"
              maxLength={10}
              placeholderTextColor={'rgba(18, 125, 221, 0.75)'}
              onChangeText={text => {
                setUserName(text);
                setError(false);
              }}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Pressable
              // disabled={userName.length === 10 ? false : true}
              onPress={OTPRequest}
              style={{
                marginTop: 20,
                width: '100%',
                height: 55,
                backgroundColor: '#127DDD',
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 18,
                  fontFamily: 'Outfit',
                  lineHeight: 18,
                  color: '#FFFFFF',
                }}>
                Continue
              </Text>
            </Pressable>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Pressable
              disabled={true}
              // onPress={OTPRequest}
              style={{
                flexDirection: 'row',
                marginTop: 20,
                width: '100%',
                height: 55,
                borderWidth: 1,
                borderColor: '#127DDD',
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={icons.translateIcon}
                style={{height: 40, width: 40}}
              />
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 18,
                  lineHeight: 18,
                  fontFamily: 'Outfit',
                  color: '#127DDD',

                  marginLeft: 10,
                }}>
                Choose Language
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginMain;

const styles = StyleSheet.create({});
