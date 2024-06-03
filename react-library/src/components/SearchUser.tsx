// components/SearchUser.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    userId: number;
    email: string;
}

interface SearchUserProps {
    onUserSelected: (user: User | null) => void;
}

const SearchUser: React.FC<SearchUserProps> = ({ onUserSelected }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        if (searchTerm) {
            fetchUser();
        }
    }, [searchTerm]);

    const fetchUser = async () => {
        try {
            const response = await axios.get<User>(`http://localhost:8080/users/email/${searchTerm}`);
            const user = response.data;
            setSelectedUser(user);
            onUserSelected(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            setSelectedUser(null);
            onUserSelected(null);
        }
    };

    return (
        <div className="search-user">
            <h2>Search for a User</h2>
            <input className='search-input' type="email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            {searchTerm && !selectedUser && <p>User not found.</p>}
            {!searchTerm && <p>Enter the email address you want to search for.</p>}
            {selectedUser && <p>Selected user: {selectedUser.email}</p>}
        </div>
    );
};

export default SearchUser;
