import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Pressable, Image, } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Feather } from 'react-native-vector-icons';
import { EvilIcons } from '@expo/vector-icons';

import mockCategory from './mock/categoryCombo.mock';

export default function ComboCategory() {
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { navigate } = useNavigation();
  const [cineValue, setCineValue] = useState('');
  const [categoryList, setCategoryList] = useState([])
  const [totalValue, setTotalValue] = useState('0,00');
  const [selectedVouchers, setSelectedVouchers] = useState([]);


  useEffect(() => {
    if (params) {
      const { selectedVouchers } = params;
      setSelectedVouchers(selectedVouchers || []);
    }
    console.log(params);
  }, [params]);


  useEffect(() => {
    if (params && params.cineValue) {
      setCineValue(params.cineValue);
    } else {
      setCineValue(''); // Defina um valor padrão caso não seja passado um valor válido
    }
    setCategoryList(mockCategory.map(item => ({ ...item, selectedQuantity: 0 })));
  }, [params]);


  // Add items to the category
  const moreItems = (item) => {
    setCategoryList(prevList => {
      return prevList.map(category => {
        if (category.id === item.id) {
          return { ...category, selectedQuantity: category.selectedQuantity + 1 };
        }
        return category;
      });
    });
  }

  // Subtract items from the category
  const lessItems = (item) => {
    setCategoryList(prevList => {
      return prevList.map(category => {
        if (category.id === item.id && category.selectedQuantity > 0) {
          return { ...category, selectedQuantity: category.selectedQuantity - 1 };
        }
        return category;
      });
    });
  };

  // Update total value when categoryList changes
  useEffect(() => {
    updateTotalValue();
  }, [categoryList]);

  const updateTotalValue = () => {
    let sum = categoryList.reduce((total, item) => {
      return total + (item.value * item.selectedQuantity);
    }, 0);

    setTotalValue(sum.toFixed(2));
  };

  const proceedToTotalPay = () => {
    const selectedCombos = categoryList.filter(item => item.selectedQuantity > 0);
    
    navigate("TotalPay", { selectedItems: [...selectedVouchers, ...selectedCombos], cineValue: cineValue });
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#E9E9E9' }}>
      <View style={{ backgroundColor: '#00A24D', height: 130 }}>
        <View style={{
          marginTop: -45,
          marginBottom: 50,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
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
              value={cineValue}
              placeholder='Localizar cinema'
              placeholderTextColor={'#979797'}
            />
            <Feather name="search" size={30}  style={{color: '#00A24D'}}/>
        </View>
      </View> 
      <View
        style={{ backgroundColor: '#E1E1E1' }}
      >
        <View style={{
          marginLeft: 20,
          paddingTop: 15,
          paddingBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative'
        }}>
          
          <Image
            source={require('../../../assets/cine-logo.png')}
            style={{
              width: 120,
              height: 120,
              position: 'absolute',
              marginLeft: -20
            }} 
          />
          <Text style={{fontSize: 20, marginBottom: 7, marginLeft: 90, color: '#00A24D' }}>Combos</Text>
        </View>
      </View>
      <View style={{ height: '50%', marginLeft: 25, marginRight: 25, marginTop: 5 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          data={categoryList}
          renderItem={({ item }) => (
            <>
              <View style={{ flex: 1, padding: 25, flexDirection: 'column', alignItems: 'center' }}>
                <View style={{ flex: .7, flexDirection: 'column' }}>
                  <Text style={{ color: '#A9A9A9', fontSize: 14 }}>{item.name}</Text>
                  <Text style={{ color: '#A9A9A9', fontSize: 14 }}>{item.popCorn}</Text>
                  <Text style={{ color: '#A9A9A9', fontSize: 14 }}>{item.drink}</Text>
                  <Text style={{ color: '#A9A9A9', fontSize: 14 }}>{item.meal}</Text> 
                </View>
                <View style={{ 
                  flex: .3,
                  flexDirection: "row",
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 12
                }}>
                  <Text style={{ color: '#A9A9A9', fontSize: 18, marginRight: 60, }}>{`R$ ${item.value}`}</Text>
                  <View style={{ flexDirection: 'row', marginLeft: 60 }}>
                    <TouchableOpacity
                      onPress={() => lessItems(item)}
                      style={{
                        padding: 10,
                        backgroundColor: '#FFF',
                        borderTopStartRadius: 5,
                        borderBottomStartRadius: 5
                      }}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={{padding: 10, backgroundColor: '#FFF'}}>{item.selectedQuantity}</Text>
                    <TouchableOpacity
                      onPress={() => moreItems(item)}
                      style={{
                        padding: 10,
                        backgroundColor: '#FFF',
                        borderTopEndRadius: 5,
                        borderBottomEndRadius: 5
                      }}>
                      <Text style={{ color: 'red' }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ height: 0.5, backgroundColor: '#979797', marginTop: -15 }} />
            </>
          )}
        />
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
        <TouchableOpacity
          onPress={proceedToTotalPay}         
          style={styles.button}>
          <Text style={styles.buttonText}>{`Prosseguir ${totalValue}`}</Text>
        </TouchableOpacity>
      </View>
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
  selectedCinema: {
    backgroundColor: '#00A24D',
  },
  button: {
    width: '50%',
    height: 50,
    marginHorizontal: 35,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#00A24D',
  },
  buttonDisabled: {
    width: '50%',
    height: 50,
    marginHorizontal: 35,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  }
});
