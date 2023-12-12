// import React, {useEffect, useState} from 'react';
// import AddMainSP from '../modules/securityPerson/AddMainSP';
// import AddMainSG from '../modules/securityGeneral/AddMainSG';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Add = () => {
//   const [userRole, setUserRole] = useState('');

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const role = await AsyncStorage.getItem('ROLE');
//         console.log({role});
//         setUserRole(role);
//       } catch (error) {
//         console.error('Error fetching user role:', error);
//       }
//     };

//     fetchUserRole();
//   }, []);

//   return (
//     <>
//       {userRole === 'SECURITY_PERSONNEL' && <AddMainSP />}
//       {userRole === 'SECURITY_GENERAL' && <AddMainSG />}
//     </>
//   );
// };

// export default Add;
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AddMain from '../modules/add/AddMain';

const Add = () => {
  return <AddMain />;
};

export default Add;

const styles = StyleSheet.create({});
