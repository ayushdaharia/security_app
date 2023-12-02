import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import {ContextPrimary} from './src/global/context/context';
import {
  notificationListener,
  requestUserPermission,
} from './src/global/NotificationController/Remote';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {Modal} from 'react-native-paper';
import {COLORS, icons} from './src/constants';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {markApproved, markRejected} from './src/global/apicall/apiCall';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationBody, setNotificationBody] = useState('');
  const [notificationData, setNotificationData] = useState('');

  const navigationRef = useNavigationContainerRef();
  useEffect(() => {
    requestUserPermission();
    notificationListener();
    messaging().onMessage(async remoteMessage => {
      console.log('Received in forground', remoteMessage);
      setModalVisible(true);
      setNotificationTitle(remoteMessage.notification.title);
      setNotificationBody(remoteMessage.notification.body);
      setNotificationData(remoteMessage.data);
    });
    messaging().getInitialNotification(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, [navigationRef]);

  const [profileimg, setProfileimg] = useState('');
  const [userName, setUserName] = useState('');

  const changeImg = value => {
    setProfileimg(value);
  };

  const changeName = value => {
    setUserName(value);
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <ContextPrimary.Provider
          value={{
            profileimg,
            changeImg,
            userName,
            changeName,
          }}>
          <MainStackNavigator />
        </ContextPrimary.Provider>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.gray2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: 150,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -30,
                }}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: 5,
                    height: 65,
                    width: 65,
                    borderRadius: 31,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FF525B',
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={icons.notification}
                      style={{height: 45, width: 45}}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 20,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  {notificationTitle || 'Notification In Foreground'}
                </Text>
                {/* <View
                  style={{
                    width: '100%',
                    borderWidth: 0.5,
                    height: 1,
                    backgroundColor: '#000000',
                    marginVertical: 10,
                  }}></View>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 18,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  {notificationBody || 'This is the First Notification.'}
                </Text>*/}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: -40,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: 5,
                      height: 65,
                      width: 65,
                      borderRadius: 31,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        markRejected(notificationData?.visitId);
                        setModalVisible(false);
                      }}
                      style={{
                        backgroundColor: '#FFFFFF',
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        borderColor: 'red',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={icons.crossIcon}
                        style={{height: 45, width: 45}}
                        resizeMode="contain"
                        tintColor={'red'}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={{color: '#FFFFFF', fontWeight: 700}}>
                    REJECT
                  </Text>
                </View>
                <View
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: -40,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: 5,
                      height: 65,
                      width: 65,
                      borderRadius: 31,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        markApproved(notificationData?.visitId);
                        setModalVisible(false);
                      }}
                      style={{
                        backgroundColor: '#57D08D',
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={icons.rightIcon}
                        style={{height: 45, width: 45}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={{color: '#FFFFFF', fontWeight: 700}}>
                    APPROVE
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
