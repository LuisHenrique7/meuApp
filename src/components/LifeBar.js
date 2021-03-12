import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LifeBar ({vida, vidaMax, subtrairVida, adicionarVida}) {
    // Usar props no lugar de {vida, vidaMax} <=> usar props.vida e props.vidaMax

    return(
        <View style={styles.container} >

            <TouchableOpacity
                style={styles.button}
                onPress={() => {subtrairVida()}}
            >

                <Text style={styles.textButton} >-</Text>

            </TouchableOpacity>

            <View style={styles.lifeBar} >

                <View style={[styles.lifeBarRed, {width: `${vida * 100 / vidaMax}%`}] } />

                <Text  style={[styles.lifeStatusText, 
                        {position: 'absolute', textAlign: 'center', width: '100%'}]} >

                    {vida}/{vidaMax}

                </Text>

            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {adicionarVida()}}
            >

                <Text style={styles.textButton} >+</Text>

            </TouchableOpacity>

        </View>
    );

}

const styles = StyleSheet.create({

    container: {

        flexDirection: 'row',
        height: 35,
        width: 290,

    },

    lifeStatusText: {

        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',

    },

    lifeBar: {

        backgroundColor: '#000',
        width: 200,
        height: 35,
        alignItems: 'flex-start',

    },

    lifeBarRed: {

        backgroundColor: '#f00',
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