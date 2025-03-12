import { useEffect, useState } from "react";
import axios from "axios";
import { get } from "http";

interface User {
  _id: string;
  name: string;
}

const UsersList = ({ getUser, searched, selectedUser }: { getUser: (user: User) => void; searched: string; selectedUser: User | null }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/api/users`, { withCredentials: true });
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const searchQuery = searched?.toString().toLowerCase() || "";

  // Filter users based on the searched string
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );


  return (
    <div className="flex-1 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user._id}
              className={`p-2 border border-purple-400 rounded-lg cursor-pointer capitalize 
                ${selectedUser?._id === user._id ? 'bg-purple-800 text-white' : 'bg-purple-300 hover:bg-purple-400'}`}
              onClick={() => getUser(user)}
            >
              {user.name}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No users found</p>
        )}
      </ul>
    </div>
  );
};

export default UsersList;
