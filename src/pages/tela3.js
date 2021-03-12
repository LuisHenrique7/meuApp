import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, TextInput, ToastAndroid, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

var inputArma1;
var inputArma2;
var inputArmadura;
var inputExtra;

var inputConfig01;
var inputConfig11;
var inputConfig21;
var inputConfig31;

export default class Tela3 extends Component {

    state = {

        listaItens: ['Espada de Aço','Vazio','Peitoral de Prata','Vazio'],
        novoItem: '',
        listaVidaAtual: [456,0,321,0],
        novaVida: '',
        listaVidaMaxima: [500, 0, 500, 0],
        displaysPrincipais: ['flex', 'flex', 'flex', 'flex'],
        displaysSecundarios: ['none', 'none', 'none', 'none'],
        displaysInputText: ['none', 'none', 'none', 'none'],
        displaysInputNumeric: ['none', 'none', 'none', 'none'],
        listaAlertColor: ['#000', '#000', '#000', '#000'],
        displayViewBox: 'flex',
        displayViewConfig: 'none',
        indiceTypeConfig: '',
        vidaConfig: '',
        configIconColor: '#000'

    }

    salvaListaItens = async  (listaItens) => {

        await AsyncStorage.setItem('listaArsenal', JSON.stringify(listaItens));

    }

    salvaListaVida = async  (listaVida) => {

        await AsyncStorage.setItem('listaVida', JSON.stringify(listaVida));

    }

    salvaListaVidaMax = async  (listaVidaMax) => {

        await AsyncStorage.setItem('listaVidaMax', JSON.stringify(listaVidaMax));

    }

    setEquipamento = (indice) => {

        const { listaItens, novoItem, displaysPrincipais, displaysSecundarios, 
            displaysInputText, displaysInputNumeric } = this.state

        var displaysPrincipaisNovos = displaysPrincipais
        var displaysSecundariosNovos = displaysSecundarios
        var displaysInputTextNovos = displaysInputText
        var displaysInputNumericNovos = displaysInputNumeric

        if(displaysPrincipais[indice] == 'flex'){

            displaysPrincipaisNovos[indice] = 'none'
            displaysSecundariosNovos[indice] = 'flex'
            displaysInputTextNovos[indice] = 'flex'
            displaysInputNumericNovos[indice] = 'none'

            this.setState({displaysPrincipais: displaysPrincipaisNovos, 
                displaysSecundarios: displaysSecundariosNovos, 
                    displaysInputText: displaysInputTextNovos, 
                        displaysInputNumeric: displaysInputNumericNovos})

        } else {

            let listaItensNova = listaItens

            if (novoItem != ''){
                listaItensNova[indice] = novoItem
            } else {
                listaItensNova[indice] = listaItens[indice]
            }

            displaysPrincipaisNovos[indice] = 'flex'
            displaysSecundariosNovos[indice] = 'none'
            displaysInputTextNovos[indice] = 'none'
            displaysInputNumericNovos[indice] = 'none'

            this.salvaListaItens(listaItensNova)
            this.setState({listaItens: listaItensNova , novoItem: '', 
                displaysPrincipais: displaysPrincipaisNovos,
                    displaysSecundarios: displaysSecundariosNovos,
                        displaysInputText: displaysInputTextNovos, 
                            displaysInputNumeric: displaysInputNumericNovos})

        }

    }

    abrirTelaSecundariaNumeric = (indice) => {

        const { displaysPrincipais, displaysSecundarios, 
            displaysInputText, displaysInputNumeric } = this.state

        var displaysPrincipaisNovos = displaysPrincipais
        var displaysSecundariosNovos = displaysSecundarios
        var displaysInputTextNovos = displaysInputText
        var displaysInputNumericNovos = displaysInputNumeric

        displaysPrincipaisNovos[indice] = 'none'
        displaysSecundariosNovos[indice] = 'flex'
        displaysInputTextNovos[indice] = 'none'
        displaysInputNumericNovos[indice] = 'flex'

        this.setState({displaysPrincipais: displaysPrincipaisNovos, 
            displaysSecundarios: displaysSecundariosNovos, 
                displaysInputText: displaysInputTextNovos, 
                    displaysInputNumeric: displaysInputNumericNovos})

        inputArma1.clear()
        inputArma2.clear()
        inputArmadura.clear()
        inputExtra.clear()

    }

