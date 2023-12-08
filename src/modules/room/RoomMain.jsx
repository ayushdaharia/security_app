import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import RoomCard from '../../components/room/RoomCard';
import {BASE_URL_C} from '../../global/utils/constantUrl';
import {getData} from '../../global/services/apis/getApi';
import {SIZES} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bgColors} from '../../global/apicall/apiCall';
import RoomCardPatient from '../../components/room/RoomCardPatient';

const RoomMain = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [roomList, setRoomList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetch, setFetch] = useState(false);

  const fetchRoomNameList = async () => {
    setIsLoading(true);
    const branchId = await AsyncStorage.getItem('BRANCH_ID');
    const url = BASE_URL_C + `securityApp/room/search?branchId=${branchId}`;
    const data = await getData(url);
    let tempData = [];
    if (data.error) {
      console.log({'error getting Room Name List': data.error});
      console.log({URL: url, STATUS: data.error});
      setRoomList([]);
      setIsLoading(false);
    } else {
      tempData = data.data.map((item, index) => ({
        ...item,
        bgC: bgColors[index % bgColors.length],
      }));
      setRoomList(tempData);
      setIsLoading(false);
      setFetch(false);
    }
  };

  useEffect(() => {
    fetchRoomNameList();
  }, [isFocused, fetch]);

  console.log({roomList});

  const filteredRoomList = roomList.filter(
    item =>
      item.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.occupantName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filterOffice =
    filteredRoomList.filter(obj => obj.roomType === 'OFFICE') || [];
  const filterWard =
    filteredRoomList.filter(
      obj => obj.roomType === 'WARD' || obj.roomType === 'PATIENT',
    ) || [];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchRoomNameList();
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
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#F4F4F4',
          borderRadius: 5,
        }}>
        <Pressable
          onPress={() => setSelectedTab(1)}
          style={{
            width: '47%',
            padding: 10,
            borderRadius: 5,
            backgroundColor: selectedTab === 1 ? '#127DDD' : null,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: selectedTab === 1 ? '#FFFFFF' : '#000000',
            }}>
            Office
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab(2)}
          style={{
            width: '47%',
            padding: 10,
            borderRadius: 5,
            backgroundColor: selectedTab === 2 ? '#127DDD' : null,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: selectedTab === 2 ? '#FFFFFF' : '#000000',
            }}>
            Patient
          </Text>
        </Pressable>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 20}}>
        {selectedTab === 1 &&
          (filterOffice.length !== 0 ? (
            filterOffice.map((item, index) => (
              <RoomCard data={item} key={index} />
            ))
          ) : (
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                color: '#000000',
              }}>
              No Data
            </Text>
          ))}
        {selectedTab === 2 &&
          (filterWard.length !== 0 ? (
            filterWard.map((item, index) => (
              <RoomCardPatient data={item} key={index} setFetch={setFetch} />
            ))
          ) : (
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                color: '#000000',
              }}>
              No Data
            </Text>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomMain;

const styles = StyleSheet.create({});
