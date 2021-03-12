import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import { createAppContainer } from 'react-navigation';

import Main from './pages/main.js';
import Tela2 from './pages/tela2.js';
import Tela3 from './pages/tela3.js';
import Tela4 from './pages/tela4.js';
import Ficha from './pages/ficha';
import Historia from './pages/historia';

//import Routes from './routes';

//const App = () => <Routes/>;

const Aplicativo = createStackNavigator({
    Main: {screen: Main},
    Tela2: {screen: Tela2},
    Tela3: {screen: Tela3},
    Tela4: {screen: Tela4},
    Ficha: {screen: Ficha},
    Historia: {screen: Historia}
}, {
    defaultNavigationOptions: {
        header: null
    }
});

export default createAppContainer(Aplicativo);