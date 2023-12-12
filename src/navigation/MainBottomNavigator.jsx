import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Add from '../screens/Add';
import Visitors from '../screens/Visitors';
import Profile from '../screens/Profile';
import {COLORS, SIZES, icons} from '../constants';
import {ScreenHeaderBtn} from '../components';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {ContextPrimary} from '../global/context/context';
import Tickets from '../screens/Tickets';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();

const MainBottomNavigator = () => {
  const {userName, profileimg} = useContext(ContextPrimary);
  const navigation = useNavigation();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShadowVisible: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={focused ? icons.homeIconActive : icons.homeIcon}
              style={{width: 25, height: 25}}
            />
          ),
          headerLeft: () => (
            <View
              style={{
                paddingLeft: SIZES.medium,
              }}>
              <ScreenHeaderBtn
                iconUrl={icons.drawerIcon}
                dimension="80%"
                handlePress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: SIZES.medium,
              }}>
              <ScreenHeaderBtn
                iconUrl={profileimg ? {uri: profileimg} : icons.profile}
                dimension="80%"
                handlePress={() => {
                  navigation.navigate('Profile');
                }}
              />
            </View>
          ),
          headerTitle: '',
          title: '',
        }}
      />

      {userRole === 'SECURITY_PERSONNEL' && (
        <>
          <Tab.Screen
            name="Tickets"
            component={Tickets}
            options={{
              headerStyle: {backgroundColor: COLORS.lightWhite},
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              tabBarIcon: ({color, focused}) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Tickets')}>
                  <Image
                    source={focused ? icons.ticketActive : icons.ticket}
                    style={{width: 25, height: 30}}
                    // tintColor={'gray'}
                  />
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <View
                  style={{
                    paddingLeft: SIZES.medium,
                  }}>
                  <ScreenHeaderBtn
                    iconUrl={icons.squareLeftIcon}
                    dimension="80%"
                    handlePress={() => {
                      navigation.goBack();
                    }}
                  />
                </View>
              ),
              headerTitle: 'Tickets',
              title: '',
            }}
          />
          <Tab.Screen
            name="Add"
            component={Add}
            options={{
              headerStyle: {backgroundColor: COLORS.lightWhite},
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              tabBarIcon: ({color, focused}) => (
                <View
                  style={{
                    backgroundColor: '#000000',
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginBottom: keyboardOpen ? -15 : 30,
                    elevation: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={icons.addIcon}
                    style={{
                      height: 25,
                      width: 25,
                    }}
                    tintColor={'#FFFFFF'}
                  />
                </View>
              ),
              headerLeft: () => (
                <View
                  style={{
                    paddingLeft: SIZES.medium,
                  }}>
                  <ScreenHeaderBtn
                    iconUrl={icons.squareLeftIcon}
                    dimension="80%"
                    handlePress={() => {
                      navigation.goBack();
                    }}
                  />
                </View>
              ),
              headerTitle: 'Add',
              title: '',
            }}
          />
          <Tab.Screen
            name="Visitors"
            component={Visitors}
            options={{
              headerStyle: {backgroundColor: COLORS.lightWhite},
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              tabBarIcon: ({color, focused}) => (
                <Image
                  source={
                    focused
                      ? icons.peopleGroupIconActive
                      : icons.peopleGroupIcon
                  }
                  style={{width: 25, height: 30}}
                />
              ),
              headerLeft: () => (
                <View
                  style={{
                    paddingLeft: SIZES.medium,
                  }}>
                  <ScreenHeaderBtn
                    iconUrl={icons.squareLeftIcon}
                    dimension="80%"
                    handlePress={() => {
                      navigation.goBack();
                    }}
                  />
                </View>
              ),

              headerTitle: 'Visitors Dashboard',
              title: '',
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerStyle: {backgroundColor: COLORS.lightWhite},
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              tabBarIcon: ({color, focused}) => (
                <Image
                  source={focused ? icons.profileIconActive : icons.profileIcon}
                  style={{width: 25, height: 30}}
                />
              ),
              headerLeft: () => (
                <View
                  style={{
                    paddingLeft: SIZES.medium,
                  }}>
                  <ScreenHeaderBtn
                    iconUrl={icons.squareLeftIcon}
                    dimension="80%"
                    handlePress={() => {
                      navigation.goBack();
                    }}
                  />
                </View>
              ),
              headerTitle: 'Profile',
              title: '',
            }}
          />
        </>
      )}
      {userRole === 'SECURITY_APPROVER' && (
        <>
          {/* <Tab.Screen
              name="Tickets"
              component={Tickets}
              listeners={{
                tabPress: e => {
                  // Prevent default action
                  e.preventDefault();
                },
              }}
              options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                tabBarIcon: ({color, focused}) => (
                  <Image
                    source={focused ? icons.ticketActive : icons.ticket}
                    style={{width: 25, height: 30}}
                    tintColor={'gray'}
                  />
                ),
                headerLeft: () => (
                  <View
                    style={{
                      paddingLeft: SIZES.medium,
                    }}>
                    <ScreenHeaderBtn
                      iconUrl={icons.squareLeftIcon}
                      dimension="80%"
                      handlePress={() => {
                        navigation.goBack();
                      }}
                    />
                  </View>
                ),
                headerTitle: 'Tickets',
                title: '',
              }}
            />
            <Tab.Screen
              name="Add"
              component={Add}
              listeners={{
                tabPress: e => {
                  // Prevent default action
                  e.preventDefault();
                },
              }}
              options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                tabBarIcon: ({color, focused}) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Add');
                    }}>
                    <View
                      style={{
                        backgroundColor: '#000000',
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        marginBottom: keyboardOpen ? -15 : 30,
                        elevation: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={icons.addIcon}
                        style={{
                          height: 25,
                          width: 25,
                        }}
                        tintColor={'#FFFFFF'}
                      />
                    </View>
                  </TouchableOpacity>
                ),
                headerLeft: () => (
                  <View
                    style={{
                      paddingLeft: SIZES.medium,
                    }}>
                    <ScreenHeaderBtn
                      iconUrl={icons.squareLeftIcon}
                      dimension="80%"
                      handlePress={() => {
                        navigation.goBack();
                      }}
                    />
                  </View>
                ),
                headerTitle: 'Add',
                title: '',
              }}
          /> */}
          <Tab.Screen
            name="Visitors"
            component={Visitors}
            options={{
              headerStyle: {backgroundColor: COLORS.lightWhite},
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              tabBarIcon: ({color, focused}) => (
                <Image
                  source={
                    focused
                      ? icons.peopleGroupIconActive
                      : icons.peopleGroupIcon
                  }
                  style={{width: 25, height: 30}}
                />
              ),
              headerLeft: () => (
                <View
                  style={{
                    paddingLeft: SIZES.medium,
                  }}>
                  <ScreenHeaderBtn
                    iconUrl={icons.squareLeftIcon}
                    dimension="80%"
                    handlePress={() => {
                      navigation.goBack();
                    }}
                  />
                </View>
              ),

              headerTitle: 'Visitors',
              title: '',
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerStyle: {backgroundColor: COLORS.lightWhite},
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              tabBarIcon: ({color, focused}) => (
                <Image
                  source={focused ? icons.profileIconActive : icons.profileIcon}
                  style={{width: 25, height: 30}}
                />
              ),
              headerLeft: () => (
                <View
                  style={{
                    paddingLeft: SIZES.medium,
                  }}>
                  <ScreenHeaderBtn
                    iconUrl={icons.squareLeftIcon}
                    dimension="80%"
                    handlePress={() => {
                      navigation.goBack();
                    }}
                  />
                </View>
              ),
              headerTitle: 'Profile',
              title: '',
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default MainBottomNavigator;

const styles = StyleSheet.create({});
