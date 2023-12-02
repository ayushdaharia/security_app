import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, icons} from '../../constants';
import VisitorCardPending from '../../components/cards/visitorCardPending/VisitorCardPending';
import VisitorCardApproved from '../../components/cards/visitorCardApproved/VisitorCardApproved';

const HomeSecurityPerson = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginVertical: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => setSelectedTab(1)}
          style={{
            borderWidth: 1,
            width: '45%',
            padding: 10,
            borderRadius: 12,
            backgroundColor: selectedTab === 1 ? '#1EA6D6' : '#FFFFFF',
          }}>
          <Text
            style={{
              color: selectedTab === 1 ? '#FFFFFF' : '#127DDD',
              textAlign: 'center',
            }}>
            Pending Request
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(2)}
          style={{
            borderWidth: 1,
            width: '45%',
            padding: 10,
            borderRadius: 12,
            backgroundColor: selectedTab === 2 ? '#1EA6D6' : '#FFFFFF',
          }}>
          <Text
            style={{
              color: selectedTab === 2 ? '#FFFFFF' : '#127DDD',
              textAlign: 'center',
            }}>
            Approved
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {selectedTab === 1 &&
          [1, 2, 4, 5, 6, 7].map((item, index) => (
            <VisitorCardPending key={index} />
          ))}
        {selectedTab === 2 &&
          [1, 2, 4, 5, 6, 7].map((item, index) => (
            <VisitorCardApproved key={index} />
          ))}
      </ScrollView>
    </View>
  );
};

export default HomeSecurityPerson;

const styles = StyleSheet.create({});
