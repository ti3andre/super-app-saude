import React, { useEffect, useState, } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

const partnerURL = 'https://node.clubecerto.com.br/superapp/establishment/search?limit=20&page=0&category=2';

export default function PartnersList() {

    const [healthPartners, setHealthPartners] = useState([]);
  
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
  
     
  
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
            <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={healthPartners}
            renderItem={({ item }) => {
                if (item.id === 'empty') {
                // Render a empty item
                return <View style={{ flex: 1, margin: 10, }} />;
                }

                return (
                <View style={styles.itemContainer}>
                    <View
                    style={styles.itemRow}
                    >
                    <View style={styles.imageView}>
                        <Image
                        resizeMode="cover"
                        source={{ uri: item.establishmentImage.image }}
                        style={styles.imageStyle}
                        />
                        <View>
                        <Text style={{ marginLeft: 20, marginBottom: 3, fontSize: 13, marginTop: -20 }}>{item.name}</Text>
                        <Text style={{ marginLeft: 20, fontSize: 10 }}>{item.category.name}</Text>
                        </View>
                    </View> 
                  </View>      
                </View>        
              );  
            }}
            />
        </View>
      );
}
  
  const styles = StyleSheet.create({
    itemContainer: {
      marginHorizontal: 5,
      marginVertical: 3,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      justifyContent: 'center'
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      justifyContent: 'flex-start',
      backgroundColor: '#e6e6e6',
      height: 80,
      width: 330,
      borderRadius: '10%'
    },
    imageView: {
      borderRadius: 10,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center'
    },
    imageStyle: {
      height: 70, 
      width: 70, 
      borderRadius: 35, 
      borderWidth: 1, 
    },
  });
  