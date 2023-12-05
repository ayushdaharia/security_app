import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ToastAndroid, Alert} from 'react-native';
import {storeData} from '../utils/util';
import {BASE_URL_C} from '../utils/constantUrl';
import {getData} from '../services/apis/getApi';
import {saveData} from '../services/apis/postApi';

const bgColors = ['#F4527C', '#7F6BE2', '#3CCAAC', '#FF8556'];

export const getCorpEMPDetails = async (userData, mobile, navigation) => {
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

  console.log({ISACTIVE: userData.isActive});
  if (userData.isActive) {
    navigation.replace('Drawer');
  } else {
    navigation.replace('SetupProfile', {
      mobile: mobile,
      employee: employee.data,
    });
  }
  console.log({employee_success: employee.data});
};

export const handleRaiseTicket = async (
  setIsLoading,
  remark,
  setRemark,
  files,
  setFiles,
) => {
  setIsLoading(true);
  const [access_token, myCorpId, empId] = await AsyncStorage.multiGet([
    'ACCESS_TOKEN',
    'CORP_ID',
    'Emp_ID',
  ]);

  let formData = new FormData();
  formData.append('empId', empId[1]);
  formData.append('corpId', myCorpId[1]);
  formData.append('remarks', remark);
  formData.append('status', 'TICKET_RAISED');
  formData.append('ticketType', 'CORP');
  formData.append('ticketMode', 'MOBILE_APP');
  formData.append('ticketCategory', 'CORP');

  files?.forEach((file, index) => {
    formData.append('file', file);
  });

  const url = 'https://atoz.care/api/org/raiseTicket';
  const result = await axios({
    method: 'post',
    url: url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${access_token[1]}`,
    },
  });

  if (result?.error) {
    alert('An error occured!');
    setIsLoading(false);
    console.log({Error: result.status});
  } else {
    alert('Successfully Saved!');
    setRemark('_remark');
    setIsLoading(false);
    setFiles([]);
  }

  return setFiles([]), setIsLoading(false), setRemark('');
};

export const uploadFile = async (image, setImageSrc) => {
  if (!image) {
    console.error('Image URI is undefined or missing.');
    return;
  }

  const access_token = await AsyncStorage.getItem('ACCESS_TOKEN');
  const pId = await AsyncStorage.getItem('PATIENT_ID');
  const formData = new FormData();
  const file = {
    uri: image.path,
    name: image.path.substring(image.path.lastIndexOf('/') + 1),
    type: image.mime,
  };
  formData.append('file', file);

  const url = BASE_URL_C + 'patient/profilePic/upload?patientId=' + pId;

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
    await AsyncStorage.setItem('AVATAR_URL', result.imageURL);
    setImageSrc(result?.imageURL);
    Alert.alert('Alert', 'Successfully Uploaded');
    console.log({image_upload: result});
  } catch (error) {
    console.error(error);
    Alert.alert('Alert', 'Failed to Upload');
  }
};

export const submitHandler = async (
  url,
  payload,
  navigation,
  setFormValues,
) => {
  const result = await saveData(url, payload);
  console.log('result payload', result);
  if (result.error) {
    console.error(result.error);
    alert('Falied to Submit.');
  } else {
    console.log({formValues_afterSubmit: result.data});
    alert('Succefully submited.');
    navigation.goBack();
    setFormValues({
      name: '',
      gender: '',
      aadhaarNo: '',
      mobile: '',
    });
  }
};

export const fetchUserDataProfile = async (setProfileData, changeImg) => {
  const userId = await AsyncStorage.getItem('USER_ID');
  const pId = await AsyncStorage.getItem('PATIENT_ID');
  const url = BASE_URL_C + `patient/new/` + pId;
  console.log({url});
  const data = await getData(url);
  changeImg(data?.data?.imageURL);
  console.log('fetchDisplayName called with userId:', userId);
  console.log('data received from API:', data?.data);
  if (data.error) {
    console.log({'error getting user data': data?.error});
    setProfileData('');
  } else {
    setProfileData(data.data);
  }
};

export const saveVisitor = async (url, payload, navigation, setFormValues) => {
  const result = await saveData(url, payload);
  console.log(url);
  console.log(payload);
  console.log('result payload', result.data);
  if (result.error) {
    console.error(result.error);
    alert('Falied to Submit.');
  } else {
    console.log({formValues_afterSubmit: result.data});
    alert('Succefully submited.');
    navigation.goBack();
    setFormValues({
      name: '',
      room: '',
      visitTime: '',
      visitAddress: '',
      mobile: '',
    });
  }
};

export const fetchRoomNameList = async setRoomList => {
  const branchId = await AsyncStorage.getItem('BRANCH_ID');
  const url = BASE_URL_C + `securityApp/room/search?branchId=${branchId}`;

  const data = await getData(url);
  let tempData = [];
  if (data.error) {
    console.log({'error getting Room Name List': data.error});
    console.log({URL: url, STATUS: data.error});

    setRoomList([]);
  } else {
    tempData = data.data.map((item, index) => ({
      ...item,
      bgC: bgColors[index % bgColors.length],
    }));
  }
  return setRoomList(tempData);
};

export const fetchVisitorList = async setVisitorList => {
  const branchId = await AsyncStorage.getItem('BRANCH_ID');
  const url = BASE_URL_C + 'securityApp/visitor/' + branchId;

  const data = await getData(url);

  let tempData = [];
  if (data.error) {
    setVisitorList([]);
    console.log({ROOMLIST: data.error});
    console.log({URL: url, STATUS: data.error});
    console.log({'error getting VisitorList': data.error});
  } else {
    tempData = data.data.map((item, index) => ({
      ...item,
      bgC: bgColors[index % bgColors.length],
    }));
  }
  return setVisitorList(tempData);
};
export const fetchHomeCardValues = async setHomeCardValues => {
  const branchId = await AsyncStorage.getItem('BRANCH_ID');
  const url = BASE_URL_C + 'securityApp/homepage/' + branchId;

  const data = await getData(url);
  let tempData = [];
  if (data.error) {
    console.log({'error getting HomeCard Values': data.error});
    setHomeCardValues([]);
    console.log({ROOMLIST: data.data});
  } else {
    tempData = data.data;
  }
  return setHomeCardValues(tempData);
};

export const markApproved = async visitId => {
  const branchId = await AsyncStorage.getItem('BRANCH_ID');
  const url = BASE_URL_C + 'securityApp/markApproval';
  const Obj = {
    visitId: visitId,
    branchId: branchId,
    appApproval: 'APPROVED',
  };
  console.log({url: url, obj: Obj});
  const data = await saveData(url, Obj);
  if (data.error) {
    alert('An error occured!');
    console.log({Error: data.error});
  } else {
    alert('Saved Successfully!');
  }
};

export const markRejected = async visitId => {
  const branchId = await AsyncStorage.getItem('BRANCH_ID');
  const url = BASE_URL_C + 'securityApp/markApproval';
  const Obj = {
    visitId: visitId,
    branchId: branchId,
    appApproval: 'REJECTED',
  };
  console.log({url: url, obj: Obj});
  const data = await saveData(url, Obj);

  if (data.error) {
    alert('An error occured!');
    console.log({Error: data.error});
  } else {
    alert('Saved Successfully!');
  }
};
export const markExit = async (visitId, exitTime) => {
  const branchId = await AsyncStorage.getItem('BRANCH_ID');
  const url = BASE_URL_C + 'securityApp/markExit';
  const Obj = {
    visitId: visitId,
    branchId: branchId,
    exitTime: exitTime,
  };
  console.log({url: url, obj: Obj});
  const data = await saveData(url, Obj);
  if (data.error) {
    alert('An error occured!');
    console.log({Error: data.error});
  } else {
    alert('Saved Successfully!');
  }
};
