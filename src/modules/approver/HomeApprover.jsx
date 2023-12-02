import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {icons} from '../../constants';

const HomeApprover = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.push('PendingApproval')}
        style={{
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
          borderRadius: 12,
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{height: 80}}>
          <Image
            source={icons.pendingApprovalIcon}
            style={{
              height: 60,
              width: 60,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={{height: 80}}>
          <Text style={{color: '#000000'}}>Pending Approvals</Text>
          <Text style={{color: '#000000', fontSize: 18}}>1002</Text>
          <Text style={{color: '#000000', marginTop: 17}}>View All</Text>
        </View>
        <View style={{height: 80}}>
          <Image
            source={icons.lineChartIcon}
            style={{height: 40, width: 40}}
            resizeMode="contain"
          />
          <Text style={{textAlign: 'center', color: '#000000'}}>40%</Text>
          <Text style={{color: '#000000'}}>this month</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.push('TotalVisitor')}
        style={{
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
          borderRadius: 12,
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{height: 80}}>
          <Image
            source={icons.visitorIcon}
            style={{
              height: 60,
              width: 60,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={{height: 80}}>
          <Text style={{color: '#000000'}}>Total Visitors</Text>
          <Text style={{color: '#000000', fontSize: 18}}>1602</Text>
          <Text style={{color: '#000000', marginTop: 17}}>View All</Text>
        </View>
        <View style={{height: 80}}>
          <Image
            source={icons.lineChartIcon}
            style={{height: 40, width: 40}}
            resizeMode="contain"
          />
          <Text style={{textAlign: 'center', color: '#000000'}}>40%</Text>
          <Text style={{color: '#000000'}}>this month</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeApprover;

const styles = StyleSheet.create({});
