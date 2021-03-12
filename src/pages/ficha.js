import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TextInput, ToastAndroid, AsyncStorage } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AtributoFicha from '../components/AtributoFicha';

async function salvaFisicos(fisicos){
    
    await AsyncStorage.setItem('listaFisicos', JSON.stringify(fisicos));
    
}

async function salvaSociais(sociais){
    
    await AsyncStorage.setItem('listaSociais', JSON.stringify(sociais));
    
}

async function salvaMentais(mentais){
    
    await AsyncStorage.setItem('listaMentais', JSON.stringify(mentais));
    
}

async function salvaTalentos(talentos){

    await AsyncStorage.setItem('listaTalentos', JSON.stringify(talentos));

}

async function salvaPericias(pericias){

    await AsyncStorage.setItem('listaPericias', JSON.stringify(pericias));

}

async function salvaConhecimento(conhecimento){

    await AsyncStorage.setItem('listaConhecimento', JSON.stringify(conhecimento));

}

async function salvaAntecedentes(antecedentes){

    await AsyncStorage.setItem('listaAntecedentes', JSON.stringify(antecedentes));

}

async function salvaDisciplinas(disciplinas){

    await AsyncStorage.setItem('listaDisciplinas', JSON.stringify(disciplinas));

}

async function salvaVirtudes(virtudes){

    await AsyncStorage.setItem('listaVirtudes', JSON.stringify(virtudes));

}

async function salvaVantagens(vantagens, desvantagens){
    
    await AsyncStorage.setItem('Vantagens', JSON.stringify(vantagens));
    await AsyncStorage.setItem('Desvantagens', JSON.stringify(desvantagens));
    
}

async function salvaPontos(pontos){

    await AsyncStorage.setItem('pontos', JSON.stringify(pontos));

}

function adicionarQuant(index, lista, setLista){

    const listaNova = lista.map((item) => {
        if (item.nome ==  lista[index].nome){
            const n = parseInt(item.nivel)
            return { nome: item.nome, nivel: n + 1, especialidade: item.especialidade }

        }

        return item;

    })

    setLista(listaNova);

}

function subtrairQuant(index, lista, setLista) {

    const listaNova = lista.map((item) => {
        if (item.nome ==  lista[index].nome){

            if(lista[index].nivel - 1 >= 0){
                const n = parseInt(item.nivel)
                return { nome: item.nome, nivel: n - 1, especialidade: item.especialidade }

            }

        }

        return item;

    })

    setLista(listaNova);

}

function setEspecialidade(index, special, lista, setLista, setSpecial){

    const listaNova = lista.map((item) => {
        if (item.nome ==  lista[index].nome){
            
            if(special != ''){
                
                return { nome: item.nome, nivel: item.nivel, especialidade: special }

            }

        }

        return item;

    })

    setSpecial('');
    setLista(listaNova);

}

function config(displayConfig, setDisplayConfig, setConfigIconColor){

    if (displayConfig == false){

        setDisplayConfig(true);
        setConfigIconColor('#00f')

    } else {

        setDisplayConfig(false);
        setConfigIconColor('#000')

    }

}

function verificaPontuacao(string){

    if (string.indexOf(",") != -1 || string.indexOf(".") != -1 || string.indexOf(" ") != -1 ||
        parseInt(string) < -20 || parseInt(string) > 200){
        // string.indexOf(x) => retorna a posição de uma string (x) em outra string ou -1 se não encontrar.
        
        return true;

    } else {

        return false;
        
    }
}

function setRemoverAtributo(index, lista, setLista){

    let novaLista = lista.map(item => {
        if (item.nome == lista[index].nome) {
            item.selecionado = ! item.selecionado
        }
        return item
    })

    setLista(novaLista)

}

function removerAtributo(lista, setLista){

    let novaLista = lista.filter(item => !item.selecionado)
    setLista(novaLista)
}

// async function componentDidMount(setFisicos, setSociais, setMentais, setTalentos, setPericias, setConhecimento, setAntecedentes, setDiciplinas, setVirtudes, setVantagens, setDesvantagens, setPontos){

