import {
  Image,
  Pressable,
  SafeAreaView,
  SafeAreaViewBase,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {COLORS, FONT, SIZES, color, images} from '../../constants';
import OTPTextView from 'react-native-otp-textinput';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL, BASE_URL_C} from '../../global/utils/constantUrl';
import {getUserToken} from '../../global/services/apis/apiCalls';
import {getData} from '../../global/services/apis/getApi';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {storeData} from '../../global/utils/util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {ContextPrimary} from '../../global/context/context';

const LoginWithOTP = ({setIsOTPReceived, mobile, OTPRequest}) => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const {changeImg, changeName} = useContext(ContextPrimary);
  const getFcmToken = async () => {
    var fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken, 'the old Token');
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log(fcmToken, 'the new genrated token');
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log(error, 'error raised in fcm Token');
      }
    }
  };

  const retrieve_FCM_Token = async () => {
    try {
      const value = await AsyncStorage.getItem('fcmToken');
      if (value !== null) {
        // We have data!!
        console.log('FCM', value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  //Send Neccessary Details
  const authencation = async patientId => {
    const access_token = await AsyncStorage.getItem('ACCESS_TOKEN');
    getFcmToken();
    const fcm_token = await AsyncStorage.getItem('fcmToken');
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    };
    let params = {
      os: 'ANDROID',
      token: fcm_token,
      patientId: patientId,
    };

    console.log({params});
    {
      await axios
        .post(BASE_URL_C + 'securityApp/save/token', params, headers, {
          timeout: 3000,
        })
        .then(async response => {
          console.log('#. saveHandler() : ', response.data);
        })
        .catch(error => {
          console.log('#. saveHandler() error1 : ', error);
        });
    }
  };

  const OTPLogIn = async () => {
    if (otp !== '') {
      const params = {
        mobile: mobile,
        otp: otp,
        portal: 'SECURITY_APP',
      };
      const url = BASE_URL + 'authenticate/otp/patient';

      fetchLoginDetails(url, params);
    } else {
      alert('Please enter the OTP');
    }
  };

  // const fetchLoginDetails = useCallback(async (url, data) => {
  //   const user = await getUserToken(url, data);
  //   if (user && user.error) {
  //     ToastAndroid.showWithGravityAndOffset({
  //       position: 'Top',
  //       topOffset: 10,
  //       autoHide: true,
  //       visibilityTime: 3000,
  //       type: 'error',
  //       text1: 'OTP Invalid.',
  //     });
  //     console.log({'auth data error': user.error});
  //   } else {
  //     const data = user.data;
  //     const token = await data.token;
  //     const dData = await jwt_decode(token);

  //     storeData('ACCESS_TOKEN', token);
  //     storeData('USER_ID', dData.userID);
  //     storeData('BRANCH_ID', dData.branchId);
  //     storeData('ROLE', dData.role);
  //     storeData('ID_NEW', dData.id.toString());
  //     storeData('MOBILE_NO', dData.sub);

  //     console.log({dDataddddddd: dData.sub});

  //     console.log({userID: dData.userID});

  //     getCorpEMPDetails(dData, mobile, navigation);

  //     console.log({'auth data success======?>>>>>>': dData});
  //   }
  // }, []);

  const fetchLoginDetails = useCallback(async (url, data) => {
    try {
      const user = await axios({
        method: 'post',
        url: url,
        data: data,
      });

      const responseData = user.data;
      const token = responseData.token;
      const decodedData = jwt_decode(token);

      storeData('ACCESS_TOKEN', token);
      storeData('USER_ID', decodedData.userID);
      storeData('BRANCH_ID', decodedData.branchId);
      storeData('ROLE', decodedData.role);
      storeData('ID_NEW', decodedData.id.toString());
      storeData('MOBILE_NO', decodedData.sub);
      storeData('USER_NAME', decodedData.name);

      console.log({decodedData: decodedData.sub});
      console.log({userID: decodedData.userID});

      getCorpEMPDetails(decodedData);

      console.log({'auth data success======?>>>>>>': decodedData});
    } catch (error) {
      // Handle errors here
      if (error.response && error.response.status === 500) {
        // Server error (500), show a toast for wrong OTP
        ToastAndroid.show('Wrong OTP. Please try again.', ToastAndroid.LONG);
      } else {
        // Other errors, you can customize this message based on the error
        ToastAndroid.show(
          'An error occurred. Please try again.',
          ToastAndroid.LONG,
        );
      }

      // You might want to log the error for further investigation
      console.error('Login failed:', error);
    }
  }, []);

  useEffect(() => {
    retrieve_FCM_Token();
    getFcmToken();
  }, []);

  const getCorpEMPDetails = async userData => {
    const url = BASE_URL_C + `patient/authId/${userData.id}?mobile=${mobile}`;
    const employee = await getData(url);
    console.log({EMPLOYEEEDATA: employee?.data});
    console.log({GETCORPDATA: url});
    console.log(userData?.id);
    console.log(mobile);

    if (employee.error) {
      ToastAndroid.showWithGravityAndOffset(
        'Something went wrong.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'OTP Verified Successfully.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
    }
    const patientId = employee?.data?.patientId;
    storeData('PATIENT_ID', patientId?.toString());
    storeData('Corp_EmpId', employee?.data?.corpEmpId?.toString());
    storeData('FAMILY_ID', employee?.data?.familyId?.toString());
    storeData('Emp_ID', employee?.data?.empId?.toString());
    storeData('CORP_ID', employee?.data?.corpId?.toString());
    storeData('CORP_LOGO', employee?.data?.corpLogoUrl?.toString());

    authencation(patientId);

    console.log({ISACTIVE: userData.isActive});
    if (userData.isActive) {
      navigation.replace('Drawer');
      changeImg(employee?.data?.imageURL);
    } else {
      navigation.replace('SetupProfile', {
        mobile: mobile,
        employee: employee.data,
      });
    }
    console.log({employee_success: employee.data});
  };

  const [isResendOtpEnabled, setIsResendOtpEnabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setIsResendOtpEnabled(true);
    }
  }, [countdown]);

  const handleResendOTP = () => {
    setIsResendOtpEnabled(false);
    setCountdown(30);
    OTPRequest();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingTop: 20, marginBottom: 10, paddingHorizontal: 10}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={images.unocareLogo}
              style={{height: 60, width: '60%', resizeMode: 'contain'}}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={images.otpBanner}
              style={{height: 270, width: '100%', resizeMode: 'contain'}}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                marginVertical: 5,
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Outfit',
                color: '#000',
              }}>
              OTP VERIFICATION
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginVertical: 5,
                fontSize: 14,
                fontWeight: '400',
                fontFamily: 'Outfit',
                color: '#4E4D4D',
              }}>
              Enter the OTP sent to - +91-
            </Text>
            <Text
              style={{
                marginVertical: 5,
                fontSize: 14,
                fontWeight: '700',
                fontFamily: 'Outfit',
                color: '#000000',
              }}>
              {mobile}
            </Text>
          </View>
        </View>

        <OTPTextView
          tintColor="#127DDD"
          handleTextChange={text => setOtp(text)}
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}
        />
        <View
          style={{
            marginVertical: 10,
            paddingHorizontal: 10,
          }}>
          {!isResendOtpEnabled ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 18,
                  fontWeight: '600',
                  fontFamily: 'Outfit',
                  color: '#000',
                }}>
                00:{countdown}
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleResendOTP}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 14,
                    fontWeight: '400',
                    fontFamily: 'Outfit',
                    color: '#5A5A5A',
                  }}>
                  Don’t receive code ?
                </Text>

                <Text
                  style={{
                    marginVertical: 5,
                    fontSize: 14,
                    fontWeight: '600',
                    fontFamily: 'Outfit',
                    color: '#383737',
                    marginLeft: 5,
                  }}>
                  Re-send
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setIsOTPReceived(false)}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 14,
                  fontWeight: '700',
                  fontFamily: 'Outfit',
                  color: '#127DDD',
                  textDecorationLine: 'underline',
                }}>
                Change Number
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Pressable
              onPress={OTPLogIn}
              style={{
                marginVertical: 10,
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
                Verify
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginWithOTP;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    // backgroundColor: "red",
    alignContent: 'center',
    justifyContent: 'center',
    //padding: 200
  },
  label: {
    fontFamily: FONT.regular,
    marginBottom: SIZES.small,
    color: '#717171',
  },
  inputs: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.gray2,
    padding: SIZES.small,
    fontFamily: FONT.medium,
    width: '100%',
    height: 40,
    color: '#717171',
  },
  btnTxt: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    alignSelf: 'center',
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    borderColor: COLORS.primary,
    padding: SIZES.medium,
    paddingLeft: SIZES.large,
    paddingRight: SIZES.large,
    alignSelf: 'center',
    marginTop: 30,
    width: '100%',
  },
  secondaryBtn: {
    backgroundColor: COLORS.textFaint,
    borderRadius: 20,
    borderColor: COLORS.primary,
    padding: SIZES.medium,
    paddingLeft: SIZES.medium,
    paddingRight: SIZES.medium,
    alignSelf: 'center',
    marginTop: 20,
    width: '100%',
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 3,
  },
});
