import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, Plus, Minus, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/useCartStore';

import axios from 'axios';

const CartPage = () => {
	const { cartItems, removeItem, clearCart, addItem, decrementItem } =
		useCartStore();
	const navigate = useNavigate();

	const handleCheckout = async () => {
		try {
			const cashfree = new window.Cashfree({
				mode: 'sandbox', // or "production"
			});

			const totalPrice = cartItems.reduce(
				(acc, item) => acc + item.qty * item.price,
				0,
			);

			const { data } = await axios.post('/api/payment/create-order', {
				orderPrice: totalPrice,
				customerId: 'USER_123', // Replace with actual user ID
				customerPhone: '9999999999',
				customerName: 'Test User',
				customerEmail: 'test@example.com',
			});

			let checkoutOptions = {
				paymentSessionId: data.payment_session_id,
				redirectTarget: '_modal',
			};

			cashfree.checkout(checkoutOptions).then((result) => {
				if (result.error) {
					// This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
					console.log(
						'User has closed the popup or there is some payment error, Check for Payment Status',
					);
					console.log(result.error);
				}
				if (result.redirect) {
					// This will be true when the payment redirection page couldnt be opened in the same window
					// This is an exceptional case only when the page is opened inside an inAppBrowser
					// In this case the customer will be redirected to return url once payment is completed
					console.log('Payment will be redirected');
				}
				if (result.paymentDetails) {
					// This will be called whenever the payment is completed irrespective of transaction status
					console.log('Payment has been completed, Check for Payment Status');
					console.log(result.paymentDetails.paymentMessage);

					// Navigate to success page with order details
					const orderId = data.order_id || 'ORDER_' + Date.now();
					const transactionId =
						result.paymentDetails.transactionId || 'TXN_' + Date.now();

					navigate(
						`/payment-success?orderId=${orderId}&amount=${totalPrice}&transactionId=${transactionId}`,
					);
				}
			});
		} catch (error) {
			console.error('Checkout failed:', error);
			alert('Checkout failed. Please try again.');
		}
	};

	const totalPrice = cartItems
		.reduce((acc, item) => acc + item.qty * item.price, 0)
		.toFixed(2);

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<Link
				to='/'
				className='inline-flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition-colors'
			>
				<ArrowLeft className='h-5 w-5 mr-2' />
				Back to Shopping
			</Link>
			<h1 className='text-3xl font-bold text-gray-900 mb-8'>Shopping Cart</h1>

			{cartItems.length === 0 ? (
				<div className='text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300'>
					<p className='text-xl text-gray-500 mb-6'>Your cart is empty</p>
					<Link
						to='/'
						className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm'
					>
						Start Shopping
						<ArrowRight className='ml-2 h-5 w-5' />
					</Link>
				</div>
			) : (
				<div className='lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start'>
					<div className='lg:col-span-7'>
						<ul className='divide-y divide-gray-200 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
							{cartItems.map((item) => (
								<li
									key={item._id}
									className='flex py-6 px-6'
								>
									<div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200'>
										<img
											src={item.image}
											alt={item.name}
											className='h-full w-full object-cover object-center'
										/>
									</div>

									<div className='ml-4 flex flex-1 flex-col'>
										<div>
											<div className='flex justify-between text-base font-medium text-gray-900'>
												<h3>
													<Link to={`/product/${item._id}`}>{item.name}</Link>
												</h3>
												<p className='ml-4'>
													₹{(item.price * item.qty).toFixed(2)}
												</p>
											</div>
										</div>
										<div className='flex flex-1 items-end justify-between text-sm'>
											<div className='flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-1 border border-gray-200'>
												<button
													onClick={() => decrementItem(item._id)}
													className='p-1 hover:bg-white hover:shadow-sm rounded transition-all disabled:opacity-50'
													type='button'
												>
													<Minus className='h-4 w-4 text-gray-600' />
												</button>
												<span className='font-medium text-gray-900 w-4 text-center'>
													{item.qty}
												</span>
												<button
													onClick={() => addItem(item)}
													className='p-1 hover:bg-white hover:shadow-sm rounded transition-all'
													type='button'
												>
													<Plus className='h-4 w-4 text-gray-600' />
												</button>
											</div>

											<div className='flex'>
												<button
													type='button'
													onClick={() => removeItem(item._id)}
													className='font-medium text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors'
												>
													<Trash2 className='h-4 w-4' />
													Remove
												</button>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>

					<div className='mt-16 rounded-2xl bg-gray-50 px-6 py-8 lg:col-span-5 lg:mt-0 lg:p-8 border border-gray-100'>
						<h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
						<div className='mt-6 space-y-4'>
							<div className='flex items-center justify-between border-t border-gray-200 pt-4'>
								<div className='text-base font-medium text-gray-900'>
									Order total
								</div>
								<div className='text-base font-medium text-gray-900'>
									₹{totalPrice}
								</div>
							</div>
						</div>
						<div className='mt-6'>
							<button
								type='button'
								onClick={handleCheckout}
								className='w-full flex items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-all'
							>
								Checkout
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
