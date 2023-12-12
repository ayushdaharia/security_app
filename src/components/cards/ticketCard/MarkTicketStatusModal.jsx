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

const MarkTicketStatusModal = ({open, setOpen, data, setFetch}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [remark, setRemark] = useState('');
  const onPress = async () => {
    if (remark === '') {
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
        ticketId: data?.ticketId,
        remarks: remark,
        complain: data?.complain,
        branchId: branchId,
        occupantPatientId: data?.occupantPatientId,
        occupantName: data?.occupantName,
        occupantPhoneNumber: data?.occupantPhoneNumber,
        raisedBy: data?.raisedBy,
        raisedById: pId,
        raisedByMobileNo: data?.raisedByMobileNo,
        ticketType: 'SECURITY_APP',
        ticketCategory: 'SECURITY_APP',
        ticketStatus:
          data?.ticketStatus === 'TICKET_RAISED'
            ? 'IN_PROGRESS'
            : data?.ticketStatus === 'IN_PROGRESS'
            ? 'COMPLETED'
            : 'PENDING',
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
      setIsLoading(false);
    } else {
      console.log({formValues_afterSubmit: result.data});
      alert('Succefully submited.');
      setIsLoading(false);
      setRemark('');
      setOpen(false);
      setFetch(true);
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
            height: 245,
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
          <CustomTextField
            heading="Remarks"
            multiline={true}
            numberOfLines={5}
            textFieldheight={100}
            textAlignVertical="top"
            width={'100%'}
            headingColor={'#A7A6A3'}
            borderColor={'#F6F6F6'}
            backgroundColor={'#F6F6F6'}
            placeHolder="Enter Remarks"
            value={remark}
            onChangeText={text => setRemark(text)}
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
