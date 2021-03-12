import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput, ToastAndroid, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ItemInventario from '../components/ItemInventario';


export default class Tela4 extends Component {

    state = { lista: [{ 
                nome: "Batata",
                quantidade : 3, 
                selecionado: false,
            }, { 
                nome: "Carne de Coelho",
                quantidade : 2, 
                selecionado: false,
            }, { 
                nome: "Ervas Medicinais",
                quantidade : 5, 
                selecionado: false,
            }, { 
                nome: "Vaso d'água",
                quantidade : 2, 
                selecionado: false,
            }, { 
                nome: "Corda",
                quantidade :1, 
                selecionado: false,
            }, { 
                nome: "Pão",
                quantidade : 1, 
                selecionado: false,
            }, {
                nome: "Maçã",
                quantidade: 2,
                selecionado: false,
            }, { 
                nome: "Pera",
                quantidade : 5, 
                selecionado: false,
            }, { 
                nome: "Uva",
                quantidade : 2, 
                selecionado: false,
            }, { 
                nome: "Corrente",
                quantidade :1, 
                selecionado: false,
            }, { 
                nome: "Ensop. de Veado",
                quantidade : 1, 
                selecionado: false,
            }, {
                nome: "Manga",
                quantidade: 2,
                selecionado: false,
            }, { 
                nome: "Sopa de Batatas",
                quantidade : 2, 
                selecionado: false,
            }, { 
                nome: "Carne de Lobo",
                quantidade : 5, 
                selecionado: false,
            }, { 
                nome: "Pedra",
                quantidade : 1, 
                selecionado: false,
            }, {
                nome: "Banana",
                quantidade: 2,
                selecionado: false,
            }, { 
                nome: "Ouro",
                quantidade : 10, 
                selecionado: false,
            }, {
                nome: "Prata",
                quantidade: 480,
                selecionado: false,
            }, {
                nome: "Carvão da Mina mais profunda já escavada neste maravilhoso mundo",
                quantidade: 4,
                selecionado: false,
            }],

            novoItem: '',
            novaQuantidade: '',
            displayInventario: true,
            displayNomeItem: false,
            displayQuantidadeItem: false,
            displayNomeItemConfig: false,
            displayQuantidadeItemConfig: false,
            configIconColor: '#000',
            deleteIconColor: '#000',
            mensagem: 'Ensop. = Ensopado, Sop. = Sopa de, Carn. = Carne de'

    }

    salvaLista = async  (lista) => {

        await AsyncStorage.setItem('listaItens', JSON.stringify(lista));

    }

    salvaMensagem = async (mensagem) => {

        await AsyncStorage.setItem('mensagem', mensagem);

    }

    adicionarQuant = (index) => {

        const { lista } = this.state

        const listaNova = lista.map((item) => {
            if (item.nome ==  lista[index].nome){
                const quant = parseInt(item.quantidade)
                return { nome: item.nome, quantidade: quant + 1 }

            }

            return item;

        })

        this.salvaLista(listaNova);
        this.setState({ lista: listaNova })

    }

    subtrairQuant = (index) => {

        const { lista } = this.state

        const listaNova = lista.map((item) => {
            if (item.nome ==  lista[index].nome){

                if(lista[index].quantidade - 1 <= 0){
                    this.setRemoverItem(index)
                    // this.removerItem()
                } else {
                
                return { nome: item.nome, quantidade: item.quantidade - 1 }

                }

            }

            return item;

        })

        this.salvaLista(listaNova);
        this.setState({ lista: listaNova })

    }

    adicionarItem = () => {

        const { lista, novoItem, novaQuantidade, displayNomeItem, displayQuantidadeItem} = this.state

        if (displayNomeItem == false && displayQuantidadeItem == false){

            this.setState({displayInventario: false, displayNomeItem: true,
                displayQuantidadeItem: true, displayNomeItemConfig: false,
                    displayQuantidadeItemConfig: false, novoItem: '',
                        novaQuantidade: '', configIconColor: '#000'})
        
        } else {

            let itemNaLista = lista.filter(item => (novoItem == item.nome) ? true : false)

            if (novoItem == '' && novaQuantidade == ''){

                this.setState({displayInventario: true, displayNomeItem: false,
                    displayQuantidadeItem: false})
            
            } else if (novoItem.indexOf(",") != -1 || novoItem.indexOf(".") != -1 || 
                        novoItem.indexOf("-") != -1) {
                    // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.

                ToastAndroid.show('Item Inserida Inválido !', ToastAndroid.LONG);

            } else if (novaQuantidade.indexOf(",") != -1 || novaQuantidade.indexOf(".") != -1 || 
                        novaQuantidade.indexOf("-") != -1 || novaQuantidade.indexOf(" ") != -1 ) {
                    // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.

                ToastAndroid.show('Quantidade Inserida Inválida !', ToastAndroid.LONG);

            } else if (itemNaLista.length != 0) {

                ToastAndroid.show('Item inserido já está na lista !', ToastAndroid.LONG);

            } else if (novoItem != '' && novaQuantidade != '') {

                let listaNova = lista
                listaNova.push({nome: novoItem, quantidade: novaQuantidade})

                this.salvaLista(listaNova);
                this.setState({lista: listaNova, novoItem: '', novaQuantidade: '',
                    displayInventario: true, displayNomeItem: false, displayQuantidadeItem: false})

            }
        }
    }

