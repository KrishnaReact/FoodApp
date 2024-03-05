import * as React from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
    TextInput,
    Text,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
    LogBox,
    PixelRatio,
    PermissionsAndroid,
    BackHandler,
    FlatList,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
import AdjustFontSize from "./components/AdjustFontSize";
import VirtualizedScrollView from "./components/VirtualizedScrollView";


const { width, height } = Dimensions.get('window');

export default function PlaceOrder({ navigation }) {

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header backgroundColor={'#E37160'} />{console.log('222222')}
            <View style={{ width: '100%', height: AdjustFontSize(40), backgroundColor: '#E37160', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginHorizontal: AdjustFontSize(10), position: 'absolute', left: 0 }}>
                    <Image source={require('../Screens/assets/back.png')} style={{ width: AdjustFontSize(18), height: AdjustFontSize(18), alignSelf: 'center', tintColor: '#fff' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: AdjustFontSize(15), fontWeight: '500', alignSelf: 'center', color: '#fff' }}>{'Order Confirmation'}</Text>
            </View>
            <View style={{ flex: 1, }}>
                <Text style={{ fontSize: AdjustFontSize(20), fontWeight: '500', textAlign: 'center', color: '#E37160', marginTop: AdjustFontSize(40) }}>{'Thank You \n\nYour Order has been confirmed.'}</Text>
            </View>
        </SafeAreaProvider>
    )
}