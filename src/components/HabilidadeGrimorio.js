import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HabilidadeGrimorio ({ item, index, info, setRemoverItem }) {

    return(

        <View  style={styles.viewItem} >

            <TouchableOpacity
                onPress={() => {
                    info(item.nome + " " + item.nivel, item.descricao, index)
                }}
                style={styles.button}
            >
                
                <Text style={styles.simboloText}>i</Text>
                
            </TouchableOpacity>

            

            <TouchableOpacity
                onPress={() => {
                    setRemoverItem(index)
                }}
                style={[styles.buttonItem, {backgroundColor: item.selecionado ? '#fc0' : '#fff'}]}
            >

            <Text  style={styles.textConteudo}
                numberOfLines={1}
            >
                {item.nome} -> {item.nivel}
            </Text>

            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    viewItem: {

        flexDirection: 'row',
        width: 390,
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

        fontSize: 22,
        


    },

    buttonItem: {

        backgroundColor: '#fff',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: 347

    },

    button: {

        backgroundColor: '#ff6666',
        width: 40,
        height: '100%',
        alignItems: 'center',
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        justifyContent: 'center',
        

    },

    simboloText: {

        fontWeight: 'bold',
        fontSize: 20,

    }
})