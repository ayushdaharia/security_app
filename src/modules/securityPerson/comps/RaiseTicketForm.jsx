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

const RaiseTicketForm = () => {
  const [remark, setRemark] = useState('');
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      console.log(doc, 'document we choose');
      // Create a new array of files by spreading the existing files and adding the new ones
      setFiles([...files, ...doc]);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };

  const removeFile = index => {
    // Create a copy of the files array without the file at the specified index
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const captureImage = async () => {
    Alert.alert(
      'Alert',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () =>
            ImageCropPicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
              compressImageQuality: 1,
              useFrontCamera: true,
            })
              .then(image => {
                console.log({camera: image});
                if (image.path) {
                  files.push({
                    uri: image.path,
                    name: image.path.substring(image.path.lastIndexOf('/') + 1),
                    type: image.mime,
                  });
                  setFiles(files);
                } else {
                  console.log('Image path is undefined or null.');
                }
              })
              .catch(error => {
                console.log({camera_error: error});
              }),
        },
        {
          text: 'Gallery',
          onPress: () => {
            selectDoc();
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 20}}>
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
          value={remark}
          onChangeText={text => setRemark(text)}
        />

        <TouchableOpacity
          onPress={() => {
            captureImage();
          }}
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            backgroundColor: '#000000',
            padding: 10,
            width: 140,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text style={{color: '#FFFFFF', fontWeight: '500', fontSize: 17}}>
            Upload
          </Text>
          <Image
            source={icons.uploadIcon}
            style={{height: 25, width: 25, marginLeft: 10}}
          />
        </TouchableOpacity>

        {files.map((file, index) => (
          <View
            key={index}
            style={{
              marginVertical: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Image
              source={{uri: file.uri}}
              style={{height: 70, width: 70}}
              resizeMode="contain"
            />
            <View style={{gap: 7}}>
              <Text style={{color: '#000000'}}>{file.name}</Text>
              <View
                style={{
                  height: 3,
                  width: 220,
                  backgroundColor: '#000000',
                }}></View>
              <Text style={{color: '#000000'}}>{file.size}</Text>
            </View>

            <TouchableOpacity onPress={() => removeFile(index)}>
              <Image
                source={icons.trashIcon}
                tintColor={'red'}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ))}

        <CustomButton
          onPress={() =>
            handleRaiseTicket(setIsLoading, remark, setRemark, files, setFiles)
          }
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

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ABB2B9',
  },
  inputStyle: {
    width: '100%',
    flex: 1,
    fontSize: SIZES.medium,
    color: '#000000',
    height: 100,
  },
  selectedImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
  },
  removeText: {
    color: 'red',
    textAlign: 'center',
  },
});
