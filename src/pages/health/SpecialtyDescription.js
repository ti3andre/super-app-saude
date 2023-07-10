import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 

export default function SpecialtyDescription({ route }) {
  
  const isFocused = useIsFocused();
  const { service } = route.params;
  const navigation = useNavigation();
  
  const [specialtyData, setSpecialtyData] = useState(service);

  useEffect(() => {
    setSpecialtyData(service);
  }, [service]);

  useEffect(() => {
    if (isFocused) {
      setSpecialtyData(service);
    }
  }, [service, isFocused]);


  const handlePress = () => {
    navigation.navigate('CalendarScreen');
};

const handlePressBack = () => {
  navigation.navigate('HealthStablishment', {cityName: specialtyData.cityName});
};


  return (
    <ScrollView>
      <View style={styles.view}>
        <Pressable
          onPress={handlePressBack}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={30} color="#00A24D" />              
          <View style={styles.circleCreditCard}>
            <AntDesign name="creditcard" size={30} color="#00A24D" />
          </View>
        </Pressable>
      </View>
      {specialtyData &&
      <View style={styles.container}>
        <Text style={styles.title}>{specialtyData.specialty}</Text>
        <Text style={styles.description}>{specialtyData.description}</Text>
      </View>
      }
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: -45,
    marginBottom: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    zIndex: 100,
    top: 50,
    marginBottom: 12,
    marginLeft: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 40
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
  },
  circleCreditCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 50,
    height: 50,
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 5,
    borderWidth: 1,
  },
  button: {
    width: '55%',
    height: 40,
    marginHorizontal: 35,
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#00A24D',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  }
});