    adicionarVida = (indice) => {

        const { listaVidaAtual, novaVida, listaVidaMaxima, displaysPrincipais, displaysSecundarios, 
            displaysInputText, displaysInputNumeric, listaAlertColor } = this.state

        var displaysPrincipaisNovos = displaysPrincipais
        var displaysSecundariosNovos = displaysSecundarios
        var displaysInputTextNovos = displaysInputText
        var displaysInputNumericNovos = displaysInputNumeric

        if(displaysPrincipais[indice] == 'flex'){

            this.abrirTelaSecundariaNumeric(indice)

        } else {

            if (novaVida.indexOf(",") != -1 || novaVida.indexOf(".") != -1 || 
                novaVida.indexOf("-") != -1 || novaVida.indexOf(" ") != -1 ) {
                // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.
                
                ToastAndroid.show('Vida Inserida Inválida !', ToastAndroid.LONG);

            } else if (novaVida == '') {

                ToastAndroid.show('Vida Inserida Vazia !', ToastAndroid.SHORT);

                displaysPrincipaisNovos[indice] = 'flex'
                displaysSecundariosNovos[indice] = 'none'
                displaysInputTextNovos[indice] = 'none'
                displaysInputNumericNovos[indice] = 'none'

                this.setState({displaysPrincipais: displaysPrincipaisNovos,
                    displaysSecundarios: displaysSecundariosNovos,
                        displaysInputText: displaysInputTextNovos, 
                            displaysInputNumeric: displaysInputNumericNovos})

            } else {

                let novaVidaInt = parseInt(novaVida); 

                let listaVidaNova = listaVidaAtual
                listaVidaNova[indice] = listaVidaAtual[indice] + novaVidaInt

                let novoAlertColor = '#000'

                if (listaVidaNova[indice] >= listaVidaMaxima[indice]) {
                    listaVidaNova[indice] = listaVidaMaxima[indice]
                } else if (listaVidaNova[indice] <= 100) {
                    novoAlertColor = '#f00'
                }

                let novaListaAlertColor = listaAlertColor
                novaListaAlertColor[indice] = novoAlertColor
                displaysPrincipaisNovos[indice] = 'flex'
                displaysSecundariosNovos[indice] = 'none'
                displaysInputTextNovos[indice] = 'none'
                displaysInputNumericNovos[indice] = 'none'

                this.salvaListaVida(listaVidaNova)
                this.setState({listaVidaAtual: listaVidaNova, novaVida: '',
                    displaysPrincipais: displaysPrincipaisNovos,
                    displaysSecundarios: displaysSecundariosNovos, 
                        displaysInputText: displaysInputTextNovos, 
                            displaysInputNumeric: displaysInputNumericNovos, 
                                listaAlertColor: novaListaAlertColor})

            }

        }

    }