//     const listaFisicosSalva = JSON.parse(await AsyncStorage.getItem('listaFisicos'));
//     const listaSociaisSalva = JSON.parse(await AsyncStorage.getItem('listaSociais'));
//     const listaMentaisSalva = JSON.parse(await AsyncStorage.getItem('listaMentais'));
//     const listaTalentosSalva = JSON.parse(await AsyncStorage.getItem('listaTalentos'));
//     const listaPericiasSalva = JSON.parse(await AsyncStorage.getItem('listaPericias'));
//     const listaConhecimentoSalva = JSON.parse(await AsyncStorage.getItem('listaConhecimento'));
//     const listaAntecedentesSalva = JSON.parse(await AsyncStorage.getItem('listaAntecedentes'));
//     const listaDisciplinasSalva = JSON.parse(await AsyncStorage.getItem('listaDisciplinas'));
//     const listaVirtudesSalva = JSON.parse(await AsyncStorage.getItem('listaVirtudes'));
//     const vantagens = JSON.parse(await AsyncStorage.getItem('Vantagens'));
//     const desvantagens = JSON.parse(await AsyncStorage.getItem('Desvantagens'));
//     const pontos = JSON.parse(await AsyncStorage.getItem('pontos'));
    
//     if (listaFisicosSalva != null){

//         setFisicos(listaFisicosSalva);

//     }
    
//     if (listaSociaisSalva != null){

//         setSociais(listaSociaisSalva);

//     }

//     if (listaMentaisSalva != null){

//         setMentais(listaMentaisSalva);

//     }
    
//     if (listaTalentosSalva != null){

//         setTalentos(listaTalentosSalva);

//     }

//     if (listaPericiasSalva != null){

//         setPericias(listaPericiasSalva);

//     }
    
//     if (listaConhecimentoSalva != null){

//         setConhecimento(listaConhecimentoSalva);

//     }

//     if (listaAntecedentesSalva != null){

//         setAntecedentes(listaAntecedentesSalva);

//     }
    
//     if (listaDisciplinasSalva != null){

//         setDiciplinas(listaDisciplinasSalva);

//     }

//     if (listaVirtudesSalva != null){

//         setVirtudes(listaVirtudesSalva);

//     }

//     if (vantagens != null){

//         setVantagens(vantagens);

//     }

//     if (desvantagens != null){

//         setDesvantagens(desvantagens);

//     }

//     if (pontos != null){

//         setPontos(pontos);

//     }

// }

