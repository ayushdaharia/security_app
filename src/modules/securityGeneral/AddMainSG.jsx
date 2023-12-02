import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RaiseTicketForm from '../securityPerson/comps/RaiseTicketForm';
import AddVisitorForm from '../securityPerson/comps/AddVisitorForm';
import {SIZES} from '../../constants';

const AddMainSG = () => {
  const [selectedTab, setSelectedTab] = useState(1);

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
            width: '50%',
            padding: 10,
            borderRadius: 5,
            backgroundColor: selectedTab === 1 ? '#000000' : null,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: selectedTab === 1 ? '#FFFFFF' : '#B0B0AD',
            }}>
            Raise Ticket
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab(2)}
          style={{
            width: '50%',
            padding: 10,
            borderRadius: 5,
            backgroundColor: selectedTab === 2 ? '#000000' : null,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: selectedTab === 2 ? '#FFFFFF' : '#B0B0AD',
            }}>
            Add Visitor
          </Text>
        </Pressable>
      </View>

      {selectedTab === 1 && <RaiseTicketForm />}
      {selectedTab === 2 && <AddVisitorForm />}
    </SafeAreaView>
  );
};

export default AddMainSG;

const styles = StyleSheet.create({});
