import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useAppSelector } from '../state/index';
import { fetchDriverByIdAction } from '../state/drivers/action';
import { useDispatch } from 'react-redux';
import useSmartNavigation from '../hooks/useSmartNavigation';

interface IProps {
  route: {
    params: {
      driverId: string;
    };
  };
}

interface IDetailSection {
  title: string
  name: string
}

const DetailScreen = ({route}:IProps) => {
  const driverId = route?.params?.driverId;
  const dispatch = useDispatch();
  const navigation = useSmartNavigation();
  const {selectedDriverItem, getDriverLoading} = useAppSelector(state => state.driver);

  useEffect(() => {
    if(driverId)
      dispatch(fetchDriverByIdAction(driverId));
  }, [driverId]);

  const DetailSection = ({title, name}: IDetailSection) => {
    return(
      <View style={styles.detailSection}>
        <Text>{title}</Text>

        <Text>{name}</Text>
      </View>
    )
  }

  if (getDriverLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperContent}>
        <TouchableOpacity style={styles.backContent} onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>

        {selectedDriverItem?.givenName && <DetailSection title='FirstName' name={selectedDriverItem?.givenName} />}
        {selectedDriverItem?.familyName && <DetailSection title='LastName' name={selectedDriverItem?.familyName} />}
        {selectedDriverItem?.nationality && <DetailSection title='Country' name={selectedDriverItem?.nationality} />}
        {selectedDriverItem?.dateOfBirth && <DetailSection title='Date of birth' name={selectedDriverItem?.dateOfBirth} />}
        {selectedDriverItem?.code && <DetailSection title='Code' name={selectedDriverItem?.code} />}
        {selectedDriverItem?.permanentNumber && <DetailSection title='Number' name={selectedDriverItem?.permanentNumber} />}
        {selectedDriverItem?.url && <DetailSection title='Url' name={selectedDriverItem?.url} />}

        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=> navigation.navigate('RaceResultScreen', {driverId})}
            style={styles.btn}>
            <Text style={{textAlign: 'center'}}>Race Result</Text>
            </TouchableOpacity>
        </View>
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
  btn: {
    padding: 20,
    backgroundColor: '#abebc6',
    borderRadius: 8
  }
});

export default DetailScreen;