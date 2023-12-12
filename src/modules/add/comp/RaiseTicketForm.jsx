import {
  StyleSheet,
  Alert,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, Button} from 'react-native-paper';
import DocumentPicker, {
  DocumentPickerOptions,
} from 'react-native-document-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {SIZES, icons} from '../../../constants';
import CustomTextField from '../../../components/customTextField/CustomTextField';
import CustomButton from '../../../components/customButton/CustomButton';
import {handleRaiseTicket} from '../../../global/apicall/apiCall';
import SearchRoom from '../../../components/roomAutocomplete/SearchRoom';
import {saveData} from '../../../global/services/apis/postApi';
import {BASE_URL_C} from '../../../global/utils/constantUrl';

const RaiseTicketForm = () => {
  const [formValues, setFormValues] = useState({
    patientName: '',
    patientMobile: '',
    room: '',
    remark: '',
  });
  // const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const selectDoc = async () => {
  //   try {
  //     const doc = await DocumentPicker.pickMultiple({
  //       type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
  //     });
  //     console.log(doc, 'document we choose');
  //     // Create a new array of files by spreading the existing files and adding the new ones
  //     setFiles([...files, ...doc]);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err))
  //       console.log('User cancelled the upload', err);
  //     else console.log(err);
  //   }
  // };

  // const removeFile = index => {
  //   // Create a copy of the files array without the file at the specified index
  //   const updatedFiles = [...files];
  //   updatedFiles.splice(index, 1);
  //   setFiles(updatedFiles);
  // };

  // const captureImage = async () => {
  //   Alert.alert(
  //     'Alert',
  //     'Choose an option',
  //     [
  //       {
  //         text: 'Camera',
  //         onPress: () =>
  //           ImageCropPicker.openCamera({
  //             width: 300,
  //             height: 400,
  //             cropping: true,
  //             compressImageQuality: 1,
  //             useFrontCamera: true,
  //           })
  //             .then(image => {
  //               console.log({camera: image});
  //               if (image.path) {
  //                 files.push({
  //                   uri: image.path,
  //                   name: image.path.substring(image.path.lastIndexOf('/') + 1),
  //                   type: image.mime,
  //                 });
  //                 setFiles(files);
  //               } else {
  //                 console.log('Image path is undefined or null.');
  //               }
  //             })
  //             .catch(error => {
  //               console.log({camera_error: error});
  //             }),
  //       },
  //       {
  //         text: 'Gallery',
  //         onPress: () => {
  //           selectDoc();
  //         },
  //       },
  //     ],
  //     {cancelable: true},
  //   );
  // };

  const onPress = async () => {
    if (formValues?.room === '') {
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
        complain: formValues.remark,
        remark: formValues.remark,
        branchId: branchId,
        roomId: formValues.room.id,
        occupantPatientId: formValues.room.occupantPatientId,
        occupantName: formValues.room.occupantName,
        occupantPhoneNumber: formValues.room.occupantPhoneNumber,
        raisedBy: formValues.patientName,
        raisedById: pId,
        ticketType: 'SECURITY_APP',
        ticketCategory: 'SECURITY_APP',
        ticketStatus: 'TICKET_RAISED',
      };
      const url = BASE_URL_C + 'securityApp/raiseTicket';
      console.log({payload});
      saveVisitor(url, payload);
    }
  };

  const saveVisitor = async (url, payload) => {
    setIsLoading(true);
    const result = await saveData(url, payload);
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
      setFormValues({
        patientName: '',
        patientMobile: '',
        room: '',
        remark: '',
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
          headingColor={'#A7A6A3'}
          borderColor={'#F6F6F6'}
          backgroundColor={'#F6F6F6'}
          heading="Raise By Name"
          placeHolder="Enter name"
          value={formValues.patientName}
          onChangeText={text =>
            setFormValues({...formValues, patientName: text})
          }
        />
        <CustomTextField
          headingColor={'#A7A6A3'}
          borderColor={'#F6F6F6'}
          backgroundColor={'#F6F6F6'}
          type="mobile"
          heading="Raised By Mobile"
          placeHolder="Enter phone number"
          value={formValues.patientMobile}
          onChangeText={text =>
            setFormValues({...formValues, patientMobile: text})
          }
        />

        <CustomTextField
          heading="Remarks"
          multiline={true}
          numberOfLines={7}
          textFieldheight={135}
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
          onPress={() => {
            onPress();
          }}
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

export default RaiseTicketForm;
