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
import SPCardPending from './securityPersonnel/SPCardPending';
import APCardPending from './securityApprover/APCardPending';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SPCard from './securityPersonnel/SPCard';
import APCardApproved from './securityApprover/APCardApproved';
import {COLORS, SIZES} from '../../../constants';
import {useIsFocused} from '@react-navigation/native';
import {
  fetchUserRole,
  fetchVisitorsList,
} from '../../../global/apicall/apiCall';

const Approved = ({route}) => {
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
  const filterApprovedSP =
    filteredSearchInput.filter(
      obj =>
        obj.approvalStatus === 'APPROVED' ||
        obj.approvalStatus === 'AUTO_APPROVED',
    ) || [];

  const filterApprovedAP =
    filteredSearchInput.filter(
      obj =>
        obj.approvalStatus === 'APPROVED' ||
        obj.approvalStatus === 'AUTO_APPROVED' ||
        obj.approvalStatus === 'EXIT',
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
          filterApprovedSP?.map((item, index) => (
            <SPCard key={index} data={item} setFetch={setFetch} />
          ))}
        {userRole === 'SECURITY_APPROVER' &&
          filterApprovedAP?.map((item, index) => (
            <APCardApproved key={index} data={item} setFetch={setFetch} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Approved;

const styles = StyleSheet.create({});
