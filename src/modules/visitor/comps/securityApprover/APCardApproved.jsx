import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {formatTimeInmmhha} from '../../../../global/utils/util';
import {markApproved, markExit} from '../../../../global/apicall/apiCall';
import {COLORS} from '../../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_C} from '../../../../global/utils/constantUrl';
import {saveData} from '../../../../global/services/apis/postApi';

const APCardApproved = ({data, setFetch}) => {
  const [exitTime, setExitTime] = useState(new Date());

  const markExit = async visitId => {
    const branchId = await AsyncStorage.getItem('BRANCH_ID');
    const url = BASE_URL_C + 'securityApp/markExit';
    const Obj = {
      visitId: visitId,
      branchId: branchId,
      exitTime: exitTime.toISOString(),
    };
    console.log(Obj);
    // console.log({url: url, obj: Obj});
    const data = await saveData(url, Obj);
    if (data.error) {
      ToastAndroid.showWithGravity(
        'An error occured!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      console.log({Error: data.error});
    } else {
      ToastAndroid.showWithGravity(
        'Saved Successfully!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setFetch(true);
    }
  };

  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <View
        style={{
          height: 30,
          width: 5,
          backgroundColor: data?.bgC,
          borderRadius: 3,
          marginTop: 5,
        }}></View>
      <View
        style={{
          // height: 123,
          width: '97%',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: COLORS?.lightWhite,
          padding: 10,
          borderRadius: 5,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}>
        <Text
          style={{
            width: '50%',
            color: '#494444',
            fontSize: 20,
            fontWeight: '500',
          }}>
          {data?.visitorName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <Text
            style={{
              width: '50%',
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {`Mobile - ${data?.visitorMobile}  `}
          </Text>
          <Text
            style={{
              width: '50%',
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {`Time - ${data?.visitTime}  `}
          </Text>
          <Text
            style={{
              width: '50%',
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {`Date - ${data?.visitDate}  `}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(155, 149, 149, 0.74)',
            height: 1,
            width: '100%',
            marginVertical: 10,
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '30%'}}>
            <Text
              style={{
                color: '#494444',
                fontSize: 13,
                fontWeight: '400',
              }}>
              Room: {data?.roomNumber}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#494444',
                fontSize: 13,
                fontWeight: '400',
              }}>
              {`Status - ${data?.approvalStatus?.replace(/_/g, ' ')}`}
            </Text>
          </View>
        </View>
        {data?.approvalStatus === 'EXIT' ? null : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                markExit(data?.visitId);
              }}
              style={{
                width: '32%',
                borderWidth: 0.5,
                borderRadius: 7.5,
                padding: 5,
                backgroundColor: 'red',
              }}>
              <Text
                style={{textAlign: 'center', color: '#FFFFFF', fontSize: 13}}>
                Mark Exit
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default APCardApproved;

const styles = StyleSheet.create({});
