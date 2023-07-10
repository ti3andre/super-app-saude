import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PartnersList from '../../components/PartnersList';
import { useNavigation } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";

export default function Partners() {

  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: '#f7f1f1' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Parceiros</Text>
      </View>
      <ScrollView>
      <PartnersList />
      <View style={{ height: 170 }}></View>
      </ScrollView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 85,
    backgroundColor: '#00A24D',
    paddingLeft: 15,
    marginBottom: 10
  },
  headerText: {
    fontSize: 16,
    marginTop: 47,
    color: '#fff'
  },
  backButton: {
    position: 'absolute',
    top: 7,
    left: 15,
  },
});
