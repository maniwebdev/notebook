import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  Image,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useState, useContext, useEffect, useCallback } from "react";
import NoteContext from "../../components/noteContext";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = ({navigation}) => {
  const { notes, getNotes, addNote, deleteNote } = useContext(NoteContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const handleAdd = () => {
    addNote(title, description);
    setTitle("");
    setDescription("");
    setModalVisible(!modalVisible);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable onPress={() => setModalVisible(true)}>
        <Ionicons
          style={{ textAlign: "right", paddingHorizontal: 10, marginTop: 10 }}
          name="add-circle"
          size={36}
          color="pink"
        />
      </Pressable>
      <View style={{ paddingVertical: 20 }}>
        {notes.length > 0 ? (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getNotes} />
            }
            renderItem={({ item }) => (
              <View
                style={{
                  paddingHorizontal: 15,
                  borderWidth: 1,
                  marginHorizontal: 15,
                  borderRadius: 10,
                  borderColor: "pink",
                  marginVertical: 5,
                }}
                
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingVertical: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Delete Note",
                        "Are you sure you want to delete this Note? 🤔 🤔 🤔",
                        [
                          {
                            text: "Yes",
                            onPress: () => {
                              deleteNote(item._id);
                            },
                          },
                          {
                            text: "Cancel",
                            onPress: () => null,
                            style: "cancel",
                          },
                        ]
                      );
                    }}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={30}
                      color="red"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.textSte}>
                      <FontAwesome
                        onPress={() => navigation.navigate("Notes", { item })}
                        style={{ paddingHorizontal: 5 }}
                        name="pencil-square-o"
                        size={30}
                        color="grey"
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    paddingVertical: 10,
                  }}
                >
                  {item.title}
                </Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "grey",
                    paddingHorizontal: 20,
                  }}
                ></View>
                <Text style={{ paddingVertical: 10 }}>{item.description}</Text>
              </View>
            )}
          />
        ) : (
          <View>
            <Text style={{ textAlign: "center", fontSize: 22, marginTop: 40 }}>
              No Notes
            </Text>
            <Text style={{ textAlign: "center", fontSize: 22 }}>
              Press + to add a note
            </Text>
            <Image
              style={{
                width: 300,
                height: 300,
                alignSelf: "center",
                marginTop: 30,
              }}
              source={require("../../assets/note.png")}
            />
          </View>
        )}
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{ width: "100%", flex: 1, justifyContent: "center" }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    style={{ paddingVertical: 10 }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Title"
                    value={title}
                    onChangeText={(newTitle) => setTitle(newTitle)}
                  />
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    style={{ paddingVertical: 10 }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline
                    numberOfLines={4}
                    placeholder="Description"
                    value={description}
                    onChangeText={(newDescription) =>
                      setDescription(newDescription)
                    }
                  />
                </View>
                <TouchableOpacity onPress={handleAdd}>
                  <Text
                    style={{
                      textAlign: "center",
                      backgroundColor: "pink",
                      paddingVertical: 10,
                      borderRadius: 10,
                    }}
                  >
                    Add note
                  </Text>
                </TouchableOpacity>
              </View>

              <Pressable
                style={{ marginTop: 10 }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: "pink",
                    borderRadius: 10,
                  }}
                >
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default HomeScreen;
