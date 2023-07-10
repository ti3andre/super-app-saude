import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";

export default function ModalSearchCities({
  isVisibleModal,
  setIsVisibleModal,
}) {
  
  const navigation = useNavigation();

  // estado de nomes de cidade passados no input de busca
  const [filter, setFilter] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  // retorna as cidades dos estados
  const fetchDataFromState = async (stateId) => {
    try {
      const response = await fetch(`https://node.clubecerto.com.br/superapp/locations/cities/${stateId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  }
  
  // Coloca todas as cidades encontradas num array de cidades
  useEffect(() => {
    const fetchAllCities = async () => {
      let allCities = [];
      for(let stateId = 1; stateId <= 27; stateId++) {
        const cities = await fetchDataFromState(stateId);
        allCities = [...allCities, ...cities];
      }
      setAllCities(allCities);
      setFilteredCities(allCities);
    }
    fetchAllCities();
  }, []);

  // Texto (cidade) que é passada para campo de busca
  const filterData = (text) => {
    setFilter(text);
  
    // Formata para aceitar maiusculas, minusculas e acentos
    const formattedText = text
      .normalize("NFD") // "NFD" (Normalization Form Decomposed)
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .toLowerCase();
  
    // Formatando cidades filtradas pro padrão lower caso sem maiusculas e acentos
    const filteringCities = allCities.filter((city) => {
      const cityName = city.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
  
      return cityName.includes(formattedText);
    });
    setFilteredCities(filteringCities); // Atualizando filteredCities, não cities
  };

  useEffect(() => {
    if (isVisibleModal) {
      filterData("");
    }
  }, [isVisibleModal]);
  
  useEffect(() => {
  }, [filteredCities]);


  return (
    <Modal
      visible={isVisibleModal}
      transparent={true}
      onRequestClose={() => {
        setIsVisibleModal(false);
      }}
    >
      <Pressable
        style={styles.wrapperModal}
        onPress={() => setIsVisibleModal(false)}
      >
        <View style={styles.containerModal}>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              backgroundColor: "#fff",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            <TextInput
              style={{
                height: 50,
                borderRadius: 5,
                flex: 1,
                paddingHorizontal: 10,
              }}
              onChangeText={(txt) => filterData(txt)}
              value={filter}
            />

            <TouchableOpacity style={styles.searchIcon}>
              <Icon style={styles.iconLupa} name="search" size={40} />
            </TouchableOpacity>
          </View>

          {filter.length < 3 ? (
            <Text style={{ marginLeft: 4, marginVertical: 3 }}>Informe o nome da sua cidade</Text>
          ) : (
            <FlatList
              ListEmptyComponent={() => <Text>Nenhum cidade encontrada</Text>}
              keyExtractor={(item, index) => index.toString()}
              data={filteredCities}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.citiesButton}
                  onPress={() => {
                    setIsVisibleModal(false);
                    navigation.navigate("HealthStablishment", {
                      cityId: item.id,
                      stateId: item.stateId,
                      cityName: item.name,
                    });
                  }}
                >
                  <Text style={styles.citiesTextButton}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapperModal: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  containerModal: {
    borderRadius: 11,
    padding: 20,
    backgroundColor: "#F5F3F3",
    alignItems: 'center',
    width: "80%",
    height: 520,
    marginTop: 20,
  },
  citiesButton:{
    marginLeft: 0,
    marginTop: 1,
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 3,
    width: '100%'
  },
  citiesTextButton:{
    fontSize: 15,
    fontWeight: 'normal'
  }
});
