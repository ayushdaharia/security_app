import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginMain from '../modules/LoginComp/LoginMain';

const Login = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: Platform.OS === 'ios' ? 20 : 0,
      }}>
      <LoginMain />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
