import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const empada = require('./empada.png')
const reais = require('./dinheiro.png')
export default class App extends Component {
  state = {
    mode: 'quantidade',
    valor: 0,
    sobra: 0,
    resposta: 0,
    visible: false,
  }
  calculaPreco = (numEmp = false) => {
    let valor = numEmp ? numEmp : this.state.valor
    let acumulador = 0
    let aux5 = 0
    let aux2 = 0

    if(valor === 0) return null
      aux5 = valor%5
      if(aux5 === 0) return (valor/5)*12
      acumulador += Math.floor((valor/5))*12
      aux2 = aux5%2
      if(aux2 === 0) return acumulador + (aux5/2)*5
      return acumulador + Math.floor((aux5/2))*5 + 3
  }
  calculaQuant = () => {
    let valor = this.state.valor
    let acumulador = 0
    let aux5 = 0
    let aux2 = 0
    if(this.state.valor < 3) {
      return 0
    }
    aux5 = Math.floor(valor/12);
    if(valor%12 === 0) return aux5*5
    acumulador += aux5*5
    valor -= aux5*12
    aux2 = Math.floor(valor/5);
    if(valor%5 === 0) return acumulador + aux2*2
    acumulador += aux2*2
    valor -= aux2*5
    aux2 = Math.floor(valor/3);
    if(valor%3 === 0) return acumulador + aux2*1
    return acumulador + aux2*1
  } 

  calcula = () => {
    let valor = this.state.valor
    if(valor === 0) return null
    if(this.state.mode === 'quantidade') {
      this.setState({ resposta: this.calculaPreco(), sobra: 0 })
    } else if(this.state.mode === 'preço') {
      this.setState({ resposta: this.calculaQuant(), sobra: valor - this.calculaPreco(this.calculaQuant())})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={[styles.toggleButton,
                                    styles.toggleButtonLeft,
                                    this.state.mode === 'quantidade' && styles.buttonOn]}
                  onPress={() => this.setState({ mode: 'quantidade' }, () => this.calcula())}>
            <Text style={[styles.textToggle, this.state.mode === 'quantidade' && styles.textOn]}>Por quantidade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toggleButton,
                                    styles.toggleButtonRight,
                                    this.state.mode === 'preço' && styles.buttonOn]}
                  onPress={() => this.setState({ mode: 'preço' }, () => this.calcula())}>
            <Text style={[styles.textToggle, this.state.mode === 'preço' && styles.textOn]}>Por preço</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} keyboardType="numeric" onChangeText={(text) => this.setState({ valor: text }, () => this.calcula())}/>
          {
            this.state.mode === 'quantidade' ? <Image source={empada}
            style={styles.iconStyle}
            ></Image>
            :
            <Text style={{ fontSize: 21, marginRight: 10, marginBottom: 10, color: '#96a87f'}}>R$</Text>
          }
          
        </View>
        <Text style={{ fontSize: 30 }}>{this.state.resposta.toString() === 'NaN' ? 'Entrada Inválida' : this.state.resposta} { this.state.resposta.toString() !== 'NaN' && (this.state.mode === 'quantidade' ? 'R$' : 'Empadas')} </Text>
        <Text style={{ fontSize: 16, color: '#96a87f' }}> {this.state.sobra > 0 && `Sobram ${this.state.sobra} R$` } </Text>
        {
          this.state.visible && <><Text style={{ marginHorizontal: 21, textAlign: 'center'}}>Portanto, quer comais quer bebais, ou façais qualquer outra coisa, fazei tudo para a glória de Deus. 1 Coríntios 10: 31</Text>
          <Text>Eu te amo {'\u2764'}</Text></>
        }

        <TouchableOpacity style={styles.oculto} onPress={() => this.setState({visible: !this.state.visible})}></TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede2c2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    height: 90,
  },
  toggleButton: {
    borderColor: '#96a87f',
    borderWidth: 1,
    height: 70,
    paddingHorizontal: 15,
    justifyContent: 'center'
  },
  toggleButtonLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0,
  },
  toggleButtonRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 0,
  },
  textToggle: {
    fontSize: 20,
    color: '#96a87f'
  },
  textOn: {
    color: 'white',
  },
  buttonOn: {
    backgroundColor: '#f0713e',
    elevation: 10,
    marginBottom: 5,
    borderWidth: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    borderColor: '#96a87f',
    borderBottomWidth: 1,
    width: '30%',
    height: 50,
    marginTop: 50,
  },
  input: {
    fontSize: 21,
    paddingLeft: 20,
    width: 80,
    textAlign: 'center'
  },
  iconStyle: {
    aspectRatio: 1,
    width: 60,
  },
  oculto: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 2,
    bottom: 2,
  }
});
