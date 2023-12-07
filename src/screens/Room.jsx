import {
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {bgColors, fetchRoomNameList} from '../global/apicall/apiCall';
import {COLORS, SIZES} from '../constants';
import RoomCard from '../components/room/RoomCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_C} from '../global/utils/constantUrl';
import {getData} from '../global/services/apis/getApi';
import {ActivityIndicator} from 'react-native-paper';

const Room = () => {
  const [roomList, setRoomList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
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
    }
  };
  useEffect(() => {
    fetchRoomNameList();
  }, [isFocused]);

  console.log({roomList});

  const filteredRoomList = roomList.filter(
    item =>
      item.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.occupantName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
        paddingHorizontal: SIZES.medium,
        backgroundColor: '#FFFFFF',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#127DDD',
          borderColor: '#F6F6F6',
          marginVertical: 5,
          borderRadius: 10,
          marginVertical: 5,
        }}>
        <TextInput
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          placeholderTextColor={COLORS.white}
          style={{
            height: 40,
            padding: 10,
            flex: 1,
            fontWeight: '600',
            color: '#FFFFFF',
          }}
          placeholder="Search Room"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredRoomList.map((item, index) => (
          <RoomCard data={item} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Room;

const styles = StyleSheet.create({});
