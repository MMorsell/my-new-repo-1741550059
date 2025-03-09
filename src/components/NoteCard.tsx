import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Note } from '../types/Note';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const navigation = useNavigation();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const getPreviewText = (content: string) => {
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EditNote', { note })}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title}
        </Text>
        <Text style={styles.preview} numberOfLines={3}>
          {getPreviewText(note.content)}
        </Text>
        <Text style={styles.date}>
          {formatDate(note.updatedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  content: {
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  preview: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
});