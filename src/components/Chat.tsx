import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { FaPaperPlane } from 'react-icons/fa';

interface SelectedUser {
  _id: string;
  name: string;
}

const Chat = ({ selectedUser }: { selectedUser: SelectedUser }) => {
  const [messages, setMessages] = useState<{ sender: string; receiver: string; message: string }[]>([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_NODE_API_URL, {
      withCredentials: true, transportOptions: {
        polling: {
          extraHeaders: {
            "Access-Control-Allow-Credentials": "true",
          },
        },
      },
    });

    socketRef.current = socket;

    socket.emit("previousMessages", selectedUser._id);

    socket.on('previousMessagesResponse', (data) => {
      setMessages(data);
      console.log(data);
    });

    socket.on('receiveMessage', (newMessage: { sender: string; receiver: string; message: string }) => {
      if (selectedUser._id === newMessage.sender || selectedUser._id === newMessage.receiver) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      setMessages([]);
      socket.off('previousMessagesResponse');
      socket.off('receiveMessage');
      socket.disconnect();
    };
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !socketRef.current || !selectedUser) return;

    socketRef.current.emit('sendMessage', { receiver: selectedUser._id, message });
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full p-4">
      {/* Show selected user */}
      <h2 className="text-lg font-semibold mb-2 capitalize">{selectedUser ? `Chat with ${selectedUser.name}` : "Select a user to start chatting"}</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.receiver === selectedUser?._id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg text-white ${msg.receiver === selectedUser?._id ? 'bg-purple-700' : 'bg-purple-500'}`}>
              <div className="text-sm font-semibold mb-1 capitalize">{msg.receiver === selectedUser?._id ? 'You' : selectedUser.name}</div>
              <div>{msg.message}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      {selectedUser && (
        <form onSubmit={sendMessage} className="p-4 flex">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full bg-purple-200 border border-purple-500 focus:outline-none"
          />
          <button type="submit" className="ml-2 p-3 bg-purple-600 rounded-full">
            <FaPaperPlane className="text-white" />
          </button>
        </form>
      )}
    </div>
  );
};

export default Chat;
