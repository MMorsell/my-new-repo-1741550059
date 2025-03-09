import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NoteProvider } from './src/context/NoteContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { EditNoteScreen } from './src/screens/EditNoteScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Notes',
            }}
          />
          <Stack.Screen
            name="EditNote"
            component={EditNoteScreen}
            options={{
              title: 'Edit Note',
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}