    setDeleteIconColor = () => { // version 2.0

        const { lista } = this.state
        let novaLista = lista.filter(item => item.selecionado)
        if (novaLista.length == 0){

            this.setState({deleteIconColor: '#000'})

        } else {

            this.setState({deleteIconColor: '#f00'})

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
        this.setDeleteIconColor();
        this.salvaLista(novaLista);
        this.setState({lista: novaLista})

    }

    removerItem = () => {

        const { lista } = this.state
        let novaLista = lista.filter(item => !item.selecionado)
        this.salvaLista(novaLista);
        this.setState({lista: novaLista})


    }


    configuracao = () => {

        const { lista, novoItem, novaQuantidade, displayNomeItemConfig, displayQuantidadeItemConfig,
            mensagem } = this.state

        if (displayNomeItemConfig == false && displayQuantidadeItemConfig == false){

            this.setState({displayInventario: false, displayNomeItem: false,
                displayQuantidadeItem: false, displayNomeItemConfig: true,
                    displayQuantidadeItemConfig: true, configIconColor: '#00f', novoItem: '',
                        novaQuantidade: ''})
        
        } else {

            if (novaQuantidade.indexOf(",") != -1 || novaQuantidade.indexOf(".") != -1 || 
                novaQuantidade.indexOf("-") != -1 || novaQuantidade.indexOf(" ") != -1 ) {
                // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.
                
                ToastAndroid.show('Quantidade Inserida Inválida !', ToastAndroid.LONG);
                this.setState({novoItem: '', novaQuantidade: ''})

            } else if (novoItem != '' && novaQuantidade != ''){

                let novaLista = lista.map(item => {
                    if (item.nome == novoItem) {
                        item.quantidade =  novaQuantidade
                    }
                    return item
                 })

                 this.setState({lista: novaLista, novoItem: '', novaQuantidade: ''})
                 this.salvaLista(novaLista)   // Salva a lista com a alteração na quantidade do item, version 2.0

            }

            this.salvaMensagem(mensagem)
            this.setState({displayInventario: true, displayNomeItemConfig: false,
                displayQuantidadeItemConfig: false, configIconColor: '#000'})
        
        }
    }

    limparInventario = () => {
        
        this.salvaLista([]);
        this.setState({lista: new Array()})
        
    }

    abreAlert = () => {

        Alert.alert(
            'Deseja realmente limpar o Inventário?',
            'Todos os itens presentes no seu inventário serão permanentementes apagados',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: this.limparInventario},
            ],
            {cancelable: false},
          );

    }

    async componentDidMount(){

        const listaSalva = JSON.parse(await AsyncStorage.getItem('listaItens'));
        const mensagemSalva = await AsyncStorage.getItem('mensagem');
        
        if (listaSalva != null){

            this.setState({lista: listaSalva});

        }
        
        if (mensagemSalva != null){

            this.setState({mensagem: mensagemSalva});

        }

    }

    

    render() {
        return ( 
            <View style={styles.container} >

                <View style={styles.header} >

                    <TouchableOpacity
                        style={[styles.buttonItem, {left: 5, top: 5}]}  
                        onPress={this.adicionarItem}>

                        <Text style={[styles.buttonTextHeader, {fontSize: 45}]} >+</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonItem, {left: 55, top: 5}]}  
                        onPress={this.removerItem}>

                        <Text style={[styles.buttonTextHeader, {color: this.state.deleteIconColor}]} >X</Text>

                    </TouchableOpacity>

                    <Text style={styles.pageName} >Inventário</Text>

                    <TouchableOpacity
                        style={[styles.buttonItem, {left: 260, top: 5}]}  
                        onPress={this.configuracao}
                    >

                        <Icon name='settings' size={35} color={this.state.configIconColor}/>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonItem, {left: 310, top: 5}]}  
                        onPress={this.abreAlert}
                    >

                        <Icon name='delete' size={35}/>

                    </TouchableOpacity>

                </View>    

                <Text style={styles.titulo} >Itens:</Text>

                {this.state.displayInventario && <View style={styles.viewItens} >

                    <FlatList
                    
                        data={this.state.lista}
                        keyExtractor={(item)=> item.nome }
                        renderItem={({ item, index }) => (
                            <ItemInventario 
                                item={item}
                                index={index}
                                adicionarQuant={this.adicionarQuant}
                                subtrairQuant={this.subtrairQuant}
                                setRemoverItem={this.setRemoverItem}
                                
                            />)}
                    
                    />

                </View>
                }

                {this.state.displayNomeItem && <View style={styles.viewNomeItem} >

                    <Text  style={styles.textConteudo} >Nome do Item:</Text>

                    <TextInput
                        style={[styles.input, {width: 150}]}
                        onChangeText={(text) => {this.setState({novoItem: text})}}
                    />

                </View>
                }

                {this.state.displayQuantidadeItem && <View 
                    style={[styles.viewQuantidadeItem, {justifyContent: 'space-around'}]} >

                <Text  style={styles.textConteudo} >Quantidade:</Text>

                <TextInput
                    style={[styles.input, {marginRight: 70}]} 
                    keyboardType='numeric'
                    onChangeText={(text) => {this.setState({novaQuantidade: text})}}
                />

                </View>
                }

                {this.state.displayNomeItemConfig && <View style={styles.viewNomeItem} >

                    <Text  style={styles.textConteudo} >Nome do Item:</Text>

                    <TextInput
                        style={[styles.input, {width: 205, fontSize: 12}]}
                        placeholder='Nome do Item no Inventário'
                        onChangeText={(text) => {this.setState({novoItem: text})}}
                    />

                </View>
                }

                {this.state.displayQuantidadeItemConfig && <View style={styles.viewQuantidadeItem} >

                <Text  style={[styles.textConteudo, {marginLeft: 20}]} >Nova Quantidade:</Text>

                    <TextInput
                    style={[styles.input, {marginLeft: 70}]} 
                    keyboardType='numeric'
                    onChangeText={(text) => {this.setState({novaQuantidade: text})}}
                    />

                </View>
                }

                {this.state.displayQuantidadeItemConfig && <View style={styles.viewConfig} >

                    <TextInput
                    style={styles.inputLivre} 
                    value={this.state.mensagem}
                    multiline={true}
                    onChangeText={(text) => {this.setState({mensagem: text})}}
                    />

                </View>
                }

                <View style={styles.viewButtons} >

                    <TouchableOpacity
                        style={[styles.buttonPages, {backgroundColor: '#919100'}]}
                        onPress={() => {
                            this.props.navigation.navigate('Tela2');
                        }} >

                        <Text style={styles.buttonText} >Grimório</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonPages, {backgroundColor: '#233355'}]} 
                        onPress={() => {
                            this.props.navigation.navigate('Tela3');
                        }} >

                        <Text style={styles.buttonText} >Arsenal</Text>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('Main');}}
                        style={styles.buttonMain}style={[styles.buttonPages, {backgroundColor: '#237777'}]}                  
                         >

                            <Text style={styles.buttonText} >Main</Text>

                    </TouchableOpacity>

                </View>

            </View>  
            
            
        );
    }
}

