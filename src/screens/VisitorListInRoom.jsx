import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_C} from '../global/utils/constantUrl';
import {getData} from '../global/services/apis/getApi';
import {COLORS, SIZES} from '../constants';
import {useIsFocused} from '@react-navigation/native';
import {bgColors} from '../global/apicall/apiCall';
import {useRoute} from '@react-navigation/native';
import SPCardPending from '../modules/visitor/comps/securityPersonnel/SPCardPending';

const VisitorListInRoom = () => {
  const route = useRoute();
  const roomID = route?.params?.roomId;
  console.log({roomID});
  const [visitorList, setVisitorList] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocused = useIsFocused();

  const fetchVisitorList = async () => {
    setIsLoading(true);
    const branchId = await AsyncStorage.getItem('BRANCH_ID');
    const url =
      BASE_URL_C +
      'securityApp/room/visitors/' +
      branchId +
      '?roomId=' +
      roomID;
    console.log({url});
    const data = await getData(url);
    let tempData = [];
    if (data.error) {
      setVisitorList([]);
      console.log({URL: url, STATUS: data.error});
      console.log({'error getting VisitorList': data.error});
      setIsLoading(false);
    } else {
      tempData = data.data.map((item, index) => ({
        ...item,
        bgC: bgColors[index % bgColors.length],
      }));
      setVisitorList(tempData);
      setFetch(false);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchVisitorList();
  }, [fetch, isFocused]);

  const filteredSearchInput = visitorList.filter(
    item =>
      item.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.visitorMobile.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // fetchRoomNameList();
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: SIZES.medium,
      }}>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
          borderColor: '#F6F6F6',
          marginVertical: 5,
          borderRadius: 10,
          marginVertical: 5,
        }}>
        <TextInput
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          placeholderTextColor={COLORS.gray}
          style={{
            height: 40,
            padding: 10,
            flex: 1,
            fontWeight: '600',
            color: '#000000',
          }}
          placeholder="Search Name"
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 20}}>
        {filteredSearchInput.map((item, index) => (
          <SPCardPending data={item} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VisitorListInRoom;

const styles = StyleSheet.create({});
