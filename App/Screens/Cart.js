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

export default function Cart({ navigation, route }) {

    //console.log('route......', route.params.cartItem)
    const [totalAmount, setTotalAmount] = useState('');
    const [subTotal, setSubTotal] = useState('');
    const [cartData, setCartData] = useState([]);
    const [click, setClick] = useState(false);

    useEffect(() => {
        if (route.params.cartItem.length > 1) {
            let data = route.params.cartItem.map(function (item) {
                return {
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: 1,
                }
            })
            setCartData(data)
            const arry = []
            route.params.cartItem.map((item, index) => {
                arry.push(parseInt(item.price))
            })
            let add = arry.reduce((a, b) => { return a + b })
            setSubTotal(add)
            //console.log('111111', add)
        }
    }, [])

    const getTotalAmount = () => {
        var sum = 0;
        cartData.forEach(item => sum += item.quantity * (item.price));
        return parseFloat(sum).toFixed(2);
        //console.log('amount>>>>>>>',sum)
    }

    const increaseItemCount = async (index, item) => {

        item.quantity = item.quantity + 1
        cartData[index] = item
        setClick(!click);

        // console.log('quantity.....', cartData);

    }

    const decreaseItemCount = async (index, item) => {
        if (item?.quantity > 1) {
            item.quantity = item.quantity - 1
            cartData[index] = item
            setClick(!click);

            //console.log('decquantity.....', cartData);
        }
    }

    const deleteItem=(item,index)=>{
          cartData.splice(index,1);
          setClick(!click);
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header backgroundColor={'#E37160'} />
            <View style={{ width: '100%', height: AdjustFontSize(40), backgroundColor: '#E37160', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginHorizontal: AdjustFontSize(10), position: 'absolute', left: 0 }}>
                    <Image source={require('../Screens/assets/back.png')} style={{ width: AdjustFontSize(18), height: AdjustFontSize(18), alignSelf: 'center', tintColor: '#fff' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: AdjustFontSize(15), fontWeight: '500', alignSelf: 'center', color: '#fff' }}>{'Cart'}</Text>
            </View>
            <VirtualizedScrollView>
                <View style={{ flex: 1, marginVertical: 10 }}>{console.log('11111')}
                    <FlatList style={{ flexGrow: 0, }}
                        data={cartData}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: '90%', height: AdjustFontSize(100), alignSelf: 'center', marginVertical: AdjustFontSize(10), backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: .50, shadowRadius: 4, elevation: 5, justifyContent: 'center' }}>
                                    <View style={{ width: '98%', height: AdjustFontSize(70), alignSelf: 'center', flexDirection: 'row' }}>
                                        <View style={{ flex: .5, borderRadius: 10 }}>
                                            <Image source={{ uri: item?.image }} resizeMode='cover' style={{ flex: 1, borderRadius: 10, marginHorizontal: 5 }} />
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <View style={{ width: '90%', alignSelf: 'center', marginTop: 4 }}>
                                                <Text style={{ fontSize: AdjustFontSize(14), fontWeight: '500', color: '#000' }}>{item?.name}</Text>
                                                <Text style={{ fontSize: AdjustFontSize(12), color: '#000', marginTop: 5 }}>{'Rs ' + item?.price}</Text>
                                            </View>
                                            <View style={{ width: '90%', height: AdjustFontSize(25), alignSelf: 'center', position: 'absolute', bottom: 0, flexDirection: 'row', }}>
                                                <View style={{ width: AdjustFontSize(70), height: AdjustFontSize(25), justifyContent: 'center' }}>
                                                    <View style={{ width: '95%', flexDirection: 'row', borderRadius: 0, borderWidth: .5, borderColor: 'rgba(0,0,0, 0.3)', height: AdjustFontSize(20), alignSelf: 'center', alignItems: 'center', }}>
                                                        <TouchableOpacity onPress={() => decreaseItemCount(index, item)} style={{ flex: 1, justifyContent: 'center', }}><Text adjustsFontSizeToFit={true} style={{ fontSize: AdjustFontSize(12), color: '#000', alignSelf: 'center', fontWeight: 'bold' }}>{'-'}</Text></TouchableOpacity>
                                                        <Text style={{ flex: 1, fontSize: AdjustFontSize(11), color: '#E37160', paddingHorizontal: 5, alignSelf: 'center', textAlign: 'center' }}>{item?.quantity}</Text>
                                                        <TouchableOpacity onPress={() => increaseItemCount(index, item)} style={{ flex: 1, justifyContent: 'center' }}><Text adjustsFontSizeToFit={true} style={{ fontSize: AdjustFontSize(12), color: '#000', alignSelf: 'center', fontWeight: 'bold' }}>{'+'}</Text></TouchableOpacity>
                                                    </View>
                                                </View>
                                                <TouchableOpacity onPress={()=>deleteItem(item,index)}  style={{ width: AdjustFontSize(50), height: AdjustFontSize(25), position: 'absolute', right: 0, justifyContent: 'center' }}>
                                                    <Image source={require('../Screens/assets/delete.png')} style={{ width: AdjustFontSize(18), height: AdjustFontSize(18), alignSelf: 'center', tintColor: '#E37160' }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                    {route.params.cartItem.length == 0 ? null :
                        <View style={{ width: '90%', marginTop: AdjustFontSize(30), borderWidth: .9, borderColor: '#E8E8E8', alignSelf: 'center', marginBottom: AdjustFontSize(20) }}>
                            <View style={{ width: '100%', height: AdjustFontSize(22), backgroundColor: '#E8E8E8', justifyContent: 'center' }}>
                                <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '600', color: '#000', alignSelf: 'center' }}>{'Cart totals'}</Text>
                            </View>
                            <View style={{ marginHorizontal: 5, }}>
                                <View style={{ width: '100%', height: AdjustFontSize(32), marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: .7, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: AdjustFontSize(11), fontWeight: '500', color: '#000', marginLeft: 5 }}>{'Subtotal'}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', }}>
                                            <Text style={{ fontSize: AdjustFontSize(11), fontWeight: '500', color: '#000', marginHorizontal: 5, }}>{'Rs ' + JSON.stringify(subTotal)}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#E8E8E8' }}></View>
                                </View>

                                <View style={{ width: '100%', height: AdjustFontSize(32), }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: .7, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: AdjustFontSize(11), fontWeight: '500', color: '#000', marginLeft: 5 }}>{'Total'}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', }}>
                                            <Text style={{ fontSize: AdjustFontSize(11), fontWeight: '500', color: '#000', marginHorizontal: 5, }}>{'Rs ' + getTotalAmount()}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#E8E8E8' }}></View>
                                </View>

                                <View style={{ width: '100%', justifyContent: 'center', }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('CartSummary', { CartData: cartData, TotalAmount: getTotalAmount() })}
                                        style={{ width: AdjustFontSize(120), height: AdjustFontSize(30), justifyContent: 'center', backgroundColor: '#E37160', alignSelf: 'flex-end', marginRight: 10, marginVertical: AdjustFontSize(15) }}>
                                        <Text style={{ fontSize: AdjustFontSize(10), fontWeight: '500', color: '#fff', alignSelf: 'center' }}>{'CHECKOUT'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                </View>
            </VirtualizedScrollView>
        </SafeAreaProvider>
    )
}