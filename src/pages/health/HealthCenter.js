import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TextInput, StyleSheet, ScrollView } from "react-native";
import { Feather } from 'react-native-vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons'; 

import serviceSpecialtyData from '../health/mock/special.mock';
import ModalSearchCities from "../../components/ModalSearchCities";
import PartnersList from "../../components/PartnersList";
import SpecialtyCarousel from "../../components/Carousel/specialtyCarousel";

const partnerURL = 'https://node.clubecerto.com.br/superapp/establishment/search?limit=20&page=0&category=16';

export default function HealthCenter({ navigation }) {

  const navigate = useNavigation();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [dataCities, setDataCities] = useState([]);
  const [serviceSpecialties, setServiceSpecialties] = useState(serviceSpecialtyData);

  async function getHealth() {
    const response = await fetch(
      "https://node.clubecerto.com.br/superapp/establishment/geolocation/addresses?category=2",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5hbWUiOiJMdWNhcyBMaXNib2EiLCJjcGYiOiIwODMyODMxMjYzOCIsImVtYWlsIjoiTHVjYXNsaXNib2Ftb3R0YUBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOiIoMzEpIDk3MTIyLTQ1NjYiLCJhY3RpdmUiOnRydWUsImFjdGl2ZUNhc2hiYWNrIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTAyVDEyOjUzOjU5LjAwMFoiLCJjb21wYW5pZXNBcnJheSI6IlsxNiwxNiwxNiwxNl0iLCJtb3RoZXJDYXNoYmFja0NvbXBhbnlJZCI6MTYsInBpeCI6IjA4MzI4MzEyNjM4IiwicGl4VHlwZSI6IkNQRiIsImNpdHlJZCI6bnVsbCwiY29tcGFueSI6MTYsInNlbGVjdGVkQ29tcGFueSI6eyJpZCI6MTYsIm5hbWUiOiJDTFVCRSBDRVJUTyIsImNvZGUiOiJzbHh5UTlFYjE3IiwicG9zaXRpb25DUEYiOiJib3R0b20tbGVmdCIsImNvbXBhbmllc0NvbG9yIjp7InByaW1hcnlDb2xvciI6IiNGRkZGRkYiLCJzZWNvbmRhcnlDb2xvciI6IiMwMDAwMDAiLCJiYWNrZ3JvdW5kQ29sb3IiOiIjMDBBMjREIiwiaXRlbXNDb2xvciI6IiNmZmZmZmYifSwiY29tcGFuaWVzSW1hZ2UiOnsiaW1hZ2UiOiJodHRwczovL25vZGUuY2x1YmVjZXJ0by5jb20uYnIvc3VwZXJhcHAvaW1hZ2VzL2NvbXBhbmllcy9icmFuZC9sb2dvU1ZtQlR1SHBKTU9lSUwucG5nIiwiYmFja09mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY3ZTcEwwanpSRGQ5MVl4Zy5wbmciLCJmcm9udE9mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY2ZTVm1CVHVIcEpNT2VJTC5wbmcifX0sImlhdCI6MTY4NzI4MTIzMX0.JsueGuP-MEpjG-gK89ceOsUxoScRMFw1qoH2YER8OBg",
        },
      }
    );

    let notFilteredCities = [];

    for (let index = 1; index < 27; index++) {
      const responseCities = await fetch(
        "https://node.clubecerto.com.br/superapp/locations/cities/" + index
      );

      const resultresponseCities = await responseCities.json();

      notFilteredCities = notFilteredCities.concat(resultresponseCities);
    }
    setDataCities(notFilteredCities);
  }

  useEffect(() => {
    getHealth();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F1F1',}}>
      <View style={{ backgroundColor: '#F7F1F1', marginTop: 10 }}>
            <View style={styles.headerContainer}>
              <View style={styles.circleCreditCard}>
              <AntDesign name="creditcard" size={24} color="#00A24D" />
            </View>

              <Image
                style={styles.centerImage}
                source={require('../../../assets/logo2-app-saude.png')}
              />

              <Image
                style={styles.circleImage}
                source={require('../../../assets/andre.jpg')}
              />   
          </View>
        <View
          style={styles.searchInputStyle}
        >
            <EvilIcons name="location" size={40}  style={{color: '#00A24D'}}/>
            <TextInput
              style={styles.placeholderText}
              onPressIn={() => setIsVisibleModal(true)}
              placeholder='Pesquisar'
              placeholderTextColor={'#979797'}
            />
            <Feather name="search" size={30}  style={{color: '#00A24D'}}/>
        </View>
        <View 
          style={styles.specialContainer}
        >
          <Text style={{ fontSize: 17, fontWeight: '600' }}>Especialidades</Text>
        </View>
      </View>
      {serviceSpecialties.length > 0 &&
      <SpecialtyCarousel serviceSpecialties={serviceSpecialtyData} navigation={navigation} />}
      
      <Text style={styles.partnerText}>Parceiros</Text>
      
      <ScrollView>
        <PartnersList />
      </ScrollView>

      <View style={{ height: 75 }}></View>
      <ModalSearchCities
        healths={dataCities}
        setIsVisibleModal={setIsVisibleModal}
        isVisibleModal={isVisibleModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInputStyle:{
    marginHorizontal: 10,
    marginVertical: 10,
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: '#e6e6e6',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F7F1F1',
  },
  circleImage: {
    marginBottom: 10,
    marginTop: 5,
    marginRight: 5,
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1
  },
  centerImage:{
    marginBottom: 10,
    marginTop: 5,
    marginRight: 5,
    width: 90,
    height: 50,
  },
  circleCreditCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 40,
    height: 40,
    marginBottom: 5,
    marginLeft: 5,
    borderWidth: 1
  },
  placeholderText: {
    flex: 1,
    height: 55,
    backgroundColor: '#e6e6e6',
    borderRadius: 20,
    fontSize: 16,
    marginLeft: 8,
  },
  specialContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: -10
  },
  partnerText: {
    fontSize: 17,
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20,
    fontWeight: '600'
  }
});
