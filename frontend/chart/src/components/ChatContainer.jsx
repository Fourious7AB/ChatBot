import React, { useEffect } from 'react';
import ChatHeader from '../components/ChatHeader'
import MessageInput from './MessageInput';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import MessageSkeleton from './skeletons/MessageSkeleton';

function ChatContainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();


  useEffect(() => {
    if (selectedUser._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser._id, getMessages]);

  if (isMessagesLoading) {
    return( <div className='flex-1 flex flex-col overflow-auto'>
    <ChatHeader/>
    <MessageSkeleton/>
    <MessageInput/>
  </div>
  )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className={`chat ${msg.sender._id === authUser._id ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-bubble">
                {msg.text && <p>{msg.text}</p>}
                {msg.image && <img src={msg.image} alt="Message" className="w-32 h-32 object-cover rounded-lg mt-2" />}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-base-content/60">No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
