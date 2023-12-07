import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {BASE_URL_C} from '../global/utils/constantUrl';
import CustomTextField from '../components/customTextField/CustomTextField';
import CustomDropdown from '../components/dropDown/CustomDropdown';
import CustomButton from '../components/customButton/CustomButton';
import {COLORS, SIZES, icons} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {saveData} from '../global/services/apis/postApi';
import {ContextPrimary} from '../global/context/context';
import {storeData} from '../global/utils/util';

const SetupProfile = ({route}) => {
  const {mobile} = route.params;
  const [errorGender, setErrorGender] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const navigation = useNavigation();
  const {changeImg, changeName} = useContext(ContextPrimary);
  const [formValues, setFormValues] = useState({
    name: '',
    gender: '',
    mobile: mobile || '',
    aadhaarNo: '',
  });
  const [imageSrc, setImageSrc] = useState(null);

  const captureImage = async () => {
    Alert.alert(
      'Select an Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () =>
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
              compressImageQuality: 1,
              useFrontCamera: true,
            })
              .then(image => {
                console.log({camera: image});
                uploadFile(image);
              })
              .catch(error => {
                console.log({camera_error: error});
              }),
        },
        {
          text: 'Gallery',
          onPress: () =>
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            })
              .then(image => {
                console.log({picker: image});
                uploadFile(image);
              })
              .catch(error => {
                console.log({picker_error: error});
              }),
        },
      ],
      {cancelable: true},
    );
  };

  const uploadFile = async image => {
    if (!image) {
      console.error('Image URI is undefined or missing.');
      return;
    }

    const access_token = await AsyncStorage.getItem('ACCESS_TOKEN');
    const userId = await AsyncStorage.getItem('USER_ID');
    const formData = new FormData();
    const file = {
      uri: image.path,
      name: image.path.substring(image.path.lastIndexOf('/') + 1),
      type: image.mime,
    };
    formData.append('file', file);

    const url = BASE_URL_C + 'patient/profilePic/upload?userId=' + userId;
    console.log({access_token});
    try {
      const response = await axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access_token}`,
        },
      });

      const result = await response.data;
      console.log({result});
      await AsyncStorage.setItem('AVATAR_URL', result.imageURL);
      setImageSrc(result.imageURL);
      changeImg(result.imageURL || null);
      Alert.alert('Alert', 'Successfully Uploaded');
      console.log({image_upload: result});
    } catch (error) {
      console.error(error);
      Alert.alert('Alert', 'Failed to Upload');
    }
  };

  const submitHandler = async () => {
    const url = BASE_URL_C + 'patient/userId';
    const userId = await AsyncStorage.getItem('USER_ID');
    const authId = await AsyncStorage.getItem('ID_NEW');
    const payload = {
      name: formValues.name,
      gender: formValues.gender,
      userId: userId,
      authId: authId,
      mobile: formValues.mobile,
      aadhaarNo: formValues.aadhaarNo,
    };

    const result = await saveData(url, payload);

    if (result.error) {
      console.error(result.error);
      Alert.alert('Falied to Submit.');
    } else {
      const patientId = result?.data?.patientId;
      console.log({patientId});
      storeData('PATIENT_ID', patientId?.toString());
      console.log({formValues_afterSubmit: result.data});
      changeName(result.data.name || null);
      Alert.alert('Succefully submited.');
      navigation.replace('Drawer');
      setErrorGender(false);
      setErrorName(false);
      setFormValues({
        name: '',
        gender: '',
        mobile: '',
        aadhaarNo: '',
      });
    }
  };

  const onPress = async () => {
    if (formValues.name === '') {
      setErrorName(true);
      ToastAndroid.showWithGravityAndOffset(
        'Enter a valid Name',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
      return;
    } else if (formValues.gender === '') {
      setErrorGender(true);
      ToastAndroid.showWithGravityAndOffset(
        'Select a valid Gender',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
      return;
    } else {
      submitHandler();
    }
  };

  const GenderList = [{title1: 'MALE'}, {title1: 'FEMALE'}, {title1: 'OTHER'}];
  const handleItemSelect = selectedItem => {
    setFormValues({...formValues, gender: selectedItem.title1});
    console.log('Selected Item:', selectedItem.title1);
  };

  console.log({formValues});
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
            {imageSrc === '' || imageSrc === null ? (
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
                source={{uri: imageSrc}}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  margin: 5,
                }}
                resizeMode="contain"
              />
            )}
          </View>
          <View
            style={{
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={() => captureImage()}>
              <Text style={{color: '#A7A6A3'}}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomTextField
          heading={'Name'}
          headingColor={'#A7A6A3'}
          borderColor={errorName ? 'red' : '#F6F6F6'}
          value={formValues.name}
          onChangeText={text => setFormValues({...formValues, name: text})}
          backgroundColor={'#F6F6F6'}
          placeHolder={'Enter name'}
        />
        <CustomDropdown
          heading="Gender Select"
          headingColor={'#A7A6A3'}
          backgroundColor={'#F6F6F6'}
          data={GenderList}
          formValues={formValues}
          onSelect={handleItemSelect}
          placeholder="Select Gender"
          propertyName="gender"
          selectedItemColor={'#000000'}
          borderColor={errorGender ? 'red' : '#F6F6F6'}
        />
        <CustomTextField
          headingColor={'#A7A6A3'}
          borderColor={'#F6F6F6'}
          backgroundColor={'#F6F6F6'}
          type="mobile"
          heading="Phone Number"
          placeHolder="Enter phone number"
          value={formValues.mobile}
          onChangeText={text => setFormValues({...formValues, mobile: text})}
        />
        <CustomTextField
          headingColor={'#A7A6A3'}
          borderColor={'#F6F6F6'}
          backgroundColor={'#F6F6F6'}
          type="numeric"
          heading="Aadhaar Number"
          placeHolder="Enter 12 digit aadhaar number"
          value={formValues.aadhaarNo}
          maxLength={12}
          onChangeText={text => setFormValues({...formValues, aadhaarNo: text})}
        />
        <CustomButton
          onPress={() => onPress()}
          label={'Save'}
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

export default SetupProfile;

const styles = StyleSheet.create({});
