import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {COLORS, SIZES, icons} from '../constants';
import HomeCard from '../components/cards/home/HomeCard';
import HomeCardRecentVisitors from '../components/cards/home/HomeCardRecentVisitors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  fetchHomeCardValues,
  fetchUserDataProfile,
  fetchVisitorList,
} from '../global/apicall/apiCall';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';
import {ContextPrimary} from '../global/context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatDateToLong = dateString => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(dateString);

  const formattedDate = date
    .toLocaleDateString('en-US', options)
    .replace(/,([^,]*)$/, '$1');
  return formattedDate;
};

const Home = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [visitorsList, setVisitorsList] = useState([]);
  const [homeCardValues, setHomeCardValues] = useState([]);
  const [profileData, setProfileData] = useState('');
  const {changeImg, changeName} = useContext(ContextPrimary);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    isFocused && fetchVisitorList(setVisitorsList);
    isFocused && fetchHomeCardValues(setHomeCardValues);
    isFocused && fetchUserDataProfile(setProfileData, changeImg);
  }, [isFocused]);

  const activityCard = [
    {
      icon: icons.visitorIcon,
      title: 'Visitors',
      value: homeCardValues?.VISITORS,
      bgC: '#F4527C',
      navigate: 'Visitors',
    },
    {
      icon: icons.roomIcon,
      title: 'Rooms',
      value: homeCardValues?.ROOMS,
      bgC: '#7F6BE2',
      navigate: 'Rooms',
    },
    // {
    //   icon: icons.ticketIcon,
    //   title: 'My Tickets',
    //   value: '40+',
    //   bgC: '#3CCAAC',
    //   navigate: 'Tickets',
    // },
    // {
    //   icon: null,
    //   title: '',
    //   value: '40+',
    //   bgC: '#FF8556',
    // },
  ];

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchVisitorList(setVisitorsList);
      fetchHomeCardValues(setHomeCardValues);
      fetchUserDataProfile(setProfileData, changeImg);
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: SIZES.medium,
      }}>
      <View>
        <Text style={{color: '#AAA1A1', fontSize: 17, fontWeight: '600'}}>
          Today
        </Text>
        <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
          {formatDateToLong(date)}
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginBottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginVertical: 10,
            gap: 20,
          }}>
          {activityCard.map((item, index) => (
            <HomeCard data={item} key={index} />
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
            Recent Visitors
          </Text>

          <Pressable onPress={() => navigation.navigate('Visitors')}>
            <Text style={{color: '#FF8556', fontSize: 16, fontWeight: '700'}}>
              More
            </Text>
          </Pressable>
        </View>
        {visitorsList.map((item, index) => (
          <HomeCardRecentVisitors data={item} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
