import React, { useState, useEffect } from 'react';
import Navbar from '../commonComponents/Navbar';
import { BASE_URL } from "../../utils/config/config"
import axios from 'axios';

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/users?page=${page}`);
            const { data } = response;
            setUsers(prevUsers => (page === 1 ? data.data : [...prevUsers, ...data.data]));
            setPage(data.page + 1);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='mx-auto max-w-6xl mt-2'>
                <h1 className="text-2xl font-bold mb-4">Users Table</h1>
                <table className="min-w-full bg-white border border-gray-300 text-center">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Avatar</th>
                            <th className="py-2 px-4 border-b">First Name</th>
                            <th className="py-2 px-4 border-b">Last Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border-b">{user.id}</td>
                                <td className="py-2 px-4 border-b flex items-center justify-center">
                                    <img
                                        src={user.avatar}
                                        alt={`Avatar for ${user.first_name} ${user.last_name}`}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b">{user.first_name}</td>
                                <td className="py-2 px-4 border-b">{user.last_name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    <button onClick={fetchData} className="bg-black hover:bg-black/80 text-white font-bold py-2 px-4 rounded">
                        Load More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage