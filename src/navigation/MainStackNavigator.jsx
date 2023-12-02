import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import SetupProfile from '../screens/SetupProfile';
import EditProfile from '../screens/EditProfile';
import MainBottomNavigator from './MainBottomNavigator';
import MainDrawerNavigator from './MainDrawerNavigator';
import {COLORS, SIZES, icons} from '../constants';
import {ScreenHeaderBtn} from '../components';
import Splash from '../screens/Splash';
import Tickets from '../screens/Room';
import Room from '../screens/Room';
import Notification from '../screens/Notification';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Drawer"
        component={MainDrawerNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetupProfile"
        component={SetupProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={Notification}
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View
              style={{
                paddingLeft: SIZES.medium,
              }}>
              <ScreenHeaderBtn
                iconUrl={icons.squareLeftIcon}
                dimension="80%"
                handlePress={() => {
                  navigation.goBack();
                }}
              />
            </View>
          ),
          headerTitle: 'Notifications',
          title: '',
        }}
      />
      <Stack.Screen
        name="Rooms"
        component={Room}
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View
              style={{
                paddingLeft: SIZES.medium,
              }}>
              <ScreenHeaderBtn
                iconUrl={icons.squareLeftIcon}
                dimension="80%"
                handlePress={() => {
                  navigation.goBack();
                }}
              />
            </View>
          ),
          headerTitle: 'Rooms',
          title: '',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View
              style={{
                paddingLeft: SIZES.medium,
              }}>
              <ScreenHeaderBtn
                iconUrl={icons.squareLeftIcon}
                dimension="80%"
                handlePress={() => {
                  navigation.goBack();
                }}
              />
            </View>
          ),
          headerTitle: 'Edit Profile',
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
