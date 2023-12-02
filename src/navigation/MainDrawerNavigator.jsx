import {
  Alert,
  BackHandler,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainBottomNavigator from './MainBottomNavigator';
import {SIZES, icons, images} from '../constants';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../global/utils/constantUrl';
import {getUserToken} from '../global/services/apis/apiCalls';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  const navigation = useNavigation();

  const logout = async () => {
    const userId = await AsyncStorage.getItem('USER_ID');

    console.log(userId);
    const url = BASE_URL + 'auth/logout';
    console.log(url);
    const obj = {
      username: userId,
    };
    const data = await getUserToken(url, obj);

    if (data.error) {
      console.log(data.error);
    } else {
      await AsyncStorage.clear();
      await AsyncStorage.removeItem('ACCESS_TOKEN');
      await AsyncStorage.removeItem('MOBILE_NO');
      await AsyncStorage.removeItem('USER_ID');
      console.log('success');
      navigation.replace('Login');
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  };
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };
  return (
    <Drawer.Navigator
      initialRouteName="MainBottomNavigator"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 250,
        },
        drawerLabelStyle: {color: '0A276B'},
      }}
      drawerContent={props => {
        return (
          <SafeAreaView>
            <View
              style={{
                padding: 10,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: '#000000',
              }}>
              <Image
                source={images.unocareLogo}
                style={{height: 100, width: 230}}
                resizeMode="contain"
              />
              <Text style={{marginTop: -20, fontSize: SIZES.medium}}>
                Sab Theek Ho Jaega
              </Text>
            </View>
            <DrawerItemList {...props} />
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Logout', 'Do you want to Logout?', [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      navigation.replace('Drawer');
                    },
                    style: 'cancel',
                  },
                  {text: 'Ok', onPress: () => logout()},
                ]);
              }}>
              <View
                style={{
                  paddingHorizontal: 18,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  style={{height: 30, width: 30, tintColor: '#000000'}}
                />
                <Text
                  style={{
                    color: '#0A276B',
                    fontSize: SIZES.large,
                    fontWeight: '500',
                    marginLeft: 30,
                  }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        );
      }}>
      <Drawer.Screen
        name="MainBottomNavigator"
        component={MainBottomNavigator}
        options={{
          headerShown: false,
          drawerLabel: 'Home',
          title: 'Home',
          drawerLabelStyle: {
            fontSize: SIZES.large,
          },
          drawerInactiveTintColor: '#0A276B',
          drawerActiveTintColor: '#FFFFFF',
          drawerActiveBackgroundColor: '#000000',
          drawerContentStyle: {
            borderRadius: 10,
          },
          drawerIcon: ({focused}) => (
            <Image
              source={focused ? icons.drawerHome : icons.homeIcon}
              resizeMode="contain"
              style={{height: 25, width: 25}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;

const styles = StyleSheet.create({});
