import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES} from '../../constants';
import AddVisitorForm from './comps/AddVisitorForm';

const AddMainSP = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: SIZES.medium,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#F4F4F4',
          borderRadius: 5,
        }}>
        <View
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#000000',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFFFFF',
            }}>
            Add Visitor
          </Text>
        </View>
      </View>
      <AddVisitorForm />
    </SafeAreaView>
  );
};

export default AddMainSP;

const styles = StyleSheet.create({});