const styles = StyleSheet.create({
    
    container: {

        backgroundColor: '#6788ff',
        height: '100%',
        width: '100%',
        
       
    },

    header: {

        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        

    },

    pageName: {

        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: 5,
        marginLeft: 115,
        

    },

    buttonItem: {

        borderWidth: 1,
        borderRadius: 50,
        // height: '80%',
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#099',
        
        

    },

    buttonTextHeader: {

        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',

    },

    titulo: {

        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 25,

    },

    viewItens: {

        marginTop: 3,
        paddingVertical: 10,
        backgroundColor: '#ccccff',
        borderRadius: 3,
        height: 470,
        width: 360,
        alignSelf: 'center',
        alignItems: 'center'
        

    },

    viewNomeItem: {

        backgroundColor: '#fff',
        width: '100%',
        paddingTop: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 1

    },

    viewQuantidadeItem: {

        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingTop: 3,
        alignItems: 'center'

    },

    viewConfig: {

        height: 365,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'

    },

    textConteudo: {

        fontSize: 20,
        marginTop: 5,
        marginLeft: 10,


    },

    input: {

        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#888',
        width: 70,
        height: '90%',
        textAlign: 'center'

    },

    inputLivre: {

        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#000',
        width: '90%',
        height: '95%',
        textAlignVertical: "top",
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