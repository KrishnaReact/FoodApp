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
    Modal,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
import AdjustFontSize from "./components/AdjustFontSize";


const { width, height } = Dimensions.get('window');

export default function AdminHome({ navigation }) {

    const [editItemModal, setEditItemModal] = useState(false);
    const [itemName, setItemName] = useState('')
    const [itemPrice, setItemPrice] = useState('')
    const [itemImageURL, setItemImageURL] = useState('')
    const [dataItem, setDataItem] = useState();
    const [itemIndex, setItemIndex] = useState();
    const [local_data, setLocal_Data] = useState([]);

    useEffect(() => {
        getAsncData();
    }, [])

    const getAsncData = async () => {
        const data = await AsyncStorage.getItem('FoodItems');
        setLocal_Data(JSON.parse(data))
    }

    const editItem = (item, index) => {
        setEditItemModal(true);
        //console.log('22222222',item)
        setItemName(item?.name);
        setItemPrice(item?.price);
        setItemImageURL(item?.image);
        setDataItem(item);
        setItemIndex(index);


    }

    const editItem_Modal = () => {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={editItemModal}
                onRequestClose={() => {
                    setEditItemModal(false);
                }}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '80%', backgroundColor: '#F6FAFE', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
                        <View style={{ width: '99%', marginTop: 10, }}>
                            <TouchableOpacity onPress={() => setEditItemModal(false)} style={{ alignSelf: 'flex-end', marginRight: 10 }}>
                                <Image source={require('../Screens/assets/close.png')} style={{ width: AdjustFontSize(16), height: AdjustFontSize(16), tintColor: '#E37160', }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '85%', alignSelf: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: AdjustFontSize(13), color: '#000' }}>{'Name'}</Text>
                            <View style={{ width: '100%', height: AdjustFontSize(30), borderWidth: .5, backgroundColor: '#fff', marginTop: 5, borderColor: 'gray' }}>
                                <TextInput style={{ flex: 1, marginHorizontal: 5, fontSize: AdjustFontSize(11), color: '#000' }}
                                    placeholder=''
                                    keyboardType='default'
                                    value={itemName}
                                    onChangeText={(text) => setItemName(text)}
                                />
                            </View>
                            <Text style={{ fontSize: AdjustFontSize(13), color: '#000', marginTop: 10 }}>{'Price'}</Text>
                            <View style={{ width: '100%', height: AdjustFontSize(30), borderWidth: .5, backgroundColor: '#fff', marginTop: 5, borderColor: 'gray' }}>
                                <TextInput style={{ flex: 1, marginHorizontal: 5, fontSize: AdjustFontSize(11), color: '#000' }}
                                    placeholder=''
                                    keyboardType='default'
                                    value={itemPrice}
                                    onChangeText={(text) => setItemPrice(text)}
                                />
                            </View>
                            <Text style={{ fontSize: AdjustFontSize(13), color: '#000', marginTop: 10 }}>{'Image URL'}</Text>
                            <View style={{ width: '100%', height: AdjustFontSize(30), borderWidth: .5, backgroundColor: '#fff', marginTop: 5, borderColor: 'gray' }}>
                                <TextInput style={{ flex: 1, marginHorizontal: 5, fontSize: AdjustFontSize(11), color: '#000' }}
                                    placeholder=''
                                    keyboardType='default'
                                    value={itemImageURL}
                                    onChangeText={(text) => setItemImageURL(text)}
                                />
                            </View>
                            <TouchableOpacity onPress={() => updateItem()} style={{ width: '100%', marginTop: 20 }}>
                                <Text style={{ fontSize: AdjustFontSize(13), alignSelf: 'center', color: '#3B8026' }}>{'Save'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const updateItem = async () => {
        dataItem.name = itemName;
        dataItem.price = itemPrice;
        dataItem.image = itemImageURL;
        local_data[itemIndex] = dataItem;
        setEditItemModal(false);
        await AsyncStorage.setItem('FoodItems', JSON.stringify(local_data));
        //console.log('aaaaaaaaa', local_data)
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header backgroundColor={'#E37160'} />
            <View style={{ width: '100%', height: AdjustFontSize(40), backgroundColor: '#E37160', justifyContent: 'center',flexDirection:'row',alignItems:'center' }}>
                <Text style={{ fontSize: AdjustFontSize(15), fontWeight: '500', alignSelf: 'center', color: '#fff' }}>{'Home'}</Text>
                <Text onPress={()=>navigation.goBack()} style={{fontSize:AdjustFontSize(12),fontWeight:'400',color:'#fff',position:'absolute',right:0,marginRight:15}}>{'Logout'}</Text>
            </View>
            <View style={{ flex: 1, marginVertical: 10 }}>{editItem_Modal()}
                <FlatList style={{ flexGrow: 0, }}
                    data={local_data}
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
                                            <Text style={{ fontSize: AdjustFontSize(12), color: '#000', marginTop: 10 }}>{'Rs ' + item?.price}</Text>
                                        </View>
                                        <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={() => editItem(item, index)}>
                                                <Image source={require('../Screens/assets/edit.png')} style={{ width: AdjustFontSize(18), height: AdjustFontSize(18), alignSelf: 'center', tintColor: '#E37160', position: 'absolute', right: 0 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </SafeAreaProvider>
    )
}