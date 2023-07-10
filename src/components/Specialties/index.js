import React, {useState, useRef} from 'react';
import { FlatList, StyleSheet, View, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Specialties({serviceSpecialties}) {
  

    const navigation = useNavigation();
    const [selectedItem, setSelectedItem] = useState(null);
    const scaleValue = useRef(new Animated.Value(1)).current;


    function getLocalImage(imageName) {
        switch (imageName) {
            case 'cardiologia':
                return require('../../../assets/cardio.png');
            case 'odontologia':
                return require('../../../assets/odonto.png');
            case 'psicologia':
                return require('../../../assets/psicologia.png');
            case 'fisioterapia':
                return require('../../../assets/fisio.png');
            case 'psiquiatria':
                return require('../../../assets/psiquiatria.png');
            case 'massoterapia':
                return require('../../../assets/massoterapia.png');
            case 'podologia':
                return require('../../../assets/podologia.png');
            case 'anestesiologia':
                return require('../../../assets/anestesiologia.png');
            case 'pediatria':
                return require('../../../assets/pediatria.png');
            case 'pneumologia':
                return require('../../../assets/pneumologia.png');
            case 'ortopedia':
                return require('../../../assets/ortopedia.png');
            case 'clinicogeral':
                return require('../../../assets/clinicogeral.png');
            case 'hematologia':
                return require('../../../assets/hematologia.png');
            case 'alergista':
                return require('../../../assets/alergista.png');
            case 'oftalmologia':
                return require('../../../assets/oftalmologia.png');
            default:
            console.log(`Image ${imageName} not found`);
            return null;
        }
      }
    
      const handlePress = (item) => {
        if (item.id !== 'empty') {
            setSelectedItem(item.id);

            // Iniciar a animação
            Animated.timing(scaleValue, {
                toValue: 1.1,
                duration: 200,
                useNativeDriver: true, // Adicionar isso para melhor performance
            }).start(() => {
                scaleValue.setValue(1);
            });

            setTimeout(() => {
                navigation.navigate('SpecialtyDescription', { service: {...item, image: getLocalImage(item.image)} });
            }, 200);
        }
    };

    let newServiceSpecialties = Array.isArray(serviceSpecialties) ? [...serviceSpecialties] : [];

    // Se o número de itens é ímpar, adicione um item vazio
    if(newServiceSpecialties.length % 2 !== 0) {
    newServiceSpecialties.push({ id: 'empty' });
    }
   
  return (
    <View>
    <View style={styles.CarouselContainer}>
      <FlatList
        numColumns={4}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={newServiceSpecialties}
        renderItem={({ item }) => {
          const isItemSelected = item.id === selectedItem;
          return (
            <TouchableOpacity activeOpacity={0.6} onPress={() => handlePress(item)}>
                <View style={styles.styleCard}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {
                        item.image &&
                        <Animated.Image
                            source={getLocalImage(item.image)}
                            style={[
                            styles.cardImg,
                            { transform: [{ scale: isItemSelected ? scaleValue : 1 }] }
                            ]}
                        />
                        }
                    </View>
                </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  CarouselContainer: {
    marginTop: 25,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleCard: {
    alignItems: 'center',
    backgroundColor: '#F7F1F1',
    padding: 0,
    width: 80,
    height: 80,
    marginLeft: 3,
    marginBottom: 3
  },
  cardImg: {
    width: 80,
    height: 80,
    borderRadius: 0,
  },
});
