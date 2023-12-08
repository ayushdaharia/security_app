import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import CustomTextField from '../customTextField/CustomTextField';
import CustomButton from '../customButton/CustomButton';
import {BASE_URL_C} from '../../global/utils/constantUrl';
import {updateData} from '../../global/services/apis/postApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoomCardPatient = ({data, setFetch}) => {
  const navigation = useNavigation();
  const [occupantName, setOccupantName] = useState('');
  const [occupantMobile, setOccupantMobile] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [open, setOpen] = useState(false);
  const [openTrash, setOpenTrash] = useState(false);

  const handleEditRoom = async () => {
    const branchId = await AsyncStorage.getItem('BRANCH_ID');
    const obj = {
      roomId: data.id,
      occupantName: occupantName,
      occupantPhoneNumber: occupantMobile,
      branchId: branchId,
    };
    const url = BASE_URL_C + 'securityApp/room';
    const result = await updateData(url, obj);
    if (result?.error) {
      console.log({ERROREDIT: result?.error});
    } else {
      console.log({SUCCESS: result?.data});
      setOccupantMobile('');
      setOccupantName('');
      setOpen(false);
      setFetch(true);
      ToastAndroid.show('Updated Room Details', ToastAndroid.LONG);
    }
  };

  const handleDeleteRoom = async () => {
    const branchId = await AsyncStorage.getItem('BRANCH_ID');
    const obj = {
      roomId: data.id,
      occupantName: occupantName,
      occupantPhoneNumber: occupantMobile,
      branchId: branchId,
    };
    const url = BASE_URL_C + 'securityApp/room/clear';
    const result = await updateData(url, obj);
    if (result?.error) {
      console.log({ERROREDIT: result?.error});
    } else {
      console.log({SUCCESS: result?.data});
      setOccupantMobile('');
      setOccupantName('');
      setOpen(false);
      setFetch(true);
      ToastAndroid.show('Room Cleared', ToastAndroid.LONG);
    }
  };

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
          backgroundColor: data.bgC,
          borderRadius: 3,
          marginTop: 5,
        }}></View>
      <View
        style={{
          // height: 123,
          width: '97%',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: COLORS.lightWhite,
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          {/* <View style={{width: '80%'}}> */}
          <Text
            style={{
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            Occupant Name: {data.occupantName}
          </Text>
          {userRole === 'SECURITY_PERSONNEL' && (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  setOpen(true);
                  setRoomNo(data.roomNumber);
                  setOccupantMobile(data.occupantPhoneNumber);
                  setOccupantName(data.occupantName);
                }}>
                <Image
                  source={icons.editIcon}
                  style={{height: 24, width: 24}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              {data.occupantPhoneNumber === null &&
              data.occupantName === null ? null : (
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => {
                    setOpenTrash(true);
                    setRoomNo(data.roomNumber);
                    setOccupantMobile(data.occupantPhoneNumber);
                    setOccupantName(data.occupantName);
                  }}>
                  <Image
                    source={icons.trashIcon}
                    style={{height: 24, width: 24}}
                    resizeMode="contain"
                    tintColor={'red'}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
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
            {`Room No: ${data.roomNumber}  `}
          </Text>
          <Text
            style={{
              width: '50%',
              color: '#494444',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {`Room Type: ${data.roomType}  `}
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
          <View>
            <Text
              style={{
                color: '#494444',
                fontSize: 13,
                fontWeight: '400',
              }}>
              {`# Occupants: ${data.noOfVisitors || 0}`}
            </Text>
          </View>
          {data.occupantPhoneNumber === null && data.occupantName === null ? (
            <View style={{backgroundColor: 'red', borderRadius: 10}}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: 500,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                Empty
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('VisitorListInRoom', {
                  roomId: data?.id,
                });
              }}>
              <Image
                source={icons.eyeIcon}
                style={{height: 27, width: 27}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Modal
        visible={open}
        onDismiss={() => setOpen(false)}
        onRequestClose={() => setOpen(false)}
        animationType="fade"
        transparent={true}
        presentationStyle="overFullScreen">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: '90%',
              height: 260,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingBottom: 10,
              paddingTop: 10,
              borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
                    color: '#000000',
                    textAlign: 'center',
                  }}>
                  Edit Room No {roomNo}
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <Image
                    source={icons.crossIcon}
                    style={{height: 24, width: 24, tintColor: '#000000'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <CustomTextField
              heading={'Occupant Name'}
              headingColor={'#A7A6A3'}
              borderColor={'#F6F6F6'}
              value={occupantName}
              onChangeText={text => setOccupantName(text)}
              backgroundColor={'#F6F6F6'}
              placeHolder={'Enter Occupant name'}
            />
            <CustomTextField
              headingColor={'#A7A6A3'}
              borderColor={'#F6F6F6'}
              backgroundColor={'#F6F6F6'}
              type="mobile"
              heading="Occupant Mobile"
              placeHolder="Enter Occupant Mobile"
              value={occupantMobile}
              onChangeText={text => setOccupantMobile(text)}
            />
            <CustomButton
              label={'Save'}
              style={{width: 150, backgroundColor: '#000000'}}
              onPress={() => {
                handleEditRoom();
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        visible={openTrash}
        onDismiss={() => setOpenTrash(false)}
        onRequestClose={() => setOpenTrash(false)}
        animationType="fade"
        transparent={true}
        presentationStyle="overFullScreen">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: '90%',
              height: 170,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingBottom: 10,
              paddingTop: 10,
              borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: '#000000',
                    textAlign: 'center',
                    marginVertical: 20,
                  }}>
                  Do you want to clear room {roomNo} ?
                </Text>
              </View>
              {/* <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => setOpenTrash(false)}>
                  <Image
                    source={icons.crossIcon}
                    style={{height: 24, width: 24, tintColor: '#000000'}}
                  />
                </TouchableOpacity>
              </View> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={() => handleDeleteRoom(false)}
                style={{
                  width: '30%',
                  backgroundColor: '#000000',
                  borderWidth: 1,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    padding: 10,
                    textAlign: 'center',
                    fontWeight: 600,
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setOpenTrash(false)}
                style={{
                  width: '30%',
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#000000',
                    padding: 10,
                    textAlign: 'center',
                    fontWeight: 600,
                  }}>
                  No
                </Text>
              </TouchableOpacity>
            </View>

            {/* <CustomButton
              label={'Save'}
              style={{width: 150, backgroundColor: '#000000'}}
              onPress={() => {
                handleEditRoom();
              }}
            /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RoomCardPatient;

const styles = StyleSheet.create({});
