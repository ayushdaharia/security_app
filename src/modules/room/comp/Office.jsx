import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RoomCardPatient from '../../../components/room/RoomCardPatient';
import {fetchRoomNames} from '../../../global/apicall/apiCall';
import {SIZES} from '../../../constants';
import RoomCard from '../../../components/room/RoomCard';

const Office = () => {
  const [roomList, setRoomList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  //   const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    fetchRoomNames(setIsLoading, setRoomList, setFetch);
  }, [fetch]);

  const filteredRoomList = roomList.filter(
    item =>
      item.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.occupantName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filterOffice =
    filteredRoomList.filter(obj => obj.roomType === 'OFFICE') || [];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchRoomNames(setIsLoading, setRoomList, setFetch);
    }, 1000);
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 20}}>
        {filterOffice.length !== 0 ? (
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Office;

const styles = StyleSheet.create({});
