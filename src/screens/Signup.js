import { View, Text,Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

const Signup = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={{backgroundColor:"white", flex:1}}>
    <ScrollView>
    <StatusBar style='auto' />
    <View>
    <Text style={{textAlign:"center", fontSize:20, fontWeight:"bold", paddingVertical:20}}>My NoteBook</Text>
    <Image
    style={{width: 300, height: 300, resizeMode:"cover", display:"flex", alignSelf:"center", justifyContent:"center",}}
     source={require("../../assets/signup.png")}
    />
    </View>
    <View>
    <TextInput
    style={{borderWidth:1, borderColor:"black", marginHorizontal:20, padding:10, borderRadius:10, marginVertical:10}}
    autoCapitalize='none'
    autoCorrect={false}
    placeholder='Name'
    value={name}
    onChangeText={(newEmail) => setName(newEmail)}
    />
    </View>
    <View>
    <TextInput
    style={{borderWidth:1, borderColor:"black", marginHorizontal:20, padding:10, borderRadius:10, marginVertical:10}}
    autoCapitalize='none'
    autoCorrect={false}
    placeholder='Email'
    value={email}
    onChangeText={(newEmail) => setEmail(newEmail)}
    />
    </View>
    <View>
    <TextInput
    style={{borderWidth:1, borderColor:"black", marginHorizontal:20, padding:10, borderRadius:10, marginVertical:10}}
    autoCapitalize='none'
    autoCorrect={false}
    placeholder='Password'
    value={password}
    onChangeText={(newPassword) => setPassword(newPassword)}
    />
    </View>
    <View style={{paddingHorizontal:20}}>
    <TouchableOpacity>
    <Text style={{textAlign:"center", backgroundColor:"grey", paddingVertical:10, borderRadius:10, color:"white", fontWeight:"600"}}>Login</Text>
    </TouchableOpacity>
    </View>
    <View>
    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{display:"flex", justifyContent:"center", flexDirection:"row", paddingVertical:20}}>
    <Text style={{color:"grey"}}>
    Already have an account?
    </Text>
    <Text style={{color:"pink", paddingHorizontal:5}}>Login</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Signup