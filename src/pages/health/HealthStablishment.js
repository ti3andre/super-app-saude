import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Feather } from 'react-native-vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 

import Specialties from "../../components/Specialties";
import serviceSpecialtyData from '../health/mock/special.mock';

export default function HealthStablishment() {
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { navigate } = useNavigation();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [cityValue, setCityValue] = useState('');
  const [selectHealth, setSelectHealth] = useState({});
  const [citiesHealth, setCitiesHealth] = useState("");
  const [cityString, setCityString] = useState(params.cityName || '');

  const [serviceSpecialties, setServiceSpecialties] = useState(serviceSpecialtyData);

  useEffect(() => {
    const fetchHealths = async () => {
      const response = await fetch(
        `https://node.clubecerto.com.br/superapp/establishment/geolocation/addresses?page=0&distance=20000&limit=20&category=2&city=${encodeURIComponent(cityString)}&state=${encodeURIComponent(params.stateId)}`,
        {
          headers: {
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5hbWUiOiJMdWNhcyBMaXNib2EiLCJjcGYiOiIwODMyODMxMjYzOCIsImVtYWlsIjoiTHVjYXNsaXNib2Ftb3R0YUBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOiIoMzEpIDk3MTIyLTQ1NjYiLCJhY3RpdmUiOnRydWUsImFjdGl2ZUNhc2hiYWNrIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTAyVDEyOjUzOjU5LjAwMFoiLCJjb21wYW5pZXNBcnJheSI6IlsxNiwxNiwxNiwxNl0iLCJtb3RoZXJDYXNoYmFja0NvbXBhbnlJZCI6MTYsInBpeCI6IjA4MzI4MzEyNjM4IiwicGl4VHlwZSI6IkNQRiIsImNpdHlJZCI6bnVsbCwiY29tcGFueSI6MTYsInNlbGVjdGVkQ29tcGFueSI6eyJpZCI6MTYsIm5hbWUiOiJDTFVCRSBDRVJUTyIsImNvZGUiOiJzbHh5UTlFYjE3IiwicG9zaXRpb25DUEYiOiJib3R0b20tbGVmdCIsImNvbXBhbmllc0NvbG9yIjp7InByaW1hcnlDb2xvciI6IiNGRkZGRkYiLCJzZWNvbmRhcnlDb2xvciI6IiMwMDAwMDAiLCJiYWNrZ3JvdW5kQ29sb3IiOiIjMDBBMjREIiwiaXRlbXNDb2xvciI6IiNmZmZmZmYifSwiY29tcGFuaWVzSW1hZ2UiOnsiaW1hZ2UiOiJodHRwczovL25vZGUuY2x1YmVjZXJ0by5jb20uYnIvc3VwZXJhcHAvaW1hZ2VzL2NvbXBhbmllcy9icmFuZC9sb2dvU1ZtQlR1SHBKTU9lSUwucG5nIiwiYmFja09mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY3ZTcEwwanpSRGQ5MVl4Zy5wbmciLCJmcm9udE9mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY2ZTVm1CVHVIcEpNT2VJTC5wbmcifX0sImlhdCI6MTY4NzI4MTIzMX0.JsueGuP-MEpjG-gK89ceOsUxoScRMFw1qoH2YER8OBg",
          },
        }
      );

      const responseJSON = await response.json();
      console.log(responseJSON);
      setCitiesHealth(responseJSON);
    };

    if(cityString) {
      fetchHealths();
    }
  }, [cityString, params.stateId]);

  useEffect(() => {
    if (params) {
      const { cityName } = params;
      if (cityName) {
        setCityString(cityName);
      }
    }
  }, [params]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#00A24D' }}>
        <View style={{marginTop: -45, marginBottom: 50, justifyContent: 'flex-start', alignItems: 'flex-start',}}>
          <Pressable
            onPress={goBack}
            style={{
              width: 50,
              height: 50,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              position: 'absolute',
              zIndex: 100,
              top: 50,
              marginBottom: 12,
            }}
          >
            <Feather name="arrow-left" size={30} color="#fff" />
          </Pressable>
        </View>
        <View
          style={styles.searchInputStyle}
        >
            <EvilIcons name="location" size={40}  style={{color: '#00A24D'}}/>
            <TextInput
              style={{ 
                flex: 1,
                height: 55,
                backgroundColor: '#fff',
                color: '#00A24D',
                borderRadius: 20,
                fontSize: 13,
                marginLeft: 8,
              }}
              onPressIn={() => setIsVisibleModal(true)}
              isVisibleModal={isVisibleModal}
              value={cityString}
              placeholder='Localizar estabelecimento'
              placeholderTextColor={'#979797'}
            />
            <Feather name="search" size={30}  style={{color: '#00A24D'}}/>
        </View>
      </View>
      <Text style={{
        marginLeft: 17,
        marginTop: 20,
        color: '#00A24D',
        fontWeight: 'bold',
        fontSize: 15,
        alignSelf: 'center'
        }}>
        Escolha uma categoria:
      </Text>
      
      {serviceSpecialties.length > 0 && <Specialties serviceSpecialties={serviceSpecialtyData} navigation={navigation} />}     
    </View>
  );
}

const styles = StyleSheet.create({
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
});
