import React from 'react';
import { FlatList, StyleSheet, View, Image, } from 'react-native';


export default function SpecialtyCarousel({serviceSpecialties, navigation}) {
  
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
            return require('../../../assets/massoterapia.png');
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
          data={serviceSpecialties}
          renderItem={({ item }) => {
            return (
              <View style={styles.styleCard}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={getLocalImage(item.image)}
                    style={styles.cardImg}
                  />
                </View>
              </View>
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
    marginLeft: 10
  },
  cardImg: {
    width: 80,
    height: 80,
    borderRadius: 0,
  },
});
