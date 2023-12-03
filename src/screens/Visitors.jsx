import React, {useState, useEffect} from 'react';
import VisitorMainSP from '../modules/securityPerson/VisitorMainSP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VisitorMainAP from '../modules/approver/VisitorMainAP';
import VisitorMainSG from '../modules/securityGeneral/VisitorMainSG';

const Visitors = () => {
  const [userRole, setUserRole] = useState('SECURITY_APPROVER');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('ROLE');
        setUserRole(role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <>
      {userRole === 'SECURITY_PERSONNEL' && <VisitorMainSP />}
      {userRole === 'SECURITY_APPROVER' && <VisitorMainAP />}
      {userRole === 'SECURITY_GENERAL' && <VisitorMainSG />}
    </>
  );
};

export default Visitors;
