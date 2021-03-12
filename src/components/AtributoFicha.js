import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AtributoFicha ({ item, index, lista, setLista, adicionarQuant, subtrairQuant,
    setRemoverAtributo }) {

    return(

        <View  style={styles.viewItem} >

            <TouchableOpacity
                onPress={() => {
                    subtrairQuant(index, lista, setLista)
                }}
                style={styles.button}
            >
                
                <Text style={styles.simboloText}>-</Text>
                
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    setRemoverAtributo(index, lista, setLista)
                }}
                style={[styles.buttonItem, {backgroundColor: item.selecionado ? '#f00' : '#fff'}]}
            >

                <Text  style={styles.textConteudo}
                    numberOfLines={1}
                >
                    {item.nome} : {item.nivel}
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    adicionarQuant(index, lista, setLista)
                }}
                style={styles.button}
            
            >

                <Text style={styles.simboloText}>+</Text>

            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    viewItem: {

        flexDirection: 'row',
        width: 350,
        height: 50,
        marginTop: 7,
        marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3

    },

    textConteudo: {

        fontSize: 25,
        marginLeft: 10,
        


    },

    buttonItem: {

        backgroundColor: '#fff',
        
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: 260

    },

    button: {

        backgroundColor: '#dfaaaa',
        width: 40,
        height: '100%',
        alignItems: 'center',
        borderRadius: 3,
        justifyContent: 'center',
        

    },

    simboloText: {

        fontWeight: 'bold',
        fontSize: 20,

    }

})