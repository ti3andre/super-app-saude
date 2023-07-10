import React, {useState} from 'react';
import { FlatList, StyleSheet, View, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CategoryCarousel({serviceCategories}) {
  
  const navigation = useNavigation();
  const [buttonScale] = useState(new Animated.Value(1));
  const [selectedButtonId, setSelectedButtonId] = useState(null);

  function handlePress(item) {
    setSelectedButtonId(item.id);
    // Inicia a animação
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 1.10, duration: 200, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 200, useNativeDriver: true })
    ]).start(() => {
      navigation.navigate('Description', { service: item });
    });
  }

  function getLocalImage(imageName) {
    switch (imageName) {
        case 'telepsicologia':
            return require('../../../assets/telepsicologia.png');
        case 'telemedicina':
            return require('../../../assets/telemedicina.png');
        case 'farmacias':
            return require('../../../assets/farmacias.png');
        case 'labs':
            return require('../../../assets/labs.png');
        case 'telepsiquiatria':
            return require('../../../assets/telepsiquiatria.png');
        default:
            return null;
    }
  }

  return (
    <View>
      <View style={styles.CarouselContainer}>
        <FlatList
          horizontal 
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          data={serviceCategories}
          renderItem={({ item }) => {
            const isButtonSelected = item.id === selectedButtonId;
            return (
              <TouchableOpacity onPress={() => handlePress(item) }>                
                <Animated.View
                  style={[
                    styles.styleCard,
                    {
                      transform: [
                        { scale: isButtonSelected ? buttonScale : 1 }
                      ]
                    }
                  ]}
                >
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      source={getLocalImage(item.image)}
                      style={styles.cardImg}
                    />
                  </View>
                </Animated.View>               
              </TouchableOpacity>
            )
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
    marginLeft: 4
  },
  cardImg: {
    width: 80,
    height: 80,
    borderRadius: 0,
  },
});
