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
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
import AdjustFontSize from "./components/AdjustFontSize";


const { width, height } = Dimensions.get('window');

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const local_data = [
        {
            id: '1',
            name: 'Food1',
            image: 'https://www.cnet.com/a/img/resize/69256d2623afcbaa911f08edc45fb2d3f6a8e172/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=675&width=1200',
            price: '200',
        },
        {
            id: '2',
            name: 'Food2',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: '300',
        },
        {
            id: '3',
            name: 'Food3',
            image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: '400',
        },
        {
            id: '4',
            name: 'Food4',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2881&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: '500',
        },
        {
            id: '5',
            name: 'Food5',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: '600',
        },
        {
            id: '6',
            name: 'Food6',
            image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1547&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: '800',
        }
    ]


    useEffect(() => {
        setData();
    }, [])

    const setData = async () => {
        await AsyncStorage.setItem('FoodItems', JSON.stringify(local_data));
    }

    const loginFunction = () => {

        if (email == '') {
            Alert.alert('Please enter username')
        } else if (password == '') {
            Alert.alert('Please enter password')
        } else {
            if (email == 'user' && email == 'user') {
                navigation.navigate('Home')
                setEmail('');
                setPassword('');
            } else if (email == 'admin' && password == 'admin') {
                navigation.navigate('AdminHome')
                setEmail('');
                setPassword('');
            }
        }
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header backgroundColor={'#fff'} />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ width: '100%', height: AdjustFontSize(150), backgroundColor: '#fff', justifyContent: 'center' }}>
                            <View style={{ width: '90%', height: '70%', alignSelf: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                <Text style={{ fontSize: AdjustFontSize(20), fontWeight: '700', alignSelf: 'center', color: '#000' }}>{'FoodApp'}</Text>
                                {/* <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', alignSelf: 'center', marginTop: 10 }}>{'Login'}</Text> */}
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ width: '90%', alignSelf: 'center', marginVertical: 10 }}>

                                <View style={{ width: '90%', alignSelf: 'center', marginTop: AdjustFontSize(20) }}>
                                    <View style={{ width: '100%', height: AdjustFontSize(45), flexDirection: 'row', }}>
                                        <Image source={require('../Screens/assets/email.png')} style={{ width: AdjustFontSize(18), height: AdjustFontSize(18), alignSelf: 'center', marginLeft: 5, tintColor: '#E37160' }} />
                                        <TextInput style={{ flex: 1, marginHorizontal: 10, fontSize: AdjustFontSize(12), color: '#000', }}
                                            placeholder="User name*"
                                            keyboardType="email-address"
                                            autoCompleteType='email'
                                            value={email}
                                            onChangeText={(text) => setEmail(text)}
                                        />
                                    </View>
                                    <View style={{ width: '100%', height: .5, backgroundColor: 'gray' }}></View>
                                </View>
                                <View style={{ width: '90%', alignSelf: 'center', marginTop: AdjustFontSize(20) }}>
                                    <View style={{ width: '100%', height: AdjustFontSize(45), flexDirection: 'row', }}>
                                        <Image source={require('../Screens/assets/password.png')} style={{ width: AdjustFontSize(18), height: AdjustFontSize(18), alignSelf: 'center', marginLeft: 5, tintColor: '#E37160' }} />
                                        <TextInput style={{ flex: 1, marginHorizontal: 10, fontSize: AdjustFontSize(12), color: '#000', }}
                                            placeholder="Password*"
                                            keyboardType="default"
                                            secureTextEntry={true}
                                            value={password}
                                            onChangeText={(text) => setPassword(text)}
                                        />

                                    </View>
                                    <View style={{ width: '100%', height: .5, backgroundColor: 'gray' }}></View>
                                </View>

                                <TouchableOpacity onPress={() => loginFunction()} style={{ width: '100%', height: AdjustFontSize(35), backgroundColor: '#E37160', borderRadius: 40, alignSelf: 'center', marginTop: AdjustFontSize(30), justifyContent: 'center' }}>
                                    <Text style={{ color: '#fff', alignSelf: 'center', fontSize: AdjustFontSize(12) }}>{'Log In'}</Text>
                                </TouchableOpacity>
                                <View style={{ width: '90%', marginTop: AdjustFontSize(15), alignItems: 'center', flexDirection: 'row', alignSelf: 'center', }}>
                                    <Text style={{ fontSize: AdjustFontSize(11), fontWeight: '400', alignSelf: 'center', color: '#E37160' }}>{'Forget password ?'}</Text>
                                    <Text style={{ fontSize: AdjustFontSize(11), fontWeight: '400', color: '#E37160', position: 'absolute', right: 0 }}>{'Register'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    )
}