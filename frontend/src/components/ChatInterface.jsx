import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Bot, User, RotateCcw, FileText, CheckCircle2 } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import ChatEnquiryForm from './ChatEnquiryForm';
import Button from './Button';
import Modal from './Modal';

/**
 * Complete Chat Interface Component
 * Can be rendered either as a full page (/chat) or embedded in the floating widget.
 * 
 * @param {Object} props
 * @param {boolean} [props.isWidget=false] - True if inside floating widget
 * @param {Function} [props.onCloseWidget] - Callback to close floating window
 */
export default function ChatInterface({ isWidget = false, onCloseWidget }) {
  const {
    messages,
    isTyping,
    enquiryOpen,
    setEnquiryOpen,
    enquiryPreselect,
    setEnquiryPreselect,
    sendMessage,
    resetConversation
  } = useChat();

  const [searchParams, setSearchParams] = useSearchParams();
  const [inputQuery, setInputQuery] = useState('');
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const urlQuery = searchParams.get('query');
  const urlInterest = searchParams.get('interest');
  const urlUserType = searchParams.get('userType');

  // Automatically trigger chatbot response and lead form when navigated with a query
  useEffect(() => {
    if (!isWidget && (urlQuery || urlInterest || urlUserType)) {
      if (urlInterest || urlUserType) {
        setEnquiryPreselect((prev) => ({
          ...prev,
          ...(urlUserType ? { userType: urlUserType } : {}),
          ...(urlInterest ? { interest: urlInterest } : {})
        }));
      }

      if (urlQuery) {
        sendMessage(urlQuery);
        setSearchParams({}, { replace: true });
      }
    }
  }, [urlQuery, urlInterest, urlUserType, isWidget]);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, enquiryOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    sendMessage(inputQuery);
    setInputQuery('');
  };

  const handleQuickReply = (questionText) => {
    sendMessage(questionText);
  };

  const confirmReset = () => {
    resetConversation();
    setResetModalOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isWidget ? '100%' : 'calc(100vh - 140px)',
        minHeight: isWidget ? 'auto' : '580px',
        backgroundColor: 'var(--bg-surface)',
        borderRadius: isWidget ? '0' : 'var(--radius-lg)',
        border: isWidget ? 'none' : '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
    >
      {/* Chat Top Header */}
      <div
        style={{
          padding: '0.85rem 1.25rem',
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div className="chat-avatar bot">
            <Bot size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                DroneTV AI Assistant
              </h3>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} title="Online" />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Commercial Drones & DGCA Training Support
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEnquiryOpen((prev) => !prev)}
            title="Open Enquiry Form"
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
          >
            <FileText size={14} />
            <span>{enquiryOpen ? 'Hide Form' : 'Enquire'}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setResetModalOpen(true)}
            title="Reset conversation history"
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
          >
            <RotateCcw size={14} />
            <span className="sr-only">Reset chat</span>
          </Button>

          {isWidget && onCloseWidget && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCloseWidget}
              ariaLabel="Close chat widget"
              style={{ padding: '0.35rem' }}
            >
              ✕
            </Button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="chat-messages-container">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <div key={msg.id} className={`chat-bubble-row ${isBot ? 'bot' : 'user'}`}>
              <div className={`chat-avatar ${isBot ? 'bot' : 'user'}`}>
                {isBot ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="chat-bubble-content">
                <div className={`chat-bubble ${isBot ? 'bot' : 'user'}`}>
                  {msg.text}
                </div>
                <span className="chat-timestamp">{time}</span>

                {/* Quick replies for bot messages if provided */}
                {isBot && msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="quick-replies-tray">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={`${msg.id}-reply-${idx}`}
                        type="button"
                        className="quick-reply-pill"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="chat-bubble-row bot">
            <div className="chat-avatar bot">
              <Bot size={16} />
            </div>
            <div className="chat-typing-indicator" aria-label="DroneTV Assistant is typing...">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}

        {/* In-chat Enquiry Lead Form Drawer */}
        <ChatEnquiryForm
          isOpen={enquiryOpen}
          onClose={() => setEnquiryOpen(false)}
          initialUserType={enquiryPreselect.userType}
          initialInterest={enquiryPreselect.interest}
          onSubmitted={(data) => {
            // Optional: push a confirmation message into conversation
          }}
        />

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleFormSubmit} className="chat-input-bar">
        <input
          type="text"
          className="chat-input-field"
          placeholder="Ask about DGCA licenses, crop spraying, or type your query..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          disabled={isTyping}
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!inputQuery.trim() || isTyping}
          ariaLabel="Send message"
          style={{ borderRadius: 'var(--radius-full)', padding: '0.65rem 1.15rem' }}
        >
          <Send size={16} />
        </Button>
      </form>

      {/* Confirmation Modal to Reset Conversation */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Clear Conversation History?"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setResetModalOpen(false)}>
              Keep History
            </Button>
            <Button variant="danger" size="sm" onClick={confirmReset}>
              Yes, Clear Chat
            </Button>
          </>
        }
      >
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          This will clear your ongoing conversation session and restore the initial greeting. Any submitted enquiry reference numbers will remain saved in our database.
        </p>
      </Modal>
    </div>
  );
}