export default function Ficha (props) {

    const [ fisicos, setFisicos ] = useState([{ 
                                            nome: "Força",
                                            especialidade : 'Braços Fortes', 
                                            nivel: 1,
                                            selecionado: false
                                        }, { 
                                            nome: "Destreza",
                                            especialidade : 'Reflexos Rápidos', 
                                            nivel: 1,
                                            selecionado: false
                                        }, { 
                                            nome: "Vigor",
                                            especialidade : '', 
                                            nivel: 1,
                                            selecionado: false
                                        }]);

    const [ sociais, setSociais ] = useState([{ 
                                            nome: "Carisma",
                                            especialidade : '', 
                                            nivel: 1,
                                            selecionado: false
                                        }, { 
                                            nome: "Manipulação",
                                            especialidade : '', 
                                            nivel: 1,
                                            selecionado: false
                                        }, { 
                                            nome: "Aparência",
                                            especialidade : '', 
                                            nivel: 1,
                                            selecionado: false
                                        }]);
    
    const [ mentais, setMentais ] = useState([{ 
                                            nome: "Percepção",
                                            especialidade : '', 
                                            nivel: 1,
                                            selecionado: false
                                        }, { 
                                            nome: "Inteligência",
                                            especialidade : '', 
                                            nivel: 1,
                                            selecionado: false
                                        }, { 
                                            nome: "Raciocínio",
                                            especialidade : '', 
                                            nivel: 1,
                                            selecionado: false
                                        }]);
    
    const [ talentos, setTalentos ] = useState([{ 
                                            nome: "Prontidão",
                                            especialidade : '', 
                                            nivel: 0,
                                            selecionado: false
                                        }, { 
                                            nome: "Esportes",
                                            especialidade : '', 
                                            nivel: 0,
                                            selecionado: false
                                        }, { 
                                            nome: "Briga",
                                            especialidade : '', 
                                            nivel: 0,
                                            selecionado: false
                                        }, { 
                                            nome: "Esquiva",
                                            especialidade : '', 
                                            nivel: 0,
                                            selecionado: false
                                        }, { 
                                            nome: "Empatia",
                                            especialidade : '', 
                                            nivel: 0,
                                            selecionado: false
                                        }, { 
                                            nome: "Expressão",
                                            especialidade : '', 
                                            nivel: 0,
                                            selecionado: false
                                        }, { 
                                            nome: "Intimidação",
                                            especialidade : '', 
                                            nivel: 0,
                                            selecionado: false
                                        }, { 
                                            nome: "Liderança",
                                            especialidade : '', 
                                            nivel: 0,
                                            selecionado: false
                                        }, { 
                                            nome: "Manha",
                                            especialidade : '', 
                                            nivel: 0,
                                            selecionado: false
                                        }, { 
                                            nome: "Lábia",
                                            especialidade : '', 
                                            nivel: 0,
                                            selecionado: false
                                        }]);

    const [ pericias, setPericias ] = useState([{ 
                                                nome: "Emp. c/ Animais",
                                                especialidade : '', 
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Ofícios",
                                                especialidade : '', 
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Condução",
                                                especialidade : '', 
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Etiqueta",
                                                especialidade : '', 
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Armas de Fogo",
                                                especialidade : '', 
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Armas Brancas",
                                                especialidade : '', 
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Performance",
                                                especialidade : '', 
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Segurança",
                                                especialidade : '', 
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Furtividade",
                                                especialidade : '', 
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Sobrevivência",
                                                especialidade : '', 
                                                nivel: 0,
                                                selecionado: false
                                            }]);
    
    const [ conhecimento, setConhecimento ] = useState([{ 
                                                    nome: "Acadêmicos",
                                                    especialidade : '', 
                                                    nivel: 0,
                                                    selecionado: false
                                                }, { 
                                                    nome: "Computador",
                                                    especialidade : '', 
                                                    nivel: 0,
                                                    selecionado: false
                                                }, { 
                                                    nome: "Finanças",
                                                    especialidade : '', 
                                                    nivel: 0,
                                                    selecionado: false
                                                }, { 
                                                    nome: "Investigação",
                                                    especialidade : '', 
                                                    nivel: 0,
                                                    selecionado: false
                                                }, { 
                                                    nome: "Meditação",
                                                    especialidade : '', 
                                                    nivel: 0,
                                                    selecionado: false
                                                }, { 
                                                    nome: "Linguística",
                                                    especialidade : '', 
                                                    nivel: 0,
                                                    selecionado: false
                                                }, { 
                                                    nome: "Medicina",
                                                    especialidade : '', 
                                                    nivel: 0,
                                                    selecionado: false
                                                }, { 
                                                    nome: "Ocultismo",
                                                    especialidade : '', 
                                                    nivel: 0,
                                                    selecionado: false
                                                }, { 
                                                    nome: "Iluminismo",
                                                    especialidade : '', 
                                                    nivel: 0,
                                                    selecionado: false
                                                }, { 
                                                    nome: "Ciência",
                                                    especialidade : '', 
                                                    nivel: 0,
                                                    selecionado: false
                                                }]);
            
    const [ antecedentes, setAntecedentes ] = useState([{ 
                                                nome: "Recursos",
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Contatos", 
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Aliados",
                                                nivel: 0,
                                                selecionado: false
                                            }]);
                                
    const [ disciplinas, setDiciplinas ] = useState([{ 
                                                nome: "Diciplina 1",
                                                nivel: 0,
                                                selecionado: false
                                            }, { 
                                                nome: "Diciplina 2",
                                                nivel: 0,
                                                selecionado: false
                                            }]);
                                            
    const [ virtudes, setVirtudes ] = useState([{ 
                                                nome: "Consciência",
                                                nivel: 1,
                                                selecionado: false
                                            }, { 
                                                nome: "Autocontrole", 
                                                nivel: 1,
                                                selecionado: false
                                            }, { 
                                                nome: "Coragem",
                                                nivel: 1,
                                                selecionado: false
                                            }]);
                                            
    const [ displayOcultView, setDisplayOcultView ] = useState(false);
    
    const [ lista, setLista ] = useState([]);

    const [ special, setSpecial] = useState('');

    const [ buttonsList, setButtonsList] = useState([false,false,false,false,false,false,false,false,false]);
    
    const [ displayConfig, setDisplayConfig ] = useState(false);

    const [ configIconColor, setConfigIconColor] = useState('#000');

    const [ senha, setSenha ] = useState(0);

    const [ acesso, setAcesso] = useState(false);

    const [ pontos, setPontos] = useState(0);

    const [ novoAtributo, setNovoAtributo] = useState('');

    const [ vantagens, setVantagens] = useState('');

    const [ desvantagens, setDesvantagens] = useState('');

    useEffect(() => { // Carregamento automático, version 2.0
        async function load(){
            const listaFisicosSalva = JSON.parse(await AsyncStorage.getItem('listaFisicos'));
            const listaSociaisSalva = JSON.parse(await AsyncStorage.getItem('listaSociais'));
            const listaMentaisSalva = JSON.parse(await AsyncStorage.getItem('listaMentais'));
            const listaTalentosSalva = JSON.parse(await AsyncStorage.getItem('listaTalentos'));
            const listaPericiasSalva = JSON.parse(await AsyncStorage.getItem('listaPericias'));
            const listaConhecimentoSalva = JSON.parse(await AsyncStorage.getItem('listaConhecimento'));
            const listaAntecedentesSalva = JSON.parse(await AsyncStorage.getItem('listaAntecedentes'));
            const listaDisciplinasSalva = JSON.parse(await AsyncStorage.getItem('listaDisciplinas'));
            const listaVirtudesSalva = JSON.parse(await AsyncStorage.getItem('listaVirtudes'));
            const vantagens = JSON.parse(await AsyncStorage.getItem('Vantagens'));
            const desvantagens = JSON.parse(await AsyncStorage.getItem('Desvantagens'));
            const pontos = JSON.parse(await AsyncStorage.getItem('pontos'));
            if (listaFisicosSalva != null){

                setFisicos(listaFisicosSalva);
        
            }
            
            if (listaSociaisSalva != null){
        
                setSociais(listaSociaisSalva);
        
            }
        
            if (listaMentaisSalva != null){
        
                setMentais(listaMentaisSalva);
        
            }
            
            if (listaTalentosSalva != null){
        
                setTalentos(listaTalentosSalva);
        
            }
        
            if (listaPericiasSalva != null){
        
                setPericias(listaPericiasSalva);
        
            }
            
            if (listaConhecimentoSalva != null){
        
                setConhecimento(listaConhecimentoSalva);
        
            }
        
            if (listaAntecedentesSalva != null){
        
                setAntecedentes(listaAntecedentesSalva);
        
            }
            
            if (listaDisciplinasSalva != null){
        
                setDiciplinas(listaDisciplinasSalva);
        
            }
        
            if (listaVirtudesSalva != null){
        
                setVirtudes(listaVirtudesSalva);
        
            }
        
            if (vantagens != null){
        
                setVantagens(vantagens);
        
            }
        
            if (desvantagens != null){
        
                setDesvantagens(desvantagens);
        
            }
        
            if (pontos != null){
        
                setPontos(pontos);
        
            }
        }
        load();
    }, []);

    return(

        <View Astyle={styles.container} >
        <ScrollView>

            <View style={styles.header} >

                <TouchableOpacity onPress={() => {props.navigation.navigate('Main')}}  
                        style={[styles.buttonHeader, {backgroundColor: '#237777', left: 10}]}                   
                    >

                        <Text style={{fontSize: 18, color: '#fff'}} >Main</Text>

                </TouchableOpacity>

                {/* <TouchableOpacity
                    style={{backgroundColor: 'gray', borderRadius: 3, paddingHorizontal: 10}}  
                    // onPress={() => {componentDidMount(setFisicos, setSociais, setMentais, setTalentos, setPericias, setConhecimento, setAntecedentes, setDiciplinas, setVirtudes, setVantagens, setDesvantagens, setPontos)}}                     
                > */}

                    <Text style={styles.pageName} >Ficha</Text>

                {/* </TouchableOpacity> */}

                <TouchableOpacity 
                    style={[styles.buttonHeader, {left: 280}]}  
                    onPress={() => config(displayConfig,setDisplayConfig, setConfigIconColor)}                  
                >

                    <Icons name='settings' size={30} color={configIconColor}/>

                </TouchableOpacity>

            </View>

            {!displayOcultView && !displayConfig && <View style={styles.conteudo} >

                <Text style={styles.titulo} >Atributos:</Text>

                <View style={styles.topico}>

                    {acesso && <TouchableOpacity
                        style={styles.buttonTopico}
                        onPress={() => {
                                    setLista(fisicos);
                                    setButtonsList([true,false,false,false,false,false,false,false,false]);
                                    setDisplayOcultView(true)}}
                    >

                        <Text style={styles.textButtonTopico} >SET</Text>

                    </TouchableOpacity>
                    }
                    <Text style={styles.subTitulo} >Físicos</Text>

                </View>

                <FlatList

                    data={fisicos}
                    keyExtractor={(item)=> item.nome }
                    renderItem={({ item, index }) =>
                        (<Text style={styles.textItem}>
                            {item.nome} : {item.nivel} -> {item.especialidade}
                        </Text>)}
                />

                <View style={styles.topico}>

                    {acesso && <TouchableOpacity
                        style={styles.buttonTopico}
                        onPress={() => {
                                setLista(sociais);
                                setButtonsList([false,true,false,false,false,false,false,false,false]);
                                setDisplayOcultView(true)}}
                    >

                    <Text style={styles.textButtonTopico} >SET</Text>

                    </TouchableOpacity>
                    }
                    <Text style={styles.subTitulo} >Sociais</Text>

                </View>

                <FlatList

                    data={sociais}
                    keyExtractor={(item)=> item.nome }
                    renderItem={({ item, index }) =>
                        (<Text style={styles.textItem}>
                            {item.nome} : {item.nivel} -> {item.especialidade}
                        </Text>)}
                />

                <View style={styles.topico}>

                    {acesso && <TouchableOpacity
                        style={styles.buttonTopico}
                        onPress={() => {
                            setLista(mentais);
                            setButtonsList([false,false,true,false,false,false,false,false,false]);
                            setDisplayOcultView(true)}}
                    >

                    <Text style={styles.textButtonTopico} >SET</Text>

                    </TouchableOpacity>
                    }
                    <Text style={styles.subTitulo} >Mentais</Text>

                </View>

                <FlatList

                    data={mentais}
                    keyExtractor={(item)=> item.nome }
                    renderItem={({ item, index }) =>
                        (<Text style={styles.textItem}>
                            {item.nome} : {item.nivel} -> {item.especialidade}
                        </Text>)}
                />

                <Text style={[styles.titulo, {marginTop: 20}]} >Habilidades:</Text>
                
                <View style={styles.topico}>

                    {acesso && <TouchableOpacity
                        style={styles.buttonTopico}
                        onPress={() => {
                            setLista(talentos);
                            setButtonsList([false,false,false,true,false,false,false,false,false]);
                            setDisplayOcultView(true)}}
                    >

                    <Text style={styles.textButtonTopico} >SET</Text>

                    </TouchableOpacity>
                    }
                    <Text style={styles.subTitulo} >Talentos</Text>

                </View>

                <FlatList

                    data={talentos}
                    keyExtractor={(item)=> item.nome }
                    renderItem={({ item, index }) =>
                        (<Text style={styles.textItem}>
                            {item.nome} : {item.nivel} -> {item.especialidade}
                        </Text>)}
                />

                <View style={styles.topico}>

                    {acesso && <TouchableOpacity
                        style={styles.buttonTopico}
                        onPress={() => {
                            setLista(pericias);
                            setButtonsList([false,false,false,false,true,false,false,false,false]);
                            setDisplayOcultView(true)}}
                    >

                    <Text style={styles.textButtonTopico} >SET</Text>

                    </TouchableOpacity>
                    }
                    <Text style={styles.subTitulo} >Perícias</Text>

                </View>

                <FlatList

                    data={pericias}
                    keyExtractor={(item)=> item.nome }
                    renderItem={({ item, index }) =>
                        (<Text style={styles.textItem}>
                            {item.nome} : {item.nivel} -> {item.especialidade}
                        </Text>)}
                />

                <View style={styles.topico}>

                    {acesso && <TouchableOpacity
                        style={styles.buttonTopico}
                        onPress={() => {
                            setLista(conhecimento);
                            setButtonsList([false,false,false,false,false,true,false,false,false]);
                            setDisplayOcultView(true)}}
                    >

                    <Text style={styles.textButtonTopico} >SET</Text>

                    </TouchableOpacity>
                    }
                    <Text style={styles.subTitulo} >Conhecimento</Text>

                </View>

                <FlatList

                    data={conhecimento}
                    keyExtractor={(item)=> item.nome }
                    renderItem={({ item, index }) =>
                        (<Text style={styles.textItem}>
                            {item.nome} : {item.nivel} -> {item.especialidade}
                        </Text>)}
                />

                <Text style={[styles.titulo, {marginTop: 20}]} >Vantagens:</Text>

                <View style={styles.topico}>

                    {acesso && <TouchableOpacity
                        style={styles.buttonTopico}
                        onPress={() => {
                            setLista(antecedentes);
                            setButtonsList([false,false,false,false,false,false,true,false,false]);
                            setDisplayOcultView(true)}}
                    >

                    <Text style={styles.textButtonTopico} >SET</Text>

                    </TouchableOpacity>
                    }
                    <Text style={styles.subTitulo} >Antecedentes</Text>

                </View>

                <FlatList

                data={antecedentes}
                keyExtractor={(item)=> item.nome }
                renderItem={({ item, index }) =>
                    (<Text style={styles.textItem}>
                        {item.nome} : {item.nivel}
                    </Text>)}
                />

                <View style={styles.topico}>

                    {acesso && <TouchableOpacity
                        style={styles.buttonTopico}
                        onPress={() => {
                            setLista(disciplinas);
                            setButtonsList([false,false,false,false,false,false,false,true,false]);
                            setDisplayOcultView(true)}}
                    >

                    <Text style={styles.textButtonTopico} >SET</Text>

                    </TouchableOpacity>
                    }
                    <Text style={styles.subTitulo} >Disciplinas</Text>

                </View>

                <FlatList

                data={disciplinas}
                keyExtractor={(item)=> item.nome }
                renderItem={({ item, index }) =>
                    (<Text style={styles.textItem}>
                        {item.nome} : {item.nivel}
                    </Text>)}
                />

                <View style={styles.topico}>

                    {acesso && <TouchableOpacity
                        style={styles.buttonTopico}
                        onPress={() => {
                            setLista(virtudes);
                            setButtonsList([false,false,false,false,false,false,false,false,true]);
                            setDisplayOcultView(true)}}
                    >

                    <Text style={styles.textButtonTopico} >SET</Text>

                    </TouchableOpacity>
                    }
                    <Text style={styles.subTitulo} >Virtudes</Text>

                </View>

                <FlatList

                data={virtudes}
                keyExtractor={(item)=> item.nome }
                renderItem={({ item, index }) =>
                    (<Text style={styles.textItem}>
                        {item.nome} : {item.nivel}
                    </Text>)}
                />

                <View style={[styles.topico, {borderTopWidth: 2}]}>

                    <View style={{width: '50%', borderRightWidth: 1}}>

                        <Text style={[styles.subTitulo, {fontSize: 20}]}>Vantagens</Text>

                        <TextInput
                            style={styles.inputVantagens}
                            multiline={true}
                            value={vantagens}
                            onChangeText={(text) => setVantagens(text)}/>

                    </View>

                    <View style={{width: '50%', borderLeftWidth: 1}}>

                        <Text style={[styles.subTitulo, {fontSize: 20}]}>Desvantagens</Text>

                        <TextInput
                            style={styles.inputVantagens}
                            multiline={true}
                            value={desvantagens}
                            onChangeText={(text) => setDesvantagens(text)}/>
                        
                    </View>

                    <TouchableOpacity
                        style={{backgroundColor: '#2666aa', position: 'absolute', top: 328, borderRadius: 3, borderWidth: 3, paddingHorizontal: 10}}
                        onPress={() => {
                            salvaVantagens(vantagens, desvantagens);
                            ToastAndroid.show('Vantagens e Desvantagens salvas.', ToastAndroid.LONG);
                            }
                        }
                    >

                        <Text style={[styles.textItem, {color: '#fff'}]} >Salvar</Text>

                    </TouchableOpacity>

                </View>

            </View>
            }
            
            {displayOcultView && !displayConfig && <View style={styles.ocultView} >

                <FlatList
                    data={lista}
                    keyExtractor={(item)=> item.nome }
                    style={{marginTop: 70, alignSelf: 'center'}}
                    renderItem={({ item, index }) =>
                        <AtributoFicha 
                            item={item}
                            index={index}
                            lista={lista}
                            setLista={setLista}
                            adicionarQuant={adicionarQuant}
                            subtrairQuant={subtrairQuant}
                            setRemoverAtributo={setRemoverAtributo}
                        />
                    }
                />

            </View>
            }
            
            {displayOcultView && !displayConfig && <View style={styles.ocultView} >

                <Text style={[styles.subTitulo, {marginTop: 50}]}>Especialidades</Text>

                <FlatList
                    data={lista}
                    keyExtractor={(item)=> item.nome }
                    style={{marginTop: 10, alignSelf: 'center'}}
                    renderItem={({ item, index }) =>
                        (<View style={styles.flatListEspecialidade}>

                            <Text style={[styles.textItem, {fontWeight: 'bold', fontSize: 18}]}>
                                {item.nome}:
                            </Text>

                            <TextInput
                                style={styles.inputEspecialidade}
                                placeholder={item.especialidade}
                                placeholderTextColor= 'gold'
                                onChangeText={(text) => setSpecial(text)}
                            />

                            <TouchableOpacity
                                style={styles.buttonEspecialidade}
                                onPress={() => setEspecialidade(index, special, lista, setLista, setSpecial)}
                            >

                                <Text style={styles.textItem} >OK</Text>

                            </TouchableOpacity>

                        </View>)
                    }
                />

                <Text style={[styles.subTitulo, {marginTop: 30}]}>Inserir Atributo</Text>

                <TextInput
                    style={[styles.inputEspecialidade, {backgroundColor: 'silver', alignSelf: 'center', width: 180}]}
                    placeholder= 'Nome do novo Atributo'
                    placeholderTextColor= 'red'
                    onChangeText={(text) => setNovoAtributo(text)}
                />

                <TouchableOpacity
                    style={styles.buttonNewOcultView}
                    onPress={() => {lista.push({nome: novoAtributo, especialidade: '', nivel: 0})}}
                >

                    <Text style={styles.textButtonSaveOcultView} >Criar novo Atributo</Text>

                </TouchableOpacity>

            </View>
            }

            {displayOcultView && !displayConfig && <TouchableOpacity
                    style={styles.buttonOcultView}
                    onPress={() => {
                                    setButtonsList([false,false,false,false,false,false,false,false,false]);
                                    setDisplayOcultView(false)}}
            >

                <Text style={styles.textButtonOcultView} >X</Text>

            </TouchableOpacity>
            }

            {displayOcultView && !displayConfig && <TouchableOpacity
                    style={[styles.buttonOcultView, {left: 260, backgroundColor: 'red'}]}
                    onPress={() => removerAtributo(lista, setLista)}
            >

                <Icons name='delete' size={30} color='silver'/>

            </TouchableOpacity>
            }

            {displayOcultView && !displayConfig && buttonsList[0] && <TouchableOpacity
                    style={styles.buttonSaveOcultView}
                    onPress={() => {
                                    salvaFisicos(lista);
                                    setFisicos(lista)
                                    }}
            >

                <Text style={styles.textButtonSaveOcultView} >Salvar Alterações</Text>

            </TouchableOpacity>
            }

            {displayOcultView && !displayConfig && buttonsList[1] && <TouchableOpacity
                    style={styles.buttonSaveOcultView}
                    onPress={() => {
                                    salvaSociais(lista);
                                    setSociais(lista)
                                    }}
            >

                <Text style={styles.textButtonSaveOcultView} >Salvar Alterações</Text>

            </TouchableOpacity>
            }

            {displayOcultView && !displayConfig && buttonsList[2] && <TouchableOpacity
                    style={styles.buttonSaveOcultView}
                    onPress={() => {
                                    salvaMentais(lista);
                                    setMentais(lista)
                                    }}
            >

                <Text style={styles.textButtonSaveOcultView} >Salvar Alterações</Text>

            </TouchableOpacity>
            }

            {displayOcultView && !displayConfig && buttonsList[3] && <TouchableOpacity
                    style={styles.buttonSaveOcultView}
                    onPress={() => {
                                    salvaTalentos(lista);
                                    setTalentos(lista)
                                    }}
            >

                <Text style={styles.textButtonSaveOcultView} >Salvar Alterações</Text>

            </TouchableOpacity>
            }

            {displayOcultView && !displayConfig && buttonsList[4] && <TouchableOpacity
                    style={styles.buttonSaveOcultView}
                    onPress={() => {
                                    salvaPericias(lista);
                                    setPericias(lista)
                                    }}
            >

                <Text style={styles.textButtonSaveOcultView} >Salvar Alterações</Text>

            </TouchableOpacity>
            }

            {displayOcultView && !displayConfig && buttonsList[5] && <TouchableOpacity
                    style={styles.buttonSaveOcultView}
                    onPress={() => {
                                    salvaConhecimento(lista);
                                    setConhecimento(lista)
                                    }}
            >

                <Text style={styles.textButtonSaveOcultView} >Salvar Alterações</Text>

            </TouchableOpacity>
            }

            {displayOcultView && !displayConfig && buttonsList[6] && <TouchableOpacity
                    style={styles.buttonSaveOcultView}
                    onPress={() => {
                                    salvaAntecedentes(lista);
                                    setAntecedentes(lista);
                                    }}
            >

                <Text style={styles.textButtonSaveOcultView} >Salvar Alterações</Text>

            </TouchableOpacity>
            }

            {displayOcultView && !displayConfig && buttonsList[7] && <TouchableOpacity
                    style={styles.buttonSaveOcultView}
                    onPress={() => {
                                    salvaDisciplinas(lista);
                                    setDiciplinas(lista)
                                    }}
            >

                <Text style={styles.textButtonSaveOcultView} >Salvar Alterações</Text>

            </TouchableOpacity>
            }

            {displayOcultView && !displayConfig && buttonsList[8] && <TouchableOpacity
                    style={styles.buttonSaveOcultView}
                    onPress={() => {
                                    salvaVirtudes(lista);
                                    setVirtudes(lista)
                                    }}
            >

                <Text style={styles.textButtonSaveOcultView} >Salvar Alterações</Text>

            </TouchableOpacity>
            }

            {displayConfig && <View style={styles.viewConfig}>

                {!acesso && <View>

                    <Text style={styles.subTitulo}>Pontuação Atual</Text>

                    <Text style={styles.subTitulo}>{pontos}</Text>

                    <Text style={{fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginTop: 50}}>Entrar com acesso de Mestre:</Text>

                    <TextInput
                        style={styles.inputConfig}
                        placeholder= 'Insira a senha'
                        placeholderTextColor= 'black'
                        keyboardType='numeric'
                        onChangeText={(text) => setSenha(text)}
                    />

                    <TouchableOpacity
                        style={[styles.buttonConfigView, {backgroundColor: '#14a', width: 90, left: 260, top: 185}]}
                        onPress={() => {
                                        if (senha == '1110111'){
                                            setAcesso(true);
                                        }
                                        setSenha('');
                        }}
                    >

                        <Text style={[styles.textItem, {color: '#fff', fontWeight: 'bold'}]}>Entrar</Text>

                    </TouchableOpacity>
                    
                </View>
                }

                {acesso && <View>
                    
                    <Text style={[styles.subTitulo, {marginTop: 7}]}>Acesso Mestre</Text>

                    <TouchableOpacity
                        style={[styles.buttonConfigView, {backgroundColor: '#f00'}]}
                        onPress={() => {salvaPontos(pontos);
                                        setDisplayOcultView(false);
                                        setAcesso(false)}}
                    >

                        <Text style={[styles.textItem, {color: '#fff', fontWeight: 'bold'}]}>Sair</Text>

                    </TouchableOpacity>

                    <TextInput
                        style={styles.inputConfig2}
                        placeholder= 'Insira a nova quantidade de Pontos'
                        placeholderTextColor= 'black'
                        keyboardType='numeric'
                        onChangeText={(text) => {
                                    if (verificaPontuacao(text) == true){
                                    
                                        ToastAndroid.show('Pontuação Inserida Inválida !', ToastAndroid.LONG);
                                        
                                    } else {

                                        setPontos(parseInt(text));

                                    }
                        }}
                    />

                    <Text style={[styles.subTitulo, {marginTop: 100}]}>Pontuação Atual</Text>

                    <Text style={styles.subTitulo}>{pontos}</Text>
                    
                </View>
                }

            </View>
            }

        </ScrollView>
        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        
    },

    header: {

        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        alignItems: 'center',
        backgroundColor: '#000',

    },

    buttonHeader: {

        width: 70,
        height: 35,
        borderRadius: 3,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'

    },

    pageName: {

        color: 'gold',
        fontWeight: 'bold',
        fontSize: 30,

    },

    conteudo: {

        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 5,
        width: '98%',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5

    },

    titulo: {

        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        borderTopWidth: 5,
        paddingTop: 10

    },

    topico: {

        marginTop: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: '100%',
        backgroundColor: 'silver'

    },

    buttonTopico: {

        backgroundColor: '#66f',
        borderWidth: 1,
        borderRadius: 3,
        position: 'relative',
        right: 10,
        height: '90%',
        width: 40,

    },

    textButtonTopico: {

        textAlign: 'center',
        position: 'relative',
        top: 5,
        fontSize: 18,

    },

    subTitulo: {

        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        

    },

    textItem: {

        fontSize: 20,
        alignSelf: 'center'

    },

    inputVantagens: {

        backgroundColor: '#fff',
        height: 300,
        textAlignVertical: "top",
        fontSize: 14,
        marginBottom: 34

    },

    ocultView: {

        width: '100%'

    },

    flatListEspecialidade: {

        flexDirection: 'row',
        backgroundColor: 'silver',
        paddingHorizontal: 10,
        marginBottom: 5,
        

    },

    inputEspecialidade: {

        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        width: 150,
        borderWidth: 2,
        marginVertical: 7,
        marginLeft: 5,
        textAlign: 'center',
        backgroundColor: '#33f',

    },

    buttonEspecialidade: {

        backgroundColor: 'green',
        borderRadius: 5,
        marginLeft: 10,
        alignSelf: 'center',
        height: 50,
        justifyContent: 'center',
        width: 50,

    },

    buttonOcultView: {

        backgroundColor: '#aaa',
        borderWidth: 5,
        height: 40,
        width: 40,
        borderRadius: 5,
        position: 'absolute',
        top: 65,
        left: 310,
        justifyContent: 'center'

    },

    textButtonOcultView: {

        color: '#f11',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'

    },

    buttonSaveOcultView: {

        backgroundColor: '#38f',
        borderWidth: 5,
        height: 40,
        width: 180,
        borderRadius: 5,
        position: 'absolute',
        top: 65,
        left: 30,
        justifyContent: 'center',
        

    },

    buttonNewOcultView: {

        backgroundColor: '#38f',
        borderWidth: 5,
        height: 40,
        width: 190,
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        

    },

    textButtonSaveOcultView: {

        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'

    },

    viewConfig: {

        height: '100%',
        width: '100%',

    },

    inputConfig: {

        borderWidth: 3,
        width: 150,
        height: 55,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 100

    },

    inputConfig2: {

        borderWidth: 3,
        width: 300,
        height: 55,
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center',
        marginTop: 40,
        alignSelf: 'center'

    },

    buttonConfigView: {

        borderWidth: 3,
        borderRadius: 3,
        width: 60,
        height: 35,
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        left: 290

    },

})