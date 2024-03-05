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


const { width, height } = Dimensions.get('window');
const numColumns = 2;
export default function Home({ navigation }) {

    const [cartItem, setCartItem] = useState([]);
    const [localData, setLocalData] = useState([]);
   

    useEffect(() => {
        getAsncData();
    }, [])

    const getAsncData = async () => {
        const data = await AsyncStorage.getItem('FoodItems');
        setLocalData(JSON.parse(data))
    }

    const addCart = (item) => {
        const array = []
        array.push(item)
        setCartItem([...cartItem, ...array])
    }

    const navigateToCart = () => {
        if (cartItem.length > 1) {
            navigation.navigate('Cart', { cartItem: cartItem })
        } else {
            navigation.navigate('Cart', { cartItem: [] })
        }
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header backgroundColor={'#E37160'} />
            <View style={{ width: '100%', height: AdjustFontSize(60), backgroundColor: '#E37160', justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ width: '95%', height: AdjustFontSize(35), backgroundColor: '#fff', borderRadius: 40, alignSelf: 'center', }}>
                        <TextInput style={{ flex: 1, color: '#000', marginHorizontal: AdjustFontSize(20), }}
                            placeholder="Search"
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigateToCart()} style={{ flex: .2, justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', marginBottom: -5, color: '#fff' }}>{JSON.stringify(cartItem.length)}</Text>
                    <Image source={require('../Screens/assets/shopping_cart.png')} style={{ width: AdjustFontSize(27), height: AdjustFontSize(27), alignSelf: 'center', tintColor: '#fff' }} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, marginVertical: 10 }}>
                <FlatList
                    data={localData}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    numColumns={numColumns}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{ flex: .5, height: AdjustFontSize(150), marginHorizontal: 7, marginVertical: 10, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: .50, shadowRadius: 4, elevation: 5, }}>
                                <View style={{ width: '100%', height: AdjustFontSize(100), borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                    <Image source={{ uri: item.image }} resizeMode='cover' style={{ flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                                </View>
                                <View style={{ width: '100%', height: AdjustFontSize(50), flexDirection: 'row', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                    <View style={{ flex: 1, borderBottomLeftRadius: 10, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: AdjustFontSize(13), fontWeight: '500', color: '#000', marginHorizontal: 5 }}>{item.name}</Text>
                                        <Text style={{ fontSize: AdjustFontSize(12), marginHorizontal: 5, color: '#000', marginTop: 3 }}>{'Rs ' + item.price}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => addCart(item)} style={{ flex: .3, borderBottomRightRadius: 10, justifyContent: 'center' }}>
                                        <Image source={require('../Screens/assets/shopping_cart.png')} style={{ width: AdjustFontSize(20), height: AdjustFontSize(20), alignSelf: 'center', tintColor: '#E37160' }} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </SafeAreaProvider>
    )
}