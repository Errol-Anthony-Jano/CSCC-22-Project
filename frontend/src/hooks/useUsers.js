import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api.js';

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const { data } = await api.get('/users');
                return data;
            } catch (error) {
                // Fallback to localStorage
                const storedUsers = localStorage.getItem('users');
                if (storedUsers) {
                    return JSON.parse(storedUsers);
                }
                // Default demo users
                const defaultUsers = [
                    { id: 1, username: "admin", role: "admin", created_at: "2026-04-25T09:30:00" },
                    { id: 2, username: "john_doe", role: "user", created_at: "2026-04-25T14:45:00" },
                    { id: 3, username: "jane_smith", role: "user", created_at: "2026-04-24T11:20:00" },
                ];
                return defaultUsers;
            }
        },
    });
};

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userData) => {
            try {
                const { data } = await api.post('/users', userData);
                return data;
            } catch (error) {
                const storedUsers = localStorage.getItem('users');
                const users = storedUsers ? JSON.parse(storedUsers) : [];
                const newUser = {
                    id: Date.now(),
                    created_at: new Date().toISOString(),
                    ...userData,
                };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                return newUser;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
};

export const useRemoveUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId) => {
            try {
                const { data } = await api.delete(`/users/${userId}`);
                return data;
            } catch (error) {
                const storedUsers = localStorage.getItem('users');
                const users = storedUsers ? JSON.parse(storedUsers) : [];
                const filteredUsers = users.filter(u => u.id !== userId);
                localStorage.setItem('users', JSON.stringify(filteredUsers));
                return { success: true };
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
};