    subtrairVida = (indice) => {

        const { listaItens, listaVidaAtual, novaVida, listaVidaMaxima, displaysPrincipais,
                displaysSecundarios, displaysInputText, displaysInputNumeric,
                    listaAlertColor } = this.state

        var displaysPrincipaisNovos = displaysPrincipais
        var displaysSecundariosNovos = displaysSecundarios
        var displaysInputTextNovos = displaysInputText
        var displaysInputNumericNovos = displaysInputNumeric

        if(displaysPrincipais[indice] == 'flex'){

            this.abrirTelaSecundariaNumeric(indice)

        } else {

            if (novaVida.indexOf(",") != -1 || novaVida.indexOf(".") != -1 || 
                novaVida.indexOf("-") != -1 || novaVida.indexOf(" ") != -1 ) {
                // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.
                
                ToastAndroid.show('Vida Inserida Inválida !', ToastAndroid.LONG);

            } else if (novaVida == '') {

                ToastAndroid.show('Vida Inserida Vazia !', ToastAndroid.SHORT);

                displaysPrincipaisNovos[indice] = 'flex'
                displaysSecundariosNovos[indice] = 'none'
                displaysInputTextNovos[indice] = 'none'
                displaysInputNumericNovos[indice] = 'none'

                this.setState({displaysPrincipais: displaysPrincipaisNovos,
                    displaysSecundarios: displaysSecundariosNovos,
                        displaysInputText: displaysInputTextNovos, 
                            displaysInputNumeric: displaysInputNumericNovos})

            } else {
                let novaListaItens = listaItens

                let novaVidaInt = parseInt(novaVida); 

                let listaVidaNova = listaVidaAtual
                listaVidaNova[indice] = listaVidaAtual[indice] - novaVidaInt

                let novoAlertColor = '#000'

                let listaVidaMaximaNova = listaVidaMaxima

                if (listaVidaNova[indice] <= 0) {
                    novaListaItens[indice] = 'Vazio'
                    listaVidaNova[indice] = 0
                    listaVidaMaximaNova[indice] = 0
                } else if (listaVidaNova[indice] <= 100) {
                    novoAlertColor = '#f00'
                }

                let novaListaAlertColor = listaAlertColor
                novaListaAlertColor[indice] = novoAlertColor
                displaysPrincipaisNovos[indice] = 'flex'
                displaysSecundariosNovos[indice] = 'none'
                displaysInputTextNovos[indice] = 'none'
                displaysInputNumericNovos[indice] = 'none'

                this.salvaListaVida(listaVidaNova)
                this.salvaListaVidaMax(listaVidaMaximaNova)
                this.setState({listaVidaAtual: listaVidaNova, novaVida: '', listaVidaMaxima: listaVidaMaximaNova,
                    displaysPrincipais: displaysPrincipaisNovos, 
                        displaysSecundarios: displaysSecundariosNovos, 
                            displaysInputText: displaysInputTextNovos,
                                displaysInputNumeric: displaysInputNumericNovos, 
                                    listaAlertColor: novaListaAlertColor})
            }

        }

    }

    configurarVida = (indiceType, vida) => {

        const { listaVidaMaxima } = this.state

        let codigo =  parseInt(indiceType);
        let indice = Math.floor(codigo/10); 
        // var arredondadoParaBaixo = Math.floor(3/2);
        // var arredondadoParaProximo = Math.round(3/2);
        // var arredondadoParaCima = Math.ceil(3/2);
        let tipo = codigo % 10;

        let listaVidaMaximaNova = listaVidaMaxima;

        if (tipo == 1){

            listaVidaMaximaNova[indice] = parseInt(vida)
            this.salvaListaVidaMax(listaVidaMaximaNova)
            this.setState({listaVidaMaxima: listaVidaMaximaNova})

        }

        
        inputConfig01.clear();
        inputConfig11.clear();
        inputConfig21.clear(); 
        inputConfig31.clear();
        


    }

    async componentDidMount(){

        const listaItensCarregada = JSON.parse(await AsyncStorage.getItem('listaArsenal'));
        const listaVidaCarregada = JSON.parse(await AsyncStorage.getItem('listaVida'));
        const listaVidaMaxCarregada = JSON.parse(await AsyncStorage.getItem('listaVidaMax'));
        if (listaItensCarregada != null && listaVidaCarregada != null
            && listaVidaMaxCarregada != null){

            this.setState({listaItens: listaItensCarregada, listaVidaAtual: listaVidaCarregada,
                listaVidaMax: listaVidaMaxCarregada});

            
        } 
        if (listaItensCarregada != null){

            this.setState({listaItens: listaItensCarregada})

        }
        
        if (listaVidaCarregada != null){

            this.setState({listaVidaAtual: listaVidaCarregada})

        }
        
        if (listaVidaMaxCarregada != null){

            this.setState({listaVidaMax: listaVidaMaxCarregada})

        }

    }

