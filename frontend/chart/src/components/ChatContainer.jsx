import React, { useEffect } from 'react'

function ChatContainer() {
  const {messages,getaMessages,isMessagesLoading,selectedUser}=useChatStore();

  useEffect(()=>{
    getaMessages(selectedUser._id)
  }),[(selectedUser._id,getaMessages)]

  if(isMessagesLoading) return <div>Loading.....</div>
  return (
     <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>messages....</p>
      <MessageInput/>
      </div>
  )
}

export default ChatContainer