import React, {useState} from 'react';
import {Picker, Text, StyleSheet, View, TextInput} from 'react-native';
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
import axios from 'axios'

const Add = () => {
  const [type, setType] = useState('startTime');
  const [project, setProject] = useState('');
  send = () => {
    var months = new Array('Jan', 'Feb', 'Mar',
                     'Apr', 'May', 'Jun', 'Jul', 'Aug',
                     'Sep', 'Oct', 'Nov', 'Dec');
    var monthsPortuguese = new Array('Janeiro', 'Fevereiro', 'Março',
                     'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
                     'Setembro', 'Outubro', 'Novembro', 'Dezembro');
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds();
    let dat = date + '-' + months[month -1 ]  + '-' + year  
    let hour = hours + ':' + min + ':' + sec
   
    
    let formData = {
      "project_desc": project,
      "date": dat, 
      "hours": hour,
      "events": type,
      "month": monthsPortuguese[month - 1]

    }

    console.log(month)
    
    axios.post("http://3a4027d2fe0d.ngrok.io/entry", formData)
    .then( resp => {
        if(resp.data.length > 0 ) {
            window.localStorage.setItem("token", resp.data[0].token)

        }
    })
    .catch( e => console.log(e))
  }

  formatEvent = type => {
    switch (type) {
      case "startTime":
        return "Entranda"
      case "launch":
        return "Saída para o almoço"
      case "afterLaunch":
        return "Volta do almoço"
      case "endTime":
        return "Saída"
      default:
        return "Evento Não Selecionado!"
    }
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.title]}>O2B timeSheet</Text>
  
      <View style={styles.InputContainer}>
        <TextInput 
          style={styles.body}
          placeholderTextColor={AppStyles.color.grey}
          placeholder="Projeto" 
          onChangeText={text => setProject(text)}
          value={project}
          />
        </View>
      <View style={styles.InputContainer}>
        <Picker
            selectedValue={type}
            onValueChange={type => setType(type)}>
            <Picker.Item label="Entrada" value="startTime" />
            <Picker.Item label="Saída para o almoço" value="launch" />
            <Picker.Item label="Volta do almoço" value="afterLaunch" />
            <Picker.Item label="Saída" value="endTime" />
          </Picker>

      </View>

        <Text>
          Evento Selecionado: { formatEvent(type) }
        </Text>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => { send()}}
        >
          Salvar
        </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: "black",
    marginTop: 40,
    marginBottom: 10
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 100,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default Add