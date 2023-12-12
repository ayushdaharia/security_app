import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Approved from './comps/Approved';
import Visited from './comps/Visited';
import {getData} from '../../global/services/apis/getApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {COLORS, SIZES} from '../../constants';
import Pending from './comps/Pending';
import {
  bgColors,
  fetchUserRole,
  fetchVisitorsList,
} from '../../global/apicall/apiCall';
import {BASE_URL_C} from '../../global/utils/constantUrl';

const TopTab = createMaterialTopTabNavigator();

const VisitorMain = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchUserRole(setUserRole);
  }, []);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: SIZES.medium,
      }}>
      <TopTab.Navigator
        initialRouteName="Pending"
        screenOptions={{
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#FFFFFF',
          tabBarIndicatorStyle: {
            backgroundColor: '#127DDD',
            height: '100%',
            borderRadius: 10,
          },
          tabBarLabelStyle: {
            textTransform: 'capitalize',
          },
          tabBarStyle: {
            alignSelf: 'center',
            width: '99%',
            borderRadius: 10,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: '#F6F6F6',
            borderRadius: 10,
          },
        }}>
        <TopTab.Screen name="Pending" component={Pending} />

        <TopTab.Screen name="Approved" component={Approved} />
        <TopTab.Screen
          name={userRole === 'SECURITY_PERSONNEL' ? 'Visited' : 'Rejected'}
          component={Visited}
        />
      </TopTab.Navigator>
    </View>
  );
};

export default VisitorMain;

const styles = StyleSheet.create({});
