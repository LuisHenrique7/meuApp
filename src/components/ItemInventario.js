import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ItemInventario ({ item, index, adicionarQuant, subtrairQuant,
    setRemoverItem }) {

    return(

        <View  style={styles.viewItem} >

            <TouchableOpacity
                onPress={() => {
                    subtrairQuant(index)
                }}
                style={styles.button}
            >
                
                <Text style={styles.simboloText}>-</Text>
                
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    setRemoverItem(index)
                }}
                style={[styles.buttonItem, {backgroundColor: item.selecionado ? '#f00' : '#fff'}]}
            >

                <Text  style={styles.textConteudo}
                    numberOfLines={1}
                >
                    {item.nome} : {item.quantidade}
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    adicionarQuant(index)
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
        alignSelf: 'center'
        


    },

    buttonItem: {

        backgroundColor: '#fff',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: 267

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