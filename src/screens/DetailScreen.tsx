import React, { useEffect, memo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useAppSelector } from '../state';
import { useDispatch } from 'react-redux';
import { fetchDriverByIdAction } from '../state/drivers/action';
import useSmartNavigation from '../hooks/useSmartNavigation';

interface IProps {
  route: {
    params: {
      driverId: string;
    };
  };
}

interface IDetailSection {
  title: string;
  name: string;
}

const DetailSection = memo(({ title, name }: IDetailSection) => (
  <View style={styles.detailSection}>
    <Text>{title}</Text>
    <Text>{name}</Text>
  </View>
));

const DetailScreen = ({ route }: IProps) => {
  const { driverId } = route.params;
  const dispatch = useDispatch();
  const navigation = useSmartNavigation();
  const { selectedDriverItem, getDriverLoading } = useAppSelector(
    state => state.driver
  );

  useEffect(() => {
    if (driverId) {
      dispatch(fetchDriverByIdAction(driverId));
    }
  }, [driverId]);

  if (getDriverLoading) {
    return <ActivityIndicator size="large" style={styles.container} />;
  }

  const {
    givenName,
    familyName,
    nationality,
    dateOfBirth,
    code,
    permanentNumber,
    url,
  } = selectedDriverItem || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperContent}>
        <TouchableOpacity
          style={styles.backContent}
          onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>

        {givenName && <DetailSection title="First Name" name={givenName} />}
        {familyName && <DetailSection title="Last Name" name={familyName} />}
        {nationality && <DetailSection title="Country" name={nationality} />}
        {dateOfBirth && (
          <DetailSection title="Date of Birth" name={dateOfBirth} />
        )}
        {code && <DetailSection title="Code" name={code} />}
        {permanentNumber && (
          <DetailSection title="Number" name={permanentNumber.toString()} />
        )}
        {url && (
          <TouchableOpacity style={{borderWidth: 1, borderRadius: 8}} onPress={() => Linking.openURL(url)}>
            <Text style={styles.link}>{url}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('RaceResultScreen', { driverId })}
          style={styles.btn}>
          <Text style={styles.btnText}>Race Result</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  btn: {
    padding: 20,
    backgroundColor: '#abebc6',
    borderRadius: 8,
    marginTop: 20,
  },
  link: {
    color: 'blue',
    marginVertical: 10,
    textAlign: 'center',
  },
  btnText: {
    textAlign: 'center',
  },
});

export default DetailScreen;
