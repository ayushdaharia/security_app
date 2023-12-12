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
import {fetchRoomNames} from '../../../global/apicall/apiCall';
import RoomCard from '../../../components/room/RoomCard';
import {SIZES} from '../../../constants';
import RoomCardPatient from '../../../components/room/RoomCardPatient';

const Patient = () => {
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

  const filterWard =
    filteredRoomList.filter(
      obj => obj.roomType === 'WARD' || obj.roomType === 'PATIENT',
    ) || [];

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
        {filterWard.length !== 0 ? (
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Patient;

const styles = StyleSheet.create({});
