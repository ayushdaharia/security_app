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
import {useNavigation} from '@react-navigation/native';
import {formatTimeInmmhha} from '../../../global/utils/util';
import {saveData} from '../../../global/services/apis/postApi';
import {ActivityIndicator} from 'react-native-paper';

const AddVisitorForm = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
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
        visitorName: formValues?.visitorName,
        visitorMobile: formValues?.visitorMobile,
        visitorAddress: formValues?.visitorAddress,
        visitDate: formValues?.visitDate?.toISOString().split('T')[0],
        visitTime: formatTimeInmmhha(formValues.visitTime),
        branchId: branchId,
        roomId: formValues?.room?.id,
        roomType: formValues?.room?.roomType,
        securityId: pId,
      };
      const url = BASE_URL_C + 'securityApp/visitor';

      console.log(payload);

      saveVisitor(url, payload, navigation, setFormValues);
    }
  };

  console.log({VISITTIME: formatTimeInmmhha(formValues.visitTime)});

  const saveVisitor = async (url, payload, navigation, setFormValues) => {
    setIsLoading(true);
    const result = await saveData(url, payload);
    console.log(url);
    console.log({payload});
    console.log('result payload', result.data);
    if (result.error) {
      console.error(result.error);
      alert('Falied to Submit.');
      setIsLoading(false);
    } else {
      console.log({formValues_afterSubmit: result.data});
      alert('Succefully submited.');
      // navigation.goBack();
      setIsLoading(false);
      setFormValues({
        visitorName: '',
        visitorMobile: '',
        visitorAddress: '',
        visitDate: new Date(),
        room: '',
        visitTime: new Date(),
      });
    }
  };

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
  console.log({formValues});

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingHorizontal: SIZES.medium,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            formValues={formValues}
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
