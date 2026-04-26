import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api.js';

export const useTransactions = () => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            try {
                const { data } = await api.get('/transactions');
                return data;
            } catch (error) {
                // Fallback to localStorage if backend not connected
                const storedTransactions = localStorage.getItem('transactions');
                if (storedTransactions) {
                    return JSON.parse(storedTransactions);
                }
                // Default demo transactions
                const defaultTransactions = [
                    { 
                        transaction_id: 1, 
                        product_name: "Wireless Earbuds", 
                        transaction_timestamp: "2026-04-05T10:30:00", 
                        payment_type: "Cash", 
                        payment_refstr: null,
                        total_revenue: 2500,
                        quantity: 2
                    },
                    { 
                        transaction_id: 2, 
                        product_name: "Gaming Mouse", 
                        transaction_timestamp: "2026-04-04T15:20:00", 
                        payment_type: "Gcash", 
                        payment_refstr: "GCASH-123456",
                        total_revenue: 1200,
                        quantity: 1
                    },
                ];
                return defaultTransactions;
            }
        },
    });
};

export const useAddTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (transactionData) => {
            try {
                const { data } = await api.post('/transactions', transactionData);
                return data;
            } catch (error) {
                // Store in localStorage as fallback
                const storedTransactions = localStorage.getItem('transactions');
                const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
                const newTransaction = {
                    transaction_id: Date.now(),
                    transaction_timestamp: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                    ...transactionData,
                };
                transactions.push(newTransaction);
                localStorage.setItem('transactions', JSON.stringify(transactions));
                return { data: newTransaction, message: "Transaction added successfully (offline)" };
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['transactions']);
        },
    });
};

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ transactionId, updateData }) => {
            try {
                const { data } = await api.put(`/transactions/${transactionId}`, updateData);
                return data;
            } catch (error) {
                // Update in localStorage as fallback
                const storedTransactions = localStorage.getItem('transactions');
                const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
                const index = transactions.findIndex(t => t.transaction_id === transactionId);
                if (index !== -1) {
                    transactions[index] = { ...transactions[index], ...updateData };
                    localStorage.setItem('transactions', JSON.stringify(transactions));
                }
                return { data: updateData, message: "Transaction updated successfully (offline)" };
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['transactions']);
        },
    });
};