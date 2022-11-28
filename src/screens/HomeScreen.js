import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'



const HomeScreen = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [notes, setNotes] = useState([])

    const saveNote = async () => {
        try {
            const note = {title, description}
            const notesCopy = [...notes]
            notesCopy.push(note)
            await AsyncStorage.setItem('NOTES', JSON.stringify(notesCopy))
            setNotes(notesCopy)
        } catch (e) {
            console.log(e)
        }
    }


  return (
    <View>
    <View>
    <Text>
    My NoteBook Is Awesome!
    </Text>
    </View>
    <View>
    <TextInput
     autoCapitalize='none'
        autoCorrect={false}
        placeholder='Note Title'
        value={title}
        onChangeText={(newTitle) => setTitle(newTitle)}
    />
    </View>
    <View>
    <TextInput
     autoCapitalize='none'
        autoCorrect={false}
        placeholder='Description'
        value={description}
        onChangeText={(newTitle) => setDescription(newTitle)}
    />
    </View>
    <View>
    <TouchableOpacity onPress={() => saveNote}>
    <Text>
    Submit
    </Text>
    </TouchableOpacity>
    </View>
    </View>
  )
}

export default HomeScreen