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
import React, {useState, useEffect} from 'react';
import CustomTextField from '../../../components/customTextField/CustomTextField';
import CustomButton from '../../../components/customButton/CustomButton';
import {SIZES, icons} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_C} from '../../../global/utils/constantUrl';
import ImagePicker from 'react-native-image-crop-picker';
import CustomTime from '../../../components/time/CustomTime';
import SearchRoom from '../../../components/roomAutocomplete/SearchRoom';
import {saveVisitor} from '../../../global/apicall/apiCall';
import {useNavigation} from '@react-navigation/native';
import {formatTimeInmmhha} from '../../../global/utils/util';

const AddVisitorForm = () => {
  const navigation = useNavigation();
  const [formValues, setFormValues] = useState({
    visitorName: '',
    visitorMobile: '',
    visitorAddress: '',
    visitDate: new Date(),
    room: '',
    visitTime: new Date(),
  });

  const onPress = async () => {
    if (formValues?.visitorName === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter name',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
      return;
    } else if (formValues?.room === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter room',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
      return;
    } else {
      const pId = await AsyncStorage.getItem('PATIENT_ID');
      const branchId = await AsyncStorage.getItem('BRANCH_ID');
      const payload = {
        patientId: pId,
        visitorName: formValues?.visitorName,
        visitorMobile: formValues?.visitorMobile,
        visitorAddress: formValues?.visitorAddress,
        roomId: formValues?.room?.id,
        roomType: formValues?.room?.roomType,
        branchId: branchId,
        visitDate: formValues?.visitDate?.toISOString().split('T')[0],
        visitTime: formatTimeInmmhha(formValues.visitTime),
        approvalStatus: 'PENDING_APPROVAL',
        visitId: 0,
        securityId: pId,
      };
      const url = 'https://atoz.care/api/securityApp/visitor';

      console.log(payload);

      saveVisitor(url, payload, navigation, setFormValues);
    }
  };

  console.log({formValues});

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 20}}>
        {/* <View
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
        </View> */}
        <SearchRoom formValues={formValues} setFormValues={setFormValues} />

        <CustomTextField
          heading="Name"
          width={'100%'}
          headingColor={'#A7A6A3'}
          borderColor={'#F6F6F6'}
          backgroundColor={'#F6F6F6'}
          placeHolder="Enter Name"
          value={formValues.visitorName}
          onChangeText={text =>
            setFormValues({...formValues, visitorName: text})
          }
        />

        <CustomTextField
          type="mobile"
          heading="Phone Number"
          headingColor={'#A7A6A3'}
          borderColor={'#F6F6F6'}
          backgroundColor={'#F6F6F6'}
          placeHolder="Enter Phone Number"
          value={formValues.visitorMobile}
          onChangeText={text =>
            setFormValues({...formValues, visitorMobile: text})
          }
        />
        <CustomTextField
          heading="Address"
          headingColor={'#A7A6A3'}
          borderColor={'#F6F6F6'}
          backgroundColor={'#F6F6F6'}
          placeHolder="Enter address"
          value={formValues.visitorAddress}
          onChangeText={text =>
            setFormValues({...formValues, visitorAddress: text})
          }
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
          }}>
          <CustomTime
            heading="Visit Time"
            headingColor={'#A7A6A3'}
            borderColor={'#F6F6F6'}
            backgroundColor={'#F6F6F6'}
            textColor={'#000000'}
            formValues={formValues} // Use formValues, not date
            setFormValues={setFormValues}
            propertyName="visitTime"
          />
        </View>
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

export default AddVisitorForm;

const styles = StyleSheet.create({});
