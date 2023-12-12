import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RaiseTicketForm from './comp/RaiseTicketForm';
import AddVisitorForm from './comp/AddVisitorForm';
import {SIZES} from '../../constants';

const TopTab = createMaterialTopTabNavigator();

const AddMain = () => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: SIZES.medium,
      }}>
      <TopTab.Navigator
        initialRouteName="Raise Ticket"
        screenOptions={{
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#FFFFFF',
          tabBarIndicatorStyle: {
            backgroundColor: '#000000',
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
        <TopTab.Screen name="Raise Ticket" component={RaiseTicketForm} />
        <TopTab.Screen name="Add Visitor" component={AddVisitorForm} />
      </TopTab.Navigator>
    </View>
  );
};

export default AddMain;

const styles = StyleSheet.create({});
