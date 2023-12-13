import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {BASE_URL_C} from '../global/utils/constantUrl';
import {getData} from '../global/services/apis/getApi';
import {COLORS, SIZES, icons} from '../constants';
import MarkTicketStatusModal from '../components/cards/ticketCard/MarkTicketStatusModal';
import {bgColors} from '../global/apicall/apiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TicketDetail = ({route}) => {
  const {ticketId, raisedByMobileNo, complain, roomType, roomNumber} =
    route?.params;

  console.log({ticketId});

  const [ticketDetailRaised, setTicketDetailRaised] = useState([]);
  const [ticketDetail, setTicketDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketStatus, setTicketStatus] = useState('');
  const [fetch, setFetch] = useState(false);
  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [refreshing, setRefreshing] = useState(false);

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

  const fetchTicketDetail = async () => {
    setIsLoading(true);
    if (ticketId) {
      const url = BASE_URL_C + 'securityApp/ticket?ticketId=' + ticketId;
      const data = await getData(url);
      let tempData = [];
      if (data.error) {
        console.log({'error getting Room Name List': data.error});
        console.log({URL: url, STATUS: data.error});
        setTicketDetail([]);
        setTicketDetailRaised([]);
        setIsLoading(false);
      } else {
        tempData = data.data.map((item, index) => ({
          ...item,
          bgC: bgColors[index % bgColors.length],
        }));
        setTicketDetail(tempData);
        setTicketStatus(tempData?.[0]?.ticketStatus);
        setIsLoading(false);
        setTicketDetailRaised(
          tempData?.filter(obj => obj?.ticketStatus === 'TICKET_RAISED'),
        );
      }
    }
  };
  useEffect(() => {
    fetchTicketDetail();
  }, [fetch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchTicketDetail();
    }, 2000);
  }, []);

  console.log({ticketDetail});

  const ModalData = {
    ticketId: ticketId,
    raisedBy: ticketDetail?.[0]?.raisedBy,
    raisedByMobileNo: raisedByMobileNo,
    ticketStatus: ticketDetail?.[ticketDetailRaised.length - 1]?.ticketStatus,
  };

  // console.log({ticketStatus});

  if (isLoading) {
    return (
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: SIZES.medium,
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 20}}>
        {ticketDetailRaised?.map((item, index) => (
          <View key={index} style={{flexDirection: 'row', marginVertical: 5}}>
            <View
              style={{
                height: 30,
                width: 5,
                backgroundColor: item?.bgC,
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
                      marginBottom: 2,
                    }}>
                    Raised By: {item?.raisedBy}
                  </Text>
                  <Text
                    style={{
                      color: '#494444',
                      fontSize: 13,
                      fontWeight: '400',
                    }}>
                    Raised By Mobile: {raisedByMobileNo}
                  </Text>
                </View>
                {userRole === 'SECURITY_MAINTENANCE' ? (
                  ticketStatus === 'COMPLETED' ? null : (
                    <TouchableOpacity
                      style={{
                        marginVertical: 4,
                        backgroundColor: '#000000',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 5,
                        borderRadius: 5,
                      }}
                      onPress={() => {
                        setOpen(true);
                      }}>
                      <Image
                        source={icons.editIcon}
                        style={{height: 23, width: 23}}
                        resizeMode="contain"
                        tintColor={'#FFFFFF'}
                      />
                    </TouchableOpacity>
                  )
                ) : null}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    width: '50%',
                    color: '#494444',
                    fontSize: 13,
                    fontWeight: '400',
                  }}>
                  Date: {item?.date}
                </Text>
                <Text
                  style={{
                    width: '50%',
                    color: '#494444',
                    fontSize: 13,
                    fontWeight: '400',
                  }}>
                  Time: {item?.time.split(':')?.slice(0, 2)?.join(':')}
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
                  {`Room No: ${roomNumber}  `}
                </Text>
                <Text
                  style={{
                    width: '50%',
                    color: '#494444',
                    fontSize: 13,
                    fontWeight: '400',
                  }}>
                  {`Room Type: ${roomType}  `}
                </Text>
                <Text
                  style={{
                    width: '100%',
                    color: '#494444',
                    fontSize: 13,
                    fontWeight: '400',
                  }}>
                  {`Complain: ${complain}  `}
                </Text>
              </View>
            </View>
          </View>
        ))}
        {ticketDetail?.map((item, index) => (
          <View key={index} style={{flexDirection: 'row', marginVertical: 5}}>
            <View
              style={{
                height: 30,
                width: 5,
                backgroundColor: item?.bgC,
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
                  Date: {item?.date}
                </Text>
                <Text
                  style={{
                    width: '50%',
                    color: '#494444',
                    fontSize: 13,
                    fontWeight: '400',
                  }}>
                  Time: {item?.time?.split(':')?.slice(0, 2)?.join(':')}
                </Text>
                <Text
                  style={{
                    width: '100%',
                    color: '#494444',
                    fontSize: 13,
                    fontWeight: '400',
                  }}>
                  {`Remark: ${item?.remarks}  `}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: 'rgba(155, 149, 149, 0.74)',
                  height: 1,
                  width: '100%',
                  marginBottom: 10,
                }}></View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    backgroundColor:
                      item?.ticketStatus === 'TICKET_RAISED'
                        ? '#000000'
                        : item?.ticketStatus === 'IN_PROGRESS'
                        ? 'orange'
                        : item?.ticketStatus === 'BLOCKED'
                        ? 'red'
                        : item?.ticketStatus === 'COMPLETED'
                        ? 'green'
                        : null,
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
                    {item?.ticketStatus?.replace(/_/g, ' ')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <MarkTicketStatusModal
        open={open}
        setOpen={setOpen}
        data={ModalData}
        setFetch={setFetch}
      />
    </SafeAreaView>
  );
};

export default TicketDetail;

const styles = StyleSheet.create({});
