'use client';

import UsersList from '@/components/UsersList';
import Chat from '@/components/Chat';
import Search from '@/components/Search';
import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface User {
  _id: string;
  name: string;
}

const Home = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searched, setSearched] = useState("");

  return (
    <ProtectedRoute>
      <div className="w-full h-full overflow-hidden flex">
        {/* Left Sidebar - User List */}
        <div className="w-1/3 p-4 flex flex-col h-full no-scrollbar overflow-scroll">
          <Search getSearched={setSearched} />
          <UsersList getUser={setSelectedUser} searched={searched} selectedUser={selectedUser} />
        </div>

        {/* Right Side - Chat Box */}
        {selectedUser ? (<div className="w-2/3 flex flex-col">
          {selectedUser && <Chat selectedUser={selectedUser} />}
        </div>) : (
          <div className="w-2/3 flex items-center justify-center">
            <p className="text-purple-800">Select a user to start chatting</p>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
};

export default Home;