    render() {
        return ( 
            <View style={styles.container} >

                <View style={styles.header} >

                    <Text style={styles.pageName}>Arsenal</Text>

                    <TouchableOpacity 
                        style={styles.buttonConfig}
                        onPress={() => {
                            if (this.state.displayViewBox == 'flex') {
                                this.setState({displayViewBox: 'none', displayViewConfig: 'flex',
                                configIconColor: '#00f'})
                            } else {
                                this.configurarVida(this.state.indiceTypeConfig, this.state.vidaConfig)
                                this.setState({displayViewBox: 'flex', displayViewConfig: 'none',
                                configIconColor: '#000'})
                            }
                        }}
                    >
                    
                        <Icon name='settings' size={30} color={this.state.configIconColor}/>
                    
                    </TouchableOpacity>

                </View>

                <View style={{display: this.state.displayViewBox}}>

                    <View style={styles.itemBox} >

                        <View style={[styles.viewButtonsBox, {borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5, borderRightWidth: 1}]} >

                            <TouchableOpacity 
                                style={styles.buttonsBox}
                                onPress={() => {
                                    this.setEquipamento(0)
                                }}
                            >

                                <Text style={styles.textButtonsBox} >SET</Text>

                            </TouchableOpacity>

                        </View>

                        <View style={[styles.viewTextBox, {display: this.state.displaysPrincipais[0]}]} >

                            <Text style={styles.itemText} >Arma 1</Text>
                            <Text style={styles.itemTextAtual} >{this.state.listaItens[0]}</Text>
                            <Text style={[styles.itemText, {color: this.state.listaAlertColor[0]}]} >
                                Vida: {this.state.listaVidaAtual[0]}/{this.state.listaVidaMaxima[0]}
                            </Text>
                        
                        </View>

                        <View style={[styles.viewOcultBox, {display: this.state.displaysSecundarios[0]}]} >

                            <TextInput
                                style={[styles.textInputBox, {display: this.state.displaysInputText[0]}]}
                                placeholder={this.state.listaItens[0]}
                                onChangeText = {(text) => {this.setState({novoItem: text})}}
                            />

                            <TextInput
                                style={[styles.textInputBox, 
                                    {display: this.state.displaysInputNumeric[0], height: 60, width: 80}]}
                                keyboardType='numeric'
                                onChangeText = {(text) => {this.setState({novaVida: text})}}
                                ref = {(ref) => {
                                    inputArma1 = ref;
                                }}
                            />

                        </View>

                        <View style={[styles.viewButtonsBox, {borderTopRightRadius: 5,
                            borderBottomRightRadius: 5, borderLeftWidth: 1}]} >

                            <TouchableOpacity 
                                style={[styles.buttonsBox, {borderBottomWidth: 1,height: '50%'}]}
                                onPress={() => {
                                    this.adicionarVida(0)
                                }} >

                                <Text style={styles.textButtonsBox} >+</Text>

                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.buttonsBox, {height: '50%'}]} 
                                onPress={() => {
                                    this.subtrairVida(0)
                                }} >

