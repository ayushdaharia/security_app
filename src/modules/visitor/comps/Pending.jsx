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
import SPCardPending from './securityPersonnel/SPCardPending';
import APCardPending from './securityApprover/APCardPending';
import {COLORS, SIZES} from '../../../constants';
import {useIsFocused} from '@react-navigation/native';
import {
  fetchUserRole,
  fetchVisitorsList,
} from '../../../global/apicall/apiCall';

const Pending = ({route}) => {
  // const {visitorList, userRole, setFetch, onRefresh, refreshing} = route.params;
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

  const filterPending =
    filteredSearchInput.filter(
      obj =>
        obj.approvalStatus === 'PENDING_APPROVAL' ||
        obj.approvalStatus === 'MAX_CAPACITY',
    ) || [];

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
          filterPending?.map((item, index) => (
            <SPCardPending key={index} data={item} />
          ))}
        {userRole === 'SECURITY_APPROVER' &&
          filterPending?.map((item, index) => (
            <APCardPending key={index} data={item} setFetch={setFetch} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pending;

const styles = StyleSheet.create({});
