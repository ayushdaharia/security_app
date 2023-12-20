// // Import React in our code
// import React, {useState, useEffect} from 'react';

// // Import all the components we are going to use
// import {
//   Text,
//   Keyboard,
//   TouchableOpacity,
//   FlatList,
//   TouchableWithoutFeedback,
//   TextInput,
//   View,
//   ScrollView,
//   Image,
// } from 'react-native';
// import {fetchRoomNameList} from '../../global/apicall/apiCall';
// import {useIsFocused} from '@react-navigation/native';
// import {COLORS, icons} from '../../constants';

// const SearchRoomRaiseTicket = ({formValues, setFormValues}) => {
//   const [roomList, setRoomList] = useState([]);
//   const isFocused = useIsFocused();
//   useEffect(() => {
//     fetchRoomNameList(setRoomList);
//   }, [isFocused]);

//   // console.log({roomList});

//   const [input, setInput] = useState('');
//   const [itemSelected, setItemSelected] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);

//   const onChangeText = text => {
//     setInput(text);

//     setItemSelected(false); // Reset the state when the text changes

//     if (text.trim() === '') {
//       setFilteredData(roomList);
//     } else {
//       const filteredItems = roomList?.filter(item => {
//         return Object?.values(item)
//           ?.join(' ')
//           ?.toLowerCase()
//           ?.includes(text?.toLowerCase());
//       });
//       setFilteredData(filteredItems);
//     }
//   };

//   const onItemSelected = item => {
//     setInput(
//       item.roomNumber +
//         ' ' +
//         (item.occupantName || '') +
//         ' ' +
//         (item.noOfVisitors || ''),
//     );
//     setFormValues({...formValues, room: item});
//     setItemSelected(true);
//     console.log(item);
//   };

// const getItemText = item => {
//   let mainText = item.roomNumber;
//   mainText += ' ' + (item.occupantName || '');

//   return (
//     <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
//       <View
//         style={{
//           flexShrink: 1,
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}>
//         <Text style={{fontWeight: '700', color: '#000000'}}>{mainText}</Text>
//       </View>
//     </View>
//   );
// };

//   return (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//       <View>
//         <Text
//           style={{
//             color: '#A7A6A3',
//           }}>
//           Search Room
//         </Text>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             backgroundColor: '#F6F6F6',
//             borderColor: '#F6F6F6',
//             marginVertical: 5,
//             borderRadius: 10,
//             marginVertical: 5,
//           }}>
//           <TextInput
//             onChangeText={onChangeText}
//             placeholderTextColor={COLORS.gray}
//             value={input}
//             style={{
//               height: 40,
//               padding: 10,
//               flex: 1,
//               color: '#000000',
//             }}
//             placeholder="Search Room"
//           />
//         </View>
//         <View>
//           <ScrollView horizontal={true}>
//             {input && filteredData.length > 0 && !itemSelected ? (
//               <FlatList
//                 style={{width: '100%'}}
//                 data={filteredData}
//                 showsVerticalScrollIndicator={false}
//                 renderItem={({item, index}) => (
//                   <TouchableOpacity
//                     key={index}
//                     onPress={() => onItemSelected(item)}>
//                     {getItemText(item)}
//                   </TouchableOpacity>
//                 )}
//                 keyExtractor={(item, index) => index}
//               />
//             ) : null}
//           </ScrollView>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// export default SearchRoomRaiseTicket;

import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  Keyboard,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
  View,
  Image,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper'; // Import Modal and Portal from react-native-paper
import {fetchRoomNameList} from '../../global/apicall/apiCall';
import {useIsFocused} from '@react-navigation/native';
import {COLORS, icons} from '../../constants';

const SearchRoom = ({formValues, setFormValues}) => {
  const [roomList, setRoomList] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchRoomNameList(setRoomList);
  }, [isFocused]);

  const [input, setInput] = useState('');
  const [itemSelected, setItemSelected] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({top: 0, left: 0});

  const inputRef = useRef(null);

  const calculateModalPosition = () => {
    if (inputRef.current) {
      inputRef.current.measureInWindow((x, y, width) => {
        setModalPosition({top: y + 40, left: x, width});
      });
    }
  };

  const onChangeText = text => {
    setInput(text);
    setItemSelected(false);

    if (text.trim() === '') {
      setFilteredData([]);
    } else {
      const filteredItems = roomList?.filter(item => {
        return Object?.values(item)
          ?.join(' ')
          ?.toLowerCase()
          ?.includes(text?.toLowerCase());
      });
      setFilteredData(filteredItems);
    }

    setVisible(text.trim() !== '' || filteredData.length > 0);
    calculateModalPosition();
  };

  const onItemSelected = item => {
    setInput(
      item.roomNumber +
        ' ' +
        (item.occupantName || '') +
        ' ' +
        (item.noOfVisitors || ''),
    );
    setFormValues({...formValues, room: item});
    setItemSelected(true);
    setVisible(false);
    console.log(item);
  };

  const clearInput = () => {
    setInput('');
    setFilteredData([]);
    setItemSelected(false);
    setFormValues({...formValues, room: ''});
  };

  const getItemText = item => {
    let mainText = item.roomNumber;
    mainText += ' ' + (item.occupantName || '');

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <View
          style={{
            flexShrink: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: '700', color: '#000000'}}>{mainText}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <Text style={{color: '#A7A6A3'}}>Search Room</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F6F6F6',
            borderColor: '#F6F6F6',
            marginVertical: 5,
            borderRadius: 10,
            marginVertical: 5,
          }}>
          <TextInput
            ref={inputRef}
            onChangeText={onChangeText}
            placeholderTextColor={COLORS.gray}
            value={input}
            style={{
              height: 40,
              padding: 10,
              flex: 1,
              color: '#000000',
            }}
            placeholder="Search Room"
          />
          {input !== '' && (
            <TouchableOpacity onPress={clearInput} style={{paddingRight: 10}}>
              <Image
                source={icons.crossIcon}
                style={{width: 25, height: 25}}
                tintColor={'#000000'}
              />
            </TouchableOpacity>
          )}
        </View>
        <Portal>
          <Modal
            theme={{
              colors: {
                backdrop: 'transparent',
              },
            }}
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              position: 'absolute',
              top: modalPosition.top,
              left: modalPosition.left,
              width:
                filteredData.length > 0
                  ? modalPosition.width
                  : modalPosition.width + 34,
              backgroundColor: '#FFFFFF',
              borderLeftWidth: 1,
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 10,
            }}>
            {filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={{
                      borderBottomWidth:
                        filteredData.length - 1 === index ? 0 : 1,
                    }}
                    key={index}
                    onPress={() => onItemSelected(item)}
                    disabled={item.occupantName === null ? true : false}>
                    {getItemText(item)}
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <View style={{padding: 10}}>
                <Text style={{fontWeight: '700', color: '#000000'}}>
                  No data found
                </Text>
              </View>
            )}
          </Modal>
        </Portal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchRoom;
