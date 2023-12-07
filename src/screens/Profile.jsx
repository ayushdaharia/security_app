import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {SIZES, icons} from '../constants';
import CustomButton from '../components/customButton/CustomButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_C} from '../global/utils/constantUrl';
import {getData} from '../global/services/apis/getApi';
import {fetchUserDataProfile} from '../global/apicall/apiCall';
import {ContextPrimary} from '../global/context/context';
import {ActivityIndicator} from 'react-native-paper';

const CustomProfileTypography = ({title, value}) => {
  return (
    <View>
      <Text style={{color: '#A7A6A3'}}>{title}</Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
          borderColor: '#F6F6F6',
          borderWidth: 1,
          borderRadius: 10,
          marginVertical: 5,
          padding: 12,
        }}>
        <Text style={{color: '#000000'}}>{value}</Text>
      </View>
    </View>
  );
};

const Profile = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState('');
  const {changeImg, changeName} = useContext(ContextPrimary);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserDataProfile = async () => {
    setIsLoading(true);
    const userId = await AsyncStorage.getItem('USER_ID');
    const pId = await AsyncStorage.getItem('PATIENT_ID');
    const url = BASE_URL_C + `patient/new/` + pId;
    const data = await getData(url);
    console.log('URL', url, 'userId', userId);
    console.log('data received from API:', data?.data);
    if (data.error) {
      console.log({'error getting user data': data?.error});
      console.log({URL: url, STATUS: data.error});
      setProfileData('');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setProfileData(data.data);
      changeImg(data?.data?.imageURL);
    }
  };
  useEffect(() => {
    fetchUserDataProfile();
  }, [isFocused]);

  console.log({profileData});

  if (isLoading) {
    return (
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: SIZES.medium,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 20}}>
        <View
          style={{
            padding: SIZES.medium,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              height: 90,
              width: 90,
              borderWidth: 2,
              borderColor: '#000000',
              borderRadius: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {profileData === '' ? (
              <Image
                source={icons.profile}
                style={{
                  height: 40,
                  width: 40,
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={{uri: profileData.imageURL}}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                }}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
        <View>
          <CustomProfileTypography title={'Name'} value={profileData.name} />
          <CustomProfileTypography
            title={'Gender'}
            value={profileData.gender}
          />
          <CustomProfileTypography
            title={'Mobile'}
            value={`+91 ${profileData.mobile}`}
          />
          {/* <CustomProfileTypography
            title={'Aadhaar Number'}
            value={profileData.aadhaarNo || '123456789000'}
          /> */}
        </View>
        <CustomButton
          onPress={() => {
            navigation.navigate('EditProfile', {
              name: profileData.name,
              mobile: profileData.mobile,
              gender: profileData.gender,
              aadhaarNo: profileData.aadhaarNo,
              avatarUrl: profileData.imageURL,
            });
          }}
          label={'Edit Profile'}
          style={{
            width: 200,
            backgroundColor: '#000000',
            color: '#FFFFFF',
            borderColor: '#000000',
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
