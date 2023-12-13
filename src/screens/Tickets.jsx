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

import TicketCard from '../components/cards/ticketCard/TicketCard';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData} from '../global/services/apis/getApi';
import {BASE_URL_C} from '../global/utils/constantUrl';
import {bgColors} from '../global/apicall/apiCall';
import {SIZES} from '../constants';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetch, setFetch] = useState(false);

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('ROLE');
        setUserRole(role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  const fetchRoomNameList = async () => {
    if (userRole) {
      setIsLoading(true);
      const branchId = await AsyncStorage.getItem('BRANCH_ID');
      const userId = await AsyncStorage.getItem('USER_ID');
      let url = '';
      if (userRole === 'SECURITY_MAINTENANCE') {
        url +=
          BASE_URL_C +
          'securityApp/allTickets?branchId=' +
          branchId +
          '&ticketType=SECURITY_APP';
      } else {
        url += BASE_URL_C + 'securityApp/allTickets?userId=' + userId;
      }
      if (url !== '') {
        const data = await getData(url);
        let tempData = [];
        if (data.error) {
          console.log({'error getting Room Name List': data.error});
          console.log({URL: url, STATUS: data.error});
          setTickets([]);
          setIsLoading(false);
        } else {
          tempData = data.data.map((item, index) => ({
            ...item,
            bgC: bgColors[index % bgColors.length],
          }));
          setTickets(tempData);
          setIsLoading(false);
          setFetch(false);
        }
      }
    }
  };

  // console.log({tickets});

  useEffect(() => {
    fetchRoomNameList();
  }, [isFocused, fetch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchRoomNameList();
    }, 2000);
  }, []);

  console.log({fetch});

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
        {tickets.map((item, index) => (
          <TicketCard key={index} data={item} setFetch={setFetch} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tickets;

const styles = StyleSheet.create({});
