import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, AsyncStorage, ToastAndroid } from 'react-native';

async function salvaHistoria(historia){

    await AsyncStorage.setItem('Historia', JSON.stringify(historia));

}

function abrirCreditos(creditos, setCreditos){

    if (creditos == false){

        setCreditos(true)

    } else {

        setCreditos(false)

    }

}

// async function componentDidMount(setHistoria){

//     const historiaSalva = JSON.parse(await AsyncStorage.getItem('Historia'));
    
//     if (historiaSalva != null){

//         setHistoria(historiaSalva);

//     }
// }

export default function Historia (props) {

    const [ historia, setHistoria ] = useState('');
    const [ creditos, setCreditos ] = useState(false);
    
    useEffect(() => { // Carregamento automático, version 2.0
        async function load(){
            const historiaSalva = JSON.parse(await AsyncStorage.getItem('Historia'));
            setHistoria(historiaSalva);
        }
        load();
    }, []);
    
    return(

        <View>

            <View style={styles.header} >

                <TouchableOpacity
                    style={[styles.buttonHeader, {left: 10, width: 80, backgroundColor: 'yellow'}]}
                    onPress={() => abrirCreditos(creditos, setCreditos)}                
                >

                    <Text style={{fontSize: 18, color: '#000'}}>Créditos</Text>

                </TouchableOpacity>

                <Text style={styles.pageName} >História</Text>

                <TouchableOpacity
                    style={styles.buttonHeader}
                    onPress={() => {props.navigation.navigate('Main');}}                
                >

                    <Text style={{fontSize: 18, color: '#fff'}}>Main</Text>

                </TouchableOpacity>

            </View>

            {!creditos && <View style={styles.conteudo}>

                <TextInput
                    style={styles.inputLivre} 
                    value={historia}
                    multiline={true}
                    onChangeText={(text) => setHistoria(text)}
                />

                <TouchableOpacity
                    style={styles.buttonSave}
                    onPress={() => {
                        salvaHistoria(historia);
                        ToastAndroid.show('Salvo', ToastAndroid.LONG);
                    }}                
                >

                    <Text style={{fontSize: 18, color: '#fff'}}>Salvar</Text>

                </TouchableOpacity>

                {/* <TouchableOpacity
                    style={[styles.buttonHeader, {top: 519, right: 100, backgroundColor: '#aa9623', width: 75}]}
                    onPress={() => componentDidMount(setHistoria)}                
                >

                    <Text style={{fontSize: 18, color: '#fff'}}>Carregar</Text>

                </TouchableOpacity> */}

            </View>
            }

            {creditos && <View>

                <Text style={{fontSize: 20, marginLeft: 15, marginTop: 30}}>
                    Esse aplicativo foi feito em 2019 por Luis Henrique com o auxílio de Isaac Santos
                </Text>

            </View>
            }
        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        alignItems: 'center'
        
    },

    header: {

        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        alignItems: 'center',
        backgroundColor: '#000',

    },

    pageName: {

        color: 'gold',
        fontWeight: 'bold',
        fontSize: 30,

    },

    buttonHeader: {

        width: 70,
        height: 35,
        borderRadius: 3,
        backgroundColor: '#237777',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10

    },

    conteudo: {

        height: '91%',
        width: '100%',
        backgroundColor: 'silver'

    },

    inputLivre: {

        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#000',
        width: '90%',
        height: '90%',
        textAlignVertical: "top",
        fontSize: 18,
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: '#fff',

    },

    buttonSave: {

        width: 70,
        height: 35,
        borderRadius: 3,
        backgroundColor: '#2366aa',
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: 100,
        alignSelf: 'center', //version 2.0
        marginTop: 2,

    }

})