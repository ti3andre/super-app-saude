import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const mockData = [
  {
    date: '05/06/2023',
    hour: '10:00',
    city: 'Belo Horizonte',
    specialty: 'Farmácia',
    image: require('../../../assets/healthPartnerdefault.jpg'),
    totalPay: '100,00'
  },
  {
    date: '03/06/2023',
    hour: '12:00',
    city: 'Belo Horizonte',
    specialty: 'Podólogo',
    image: require('../../../assets/healthPartnerdefault.jpg'),
    totalPay: '50,00'
  },
  {
    date: '06/06/2023',
    hour: '14:00',
    city: 'Belo Horizonte',
    specialty: 'Dentista',
    image: require('../../../assets/healthPartnerdefault.jpg'),
    totalPay: '200,00'
  },
];

export default function BuyHistory() {

  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: '#f7f1f1' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Histórico</Text>
      </View>
      <FlatList
        data={mockData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <View style={styles.row}>
              <Image source={item.image} style={styles.image} />
              <View style={{ marginLeft: 5 }}>
                <Text style={styles.specialty}>{item.specialty}</Text>
                <View style={styles.dateTimeRow}>
                  <Text style={styles.dateTime}>Data: {item.date} </Text>
                  <Text style={styles.dateTime}>às {item.hour}</Text>
                </View>
                <Text style={styles.totalPay}>Total: R${item.totalPay}</Text>
              </View>
            </View>
            <View style={styles.separator}></View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 85,
    backgroundColor: '#e6e6e6',
    paddingLeft: 15,
    marginBottom: 10
  },
  backButton: {
    position: 'absolute',
    top: 7,
    left: 15,
  },
  headerText: {
    fontSize: 16,
    marginTop: 47
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#979797',
  },
  specialty: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTime: {
    fontSize: 14,
    marginTop: 2,
  },
  totalPay: {
    fontSize: 14,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
});
