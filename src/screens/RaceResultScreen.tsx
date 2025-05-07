import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import { useAppSelector } from '../state/index';
import { fetchDriverResultsAction } from '../state/drivers/action';
import { useDispatch } from 'react-redux';
import useSmartNavigation from '../hooks/useSmartNavigation';

interface IProps {
  route: {
    params: {
      driverId: string;
    };
  };
}

interface IRaceResult {
    item: any
}

const RaceResultScreen = ({route}:IProps) => {
  const driverId = route?.params?.driverId;
  const dispatch = useDispatch();
  const navigation = useSmartNavigation();
  const {driverResultsLoading, driverResults} = useAppSelector(state => state.driver);

  useEffect(() => {
    if(driverId)
      dispatch(fetchDriverResultsAction(driverId));
  }, [driverId]);

  const ResultItem = ({item}:IRaceResult) => {
    return (
        <View style={styles.raceItemContent}>
            <View style={styles.raceItem}>
                <Text>Race</Text>

                <Text>{item.circuitName}</Text>
            </View>

            <View style={styles.raceItem}>
                <Text>Round</Text>
                
                <Text>{item.round}</Text>
            </View>

            <View style={styles.raceItem}>
                <Text>Position</Text>
                
                <Text>{item.position}</Text>
            </View>
        </View>
    )
  }


  if (driverResultsLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperContent}>
        <TouchableOpacity style={styles.backContent} onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>

        <FlatList
          ListHeaderComponent={<View><Text style={styles.title}>Race Result</Text></View>}
          showsVerticalScrollIndicator={false}
          data={driverResults}
          keyExtractor={item => item.raceName.toString()}
          renderItem={({ item, index }) => (
           <ResultItem key={index} item={item}/>
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
  backContent: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: 'gray',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  detailSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 700,
    marginBottom: 20,
  },
  raceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  raceItemContent: {
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#f8f9f9',
    paddingHorizontal: 5,
    marginBottom: 10,
  }
});

export default RaceResultScreen;