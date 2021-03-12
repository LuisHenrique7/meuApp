import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ManaBar ({mana, manaMax, color, subtrairMana, adicionarMana}) {


    return(
        <View style={styles.container} >

            <TouchableOpacity
                style={styles.button}
                onPress={() => {subtrairMana()}}
            >

                <Text style={styles.textButton} >-</Text>

            </TouchableOpacity>

            <View style={styles.manaBar} >

                <View style={[styles.manaBarColor, {backgroundColor: color, width: `${mana * 100 / manaMax}%`}] } />

                <Text  style={[styles.lifeStatusText, 
                        {position: 'absolute', textAlign: 'center', width: '100%'}]} >

                    {mana}/{manaMax}

                </Text>

            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {adicionarMana()}}
            >

                <Text style={styles.textButton} >+</Text>

            </TouchableOpacity>

        </View>
    );

}

const styles = StyleSheet.create({

    container: {

        flexDirection: 'row',
        height: 30,
        width: 290,

    },

    lifeStatusText: {

        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',

    },

    manaBar: {

        backgroundColor: '#fff',
        width: 200,
        height: 30,
        alignItems: 'flex-start',

    },

    manaBarColor: {

        width: '100%',
        height: '100%',
        
    },

    button: {

        width: 45,
        height: '100%',
        backgroundColor: '#0af',
        justifyContent: 'center',
        alignItems: 'center'

    },

    textButton: {

        fontSize: 20,
        fontWeight: 'bold'

    }

});