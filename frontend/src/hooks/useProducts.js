import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api.js';

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const { data } = await api.get('/products');
                return data;
            } catch (error) {
                // Fallback to localStorage if backend not connected
                const storedProducts = localStorage.getItem('products');
                if (storedProducts) {
                    return JSON.parse(storedProducts);
                }
                // Default demo products
                const defaultProducts = [
                    { product_id: 1, product_name: 'PANTS', product_quantity: 10, product_unit_price: 200, is_still_offered: true },
                    { product_id: 2, product_name: 'T-SHIRT', product_quantity: 15, product_unit_price: 350, is_still_offered: true },
                    { product_id: 3, product_name: 'JEANS', product_quantity: 8, product_unit_price: 890, is_still_offered: true },
                    { product_id: 4, product_name: 'JACKET', product_quantity: 5, product_unit_price: 1250, is_still_offered: true },
                    { product_id: 5, product_name: 'SHORTS', product_quantity: 20, product_unit_price: 180, is_still_offered: true },
                ];
                return defaultProducts;
            }
        },
    });
};

export const useAddProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (productData) => {
            try {
                const { data } = await api.post('/products', productData);
                return data;
            } catch (error) {
                // Store in localStorage as fallback
                const storedProducts = localStorage.getItem('products');
                const products = storedProducts ? JSON.parse(storedProducts) : [];
                const newProduct = {
                    product_id: Date.now(),
                    ...productData,
                    is_still_offered: productData.is_still_offered ?? true
                };
                products.push(newProduct);
                localStorage.setItem('products', JSON.stringify(products));
                return { data: newProduct, message: "Product added successfully (offline)" };
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, updateData }) => {
            try {
                const { data } = await api.put(`/products/${productId}`, updateData);
                return data;
            } catch (error) {
                // Update in localStorage as fallback
                const storedProducts = localStorage.getItem('products');
                const products = storedProducts ? JSON.parse(storedProducts) : [];
                const index = products.findIndex(p => p.product_id === productId);
                if (index !== -1) {
                    products[index] = { ...products[index], ...updateData };
                    localStorage.setItem('products', JSON.stringify(products));
                }
                return { data: updateData, message: "Product updated successfully (offline)" };
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });
};