                                <Text style={styles.textButtonsBox} >-</Text>

                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.itemBox} >

                        <View style={[styles.viewButtonsBox, {borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5, borderRightWidth: 1}]} >

                            <TouchableOpacity 
                                style={styles.buttonsBox}
                                onPress={() => {
                                    this.setEquipamento(1)
                                }}
                            >

                                <Text style={styles.textButtonsBox} >SET</Text>

                            </TouchableOpacity>

                        </View>

                        <View style={[styles.viewTextBox, {display: this.state.displaysPrincipais[1]}]} >

                            <Text style={styles.itemText} >Arma 2</Text>
                            <Text style={styles.itemTextAtual} >{this.state.listaItens[1]}</Text>
                            <Text style={[styles.itemText, {color: this.state.listaAlertColor[1]}]} >
                                Vida: {this.state.listaVidaAtual[1]}/{this.state.listaVidaMaxima[1]}
                            </Text>
                        
                        </View>

                        <View style={[styles.viewOcultBox, {display: this.state.displaysSecundarios[1]}]} >

                            <TextInput
                                style={[styles.textInputBox, {display: this.state.displaysInputText[1]}]}
                                placeholder={this.state.listaItens[1]}
                                onChangeText = {(text) => {this.setState({novoItem: text})}}
                            />

                            <TextInput
                                style={[styles.textInputBox, 
                                    {display: this.state.displaysInputNumeric[1], height: 60, width: 80}]}
                                keyboardType='numeric'
                                onChangeText = {(text) => {this.setState({novaVida: text})}}
                                ref = {(ref) => {
                                    inputArma2 = ref;
                                }}
                            />

                        </View>

                        <View style={[styles.viewButtonsBox, {borderTopRightRadius: 5,
                            borderBottomRightRadius: 5, borderLeftWidth: 1}]} >

                            <TouchableOpacity 
                                style={[styles.buttonsBox, {borderBottomWidth: 1,height: '50%'}]}
                                onPress={() => {
                                    this.adicionarVida(1)
                                }} >

                                <Text style={styles.textButtonsBox} >+</Text>

                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.buttonsBox, {height: '50%'}]}
                                onPress={() => {
                                    this.subtrairVida(1)
                                }} >

                                <Text style={styles.textButtonsBox} >-</Text>

                            </TouchableOpacity>

                        </View>
                    </View>

                    
                    <View style={styles.itemBox} >

                        <View style={[styles.viewButtonsBox, {borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5, borderRightWidth: 1}]} >

                            <TouchableOpacity 
                                style={styles.buttonsBox}
                                onPress={() => {
                                    this.setEquipamento(2)
                                }}
                            >

                                <Text style={styles.textButtonsBox} >SET</Text>

                            </TouchableOpacity>

                        </View>

                        <View style={[styles.viewTextBox, {display: this.state.displaysPrincipais[2]}]} >

                            <Text style={styles.itemText} >Armadura</Text>
                            <Text style={styles.itemTextAtual} >{this.state.listaItens[2]}</Text>
                            <Text style={[styles.itemText, {color: this.state.listaAlertColor[2]}]} >
                                Vida: {this.state.listaVidaAtual[2]}/{this.state.listaVidaMaxima[2]}
                            </Text>
                        
                        </View>

                        <View style={[styles.viewOcultBox, {display: this.state.displaysSecundarios[2]}]} >

                            <TextInput
                                style={[styles.textInputBox, {display: this.state.displaysInputText[2]}]}
                                placeholder={this.state.listaItens[2]}
                                onChangeText = {(text) => {this.setState({novoItem: text})}}
                            />

                            <TextInput
                                style={[styles.textInputBox, 
                                    {display: this.state.displaysInputNumeric[2], height: 60, width: 80}]}
                                keyboardType='numeric'
                                onChangeText = {(text) => {this.setState({novaVida: text})}}
                                ref = {(ref) => {
                                    inputArmadura = ref;
                                }}
                            />

                        </View>

                        <View style={[styles.viewButtonsBox, {borderTopRightRadius: 5,
                            borderBottomRightRadius: 5, borderLeftWidth: 1}]} >

                            <TouchableOpacity 
                                style={[styles.buttonsBox, {borderBottomWidth: 1,height: '50%'}]}
                                onPress={() => {
                                    this.adicionarVida(2)
                                }} >

                                <Text style={styles.textButtonsBox} >+</Text>

                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.buttonsBox, {height: '50%'}]}
                                onPress={() => {
                                    this.subtrairVida(2)
                                }} >

                                <Text style={styles.textButtonsBox} >-</Text>

                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.itemBox} >
                        
                        <View style={[styles.viewButtonsBox, {borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5, borderRightWidth: 1}]} >

                            <TouchableOpacity 
                                style={styles.buttonsBox}
                                onPress={() => {
                                    this.setEquipamento(3)
                                }}
                            >

                                <Text style={styles.textButtonsBox} >SET</Text>

                            </TouchableOpacity>

                        </View>

                        <View style={[styles.viewTextBox, {display: this.state.displaysPrincipais[3]}]} >

                            <Text style={styles.itemText} >Extra</Text>
                            <Text style={styles.itemTextAtual} >{this.state.listaItens[3]}</Text>
                            <Text style={[styles.itemText, {color: this.state.listaAlertColor[3]}]} >
                                Vida: {this.state.listaVidaAtual[3]}/{this.state.listaVidaMaxima[3]}
                            </Text>
                        
                        </View>

                        <View style={[styles.viewOcultBox, {display: this.state.displaysSecundarios[3]}]} >

                            <TextInput
                                style={[styles.textInputBox, {display: this.state.displaysInputText[3]}]}
                                placeholder={this.state.listaItens[3]}
                                onChangeText = {(text) => {this.setState({novoItem: text})}}
                            />

                            <TextInput
                                style={[styles.textInputBox, 
                                    {display: this.state.displaysInputNumeric[3], height: 60, width: 80}]}
                                keyboardType='numeric'
                                onChangeText = {(text) => {this.setState({novaVida: text})}}
                                ref = {(ref) => {
                                    inputExtra = ref;
                                }}
                            />

                        </View>

                        <View style={[styles.viewButtonsBox, {borderTopRightRadius: 5,
                            borderBottomRightRadius: 5, borderLeftWidth: 1}]} >

                            <TouchableOpacity 
                                style={[styles.buttonsBox, {borderBottomWidth: 1,height: '50%'}]}
                                onPress={() => {
                                    this.adicionarVida(3)
                                }} >

                                <Text style={styles.textButtonsBox} >+</Text>

                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.buttonsBox, {height: '50%'}]}
                                onPress={() => {
                                    this.subtrairVida(3)
                                }} >

                                <Text style={styles.textButtonsBox} >-</Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

                <View style={[styles.viewConfig, {display: this.state.displayViewConfig}]}>

                    <View style={styles.headerConfig}>

                        <Text style={[styles.textConfig, {fontWeight: 'bold'}]} >Configurações</Text>

                    </View>

                    <Text style={[styles.textConfig, {fontWeight: 'bold', marginTop: 10}]} >Arma 1</Text>

                    <View style={styles.viewBoxConfig} >

                        <Text style={[styles.textConfig, {marginLeft: 10}]} >Vida Máxima:</Text>

                        <TextInput 
                            style={styles.textInputConfig}
                            placeholder={this.state.listaVidaMaxima[0].toString()}
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                this.setState({indiceTypeConfig: '01', vidaConfig: text})
                            }}
                            ref = {(ref) => {
                                inputConfig01 = ref;
                            }}
                        />

                    </View>

                    <Text style={[styles.textConfig, {fontWeight: 'bold'}]} >Arma 2</Text>

                    <View style={styles.viewBoxConfig} >

                        <Text style={[styles.textConfig, {marginLeft: 10}]} >Vida Máxima:</Text>

                        <TextInput
                            style={styles.textInputConfig}
                            placeholder={this.state.listaVidaMaxima[1].toString()}
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                this.setState({indiceTypeConfig: '11', vidaConfig: text})
                            }}
                            ref = {(ref) => {
                                inputConfig11 = ref;
                            }}
                        />

                    </View>

                    <Text style={[styles.textConfig, {fontWeight: 'bold'}]} >Armadura</Text>

                    <View style={styles.viewBoxConfig} >

                        <Text style={[styles.textConfig, {marginLeft: 10}]} >Vida Máxima:</Text>

                        <TextInput
                            style={styles.textInputConfig}
                            placeholder={this.state.listaVidaMaxima[2].toString()}
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                this.setState({indiceTypeConfig: '21', vidaConfig: text})
                            }}
                            ref = {(ref) => {
                                inputConfig21 = ref;
                            }}
                        />

                    </View>

                    <Text style={[styles.textConfig, {fontWeight: 'bold'}]} >Extra</Text>

                    <View style={styles.viewBoxConfig} >

                        <Text style={[styles.textConfig, {marginLeft: 10}]} >Vida Máxima:</Text>

                        <TextInput
                            style={styles.textInputConfig}
                            placeholder={this.state.listaVidaMaxima[3].toString()}
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                this.setState({indiceTypeConfig: '31', vidaConfig: text})
                            }}
                            ref = {(ref) => {
                                inputConfig31 = ref;
                            }}
                        />

                    </View>

                </View>

                <View style={styles.viewButtons} >

                    <TouchableOpacity
                        style={[styles.buttonPages, {backgroundColor: '#919100'}]} 
                        onPress={() => {
                            this.props.navigation.navigate('Tela2');
                        }} >

                        <Text style={styles.buttonText} >Grimório</Text>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('Main');}}
                        style={styles.buttonMain}style={[styles.buttonPages, {backgroundColor: '#237777'}]}  >

                            <Text style={styles.buttonText} >Main</Text>

                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.buttonPages, {backgroundColor: '#6788ff'}]} 
                        onPress={() => {
                            this.props.navigation.navigate('Tela4');
                        }} >

                            <Text style={styles.buttonText} >Inventário</Text>

                    </TouchableOpacity>

                </View>

            </View>     
        );
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#233355',
        height: '100%',
        alignItems: 'center',
        

    },

    header: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100%',
        height: 50
        

    },

    pageName: {

        color: '#f00',
        fontWeight: 'bold',
        fontSize: 30,

    },

    buttonConfig: {

        position: 'absolute',
        left: 300,
        // backgroundColor: '#fdf',
        backgroundColor: '#ddf',
        borderRadius: 5,
        height: '80%',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'

    },

    itemBox: {

        backgroundColor: '#9999AA',
        margin: 10,
        height: 110,
        width: 350,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',

    },

    viewTextBox: {

        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        height: '100%',
        width: 270,

    },

    itemText: {

        fontSize: 18,
        color: '#000',

    },

    itemTextAtual: {

        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 10,

    },

    viewOcultBox: {

        backgroundColor: '#fff',
        height: '100%',
        width: 270,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textConfig: {

        fontSize: 20,

    },

    textInputBox: {

        borderRadius: 3,
        borderWidth: 1,
        width: 250,
        height: 60,
        textAlign: 'center',

    },

    viewButtonsBox: {

        height: '100%',
        width: 40,
        backgroundColor: '#0af',
        borderColor: '#000',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        

    },

    buttonsBox: {

        
        marginTop: 7,
        alignItems: 'center',
        borderColor: '#000',
        borderRadius: 5,
        height: '100%',
        justifyContent: 'center',
        
        

    },

    textButtonsBox: {

        fontSize: 18,
        fontWeight: 'bold',
        

    },

    viewConfig: {

        backgroundColor: '#fff',
        height: '80%',
        alignItems: 'center',
        width: '90%',
        marginTop: 15,
        borderRadius: 3

    },

    headerConfig: {
        
        backgroundColor: '#ffaa00',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
        
        
    },

    viewBoxConfig: {

        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 25,
        backgroundColor: '#fed'

    },

    textInputConfig: {

        borderWidth: 1,
        borderRadius: 3,
        width: 50,
        textAlign: 'center',
        marginLeft: 10


    },

    viewButtons: {

        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        top: 570,

    },

    buttonPages: {

        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 3,
        justifyContent: 'center',

    },

    buttonText: {

        fontSize: 20,
        color: '#fff',

    },


});