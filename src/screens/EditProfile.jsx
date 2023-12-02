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
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {BASE_URL_C} from '../global/utils/constantUrl';
import CustomTextField from '../components/customTextField/CustomTextField';
import CustomDropdown from '../components/dropDown/CustomDropdown';
import CustomButton from '../components/customButton/CustomButton';
import {SIZES, icons} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {submitHandler, uploadFile} from '../global/apicall/apiCall';

const EditProfile = ({route}) => {
  const [errorGender, setErrorGender] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const {name, mobile, gender, avatarUrl} = route.params;

  const [formValues, setFormValues] = useState({
    name: name !== '' ? name : '',
    gender: gender !== '' ? gender : '',
    mobile: mobile !== '' ? mobile : '',
    aadhaarNo: '',
  });

  console.log({formValues});

  const navigation = useNavigation();
  const [imageSrc, setImageSrc] = useState(avatarUrl || '');

  const GenderList = [{title1: 'MALE'}, {title1: 'FEMALE'}, {title1: 'OTHER'}];
  const handleItemSelect = selectedItem => {
    setFormValues({...formValues, gender: selectedItem.title1});
    console.log('Selected Item:', selectedItem.title1);
  };

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
                uploadFile(image, setImageSrc);
              })
              .catch(error => {
                console.log({camera_error: error});
              }),
        },
        {
          text: 'Gallery',
          onPress: () =>
            ImageCropPicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            })
              .then(image => {
                console.log({picker: image});
                uploadFile(image, setImageSrc);
              })
              .catch(error => {
                console.log({picker_error: error});
              }),
        },
      ],
      {cancelable: true},
    );
  };

  const onPress = async () => {
    if (formValues?.name === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter name',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
      return;
    } else if (formValues?.gender === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please select gender',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
      return;
    } else {
      const url = BASE_URL_C + 'patient/userId';
      const userId = await AsyncStorage.getItem('USER_ID');
      const authId = await AsyncStorage.getItem('ID_NEW');
      console.log({userId});

      const payload = {
        authId: authId,
        imageURL: imageSrc,
        name: formValues.name,
        userId: userId,
        mobile: formValues.mobile,
        gender: formValues.gender || null,
      };
      console.log({payload});
      submitHandler(url, payload, navigation, setFormValues);
    }
  };
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
          borderColor={'#F6F6F6'}
          value={formValues.name}
          onChangeText={text => setFormValues({...formValues, name: text})}
          backgroundColor={'#F6F6F6'}
          placeHolder={'Enter name'}
        />
        <CustomDropdown
          heading="Gender Select"
          headingColor={'#A7A6A3'}
          borderColor={'#F6F6F6'}
          backgroundColor={'#F6F6F6'}
          data={GenderList}
          formValues={formValues}
          onSelect={handleItemSelect}
          placeholder="Select Gender"
          propertyName="gender"
          // selectedItemColor={COLORS.gray}
          // borderColor={errorGender ? 'red' : COLORS.gray}
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

export default EditProfile;

const styles = StyleSheet.create({});
