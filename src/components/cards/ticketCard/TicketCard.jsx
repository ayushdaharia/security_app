import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, icons} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import CustomTextField from '../../customTextField/CustomTextField';
import CustomButton from '../../customButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MarkTicketStatusModal from './MarkTicketStatusModal';

const TicketCard = ({data, setFetch}) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);

  const [userRole, setUserRole] = useState('');

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
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <View
        style={{
          height: 30,
          width: 5,
          backgroundColor: data?.bgC,
          borderRadius: 3,
          marginTop: 5,
        }}></View>
      <View
        style={{
          width: '97%',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: COLORS?.lightWhite,
          padding: 10,
          borderRadius: 5,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}>
        <View>
          <Text
            style={{
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            Raised By: {data?.raisedBy}
          </Text>
          <Text
            style={{
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            Mobile: {data?.raisedByMobileNo}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <Text
            style={{
              width: '50%',
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {`Room No: ${data?.roomNo}  `}
          </Text>
          <Text
            style={{
              width: '50%',
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {`Room Type: ${data?.roomType}  `}
          </Text>
          <Text
            style={{
              width: '50%',
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {`Date: ${data?.date}  `}
          </Text>
          <Text
            style={{
              width: '50%',
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {`Time: ${data?.time.split(':')?.slice(0, 2)?.join(':')}  `}
          </Text>

          <Text
            style={{
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {`Complain: ${data?.complain}  `}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(155, 149, 149, 0.74)',
            height: 1,
            width: '100%',
            marginVertical: 10,
          }}></View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor:
                data?.ticketStatus === 'TICKET_RAISED'
                  ? 'red'
                  : data?.ticketStatus === 'IN_PROGRESS'
                  ? 'orange'
                  : 'green',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: '400',
              }}>
              {data?.ticketStatus?.replace(/_/g, ' ')}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {userRole === 'SECURITY_MAINTENANCE' ? (
              data.ticketStatus === 'COMPLETED' ? null : (
                <TouchableOpacity
                  style={{marginRight: 15}}
                  onPress={() => {
                    setOpen(true);
                  }}>
                  <Image
                    source={icons.editIcon}
                    style={{height: 27, width: 27}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )
            ) : null}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TicketDetail', {
                  ticketId: data?.ticketId,
                  complain: data?.complain,
                  roomType: data?.roomType,
                  roomNumber: data?.roomNo,
                  raisedByMobileNo: data?.raisedByMobileNo,
                });
              }}>
              <Image
                source={icons.eyeIcon}
                style={{height: 27, width: 27}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <MarkTicketStatusModal
        open={open}
        setOpen={setOpen}
        data={data}
        setFetch={setFetch}
      />
    </View>
  );
};

export default TicketCard;

const styles = StyleSheet.create({});
