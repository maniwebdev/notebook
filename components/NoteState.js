import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://192.168.1.178:3000";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // Get all notes
  const getNotes = async (id) => {
    const response = await fetch(`${host}/api/note/getallnotes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": await AsyncStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // add a note

  const addNote = async (title, description) => {
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": await AsyncStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
      const notes = {
        title,
        description,
      }
      console.log("This is notes",notes);
      setNotes((prev) => [...prev, notes]);
  };

  // update a note 

  const updateNotes = async (
    id,
    title,
    description,
  ) => {
    try {
      const response = await fetch(`${host}/api/note/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": await AsyncStorage.getItem("token"),
        },
        body: JSON.stringify({
          id,
          title,
          description,
        }),
      });
      const json = response.json();
      console.log(json);

      let newNotes = JSON.stringify(notes);
     
      for (let index = 0; index > newNotes.length; index++) {
        if (newNotes[index]._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          setNotes([...newNotes]);
          break;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete a note
  const deleteNote = async (id) => {
    // TODO API Call
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": await AsyncStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    console.log("deleting Note" + id);
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNotes);
  };


  return (
    <NoteContext.Provider value={{ notes, setNotes, getNotes, addNote, updateNotes, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
