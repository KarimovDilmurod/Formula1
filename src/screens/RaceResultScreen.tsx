import React, { useEffect, memo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useAppSelector } from '../state';
import { useDispatch } from 'react-redux';
import { fetchDriverResultsAction } from '../state/drivers/action';
import useSmartNavigation from '../hooks/useSmartNavigation';

interface IProps {
  route: {
    params: {
      driverId: string;
    };
  };
}

interface RaceResult {
  circuitName: string;
  round: string;
  position: string;
  raceName: string;
}

const ResultItem = memo(({ item }: { item: RaceResult }) => (
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
));

const Header = () => (
  <View>
    <Text style={styles.title}>Race Results</Text>
  </View>
);

const RaceResultScreen = ({ route }: IProps) => {
  const { driverId } = route.params;
  const dispatch = useDispatch();
  const navigation = useSmartNavigation();
  const { driverResultsLoading, driverResults } = useAppSelector(
    state => state.driver
  );

  useEffect(() => {
    if (driverId) {
      dispatch(fetchDriverResultsAction(driverId));
    }
  }, [driverId]);

  if (driverResultsLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperContent}>
        <TouchableOpacity
          style={styles.backContent}
          onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>

        <FlatList
          ListHeaderComponent={<Header />}
          showsVerticalScrollIndicator={false}
          data={driverResults}
          keyExtractor={item => item.raceName}
          renderItem={({ item }) => <ResultItem item={item} />}
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
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 20,
  },
  raceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  raceItemContent: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f8f9f9',
    marginBottom: 10,
  },
});

export default RaceResultScreen;
