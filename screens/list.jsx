import React, {Component, useState} from 'react';
import {Picker, Text, StyleSheet, View, TextInput} from 'react-native';
import { AppStyles } from "../AppStyles";
import axios from 'axios'
import { DataTable } from 'react-native-paper';

class List extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            loading: true,
        };
    }

    
    renderData =  () => {
        let renders = [];
       
        if(this.state.loading) {
            renders.push(                            
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Carregando....</DataTable.Title>
                    </DataTable.Header>
                </DataTable>
            )

            return renders
        } 


        renders.push(                            
            <DataTable.Header>
                <DataTable.Title>Mês</DataTable.Title>
                <DataTable.Title>Dia</DataTable.Title>
                <DataTable.Title>Entrada</DataTable.Title>
                <DataTable.Title>Saída</DataTable.Title>
                <DataTable.Title>Entrada</DataTable.Title>
                <DataTable.Title>Saída</DataTable.Title>
            </DataTable.Header>
        )
        for (var [key, value] of Object.entries(this.state.data)) {
            renders.push(<DataTable>

                            <DataTable.Row>
                                <DataTable.Title>Outubro</DataTable.Title>
                                <DataTable.Title>{key.substr(0,2) }</DataTable.Title>
                                <DataTable.Cell>{value.startTime}</DataTable.Cell>
                                <DataTable.Cell>{value.launch}</DataTable.Cell>
                                <DataTable.Cell>{value.afterLaunch}</DataTable.Cell>
                                <DataTable.Cell>{value.endTime}</DataTable.Cell>
                            </DataTable.Row>
                            </DataTable>
            )

        }
        renders.push(<DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={page => {
              console.log(page);
            }}
            label="1-2 of 6"
          />)


        return renders
      }

    request = async () => {
        axios.get("http://3a4027d2fe0d.ngrok.io/list")
        .then( resp => {
            this.setState({
                data: resp.data,
                loading: false
            })
        })
        .catch( e => console.log(e))
    }

    componentDidMount() {
        this.request()
    }
    render() {
        this.renderData()
        return (
            <View style={styles.container}>
            <Text style={[styles.title, styles.title]}>O2B timeSheet</Text>
                {this.renderData().slice(0,3)}
            </View>
        );
    }
  
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

export default List