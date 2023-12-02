import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {fetchRoomNameList} from '../global/apicall/apiCall';
import {SIZES} from '../constants';
import RoomCard from '../components/room/RoomCard';

const Room = () => {
  const [roomList, setRoomList] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && fetchRoomNameList(setRoomList);
  }, [isFocused]);

  console.log({roomList});

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: SIZES.medium}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {roomList.map((item, index) => (
          <RoomCard data={item} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Room;

const styles = StyleSheet.create({});
