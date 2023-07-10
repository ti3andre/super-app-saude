import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const mockData = [
  {
    date: '10/06/2023',
    hour: '10:00',
    day: 'Sab',
    address: 'Rua do Carmo, 140. Lourdes',
    city: 'Belo Horizonte',
    specialty: 'Dentista',
    healthCenter: 'Clínica da Esperança',
  },
  {
    date: '10/06/2023',
    hour: '12:00',
    day: 'Sab',
    address: 'Rua do Socorro, 250. Lourdes',
    city: 'Belo Horizonte',
    specialty: 'Alergista',
    healthCenter: 'Clínica da Saudade',
  },
  {
    date: '12/06/2023',
    hour: '14:00',
    day: 'Seg',
    address: 'Rua do Amores, 347. Centro',
    city: 'Belo Horizonte',
    specialty: 'Cardiologista',
    healthCenter: 'Clínica do Amor',
  },
];

export default function Scheduled() {

  const navigation = useNavigation();

  // Agrupando dados por data.
  const groupedData = mockData.reduce((acc, cur) => {
    const date = cur.date.slice(0, 5); // Pegando somente 'DD/MM'
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(cur);
    return acc;
  }, {});

  const data = Object.keys(groupedData).map(key => {
    return {
      date: key,
      day: groupedData[key][0].day,
      items: groupedData[key],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Consultas agendadas:</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <View style={styles.dateContainer}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.dayText}>{item.day}</Text>
              </View>

              <View style={{ marginLeft: 10 }}>
                {item.items.map((appointment, index) => (
                  <View key={index} style={styles.appointment}>
                    <Text style={styles.specialty}>{appointment.specialty}</Text>
                    <Text style={styles.healthCenter}>{appointment.healthCenter}</Text>
                    <Text style={styles.dateTime}>
                    Data: {appointment.date} às {appointment.hour}
                    </Text>
                    <Text style={styles.address}>{appointment.address}</Text>
                    <Text style={styles.city}>{appointment.city}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ height: 0.4, backgroundColor: '#ccc', marginTop: 20 }}></View>
          </View>
        )}
      />
      <View style={{ height: 90 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f1f1',
  },
  header: {
    height: 85,
    backgroundColor: '#00A24D',
    paddingLeft: 15,
  },
  backButton: {
    position: 'absolute',
    top: 7,
    left: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 47
  },
  dateContainer: {
    flexDirection: 'row',
    padding: 15,
    marginTop: 17
  },
  dateView: {
    backgroundColor: '#e6e6e6',
    padding: 15,
    width: 90,
    marginRight: 10,
    borderTopEndRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 15,
    color: '#989898',
  },
  dayText: {
    fontSize: 15,
    color: '#989898'
  },
  appointment: {
    marginTop: 18
  },
  specialty: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  healthCenter: {
    fontSize: 12,
    marginTop: 2
  },
  dateTime: {
    fontSize: 12,
    color: '#00A24D',
    fontWeight: '500',
    marginTop: 2
  },
  address: {
    fontSize: 12,
    marginTop: 2
  },
  city: {
    fontSize: 12,
    marginTop: 2
  },
});
