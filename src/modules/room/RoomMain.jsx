// import {
//   ActivityIndicator,
//   Pressable,
//   RefreshControl,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useIsFocused} from '@react-navigation/native';
// import RoomCard from '../../components/room/RoomCard';
// import {BASE_URL_C} from '../../global/utils/constantUrl';
// import {getData} from '../../global/services/apis/getApi';
// import {SIZES} from '../../constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {bgColors} from '../../global/apicall/apiCall';
// import RoomCardPatient from '../../components/room/RoomCardPatient';

// const RoomMain = () => {
// const [selectedTab, setSelectedTab] = useState(1);

//   console.log({roomList});

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//         paddingHorizontal: SIZES.medium,
//       }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           backgroundColor: '#F4F4F4',
//           borderRadius: 5,
//         }}>
//         <Pressable
//           onPress={() => setSelectedTab(1)}
//           style={{
//             width: '47%',
//             padding: 10,
//             borderRadius: 5,
//             backgroundColor: selectedTab === 1 ? '#127DDD' : null,
//           }}>
//           <Text
//             style={{
//               textAlign: 'center',
//               color: selectedTab === 1 ? '#FFFFFF' : '#000000',
//             }}>
//             Office
//           </Text>
//         </Pressable>
//         <Pressable
//           onPress={() => setSelectedTab(2)}
//           style={{
//             width: '47%',
//             padding: 10,
//             borderRadius: 5,
//             backgroundColor: selectedTab === 2 ? '#127DDD' : null,
//           }}>
//           <Text
//             style={{
//               textAlign: 'center',
//               color: selectedTab === 2 ? '#FFFFFF' : '#000000',
//             }}>
//             Patient
//           </Text>
//         </Pressable>
//       </View>

//   <ScrollView
//     refreshControl={
//       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//     }
//     showsVerticalScrollIndicator={false}
//     style={{marginBottom: 20}}>
//     {selectedTab === 1 &&
//       (filterOffice.length !== 0 ? (
//         filterOffice.map((item, index) => (
//           <RoomCard data={item} key={index} />
//         ))
//       ) : (
//         <Text
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             color: '#000000',
//           }}>
//           No Data
//         </Text>
//       ))}
//     {selectedTab === 2 &&
//       (filterWard.length !== 0 ? (
//         filterWard.map((item, index) => (
//           <RoomCardPatient data={item} key={index} setFetch={setFetch} />
//         ))
//       ) : (
//         <Text
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             color: '#000000',
//           }}>
//           No Data
//         </Text>
//       ))}
//   </ScrollView>
// </SafeAreaView>
//   );
// };

// export default RoomMain;

// const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Patient from './comp/Patient';
import Office from './comp/Office';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SIZES} from '../../constants';

const TopTab = createMaterialTopTabNavigator();

const RoomMain = () => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: SIZES.medium,
      }}>
      <TopTab.Navigator
        initialRouteName="Pending"
        screenOptions={{
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#FFFFFF',
          tabBarIndicatorStyle: {
            backgroundColor: '#000000',
            height: '100%',
            borderRadius: 10,
          },
          tabBarLabelStyle: {
            textTransform: 'capitalize',
          },
          tabBarStyle: {
            alignSelf: 'center',
            width: '99%',
            borderRadius: 10,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: '#F6F6F6',
            borderRadius: 10,
          },
        }}>
        <TopTab.Screen name="Office" component={Office} />
        <TopTab.Screen name="Patient" component={Patient} />
      </TopTab.Navigator>
    </View>
  );
};

export default RoomMain;

const styles = StyleSheet.create({});
