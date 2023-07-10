import React, { useEffect, useState, } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CategoryCarousel from '../../components/Carousel/categoryCarousel';
import { useNavigation } from '@react-navigation/native';
import serviceCategoriesData from '../../components/Carousel/mock/categories.mock.js';
import ModalSearchCities from '../../components/ModalSearchCities';
import PartnersList from '../../components/PartnersList';

const partnerURL = 'https://node.clubecerto.com.br/superapp/establishment/search?limit=20&page=0&category=2';

export default function Home({ navigation }) {

  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [serviceCategories, setServiceCategories] = useState(serviceCategoriesData);
  const [healthPartners, setHealthPartners] = useState([]);
  const [dataCities, setDataCities] = useState([]);

  async function getPartners() {
    try {
      const response = await fetch(partnerURL,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5hbWUiOiJMdWNhcyBMaXNib2EiLCJjcGYiOiIwODMyODMxMjYzOCIsImVtYWlsIjoiTHVjYXNsaXNib2Ftb3R0YUBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOiIoMzEpIDk3MTIyLTQ1NjYiLCJhY3RpdmUiOnRydWUsImFjdGl2ZUNhc2hiYWNrIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTAyVDEyOjUzOjU5LjAwMFoiLCJjb21wYW5pZXNBcnJheSI6IlsxNiwxNiwxNiwxNl0iLCJtb3RoZXJDYXNoYmFja0NvbXBhbnlJZCI6MTYsInBpeCI6IjA4MzI4MzEyNjM4IiwicGl4VHlwZSI6IkNQRiIsImNpdHlJZCI6bnVsbCwiY29tcGFueSI6MTYsInNlbGVjdGVkQ29tcGFueSI6eyJpZCI6MTYsIm5hbWUiOiJDTFVCRSBDRVJUTyIsImNvZGUiOiJzbHh5UTlFYjE3IiwicG9zaXRpb25DUEYiOiJib3R0b20tbGVmdCIsImNvbXBhbmllc0NvbG9yIjp7InByaW1hcnlDb2xvciI6IiNGRkZGRkYiLCJzZWNvbmRhcnlDb2xvciI6IiMwMDAwMDAiLCJiYWNrZ3JvdW5kQ29sb3IiOiIjMDBBMjREIiwiaXRlbXNDb2xvciI6IiNmZmZmZmYifSwiY29tcGFuaWVzSW1hZ2UiOnsiaW1hZ2UiOiJodHRwczovL25vZGUuY2x1YmVjZXJ0by5jb20uYnIvc3VwZXJhcHAvaW1hZ2VzL2NvbXBhbmllcy9icmFuZC9sb2dvU1ZtQlR1SHBKTU9lSUwucG5nIiwiYmFja09mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY3ZTcEwwanpSRGQ5MVl4Zy5wbmciLCJmcm9udE9mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY2ZTVm1CVHVIcEpNT2VJTC5wbmcifX0sImlhdCI6MTY4NzI4MTIzMX0.JsueGuP-MEpjG-gK89ceOsUxoScRMFw1qoH2YER8OBg",
          },
        });
      const data = await response.json();
  
      setHealthPartners(data);
    } catch (error) {
      console.error('Erro ao buscar os parceiros:', error);
    }
  }
    useEffect (() => {
      getPartners();
    }, [])

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
    <>  
      <View style={styles.view}>
        <View style={{ backgroundColor: "#00A24D", height: 10 }}></View>
          <View style={styles.headerContainer}>
            <View style={styles.circleCreditCard}>
            <AntDesign name="creditcard" size={24} color="#00A24D" />
          </View>

            <Image
              style={styles.centerImage}
              source={require('../../../assets/logo-app-saude.png')}
            />

            <Image
              style={styles.circleImage}
              source={require('../../../assets/andre.jpg')}
            />   
        </View>

        <View style={{ backgroundColor: '#00A24D', }}>
          <View
            style={styles.searchInputStyle}
          >
            <TextInput
              style={styles.textPlaceholder}
              onPressIn={() => setIsVisibleModal(true)}
              placeholder='Pesquisar'
              placeholderTextColor={'#979797'}
            />
            <Pressable onPress={() => navigate('')}>
              <Feather name="search" size={30}  style={{color: '#00A24D'}}/>
            </Pressable>
          </View>
        </View>
        <View style={{ height: 16, backgroundColor: '#00A24D' }}></View>

        <ModalSearchCities
          healths={dataCities}
          setIsVisibleModal={setIsVisibleModal}
          isVisibleModal={isVisibleModal}
        />

        {serviceCategories.length > 0 && <CategoryCarousel navigation={navigation} serviceCategories={serviceCategoriesData} />}

        <Text style={styles.parceirosTitle}>Parceiros</Text>
        <ScrollView>
          <PartnersList />
        </ScrollView>
        <View style={{ height: 70}}></View>
        
      </View>    
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#F7F1F1',
  },
  
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#00A24D',
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

  search: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  searchInputStyle:{
    marginHorizontal: 10,
    marginVertical: 15,
    marginBottom: 10,
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  textPlaceholder: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 20,
    fontSize: 16,
    marginLeft: 15,
  },
  parceirosTitle: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15,
    fontSize: 17,
    fontWeight: '600',
  }
});
