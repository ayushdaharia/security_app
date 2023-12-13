import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS, icons} from '../../constants';

const CustomDropdown = ({
  backgroundColor,
  heading,
  data,
  onSelect,
  placeholder,
  searchable,
  borderRadius,
  height,
  color,
  selectedItemColor,
  headingColor,
  propertyName,
  formValues,
  modalTtile,
  borderColor,
}) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedItem, setSelectedItem] = useState('');
  const searchRef = useRef();

  const onSearch = text => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredData(data);
    } else {
      const filteredItems = data.filter(item => {
        return Object?.values(item)
          ?.join(' ')
          ?.toLowerCase()
          ?.includes(text?.toLowerCase());
      });
      setFilteredData(filteredItems);
    }
  };

  useEffect(() => {
    if (propertyName) {
      setSelectedItem(formValues[propertyName] || '');
    }
  }, [formValues]);

  return (
    <View style={{flex: 1}}>
      <Text style={{color: headingColor ? headingColor : '#000000'}}>
        {heading}
      </Text>
      <TouchableOpacity
        style={{
          width: '100%',
          height: height ? height : 40,
          borderRadius: borderRadius ? borderRadius : 10,
          borderColor: borderColor,
          borderWidth: 1,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: backgroundColor ? backgroundColor : null,
          marginVertical: 5,
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text
          style={{color: selectedItemColor ? selectedItemColor : '#000000'}}>
          {selectedItem === '' ? placeholder : selectedItem}
        </Text>
        {modalVisible ? (
          <Image source={icons.upChevron} style={{width: 20, height: 20}} />
        ) : (
          <Image source={icons.chevronDown} style={{width: 20, height: 20}} />
        )}
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              elevation: 5,
              alignSelf: 'center',
              width: '50%',
              backgroundColor: '#fff',
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: COLORS.lightWhite,
            }}>
            {searchable ? (
              <TextInput
                placeholder="Search.."
                value={search}
                ref={searchRef}
                onChangeText={onSearch}
                style={{
                  width: '90%',
                  height: 40,
                  alignSelf: 'center',
                  borderWidth: 0.5,
                  borderColor: '#8e8e8e',
                  borderRadius: 7,
                  marginTop: 20,
                  paddingLeft: 20,
                }}
              />
            ) : null}

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <FlatList
                data={filteredData}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      width: '85%',
                      alignSelf: 'center',
                      height: 40,
                      justifyContent: 'center',
                      borderBottomWidth: 0.5,
                      borderColor: '#8e8e8e',
                    }}
                    disabled={item.disable ? item.disable : false}
                    onPress={() => {
                      console.log({item});
                      setSelectedItem(Object.values(item).join(' '));
                      setModalVisible(false);
                      onSearch('');
                      onSelect(item);
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        color: color ? color : '#000000',
                      }}>
                      {item.title1}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    paddingRight: 5,
                  }}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Image
                      source={icons.crossIcon}
                      style={{
                        height: 24,
                        width: 24,
                        tintColor: '#000000',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

CustomDropdown.propTypes = {
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default CustomDropdown;
