import AsyncStorage from '@react-native-async-storage/async-storage';
// import FileViewer from 'react-native-file-viewer';
// import RNFS from 'react-native-fs';

export const storeToken = async value => {
  try {
    await AsyncStorage.setItem('ACCESS_TOKEN', value);
  } catch (e) {
    // saving error
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('ACCESS_TOKEN');
  } catch (e) {
    // error reading value
  }
  return null;
};

export const getToken1 = async () => {
  const resolved = {
    token: null,
  };
  try {
    resolved.token = await AsyncStorage.getItem('ACCESS_TOKEN');
  } catch (e) {
    // error reading value
  }
  return resolved;
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getStoredData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // error reading value
  }
  return null;
};

export function getCurrentDateAndTimeFormatted(separator = '') {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hour = newDate.getHours();
  let minutes = newDate.getMinutes();
  let seconds = newDate.getSeconds();

  let m = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let monthStr = m[month - 1];

  return `${date}${separator}${monthStr}${separator}${year}${separator}${hour}${':'}${minutes}`;
}

// export const openPDFFiles = url => {
//   const abc = url;
//   const f2 = url?.split('/');
//   const fileName = f2[f2?.length - 1];
//   const fileExtention = url?.split('.')[3];
//   const localFile = `${RNFS?.DocumentDirectoryPath}/${fileName}`;
//   const options = {
//     fromUrl: url,
//     toFile: localFile,
//   };

//   RNFS?.downloadFile(options)
//     ?.promise?.then(() => FileViewer?.open(localFile))
//     ?.then(() => {
//       // success
//       // Here you can perform any of your completion tasks
//     })
//     .catch(error => {
//       // error
//     });
// };

export const formatTimeInmmhha = originalDateString => {
  const originalDate = new Date(originalDateString);

  const hours = originalDate?.getHours();
  const minutes = originalDate?.getMinutes();

  // Determine AM or PM
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format and add leading zero
  const formattedHours =
    ((hours + 11) % 12) + 1 < 10
      ? `0${((hours + 11) % 12) + 1}`
      : ((hours + 11) % 12) + 1;

  // Add leading zero to single-digit minutes
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
};
