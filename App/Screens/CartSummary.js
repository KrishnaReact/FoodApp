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

export default function CartSummary({ navigation, route }) {

    //console.log('route......', route.params)

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <Header backgroundColor={'#E37160'} />
            <View style={{ width: '100%', height: AdjustFontSize(40), backgroundColor: '#E37160', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginHorizontal: AdjustFontSize(10), position: 'absolute', left: 0 }}>
                    <Image source={require('../Screens/assets/back.png')} style={{ width: AdjustFontSize(18), height: AdjustFontSize(18), alignSelf: 'center', tintColor: '#fff' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: AdjustFontSize(15), fontWeight: '500', alignSelf: 'center', color: '#fff' }}>{'Order Summary'}</Text>
            </View>
            <VirtualizedScrollView>
                <View style={{ flex: 1, marginBottom: AdjustFontSize(70) }}>
                    <View style={{ width: '100%', minHeight: AdjustFontSize(100), backgroundColor: '#fff', marginBottom: AdjustFontSize(10) }}>
                        <View style={{ marginVertical: AdjustFontSize(10), marginHorizontal: AdjustFontSize(15) }}>
                            <Text style={{ fontSize: AdjustFontSize(14), fontWeight: 'bold', color: '#000' }}>{'Deliver to:'}</Text>
                            <Text style={{ fontSize: AdjustFontSize(13), fontWeight: '500', color: '#000', marginTop: AdjustFontSize(10) }}>{'Ravi Teja'}</Text>
                            <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '400', color: '#000', marginTop: AdjustFontSize(10) }}>{'Bh-201 first floor preet vihar Delhi,101101'}</Text>
                            <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '400', color: '#000', marginTop: AdjustFontSize(10) }}>{'9999999999'}</Text>
                        </View>
                    </View>
                    <FlatList style={{ flexGrow: 0, }}
                        data={route.params.CartData}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: '100%', height: AdjustFontSize(100), alignSelf: 'center', marginVertical: AdjustFontSize(10), backgroundColor: '#fff', justifyContent: 'center' }}>
                                    <View style={{ width: '98%', height: AdjustFontSize(70), alignSelf: 'center', flexDirection: 'row' }}>
                                        <View style={{ flex: .6, borderRadius: 10 }}>
                                            <Image source={{ uri: item?.image }} resizeMode='cover' style={{ flex: 1, borderRadius: 10, marginHorizontal: 5 }} />
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <View style={{ width: '90%', alignSelf: 'center', marginTop: 4 }}>
                                                <Text style={{ fontSize: AdjustFontSize(14), fontWeight: '500', color: '#000' }}>{item?.name}</Text>
                                                <Text style={{ fontSize: AdjustFontSize(12), color: '#000', marginTop: 5 }}>{'Rs ' + (item?.price * item?.quantity)}</Text>
                                            </View>
                                            <View style={{ width: '90%', alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 5 }}>
                                                <Text style={{ fontSize: AdjustFontSize(12), color: '#000' }}>{`Quantity: ${item?.quantity}`}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </VirtualizedScrollView>
            <View style={{ position: 'absolute', bottom: 0, width: '100%', height: AdjustFontSize(70), backgroundColor: '#fff' }}>
                <View style={{ width: '100%', height: AdjustFontSize(40), flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontSize: AdjustFontSize(13), fontWeight: '400', color: '#000', marginLeft: AdjustFontSize(10) }}>{route.params.TotalAmount}</Text>
                        <Text style={{ fontSize: AdjustFontSize(9), color: '#E37160', marginLeft: AdjustFontSize(10) }}>{'View price details'}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('PlaceOrder')}
                            style={{ width: AdjustFontSize(100), height: AdjustFontSize(30), justifyContent: 'center', backgroundColor: '#E37160', alignSelf: 'flex-end', marginRight: 10, borderRadius: 4 }}>
                            <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '500', color: '#fff', alignSelf: 'center' }}>{'Place Order'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaProvider>
    )
}