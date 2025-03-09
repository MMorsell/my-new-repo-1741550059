import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useNotes } from '../context/NoteContext';

export const EditNoteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addNote, updateNote, deleteNote } = useNotes();
  const note = route.params?.note;

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      navigation.goBack();
      return;
    }

    if (note) {
      await updateNote({
        ...note,
        title: title.trim(),
        content: content.trim(),
      });
    } else {
      await addNote({
        title: title.trim(),
        content: content.trim(),
      });
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (note) {
              await deleteNote(note.id);
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          {note && (
            <TouchableOpacity onPress={handleDelete} style={styles.headerButton}>
              <Ionicons name="trash-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
            <Ionicons name="checkmark" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, title, content]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          autoFocus={!note}
        />
        <TextInput
          style={styles.contentInput}
          placeholder="Start writing..."
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 16,
  },
  headerButton: {
    padding: 4,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '600',
    padding: 16,
    paddingBottom: 8,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
    paddingTop: 8,
    minHeight: 200,
  },
});