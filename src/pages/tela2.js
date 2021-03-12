import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput, AsyncStorage, Alert, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Habilidade from '../components/HabilidadeGrimorio';


export default class Tela2 extends Component {

    state = {lista: [{
                nome: "Invocar Pet",
                nivel: 1,
                descricao: "",
                selecionado: false
            }, {
                nome: "Invocar Arma Branca",
                nivel: 1,
                descricao: "",
                selecionado: false
            }, {
                nome: "Detectar",
                nivel: 1,
                descricao: "",
                selecionado: false
            }, {
                nome: "Boska",
                nivel: 1,
                descricao: "",
                selecionado: false
            }, {
                nome: "Proteção",
                nivel: 1,
                descricao: "",
                selecionado: false
            }, {
                nome: "Amaldiçoar",
                nivel: 1,
                descricao: "",
                selecionado: false
            }, {
                nome: "Restrição",
                nivel: 1,
                descricao: "",
                selecionado: false
            }],

            infoView: false,
            informacao: '',
            habilidade: '',
            index: '',
            configView: false,
            nome: '',
            configIconColor: '#000',
            levelIconColor: '#fff',
            deleteIconColor: '#000'

    }

    salvaLista = async (lista) => {

        await AsyncStorage.setItem('listaHabilidades', JSON.stringify(lista));

    }

    setIconsColors = () => {

        const { lista } = this.state
        let novaLista = lista.filter(item => item.selecionado)
        if (novaLista.length == 0){

            this.setState({levelIconColor: '#fff', deleteIconColor: '#000'})

        } else {

            this.setState({levelIconColor: '#fc0', deleteIconColor: '#f00'})

        }

    }

    setRemoverItem = (index) => {

        const { lista } = this.state
        let novaLista = lista.map(item => {
            if (item.nome == lista[index].nome) {
                item.selecionado = ! item.selecionado
            }
            return item
        })
        this.setIconsColors();
        this.salvaLista(novaLista);
        this.setState({lista: novaLista})

    }

    removerItem = () => {

        const { lista } = this.state
        let novaLista = lista.filter(item => !item.selecionado)
        let listaSelecionados = novaLista.filter(item => item.selecionado)
        if (listaSelecionados.length == 0){

            this.setState({levelIconColor: '#fff', deleteIconColor: '#000'})

        } else {

            this.setState({levelIconColor: '#fc0', deleteIconColor: '#f00'})

        }
        this.salvaLista(novaLista);
        this.setState({lista: novaLista})


    }

