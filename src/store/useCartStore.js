import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useCartStore = create(
	persist(
		(set) => ({
			cartItems: [],
			addItem: (product) =>
				set((state) => {
					const existItem = state.cartItems.find((x) => x._id === product._id);
					if (existItem) {
						toast.success(`${product.name} quantity updated in cart!`);
						return {
							cartItems: state.cartItems.map((x) =>
								x._id === product._id ? { ...x, qty: x.qty + 1 } : x,
							),
						};
					} else {
						toast.success(`${product.name} added to cart!`);
						return { cartItems: [...state.cartItems, { ...product, qty: 1 }] };
					}
				}),
			decrementItem: (id) =>
				set((state) => {
					const item = state.cartItems.find((x) => x._id === id);
					if (item.qty === 1) {
						toast.success(`${item.name} removed from cart`);
						return {
							cartItems: state.cartItems.filter((x) => x._id !== id),
						};
					} else {
						toast.success(`${item.name} quantity updated!`);
						return {
							cartItems: state.cartItems.map((x) =>
								x._id === id ? { ...x, qty: x.qty - 1 } : x,
							),
						};
					}
				}),
			removeItem: (id) =>
				set((state) => {
					const item = state.cartItems.find((x) => x._id === id);
					if (item) {
						toast.success(`${item.name} removed from cart`);
					}
					return {
						cartItems: state.cartItems.filter((x) => x._id !== id),
					};
				}),
			clearCart: () => set({ cartItems: [] }),
		}),
		{
			name: 'cart-storage',
		},
	),
);

export default useCartStore;
