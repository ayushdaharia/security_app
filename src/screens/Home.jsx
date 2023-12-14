import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  View,
  ScrollView,
  Pressable,
  Text,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {SIZES, icons} from '../constants';
import HomeCard from '../components/cards/home/HomeCard';
import HomeCardRecentVisitors from '../components/cards/home/HomeCardRecentVisitors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  fetchHomeCardValues,
  fetchTicketList,
  fetchUserDataProfile,
  fetchUserRole,
  fetchVisitorList,
} from '../global/apicall/apiCall';
import {ContextPrimary} from '../global/context/context';
import TicketCard from '../components/cards/ticketCard/TicketCard';

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
  // const [profileData, setProfileData] = useState('');
  // const {changeImg, changeName} = useContext(ContextPrimary);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [tickets, setTickets] = useState([]);

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchUserRole(setUserRole);
  }, []);

  useEffect(() => {
    {
      userRole === 'SECURITY_MAINTENANCE'
        ? isFocused &&
          fetchTicketList(setIsLoading, setTickets, setFetch, userRole)
        : isFocused && fetchVisitorList(setVisitorsList);
      isFocused && fetchHomeCardValues(setHomeCardValues);
      // isFocused && fetchUserDataProfile(setProfileData, changeImg);
    }
  }, [isFocused, fetch, userRole]);

  const activityCard = [
    {
      icon: icons.visitorIcon,
      title: 'Visitors',
      value: homeCardValues?.VISITORS,
      bgC: '#F4527C',
      navigate: 'Visitors',
      visibilty: userRole === 'SECURITY_MAINTENANCE' ? false : true,
    },
    {
      icon: icons.roomIcon,
      title: 'Rooms',
      value: homeCardValues?.ROOMS,
      bgC: '#7F6BE2',
      navigate: 'Rooms',
      visibilty: true,
    },
    {
      icon: icons.ticketIcon,
      title: 'My Tickets',
      value: homeCardValues?.TICKETS || '10',
      bgC: '#3CCAAC',
      navigate: 'Tickets',
      visibilty: true,
    },
    // {
    //   icon: null,
    //   title: '',
    //   value: '40+',
    //   bgC: '#FF8556',
    // },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchVisitorList(setVisitorsList);
      fetchHomeCardValues(setHomeCardValues);
      // fetchUserDataProfile(setProfileData, changeImg);
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
          {activityCard.map((item, index) =>
            item.visibilty === true ? (
              <HomeCard data={item} key={index} />
            ) : null,
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
            {userRole === 'SECURITY_MAINTENANCE'
              ? 'Recent Tickets'
              : 'Recent Visitors'}
          </Text>

          <Pressable
            onPress={() => {
              if (userRole === 'SECURITY_MAINTENANCE') {
                navigation.navigate('Tickets');
              } else {
                navigation.navigate('Visitors');
              }
            }}>
            <Text style={{color: '#FF8556', fontSize: 16, fontWeight: '700'}}>
              More
            </Text>
          </Pressable>
        </View>
        {userRole === 'SECURITY_MAINTENANCE' ? (
          tickets.length === 0 ? (
            <Text style={{color: '#000000'}}>No tickets available</Text>
          ) : (
            tickets.map((item, index) => (
              <TicketCard
                key={index}
                data={item}
                setFetch={setFetch}
                userRole={userRole}
              />
            ))
          )
        ) : (
          visitorsList.map((item, index) => (
            <HomeCardRecentVisitors data={item} key={index} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
