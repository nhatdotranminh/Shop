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
        'Screen2':{
            title: 'Screen2',
            id:'Screen2'
        },
        'Detail':{
            title:'Detail',
            id:'Detail'
        },
        'Cart':{
            title:'Cart',
            id:'Cart'
        }
    }

    return componentMap[scene];
}
