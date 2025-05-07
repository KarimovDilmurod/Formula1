import React, {useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { useAppSelector } from '../state/index';
import { fetchDriversAction } from '../state/drivers/action';
import { useDispatch } from 'react-redux';
import useSmartNavigation from '../hooks/useSmartNavigation';
import { Driver } from '../types/data';

interface IDriverItem {
  item: Driver;
}

const DriversListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useSmartNavigation();
  const {driversData} = useAppSelector(state => state.driver);

  const handleItemPress = useCallback((id: string) => {
    navigation.navigate('DetailScreen', {driverId: id});
  }, [navigation]);

  const DriverItem = ({item}: IDriverItem) => {
    return(
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => handleItemPress(item.driverId)}
      >
        <Text>{item.familyName}</Text>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    dispatch(fetchDriversAction());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperContent}>
        <FlatList
          ListHeaderComponent={<View><Text style={styles.title}>Drivers List</Text></View>}
          showsVerticalScrollIndicator={false}
          data={driversData}
          keyExtractor={item => item.familyName.toString()}
          renderItem={({ item }) => (
            <DriverItem key={item.driverId} item={item}/>
          )}
        />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    textAlign: 'center',
    fontWeight: 700,
  }
});

export default DriversListScreen;