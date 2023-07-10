import * as React from 'react';
import { useState,  } from 'react';
import { View, Text, Pressable, TouchableOpacity, StyleSheet, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";

import moment from 'moment-timezone';


LocaleConfig.locales.fr = {
  monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  monthNamesShort: ["Jan.", "Fev.", "Mar", "Abr", "Mai", "Jun", "Jul.", "Ago", "Set.", "Out.", "Nov.", "Dez."],
  dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado',],
  dayNamesShort: ["D", "S", "T", "Q", "Q", "S", "S"],
  today: "Hoje"
};

LocaleConfig.defaultLocale = "fr";

export default function CalendarScreen() {
  
  const { goBack } = useNavigation();
  const [selected, setSelected] = useState('');

  const [selectedHour, setSelectedHour] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  
  const currentDate = new Date();
  const year = currentDate.getFullYear(); 
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const currentDateFormatted = `${year}-${month}-${day}`;
  const today = moment().tz("America/Sao_Paulo");

  // Mock de horarios
  const disponibleDate = [
    { 
        hours: ['9:00', '10:00', '11:00', '12:00', '14:00','16:00',]
    }
  ];

  const isDateValid = (date, hour) => {
    const today = moment().tz("America/Sao_Paulo");
    const selectedDate = moment(date);
  
    // Verificar se a data selecionada é hoje
    if (selectedDate.isSameOrAfter(today, 'day')) {
      // Se for hoje, verificar se a hora selecionada já passou
      if (selectedDate.isSame(today, 'day')) {
        const currentHour = today.hours();
        const selectedHour = hour ? parseInt(hour.split(":")[0]) : null;
        return selectedHour ? selectedHour >= currentHour : false;
      }
      return true;
    }
  
    return false;
  };

  const isToday = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate.getDate() === today.getDate() && 
           selectedDate.getMonth() === today.getMonth() && 
           selectedDate.getFullYear() === today.getFullYear();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ width: '100%' }}>
      <View style={styles.view}>
          <Pressable
            onPress={goBack}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={30} color="#00A24D" />              
          </Pressable>
        </View>
        <Text style={{ fontSize: 18, marginBottom: 25, marginLeft: 20, marginTop: -20 }}>
          Agendar consulta
        </Text>

        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
            // Verificar se a data é válida
            if (isDateValid(day.dateString, selectedHour) || isToday(day.dateString)) {
              // Somente habilitar o botão se uma hora válida for selecionada
              if (selectedHour) {
                setIsButtonDisabled(false);
              }
            } else {
              setIsButtonDisabled(true);
            }
          }}

          // Customiza estilo do calendario
          style={styles.calendarSize}

          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#008841',
            selectedDayBackgroundColor: '#00A24D',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00A24D',
            todayBackgroundColor: '#e6e6e6',
            textDayFontSize: 15,
            dayTextColor: '#000',
            textDisabledColor: '#979797', 
            arrowColor: '#00A24D',
            monthTextColor: '#000',
            textMonthFontSize: 16,
            weekVerticalMargin: 1,
            arrowStyle: {
              width: 11,
              height: 11,
              justifyContent: 'center'
            },
          }
          }

          // Specify the current date
          current={currentDateFormatted}

          // Mark specific dates as marked
          markedDates={{
            [selected]: {selected: true, disableTouchEvent: true,}
          }}
        />

        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Agendamento realizado com sucesso!</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

        <Text style={styles.hourText}>
          Horários disponíveis:
        </Text>
        <View style={{ marginHorizontal: 20 }}>
          <FlatList
            scrollEnabled={false}
            data={disponibleDate[0].hours}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({item}) => (
              <TouchableOpacity 
                style={[
                  styles.item,
                  { backgroundColor: item === selectedHour ? '#00A24D' : '#D9D9D9' }
                ]}
                onPress={() => {
                  setSelectedHour(item);
                  // Verificar se a data é válida ou se é hoje
                  if (selected && (isDateValid(selected, item) || isToday(selected))) {
                    setIsButtonDisabled(false);
                  } else {
                    setIsButtonDisabled(true);
                  }
                }}
              >
                <Text 
                  style={{ 
                    color: item === selectedHour ? '#FFF' : '#000',
                    textAlign: 'center', 
                    fontSize: 12 
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity 
          style={isButtonDisabled ? styles.buttonDisabled : styles.button} 
          disabled={isButtonDisabled}
          onPress={() => {
            if (!isButtonDisabled) {
              setModalVisible(true);
            }
          }}
        >
          <Text style={isButtonDisabled ? styles.buttonTextDisabled : styles.buttonText}>Agendar</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: -45,
    marginBottom: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    zIndex: 100,
    top: 50,
    marginBottom: 12,
    marginLeft: 10
  },
  calendarSize: {
    height: 287,
    marginHorizontal: 25,
    borderRadius: 10
  },
  item: {
    backgroundColor: '#D9D9D9',
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 6,

    padding: 5,
    borderRadius: 30,
  },
  button: {
    width: '55%',
    height: 40,
    marginHorizontal: 35,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#00A24D',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  buttonDisabled: {
    width: '55%',
    height: 40,
    marginHorizontal: 35,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#979797',
    alignSelf: 'center',
  },
  buttonTextDisabled: {
    color: '#FFF',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: 'center',
    height: 150,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  hourText: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});