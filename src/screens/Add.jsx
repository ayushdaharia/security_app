import React, {useEffect, useState} from 'react';
import AddMainSP from '../modules/securityPerson/AddMainSP';
import AddMainSG from '../modules/securityGeneral/AddMainSG';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('ROLE');
        console.log({role});
        setUserRole(role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  console.log({userRole});

  return (
    <>
      {userRole === 'SECURITY_PERSONNEL' && <AddMainSP />}
      {userRole === 'SECURITY_GENERAL' && <AddMainSG />}
    </>
  );
};

export default Add;
