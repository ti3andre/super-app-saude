import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function Description({route}) {

  const navigation = useNavigation();

  const { service } = route.params;

  if (!service) {
    return null;
  }

  return (
    <ScrollView>
      <View style={styles.view}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.categoryText}>{service.category}</Text>
        <Image
          source={service.circleImage}
          style={styles.imageCircle}
        />
      </View> 
      <Text style={styles.descriptionText}>{service.description}</Text>
      <TouchableOpacity       
        style={styles.button}
      >
        <Text style={styles.buttonText}>Prosseguir</Text>
      </TouchableOpacity>
      <View style={{ height: 80 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    height: 150,
    backgroundColor: '#00A24D',
    alignItems: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 7,
    left: 15,
  },
  categoryText: {
    position: 'absolute',
    marginTop: 60,
    fontSize: 19,
    color: '#fff'
  },
  imageCircle: {
    height: 120,
    width: 120,
    position: 'absolute',
    marginTop: 90
  },
  descriptionText: {
    marginTop: 78,
    marginLeft: 15,
    marginRight: 19
  },
  searchInputStyle:{
    marginHorizontal: 10,
    marginVertical: 35,
    marginBottom: 20,
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },

  button: {
    width: '50%',
    height: 50,
    marginTop: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#00A24D',
    position: 'absolute',
    marginTop: 520,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  
});
