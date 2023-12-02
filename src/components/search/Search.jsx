import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import {icons} from '../../constants';

const Search = () => {
  return (
    <View style={styles.searchBar}>
      <Image source={icons.search} style={styles.searchIcon} />
      <TextInput style={styles.textInput} placeholder="Search..." />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#ECF0F3',
    borderRadius: 12,
  },
  searchIcon: {width: 24, height: 24, marginHorizontal: 10},
  textInput: {
    flex: 1,
    padding: 10,
    color: 'gray',
  },
});
