import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Notes from './src/screens/Notes';
import NoteState from './components/NoteState';

const Stack = createNativeStackNavigator();

 function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Notes" component={Notes} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default () => {
  return (
    <NoteState>
      <App />
    </NoteState>
  );
};

