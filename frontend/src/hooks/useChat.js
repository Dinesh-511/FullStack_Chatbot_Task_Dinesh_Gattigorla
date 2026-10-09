import { useState, useEffect, useRef } from 'react';
import { getInitialMessages, matchUserQuery } from '../utils/chatbotEngine';

const STORAGE_KEY = 'dronetv_chat_session_v1';

/**
 * Custom Hook: useChat
 * Manages conversational state, message history synced with sessionStorage,
 * typing indicators, quick reply triggers, and enquiry flow handoffs.
 */
export function useChat() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback if sessionStorage is disabled or invalid
    }
    return getInitialMessages();
  });

  const [isTyping, setIsTyping] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPreselect, setEnquiryPreselect] = useState({
    userType: 'Customer',
    interest: 'Agricultural Spraying & Crop Health'
  });

  // Keep sessionStorage in sync
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Unable to persist chat history to sessionStorage', e);
    }
  }, [messages]);

  /**
   * Send a user query and trigger simulated bot response
   * 
   * @param {string} text - User message string
   */
  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Natural typing delay (450ms)
    setTimeout(() => {
      const botResult = matchUserQuery(trimmed);

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResult.text,
        timestamp: new Date().toISOString(),
        quickReplies: botResult.quickReplies,
        action: botResult.action
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      // If response triggers or offers an enquiry, update preselect and trigger flow
      if (botResult.action && (botResult.action.type === 'OPEN_ENQUIRY' || botResult.action.type === 'OFFER_ENQUIRY')) {
        if (botResult.action.preselect) {
          setEnquiryPreselect((prev) => ({
            ...prev,
            ...botResult.action.preselect
          }));
        }
        setEnquiryOpen(true);
      }
    }, 450);
  };

  /**
   * Reset conversation history with welcome message
   */
  const resetConversation = () => {
    const freshMessages = getInitialMessages();
    setMessages(freshMessages);
    setIsTyping(false);
    setEnquiryOpen(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // noop
    }
  };

  return {
    messages,
    isTyping,
    enquiryOpen,
    setEnquiryOpen,
    enquiryPreselect,
    setEnquiryPreselect,
    sendMessage,
    resetConversation
  };
}
