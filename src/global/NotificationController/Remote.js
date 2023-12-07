import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import {Platform} from 'react-native';
import {saveData} from '../services/apis/postApi';
import {BASE_URL_C} from '../utils/constantUrl';
import RootNavigator from './RootNavigator';

export const requestUserPermission = async () => {
  console.log('request user permission fuction');
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
};

const getFcmToken = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('The Old FCM Token:', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('The new genrated FCM token: ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error, 'error raised in fcm Token');
    }
  }
};

export const saveFCM = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  const pId = await AsyncStorage.getItem('PATIENT_ID');
  const url = BASE_URL_C + 'patient/save/token';
  const os = Platform.OS;
  const params = {
    os: 'ANDROID',
    token: fcmToken,
    patientId: pId,
  };
  const result = await saveData(url, params);

  if (result.error) {
    console.error('Error sending Data');
  } else {
    console.log('success');
    console.log('saveToken', result.data);
  }
  console.log('OS:', os);
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state',
      remoteMessage,
    );
    RootNavigator.navigate('NotificationScreen', {
      remoteMessage: remoteMessage,
    });
  });

  messaging().onMessage(async remoteMessage => {
    console.log('Received in forground', remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //setLoading(false);
    });
};
