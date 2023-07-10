// // 

// import { View, Text, StyleSheet, Pressable, } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { Feather } from 'react-native-vector-icons';
// import { AntDesign } from '@expo/vector-icons'; 


// export default function Stablishment() {
  
//     const { params } = useRoute();
//     const { goBack } = useNavigation();
//     const { navigate } = useNavigation();
//     const navigation = useNavigation();
//     const route = useRoute();
//     const { selectedHealthItem } = route.params; 


//   return (
//     <View style={{ flex: 1, backgroundColor: '#E9E9E9' }}>
//       <View style={{ backgroundColor: '#00A24D', height: 130 }}>
//         <View style={{
//           marginTop: -45,
//           marginBottom: 50,
//           justifyContent: 'flex-start',
//           alignItems: 'flex-start',
//         }}>
//           <Pressable
//             onPress={goBack}
//             style={styles.backButton}
//           >
//             <Feather name="arrow-left" size={30} color="#fff" />
//             <View style={styles.headerContainer}>
//               <View style={styles.circleCreditCard}>
//                 <AntDesign name="creditcard" size={24} color="#00A24D" />
//               </View>
//             </View>
//           </Pressable>
//         </View>
//         <Text>{selectedHealthItem.name}</Text> 
//       </View> 
    
        
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   backButton: {
//     width: 50,
//     height: 50,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     position: 'absolute',
//     zIndex: 100,
//     top: 50,
//     marginBottom: 12,
//   },

//   searchInputStyle:{
//     marginHorizontal: 10,
//     marginVertical: 35,
//     marginBottom: 20,
//     flexDirection: 'row',
//     borderWidth: 1,
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     borderRadius: 25,
//     backgroundColor: '#fff',
//     borderColor: '#fff',
//   },

//   button: {
//     width: '50%',
//     height: 50,
//     marginHorizontal: 35,
//     marginVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 25,
//     backgroundColor: '#00A24D',
//   },
//   buttonDisabled: {
//     width: '50%',
//     height: 50,
//     marginHorizontal: 35,
//     marginVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 25,
//     backgroundColor: '#A9A9A9',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 18
//   },
//   circleCreditCard: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     width: 40,
//     height: 40,
//     marginBottom: 5,
//     marginLeft: 5,
//     borderWidth: 1
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     backgroundColor: '#00A24D',
//   },
// });