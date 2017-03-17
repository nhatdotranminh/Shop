import React, { Platform } from 'react-native';
//import _ from 'underscore';

module.exports = function (scene) {
    var componentMap = {
        'Main': {
            title: 'Main',
            id: 'Main'
        },
        'LaptopProducts': {
            title: 'LaptopProducts',
            id: 'LaptopProducts'
        },
        'Login':{
            title: 'Login',
            id:'Login'
        },
        'Detail':{
            title:'Detail',
            id:'Detail'
        },
        'Cart':{
            title:'Cart',
            id:'Cart'
        },
        'Pay':{
            title:'Pay',
            id:'Pay'
        },
        'Resgister':{
            title:'Resgister',
            id:'Resgister'
        }
    }

    return componentMap[scene];
}
