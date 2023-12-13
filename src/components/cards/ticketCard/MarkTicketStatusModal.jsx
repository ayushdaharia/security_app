import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextField from '../../customTextField/CustomTextField';
import CustomButton from '../../customButton/CustomButton';
import {icons} from '../../../constants';
import {updateData} from '../../../global/services/apis/postApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_C} from '../../../global/utils/constantUrl';
import CustomDropdown from '../../dropDown/CustomDropdown';

const MarkTicketStatusModal = ({open, setOpen, data, setFetch}) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [remark, setRemark] = useState('');
  const [formValues, setFormValues] = useState({
    status: '',
    remark: '',
  });

  const onPress = async () => {
    if (formValues.remark === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter Remark',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
      return;
    } else if (formValues.status === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please Select Status',
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
        ticketId: data?.ticketId,
        remarks: formValues.remark,
        raisedBy: data?.raisedBy,
        raisedById: pId,
        raisedByMobileNo: data?.raisedByMobileNo,
        ticketStatus: formValues.status,
      };
      const url = BASE_URL_C + 'securityApp/updateTicketStatus';
      console.log({payload});
      saveVisitor(url, payload);
    }
  };

  const saveVisitor = async (url, payload) => {
    setIsLoading(true);
    const result = await updateData(url, payload);
    // console.log(url);
    // console.log({payload});
    console.log('result payload', result.data);
    if (result.error) {
      console.error(result.error);
      alert('Falied to Submit.');
      ToastAndroid.showWithGravityAndOffset(
        'Falied to Submit!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
      setIsLoading(false);
    } else {
      console.log({formValues_afterSubmit: result.data});
      // alert('Succefully submited.');
      ToastAndroid.showWithGravityAndOffset(
        'Succefully submited!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60,
      );
      setIsLoading(false);
      setFormValues({
        remark: '',
        status: '',
      });
      setOpen(false);
      setFetch(true);
    }
  };

  const StatusList = [
    {title1: 'IN_PROGRESS', disable: false},
    {title1: 'BLOCKED', disable: false},
    {title1: 'COMPLETED', disable: false},
  ];
  const handleItemSelect = selectedItem => {
    setFormValues({...formValues, status: selectedItem.title1});
    console.log('Selected Item:', selectedItem.title1);
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

  return (
    <Modal
      visible={open}
      onDismiss={() => setOpen(false)}
      onRequestClose={() => setOpen(false)}
      animationType="fade"
      transparent={true}
      presentationStyle="overFullScreen">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            width: '90%',
            height: 300,
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingBottom: 10,
            paddingTop: 10,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '500',
                  color: '#000000',
                  textAlign: 'center',
                }}>
                Mark Ticket Status
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Image
                  source={icons.crossIcon}
                  style={{height: 24, width: 24, tintColor: '#000000'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <CustomDropdown
            heading="Select Status"
            headingColor={'#A7A6A3'}
            borderColor={'#F6F6F6'}
            backgroundColor={'#F6F6F6'}
            data={StatusList}
            modalTtile={'Select Status'}
            formValues={formValues}
            onSelect={handleItemSelect}
            placeholder="Select Status"
            propertyName="status"
            // selectedItemColor={COLORS.gray}
            // borderColor={errorGender ? 'red' : COLORS.gray}
          />
          <CustomTextField
            heading="Remarks"
            multiline={true}
            numberOfLines={5}
            textFieldheight={70}
            textAlignVertical="top"
            width={'100%'}
            headingColor={'#A7A6A3'}
            borderColor={'#F6F6F6'}
            backgroundColor={'#F6F6F6'}
            placeHolder="Enter Remarks"
            value={formValues.remark}
            onChangeText={text => setFormValues({...formValues, remark: text})}
          />

          <CustomButton
            label={'Save'}
            style={{width: 150, backgroundColor: '#000000'}}
            onPress={() => {
              onPress();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MarkTicketStatusModal;

const styles = StyleSheet.create({});
