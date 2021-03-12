import React, { Component } from 'react';

import { StyleSheet, View, Text, Button, TouchableOpacity, CheckBox, ToastAndroid, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LifeBar from '../components/LifeBar';
import ManaBar from '../components/ManaBar';



var input;
var inputVida;

export default class Main extends Component {

    state = {
        numeroDados: '0', // Deve ser uma string para não conflitar com o indexOf()
        dados: '',
        numeroLadosDados: 10,
        setNumeroLadosDados: '',
        pontuacao: '',
        pontuacaoAtual: 0,
        pontuacaoArmazenada: 0,
        vida: 300,
        vidaMax: 300,
        setVidaMax: '',
        mana: 200,
        manaMax: 200,
        setManaMax: '',
        novaVida: '',
        checkedCritico: false,
        checkedArmazenar: false,
        negativo: true,
        dificuldade: '6',
        displayLifeBar: true,
        displayManaBar: false,
        setDisplayManaBar: false,
        opcoes: false,
        configuracao: false,
        displayInputVida: false,
        displayInputDados: true,
        statusIcon: 'down',
        configIconColor: '#000',
        checkedMana: true,
        checkedSangue: false,
        checkedEnergia: false,
        typeManaColor: '#ee0',
        displayHumanidade: false,
        setDisplayHumanidade: false,
        humanidadeAtual: 5,
        humanidadeMax: 5,
        humanidade: ['#fff', '#fff','#fff', '#fff','#fff', '#000','#000', '#000','#000', '#000'],
        displayBarras: true

    }

    salvaVida = async  (vida) => {

        await AsyncStorage.setItem('vida', JSON.stringify(vida));

    }

    salvaVidaMax = async  (vidaMax) => {

        await AsyncStorage.setItem('vidaMax', JSON.stringify(vidaMax));

    }

    salvaMana = async  (mana) => {

        await AsyncStorage.setItem('mana', JSON.stringify(mana));

    }

    salvaManaMax = async  (manaMax) => {

        await AsyncStorage.setItem('manaMax', JSON.stringify(manaMax));

    }

    salvarHumanidade = async  (atual, maxima) => {

        await AsyncStorage.setItem('humanidadeAtual', JSON.stringify(atual));
        await AsyncStorage.setItem('humanidadeMax', JSON.stringify(maxima));

    }

    verificaPontuacao = (string) => {

        if (string.indexOf(",") != -1 || string.indexOf(".") != -1 ||
            string.indexOf("-") != -1 || string.indexOf(" ") != -1){
            // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.
                
            return true;

        } else {

            return false;
            
        }
    }

    rodarDados = () => {
        const { numeroDados, numeroLadosDados, checkedCritico, 
            checkedArmazenar, pontuacaoArmazenada, negativo, dificuldade } = this.state

        if (this.verificaPontuacao(numeroDados)){
            
            var resultados = "Número de dados inválido."; 
            var acertos = 0;

        } else if (numeroDados > 20) {

            var resultados = "Número de dados acima de 20."; 
            var acertos = 0;

        } else {
        
            let r;
            let d = new Array();
            for (let i = 0; i < numeroDados; i++) {
                r = Math.random();
                r = r * numeroLadosDados;
                r = Math.floor(r);
                d.push(r);
            
            }

            d = d.sort();

            var resultados = ""; 
            let e = 0;
            var acertos = 0;
            while (e < d.length){
                if (e == d.length - 1) {
                    resultados += d[e] + ".";
                }
                else{
                    resultados += d[e] + ", ";
                }
                if (d[e] == 0 && checkedCritico == true) {
                    acertos += 2;
                }
                else if (d[e] == 0) {
                    acertos += 1;
                }
                else if (d[e] >= dificuldade) {
                    acertos += 1;
                }
                else if (d[e] == 1 && negativo == true) {
                    acertos -= 1;
                }
                e++;

            }
        }

        if (checkedArmazenar === true) {

            this.setState({dados: resultados, pontuacao: acertos, pontuacaoAtual: acertos, 
                checkedArmazenar: false, pontuacaoArmazenada: acertos})

        } else {

            this.setState({dados: resultados,
                 pontuacao: acertos + pontuacaoArmazenada, pontuacaoAtual: acertos, 
                 pontuacaoArmazenada: 0})

        }

        input.blur(); // Tira do foco
  
    }

    subtrairVida = () => {

        const { vida, novaVida, displayInputVida } = this.state

        if (displayInputVida == false){

            this.setState({opcoes: false, configuracao: false, displayInputVida: true, displayInputDados: false})

        } else {

            if (this.verificaPontuacao(novaVida)) {
                // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.
                
                ToastAndroid.show('Vida Inserida Inválida !', ToastAndroid.LONG);

            } else if ((vida - novaVida) >= 0){

                this.salvaVida(vida - novaVida)
                this.setState({novaVida: '0', vida: vida - novaVida})

            } else {

                this.salvaVida(0)
                this.setState({novaVida: '0', vida: 0})

            }
            
            this.setState({displayInputVida: false, displayInputDados: true})
            inputVida.clear();
            inputVida.blur();
        }
    }

    adicionarVida = () => {

        const { vida, vidaMax, novaVida,  displayInputVida } = this.state

        if (displayInputVida == false){

            this.setState({opcoes: false, configuracao: false, displayInputVida: true, displayInputDados: false})

        } else {

            let novaVidaInt = parseInt(novaVida); 
            // Nesse caso é preciso passar de string para int, nos outros casos o js entende

            if (this.verificaPontuacao(novaVida)) {
                // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.
                
                ToastAndroid.show('Vida Inserida Inválida !', ToastAndroid.LONG);

            } else if ((vida + novaVidaInt) <= vidaMax){

                this.salvaVida(vida + novaVidaInt)
                this.setState({novaVida: '0', vida: vida + novaVidaInt})
                
            } else if ((vida + novaVidaInt) >= vidaMax){

                this.salvaVida(vidaMax)
                this.setState({novaVida: '0', vida: vidaMax})

            }
            
            this.setState({displayInputVida: false, displayInputDados: true})
            inputVida.clear();
            inputVida.blur();
        }
    }

    subtrairMana= () => {

        const { mana, novaVida, displayInputVida } = this.state

        if (displayInputVida == false){

            this.setState({opcoes: false, configuracao: false, displayInputVida: true,
                displayInputDados: false})

        } else {

            if (this.verificaPontuacao(novaVida)) {
                // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.
                
                ToastAndroid.show('Mana Inserida Inválida !', ToastAndroid.LONG);

            } else if ((mana - novaVida) >= 0){

                this.salvaMana(mana - novaVida)
                this.setState({novaVida: '0', mana: mana - novaVida})

            } else {

                this.salvaMana(0)
                this.setState({novaVida: '0', mana: 0})

            }
            
            this.setState({displayInputVida: false, displayInputDados: true})
            inputVida.clear();
            inputVida.blur();
        }
    }

    adicionarMana = () => {

        const { mana, manaMax, novaVida,  displayInputVida } = this.state

        if (displayInputVida == false){

            this.setState({opcoes: false, configuracao: false, displayInputVida: true,
                displayInputDados: false})

        } else {

            let novaManaInt = parseInt(novaVida); 
            // Nesse caso é preciso passar de string para int, nos outros casos o js entende

            if (this.verificaPontuacao(novaVida)) {
                // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.
                
                ToastAndroid.show('Mana Inserida Inválida !', ToastAndroid.LONG);

            } else if ((mana + novaManaInt) <= manaMax){

                this.salvaMana(mana + novaManaInt)
                this.setState({novaVida: '0', mana: mana + novaManaInt})
                
            } else if ((mana + novaManaInt) >= manaMax){

                this.salvaMana(manaMax)
                this.setState({novaVida: '0', mana: manaMax})

            }
            
            this.setState({displayInputVida: false, displayInputDados: true})
            inputVida.clear();
            inputVida.blur();
        }
    }

    setHumanidade = (atual, maxima) => {

        const { humanidade } = this.state

        let novaHumanidade = humanidade

        if (atual > maxima){

            atual = maxima

        }

        for (let i = 0; i < 10; i++) {

            if (i < atual){

                novaHumanidade[i] = '#fff'

            } else if (i >= maxima) {

                novaHumanidade[i] = '#000'

            } else {

                novaHumanidade[i] = '#f00'

            }

        }

        this.setState({humanidade: novaHumanidade})

    }

    abriOpcoes = () => {

        const { opcoes } = this.state

        if (opcoes == false){
            this.setState({opcoes: true, configuracao: false, statusIcon: 'up',
                displayBarras: false})
        } else {
            this.setState({opcoes: false, statusIcon: 'down', displayBarras: true})
        }

    }

    abriConfiguracao = () => {

        const { setNumeroLadosDados, vida, mana, setVidaMax, setManaMax, configuracao,
            checkedMana, checkedSangue, checkedEnergia, setDisplayManaBar, humanidadeAtual,
                humanidadeMax, setDisplayHumanidade } = this.state

        if (configuracao == false){

            this.setState({configuracao: true, opcoes: false, configIconColor: '#00f',
                displayInputDados: false, displayBarras: false})

        } else {

            if (this.verificaPontuacao(setVidaMax) || this.verificaPontuacao(setManaMax) ||
                this.verificaPontuacao(setNumeroLadosDados) ) {
                // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.
                
                ToastAndroid.show('Valor Inserido Inválido!', ToastAndroid.LONG);

            } else {
            
                let novaVidaNew = parseInt(setVidaMax)
                let novaManaNew = parseInt(setManaMax)
                let numeroDadosNew = parseInt(setNumeroLadosDados)
                
                if (setVidaMax != '') {

                    if (vida > novaVidaNew) {

                        this.salvaVida(novaVidaNew)
                        this.salvaVidaMax(novaVidaNew)
                        this.setState({vida: novaVidaNew, vidaMax: novaVidaNew, setVidaMax: ''})
        
                    } else {

                        this.salvaVidaMax(novaVidaNew)
                        this.setState({vidaMax: novaVidaNew, setVidaMax: ''})

                    }

                }
                
                if (setNumeroLadosDados != '') {

                    this.setState({numeroLadosDados: numeroDadosNew, setNumeroLadosDados: ''})

                }

                if (setManaMax != '') {

                    if (mana > novaManaNew) {

                        this.salvaMana(novaManaNew)
                        this.salvaManaMax(novaManaNew)
                        this.setState({mana: novaManaNew, manaMax: novaManaNew, setManaMax: ''})
        
                    } else {

                        this.salvaManaMax(novaManaNew)
                        this.setState({manaMax: novaManaNew, setManaMax: ''})

                    }

                }

                if (checkedMana === true){

                    this.setState({typeManaColor: '#0ee'})

                } else if (checkedSangue === true){

                    this.setState({typeManaColor: '#b03'})

                } else if (checkedEnergia === true){

                    this.setState({typeManaColor: '#ee0'})

                }

                if (humanidadeAtual != '' || humanidadeMax != ''){

                    this.salvarHumanidade(humanidadeAtual, humanidadeMax)
                    this.setHumanidade(humanidadeAtual,humanidadeMax)

                }

            }

            this.setState({configIconColor: '#000', configuracao: false, displayInputDados: true,
                displayBarras: true, displayManaBar: setDisplayManaBar,
                    displayHumanidade: setDisplayHumanidade})

        }

    }

    async componentDidMount(){

        const vidaCarregada = JSON.parse(await AsyncStorage.getItem('vida'));
        const vidaMaxCarregada = JSON.parse(await AsyncStorage.getItem('vidaMax'));
        const manaCarregada = JSON.parse(await AsyncStorage.getItem('mana'));
        const manaMaxCarregada = JSON.parse(await AsyncStorage.getItem('manaMax'));
        const humanidadeCarregada = JSON.parse(await AsyncStorage.getItem('humanidadeAtual'));
        const humanidadeMaxCarregada = JSON.parse(await AsyncStorage.getItem('humanidadeMax'));
        
        if (vidaCarregada != null){

            this.setState({vida: vidaCarregada})

        }
        
        if (vidaMaxCarregada != null){

            this.setState({vidaMax: vidaMaxCarregada})

        }

        if (manaCarregada != null){

            this.setState({mana: manaCarregada})

        }
        
        if (manaMaxCarregada != null){

            this.setState({manaMax: manaMaxCarregada})

        }

        if (humanidadeCarregada != null){

            this.setState({humanidadeAtual: humanidadeCarregada})

        }
        
        if (humanidadeMaxCarregada != null){

            this.setState({humanidadeMax: humanidadeMaxCarregada})

        }

    }

    render() {
        return ( 
            <View style={styles.container} >

                <View style={styles.header} >

                    <TouchableOpacity 
                        style={[styles.buttonHeader, {backgroundColor: '#fff', marginLeft: 10}]} 
                        onPress={() => {
                        this.props.navigation.navigate('Ficha');
                    }}>
                            <Text style={styles.textButtonHeader} >Ficha</Text>
                    </TouchableOpacity>

                    <Text style={styles.pageName} >Ragnarock</Text>

                    <TouchableOpacity 
                        style={[styles.buttonHeader, {marginRight: 10}]} 
                        onPress={() => {
                            this.props.navigation.navigate('Historia');
                        }}>
                            <Text style={styles.textButtonHeader} >História</Text>
                    </TouchableOpacity>

                </View>

                {this.state.displayBarras && <View style={{alignItems: 'center', marginTop: 20}}>

                    {this.state.displayLifeBar && <View style={styles.lifeStatus} >

                        <Text style={[styles.lifeStatusText, { marginRight: 10 }]} >Vida:</Text>

                        <LifeBar
                            vida={this.state.vida}
                            vidaMax={this.state.vidaMax}
                            subtrairVida={this.subtrairVida}
                            adicionarVida={this.adicionarVida}
                        />

                    </View>
                    }

                    {this.state.displayManaBar && <View style={[styles.lifeStatus, {marginTop: 20}]} >

                        <Text style={[styles.lifeStatusText, { marginRight: 5 }]} >Mana:</Text>

                        <ManaBar 
                            mana={this.state.mana}
                            manaMax={this.state.manaMax}
                            color={this.state.typeManaColor}
                            subtrairMana={this.subtrairMana}
                            adicionarMana={this.adicionarMana}
                        />
        

                    </View>
                    }

                    {this.state.displayHumanidade && <View style={[styles.lifeStatus, {marginTop: 20}]} >

                        <Text style={[styles.lifeStatusText, { marginRight: 5, marginLeft: 15 }]} >
                            Humanidade:
                        </Text>

                        <View style={styles.humanidadeBar}>

                            <View style={[styles.humanidadeCircle, {backgroundColor: this.state.humanidade[0]}]}></View>
                            <View style={[styles.humanidadeCircle, {backgroundColor: this.state.humanidade[1]}]}></View>
                            <View style={[styles.humanidadeCircle, {backgroundColor: this.state.humanidade[2]}]}></View>
                            <View style={[styles.humanidadeCircle, {backgroundColor: this.state.humanidade[3]}]}></View>
                            <View style={[styles.humanidadeCircle, {backgroundColor: this.state.humanidade[4]}]}></View>
                            <View style={[styles.humanidadeCircle, {backgroundColor: this.state.humanidade[5]}]}></View>
                            <View style={[styles.humanidadeCircle, {backgroundColor: this.state.humanidade[6]}]}></View>
                            <View style={[styles.humanidadeCircle, {backgroundColor: this.state.humanidade[7]}]}></View>
                            <View style={[styles.humanidadeCircle, {backgroundColor: this.state.humanidade[8]}]}></View>
                            <View style={[styles.humanidadeCircle, {backgroundColor: this.state.humanidade[9]}]}></View>

                        </View>

                    </View>
                    }

                </View>
                }

                {this.state.opcoes && <View style={styles.viewCheckBox1} >

                    <Text style={styles.textCheckBox} >Crítico: </Text>

                    <CheckBox
                        value={this.state.checkedCritico} 
                        onValueChange={() => {
                            this.setState({checkedCritico: !this.state.checkedCritico})}
                        } />

                    <Text style={[styles.textCheckBox, {marginLeft: 10}]} >Guardar Pontuação: </Text>

                    <CheckBox 
                        value={this.state.checkedArmazenar}
                        onValueChange={() => {
                            this.setState({checkedArmazenar: !this.state.checkedArmazenar})}
                        } />

                </View>
                }

                {this.state.opcoes && <View style={styles.viewCheckBox2} >

                    <Text style={styles.textCheckBox} >-1: </Text>

                    <CheckBox 
                        value={this.state.negativo}
                        onValueChange={() => {
                            this.setState({negativo: !this.state.negativo})}
                        } />

                    <Text 
                        style={[styles.textCheckBox, {marginLeft: 63, position: 'relative', top: 4}]} >
                            Dificuldade: 
                    </Text>

                    <TextInput  
                        style={styles.textInputDificuldade} 
                        value = {this.state.dificuldade}
                        keyboardType='numeric'
                        onChangeText = {(text) => {this.setState({dificuldade: text})}}

                    />

                </View>
                }

                {this.state.opcoes && <View style={styles.informacoes} >

                    <Text style={styles.textInformacoes} >
                        Pontuação armazenada: {this.state.pontuacaoArmazenada}
                    </Text>

                    <Text style={styles.textInformacoes} >
                        Pontuação atual: {this.state.pontuacaoAtual}
                    </Text>

                </View>
                }

                {this.state.configuracao && <View style={styles.viewConfig}>

                    <View style={styles.viewLinhaConfig} >

                        <Text style={styles.textCheckBox} >Vida Máxima:</Text>

                        <TextInput style={styles.inputConfig}
                            // ref = {(ref) => {
                            //     inputVida = ref;
                            // }}
                            placeholder={this.state.vidaMax.toString()}
                            keyboardType='numeric'
                            onChangeText = {(text) => {this.setState({setVidaMax: text})}}
                        />

                    </View>

                    <View style={styles.viewLinhaConfig} >

                        <Text style={[styles.textCheckBox, {marginLeft: 50}]} >Mostrar Barra de Poder:</Text>

                        <CheckBox 
                         style={{marginRight: 50}} 
                        value={this.state.setDisplayManaBar}
                        onValueChange={() => {
                            this.setState({setDisplayManaBar: !this.state.setDisplayManaBar})}
                        } />

                    </View>

                    {this.state.setDisplayManaBar && <View style={styles.viewLinhaConfig} >

                        <Text style={styles.textCheckBox} >Tipo de Poder:</Text>

                    </View>
                    }

                    {this.state.setDisplayManaBar && <View style={styles.viewLinhaConfig} >

                        <Text style={styles.textCheckBox} >Mana:</Text>

                        <CheckBox 
                        value={this.state.checkedMana}
                        onValueChange={() => {
                            this.setState({checkedSangue: false, checkedEnergia: false,
                                checkedMana: !this.state.checkedMana})}
                        } />

                        <Text style={styles.textCheckBox} >Sangue:</Text>

                        <CheckBox 
                        value={this.state.checkedSangue}
                        onValueChange={() => {
                            this.setState({checkedMana: false, checkedEnergia: false,
                                checkedSangue: !this.state.checkedSangue})}
                        } />

                        <Text style={styles.textCheckBox} >Energia:</Text>

                        <CheckBox 
                        value={this.state.checkedEnergia}
                        onValueChange={() => {
                            this.setState({checkedMana: false, checkedSangue: false,
                                checkedEnergia: !this.state.checkedEnergia})}
                        } />

                    </View>
                    }

                    {this.state.setDisplayManaBar && <View style={[styles.viewLinhaConfig,
                                                            {marginTop: 10}]} >

                        <Text style={styles.textCheckBox} >Mana Máxima:</Text>

                        <TextInput style={styles.inputConfig}
                            // ref = {(ref) => {
                            //     inputVida = ref;
                            // }}
                            placeholder={this.state.manaMax.toString()}
                            keyboardType='numeric'
                            onChangeText = {(text) => {this.setState({setManaMax: text})}}
                        />

                    </View>
                    }

                    <View style={[styles.viewLinhaConfig, {marginTop: 10}]} >

                        <Text style={[styles.textCheckBox, {marginLeft: 50}]} >Mostrar Barra de Humanidade:</Text>

                        <CheckBox 
                        style={{marginRight: 10}} 
                        value={this.state.setDisplayHumanidade}
                        onValueChange={() => {
                            this.setState({setDisplayHumanidade: !this.state.setDisplayHumanidade})}
                        } />

                    </View>

                    <View style={[styles.viewLinhaConfig, {marginTop: 10}]} >

                        <Text style={[styles.textCheckBox, {marginLeft: 50}]} >Humanidade:</Text>

                        <TextInput style={[styles.inputConfig, {marginLeft: 40}]}
                            // ref = {(ref) => {
                            //     inputVida = ref;
                            // }}
                            // placeholder={this.state.humanidadeAtual.toString()}
                            keyboardType='numeric'
                            onChangeText = {(text) => {this.setState({humanidadeAtual: text})}}
                        />

                        <Text style={[styles.textCheckBox, {marginRight: 30}]} >/</Text>

                        <TextInput style={[styles.inputConfig, {marginRight: 20}]}
                            // ref = {(ref) => {
                            //     inputVida = ref;
                            // }}
                            // placeholder={this.state.humanidadeMax.toString()}
                            keyboardType='numeric'
                            onChangeText = {(text) => {this.setState({humanidadeMax: text})}}
                        />

                    </View>
                
                    <View style={[styles.viewLinhaConfig, {marginTop: 20}]} >

                        <Text style={[styles.textCheckBox, {marginLeft: 20}]} >Número de lados dos dados:</Text>

                        <TextInput style={styles.inputConfig}
                            // ref = {(ref) => {
                            //     inputVida = ref;
                            // }}
                            placeholder= {this.state.numeroLadosDados.toString()}
                            keyboardType='numeric'
                            onChangeText = {(text) => {this.setState({setNumeroLadosDados: text})}}
                        />

                    </View>
                
                </View>
                }

                {this.state.displayInputVida && <View style={styles.viewInput} >

                    <TextInput style={styles.input}
                        ref = {(ref) => {
                            inputVida = ref;
                        }}
                        placeholder='Insira um valor'
                        keyboardType='numeric'
                        onChangeText = {(text) => {this.setState({novaVida: text})}}
                    />

                </View>
                }

                {this.state.displayInputDados && <View style={styles.viewInput} >

                    <TextInput style={styles.input}
                        ref = {(ref) => {
                            input = ref;
                        }}
                        placeholder='Número de dados'
                        keyboardType='numeric'
                        onChangeText = {(text) => {this.setState({numeroDados: text})}}
                    />

                    
                    <TouchableOpacity style={styles.buttonInput} onPress={this.rodarDados} >
                        <Text style={styles.textButtonInput} >Rodar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonConfig} 
                        onPress={this.abriOpcoes} >
                        <Icon name={`keyboard-arrow-${this.state.statusIcon}`} size={30}/>
                    </TouchableOpacity>
                
                </View>
                }

                {! this.state.configuracao && <View style={styles.viewResultado} >

                    <Text style={styles.resultadoText} >Dados:</Text>
                    <Text style={styles.resultadoTextVariavel} >{this.state.dados}</Text>
                    <Text style={styles.resultadoText} >Pontuação:</Text>
                    <Text style={styles.resultadoTextVariavel} >{this.state.pontuacao}</Text>

                </View>
                }

                <TouchableOpacity
                        style={[styles.buttonConfig,{position:'absolute', top: 520, left: 280}]} 
                        onPress={this.abriConfiguracao} >
                        <Icon name='settings' size={30} color={this.state.configIconColor}/>
                </TouchableOpacity>

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

        backgroundColor: '#237777',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        
    },

    header: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 60,
        // marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#000',
    },

    buttonHeader: {

        width: 80,
        height: 35,
        borderRadius: 3,
        backgroundColor: '#ffaa00',
        justifyContent: 'center',
        alignItems: 'center',

    },

    pageName: {

        color: 'gold',
        fontWeight: 'bold',
        fontSize: 30,
        // fontFamily: '',

    },

    textButtonHeader: {

        fontSize: 20,

    },

    lifeStatus: {

        flexDirection: 'row',
        marginTop: 15,

    },

    lifeStatusText: {

        fontSize: 20,
        marginLeft: 7,
        fontWeight: 'bold',
        color: '#fff',
        // position: 'relative',
        // left: 30,

    },

    lifeBar: {

        backgroundColor: '#000',
        width: 231,
        height: 35,
        alignItems: 'flex-start',

    },

    lifeBarRed: {

        backgroundColor: '#f00',
        width: '100%',
        height: '100%',
        

    },

    humanidadeBar: {

        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10

    },

    humanidadeCircle: {

        borderWidth: 4,
        borderRadius: 13,
        height: 20,
        width: 20,
        position: 'relative',
        top: 2

    },

    viewCheckBox1: {

        marginTop: 10,
        flexDirection: 'row',
        paddingTop: 10,
        backgroundColor: '#fff',
        width: '100%',

    },

    viewCheckBox2: {

        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',

    },

    informacoes: {

        width: '100%',
        paddingBottom: 10,
        backgroundColor: '#fff',
        // flexWrap: 'wrap',

    },

    textCheckBox: {

        fontSize: 20,
        marginLeft: 30,

    },

    textInformacoes: {

        fontSize: 20,
        marginLeft: 30,

    },

    textInputDificuldade: {

        fontSize: 20,
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 50,
        marginLeft: 7,
        textAlign: 'center',

    },

    viewConfig: {

        backgroundColor: '#fff',
        width: '100%',
        height: '80%',
        
        

    },

    viewLinhaConfig: {

        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        alignItems: 'center'

    },

    inputConfig: {

        fontSize: 20,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#555555',
        width: 80,
        height: '90%',
        textAlign: 'center',
        justifyContent: 'center'

    },

    viewInput: {

        marginTop: 40,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',

    },

    input: {

        fontSize: 18,
        borderWidth: 1,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        borderColor: '#ddddff',
        width: 170,
        textAlign: 'center'

    },

    buttonInput: {

        backgroundColor: '#ddddff',
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',

    },

    buttonConfig: {

        marginLeft: 20,
        backgroundColor: '#ddddff',
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    textButtonInput: {

        fontSize: 20,

    },

    viewResultado: {

        marginTop: 40,
        width: '100%',
        

    },

    resultadoText: {

        fontSize: 20,
        margin: 5,
        fontWeight: 'bold',

    },

    resultadoTextVariavel: {

        fontSize: 30,
        marginVertical: 5,
        marginLeft: 20,
        marginRight: 10,
        
    },

    lifeBarProgress: {
        
        height: 20, 
        width: 100,
        
    },

    viewButtons: {

        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        top: 570,
        
        // top: 610,

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