    abreAlert = () => {

        Alert.alert(
            'Deseja realmente remover a habilidade?',
            'Todas as habilidades selecionadas serão permanentementes apagadas.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: this.removerItem},
            ],
            {cancelable: false},
          );

    }

    aumentarNivel = () => {

        const { lista } = this.state
        let novaLista = lista.map(item => {
            if (item.selecionado == true) {
                item.nivel = item.nivel + 1
            }
            return item
        })
        this.salvaLista(novaLista);
        this.setState({lista: novaLista})

    }

    diminuirNivel = () => {

        const { lista } = this.state
        let novaLista = lista.map(item => {
            if (item.selecionado == true && item.nivel - 1 >= 0) {
                item.nivel = item.nivel - 1
            }
            return item
        })
        this.salvaLista(novaLista);
        this.setState({lista: novaLista})

    }

    setInfo = (skillName, descricao, index) => {

        this.setState({infoView: true, informacao: descricao, habilidade: skillName, index: index});

    }

    configuracao = () => {

        const { lista, configView, informacao, nome } = this.state;

        if (configView == false){

            this.setState({infoView: false, configView: true, configIconColor: '#00f'});

        } else if (nome == '' && configView == true){

            this.setState({configView: false, configIconColor: '#000'});

        } else if (nome != '' && configView == true){

            let skillNoGrimorio = lista.filter(item => (nome == item.nome) ? true : false)
            if (skillNoGrimorio.length != 0) {  // version 2.0

                ToastAndroid.show('Essa habilidade já está no seu Grimório !', ToastAndroid.LONG);

            } else {

                const novaLista = lista;
                novaLista.push({nome: nome, nivel: 1, descricao: informacao, selecionado: false});
                this.salvaLista(novaLista);
                this.setState({lista: novaLista, configView: false, configIconColor: '#000', nome: ''});
                
            } 
        }
    }

    alterarDescricao = (index) => {

        const { lista, informacao } = this.state;
        const indexInt = parseInt(index);
        const listaNova = lista.map((item) => {
            if (item.nome ==  lista[indexInt].nome){
                
                return { nome: item.nome, nivel: item.nivel, descricao: informacao, selecionado: item.selecionado, index: '' }

            }

            return item;

        })

        this.salvaLista(listaNova);
        this.setState({ lista: listaNova })
    }

    async componentDidMount(){

        const listaSalva = JSON.parse(await AsyncStorage.getItem('listaHabilidades'));
        
        if (listaSalva != null){

            this.setState({lista: listaSalva});

        }
    }

    render() {
        return ( 
            <View style={styles.container} >

                <View style={styles.header} >

                    <TouchableOpacity
                        style={[styles.buttonItem, {left: 5, top: 5, backgroundColor: this.state.levelIconColor}]}  
                        onPress={this.aumentarNivel}>

                        <Text style={styles.buttonTextHeader} >+</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonItem, {left: 55, top: 5, backgroundColor: this.state.levelIconColor}]}  
                        onPress={this.diminuirNivel}>

                        <Text style={styles.buttonTextHeader} >-</Text>

                    </TouchableOpacity>

                    <Text style={styles.pageName} >Grimório</Text>
                    
                    <TouchableOpacity
                        style={[styles.buttonItem, {left: 260, top: 5}]}  
                        onPress={this.abreAlert}
                    >

                        {/* <Icon name='delete' size={35} color={this.state.deleteIconColor}/> */}
                        <Text style={[styles.buttonTextHeader, {fontSize: 40, color:this.state.deleteIconColor}]} >X</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonItem, {left: 310, top: 5}]}  
                        onPress={this.configuracao}
                    >

                        <Icon name='settings' size={35} color={this.state.configIconColor}/>

                    </TouchableOpacity>

                </View>

                {!this.state.configView && <Text style={styles.titulo} >Habilidades:</Text>}

                {!this.state.infoView && !this.state.configView && <View style={styles.viewItens} >

                    <FlatList
                    
                        data={this.state.lista}
                        keyExtractor={(item)=> item.nome }
                        renderItem={({ item, index }) => 
                            <Habilidade
                                item = {item}
                                index={index}
                                info={this.setInfo}
                                setRemoverItem={this.setRemoverItem}
                            />
                            // (<Text style={styles.textConteudo} >{item.nome} {item.nivel}</Text>)
                        }
                    
                    />

                </View>
                }

                {this.state.infoView && <View style={styles.viewInfo} >

                    <Text style={styles.textInfo}>{this.state.habilidade}</Text>

                    <TouchableOpacity
                        onPress={() => {
                            this.alterarDescricao(this.state.index)
                        }}
                        style={styles.buttonInfoSave}
                    >
                        
                        <Text style={styles.textInfo}>Salvar</Text>
                        
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.setState({infoView: false, habilidade: ''})
                        }}
                        style={styles.buttonInfo}
                    >
                        
                        <Text style={styles.textInfo}>X</Text>
                        
                    </TouchableOpacity>

                    <TextInput
                        style={[styles.input, {marginTop: 0}]}
                        value={this.state.informacao}
                        multiline={true}
                        onChangeText={(text) => {this.setState({informacao: text})}}
                    />

                </View>
                }

                {this.state.configView && <View style={[styles.viewInfo, {height: 510, marginVertical: 5}]} >

                    <Text style={styles.textInfo}>Adicionar Habilidade</Text>

                    <TextInput
                        style={styles.inputNome}
                        placeholder="Insira o nome da habilidade"
                        placeholderTextColor= '#992'
                        onChangeText={(text) => {this.setState({nome: text})}}
                    /> 

                    <TextInput
                        style={[styles.input, {marginTop: 10}]}
                        value={this.state.informacao}
                        placeholder= 'Insira a descrição da habilidade'
                        placeholderTextColor= '#992'
                        multiline={true}
                        onChangeText={(text) => {this.setState({informacao: text})}}
                    />

                </View>
                }

                <View style={styles.viewButtons} >

                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('Main');}}
                        style={[styles.buttonPages, {backgroundColor: '#237777'}]}                   
                    >

                            <Text style={styles.buttonText} >Main</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonPages, {backgroundColor: '#233355'}]} 
                        onPress={() => {
                            this.props.navigation.navigate('Tela3');
                        }} >

                        <Text style={styles.buttonText} >Arsenal</Text>

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

        backgroundColor: '#919100',
        height: '100%',
        // justifyContent: 'flex-start',
       
    },

    header: {

        width: '100%',
        height: 50,
        backgroundColor: '#000',
        flexDirection: 'row'

    },

    buttonItem: {

        borderWidth: 1,
        borderRadius: 50,
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        // backgroundColor: '#fa0'
        backgroundColor: '#fff'
        
        

    },

    buttonTextHeader: {

        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center'

    },


    pageName: {

        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: 5,
        marginLeft: 120,
        

    },

    titulo: {

        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 25,
        marginTop: 5,

    },

    viewItens: {

        marginTop: 5,
        paddingVertical: 10,
        backgroundColor: '#aaaaaa',
        borderRadius: 3,
        height: 470,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center'
        

    },

    textConteudo: {

        fontSize: 20,
        marginLeft: 5,

    },

    viewInfo: {

        
        paddingVertical: 10,
        backgroundColor: '#aaaaaa',
        borderRadius: 3,
        height: 470,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center'
        

    },

    textInfo: {

        fontSize: 25,

    },

    buttonInfoSave: {

        backgroundColor: '#2866aa',
        position: 'absolute',
        top: 430,
        left: 20,
        borderRadius: 5,

    },

    buttonInfo: {

        backgroundColor: '#ff6666',
        borderRadius: 5,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 420,
        left: 300

    },

    input: {

        height: "82%",
        width: "90%",
        borderWidth: 3,
        marginTop: 30,
        backgroundColor: '#fff',
        textAlignVertical: "top",
        fontSize: 18

    },

    inputNome: {

        backgroundColor: '#fff',
        fontSize: 18

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