import { View, Text, Alert, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useContext } from "react";
import NoteContext from "../../components/noteContext";


const Notes = ({route, navigation}) => {
  const { updateNotes } = useContext(NoteContext);
  const { id } = route.params;
  const { item } = route.params;
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const handleUpdate = () => {
    updateNotes(id, title, description);

    Alert.alert(
      "Success!",
      "Note updated. Pull down ⬇️ to refresh details. 🤓🤓🤓",
      [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]
    );
    setTitle("");
    setDescription("");
    navigation.navigate("Home");
  };

  return (
    <View style={{flex:1, justifyContent:"center", backgroundColor:"white"}}>
      <View>
        <Text
          style={{
            fontSize: 14,
            marginTop: 5,
            fontWeight: "bold",
            color: "grey",
            paddingHorizontal: 15,
          }}
        >
          Title*
        </Text>
        <TextInput
        style={{borderWidth:1, borderColor:"grey", borderRadius:5, padding:10, marginHorizontal:15}}
          autoCapitalize="none"
          underlineColorAndroid={"transparent"}
          autoCorrect={false}
          maxLength={150}
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Enter Title"
        />
      </View>

      <View>
        <Text
          style={{
            fontSize: 14,
            marginTop: 5,
            fontWeight: "bold",
            color: "grey",
            paddingHorizontal: 15,
          }}
        >
          Description*
        </Text>
        <TextInput
        style={{borderWidth:1, borderColor:"grey", borderRadius:5, padding:10, marginHorizontal:15}}
          autoCapitalize="none"
          underlineColorAndroid={"transparent"}
          autoCorrect={false}
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Description"
        />
      </View>
      <TouchableOpacity onPress={handleUpdate}>
      <Text style={{backgroundColor:"grey", textAlign:"center", marginHorizontal:15, marginVertical:10, paddingVertical:10, borderRadius:10}}>
      Update Note
      </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notes;
