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
import SPCardVisited from './securityPersonnel/SPCardVisted';
import APCardRejected from './securityApprover/APCardRejected';
import {COLORS, SIZES} from '../../../constants';
import {
  fetchUserRole,
  fetchVisitorsList,
} from '../../../global/apicall/apiCall';
import {useIsFocused} from '@react-navigation/native';

const Visited = () => {
  //   const {visitorList, userRole, setFetch, onRefresh, refreshing} = route.params;
  const isFocused = useIsFocused();
  const [visitorList, setVisitorList] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [fetch, setFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchVisitorsList(setIsLoading, setVisitorList, setFetch);
    fetchUserRole(setUserRole);
  }, [fetch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchVisitorsList(setIsLoading, setVisitorList, setFetch);
    }, 1000);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredSearchInput = visitorList.filter(
    item =>
      item.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.visitorMobile.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const filterExitSP =
    filteredSearchInput.filter(obj => obj.approvalStatus === 'EXIT') || [];

  const filterRejectedAP =
    filteredSearchInput.filter(obj => obj.approvalStatus === 'REJECTED') || [];

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
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
          borderColor: '#F6F6F6',
          borderRadius: 10,
          marginVertical: 10,
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
          placeholder="Search Room"
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {userRole === 'SECURITY_PERSONNEL' &&
          filterExitSP?.map((item, index) => (
            <SPCardVisited key={index} data={item} />
          ))}
        {userRole === 'SECURITY_APPROVER' &&
          filterRejectedAP?.map((item, index) => (
            <APCardRejected key={index} data={item} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Visited;

const styles = StyleSheet.create({});
