import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {fetchVisitorList} from '../../global/apicall/apiCall';
import {SIZES} from '../../constants';
import APCardPending from './comp/APCardPending';
import APCardApproved from './comp/APCardApproved';
import APCardRejected from './comp/APCardRejected';

const VisitorMainAP = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [visitorList, setVisitorList] = useState([]);
  const [fetch, setFetch] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (fetch === true || isFocused || selectedTab) {
      fetchVisitorList(setVisitorList);
      setFetch(false);
    }
  }, [isFocused, fetch, selectedTab]);

  const filterPending =
    visitorList.filter(
      obj =>
        (obj.approvalStatus === 'PENDING_APPROVAL' ||
          obj.approvalStatus === 'MAX_CAPACITY') &&
        selectedTab === 1,
    ) || [];

  const filterApproved =
    visitorList.filter(
      obj =>
        (obj.approvalStatus === 'APPROVED' ||
          obj.approvalStatus === 'AUTO_APPROVED' ||
          obj.approvalStatus === 'EXIT') &&
        selectedTab === 2,
    ) || [];

  const filterRejected =
    visitorList.filter(
      obj => obj.approvalStatus === 'REJECTED' && selectedTab === 3,
    ) || [];

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
            width: '32%',
            padding: 10,
            borderRadius: 5,
            backgroundColor: selectedTab === 1 ? '#127DDD' : null,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: selectedTab === 1 ? '#FFFFFF' : '#B0B0AD',
            }}>
            Pending
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab(2)}
          style={{
            width: '32%',
            padding: 10,
            borderRadius: 5,
            backgroundColor: selectedTab === 2 ? '#127DDD' : null,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: selectedTab === 2 ? '#FFFFFF' : '#B0B0AD',
            }}>
            Approved
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab(3)}
          style={{
            width: '32%',
            padding: 10,
            borderRadius: 5,
            backgroundColor: selectedTab === 3 ? '#127DDD' : null,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: selectedTab === 3 ? '#FFFFFF' : '#B0B0AD',
            }}>
            Rejected
          </Text>
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 20}}>
        {selectedTab === 1 &&
          (filterPending.length !== 0 ? (
            filterPending.map((item, index) => (
              <APCardPending data={item} key={index} />
            ))
          ) : (
            <Text
              style={{
                // flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000000',
              }}>
              No Data
            </Text>
          ))}
        {selectedTab === 2 &&
          (filterApproved.length !== 0 ? (
            filterApproved.map((item, index) => (
              <APCardApproved data={item} key={index} setFetch={setFetch} />
            ))
          ) : (
            <Text
              style={{
                // flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000000',
              }}>
              No Data
            </Text>
          ))}
        {selectedTab === 3 &&
          (filterRejected.length !== 0 ? (
            filterRejected.map((item, index) => (
              <APCardRejected data={item} key={index} />
            ))
          ) : (
            <Text
              style={{
                // flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000000',
              }}>
              No Data
            </Text>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VisitorMainAP;

const styles = StyleSheet.create({});
