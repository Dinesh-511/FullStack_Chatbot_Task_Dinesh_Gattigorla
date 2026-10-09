import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, X } from 'lucide-react';
import ChatInterface from './ChatInterface';

/**
 * Persistent Floating Chat Widget
 * Displays a glowing round floating trigger on non-chat pages,
 * opening a sleek floating popup window.
 */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // If user is already on the dedicated /chat page, do not show duplicate floating widget
  if (location.pathname === '/chat') {
    return null;
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        className="floating-chat-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat assistant' : 'Open DroneTV AI support assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
        {!isOpen && (
          <span className="chat-unread-badge" title="1 unread message">
            1
          </span>
        )}
      </button>

      {/* Floating Window Popup */}
      {isOpen && (
        <div className="floating-chat-window" role="dialog" aria-label="DroneTV Quick Assistant">
          <ChatInterface isWidget={true} onCloseWidget={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
