// import React, {useState, useEffect} from 'react';
// import VisitorMainSP from '../modules/securityPerson/VisitorMainSP';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import VisitorMainAP from '../modules/approver/VisitorMainAP';
// import VisitorMainSG from '../modules/securityGeneral/VisitorMainSG';

// const Visitors = () => {
//   const [userRole, setUserRole] = useState('SECURITY_APPROVER');

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const role = await AsyncStorage.getItem('ROLE');
//         setUserRole(role);
//       } catch (error) {
//         console.error('Error fetching user role:', error);
//       }
//     };

//     fetchUserRole();
//   }, []);

//   console.log({userRole});

//   return (
//     <>
//       {userRole === 'SECURITY_PERSONNEL' && <VisitorMainSP />}
//       {userRole === 'SECURITY_APPROVER' && <VisitorMainAP />}
//       {userRole === 'SECURITY_GENERAL' && <VisitorMainSG />}
//     </>
//   );
// };

// export default Visitors;
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import {SIZES} from '../constants';

const TopTab = createMaterialTopTabNavigator();

const Visitors = () => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <TopTab.Navigator
        initialRouteName="Tab1" // Set initial route
        screenOptions={{
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#FFFFFF',
          tabBarIndicatorStyle: {
            backgroundColor: '#127DDD',
            height: '100%',
            borderRadius: 10,
          },
          tabBarLabelStyle: {
            textTransform: 'capitalize',
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: '#F6F6F6',
            borderRadius: 10,
          },
        }}>
        <TopTab.Screen name="Pending" component={Tab1} options={{}} />
        <TopTab.Screen name="B" component={Tab2} />
        <TopTab.Screen name="C" component={Tab3} />
      </TopTab.Navigator>
    </View>
  );
};

export default Visitors;

const styles = StyleSheet.create({});
