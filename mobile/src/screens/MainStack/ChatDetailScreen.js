import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../utils/colors';
import ChatMessage from '../../components/ChatMessage';
import * as api from '../../services/api';
import { openWhatsApp } from '../../utils/helpers';

const ChatDetailScreen = ({ route, navigation }) => {
  const { chatId } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, [chatId]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await api.fetchMessages(chatId);
      setMessages(data.data || data);
    } catch (error) {
      console.log('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      await api.sendMessage(chatId, inputMessage);
      setInputMessage('');
      await loadMessages();
    } catch (error) {
      Alert.alert('خطأ', 'فشل إرسال الرسالة');
    }
  };

  const handleOpenWhatsApp = () => {
    const whatsappUrl = openWhatsApp('201001234567', 'مرحباً، أريد الاستفسار عن المنتج');
    Linking.openURL(whatsappUrl).catch(() =>
      Alert.alert('خطأ', 'لم يتمكن من فتح WhatsApp')
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>المحادثة</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <ChatMessage message={item} isOwn={item.senderId === 'currentUserId'} />
        )}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="اكتب رسالة..."
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholderTextColor={COLORS.textLight}
          multiline
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenWhatsApp} style={styles.whatsappButton}>
          <MaterialIcons name="chat" size={24} color="#25D366" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: SPACING.lg,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    maxHeight: 100,
    fontSize: 14,
    color: COLORS.text,
  },
  sendButton: {
    marginLeft: SPACING.md,
    padding: SPACING.sm,
  },
  whatsappButton: {
    marginLeft: SPACING.sm,
    padding: SPACING.sm,
  },
});

export default ChatDetailScreen;