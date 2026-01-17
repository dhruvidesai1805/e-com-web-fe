import { useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const PaymentSuccessPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const clearCart = useCartStore((state) => state.clearCart);

	const orderId = searchParams.get('orderId') || 'N/A';
	const amount = searchParams.get('amount') || '0';
	const transactionId = searchParams.get('transactionId') || 'N/A';

	useEffect(() => {
		// Clear cart on successful payment
		clearCart();
	}, [clearCart]);

	return (
		<div className='min-h-screen bg-gradient-to-br from-green-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12'>
			<div className='max-w-2xl w-full'>
				{/* Success Card */}
				<div className='bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100'>
					{/* Header with gradient */}
					<div className='bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center'>
						<div className='flex justify-center mb-6'>
							<div className='relative'>
								<div className='absolute inset-0 bg-white/30 rounded-full animate-ping'></div>
								<CheckCircle
									className='h-24 w-24 text-white relative'
									strokeWidth={2}
								/>
							</div>
						</div>
						<h1 className='text-4xl font-bold text-white mb-3'>
							Payment Successful!
						</h1>
						<p className='text-green-50 text-lg'>Thank you for your purchase</p>
					</div>

					{/* Order Details */}
					<div className='px-8 py-10'>
						<div className='mb-8'>
							<h2 className='text-2xl font-semibold text-gray-900 mb-6 flex items-center'>
								<ShoppingBag className='h-6 w-6 mr-2 text-indigo-600' />
								Order Details
							</h2>

							<div className='space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-200'>
								<div className='flex justify-between items-center pb-4 border-b border-gray-200'>
									<span className='text-gray-600 font-medium'>Order ID</span>
									<span className='text-gray-900 font-semibold font-mono text-sm'>
										{orderId}
									</span>
								</div>

								<div className='flex justify-between items-center pb-4 border-b border-gray-200'>
									<span className='text-gray-600 font-medium'>
										Transaction ID
									</span>
									<span className='text-gray-900 font-semibold font-mono text-sm'>
										{transactionId}
									</span>
								</div>

								<div className='flex justify-between items-center pb-4 border-b border-gray-200'>
									<span className='text-gray-600 font-medium'>Amount Paid</span>
									<span className='text-2xl font-bold text-green-600'>
										₹{parseFloat(amount).toFixed(2)}
									</span>
								</div>

								<div className='flex justify-between items-center'>
									<span className='text-gray-600 font-medium'>
										Payment Status
									</span>
									<span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'>
										<CheckCircle className='h-4 w-4 mr-1' />
										Completed
									</span>
								</div>
							</div>
						</div>

						{/* Confirmation Message */}
						<div className='bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8'>
							<p className='text-blue-900 text-center'>
								<span className='font-semibold'>
									📧 Confirmation email sent!
								</span>
								<br />
								<span className='text-sm text-blue-700'>
									We've sent the order confirmation and receipt to your email
									address.
								</span>
							</p>
						</div>

						{/* Action Buttons */}
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<Link
								to='/'
								className='flex items-center justify-center px-6 py-4 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-200 group'
							>
								<Home className='h-5 w-5 mr-2 group-hover:scale-110 transition-transform' />
								Continue Shopping
							</Link>

							<button
								onClick={() => navigate('/')}
								className='flex items-center justify-center px-6 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg shadow-indigo-200 group'
							>
								<ShoppingBag className='h-5 w-5 mr-2 group-hover:scale-110 transition-transform' />
								Back to Home
							</button>
						</div>
					</div>
				</div>

				{/* Additional Info */}
				<div className='mt-8 text-center'>
					<p className='text-gray-500 text-sm'>
						Need help? Contact our{' '}
						<a
							href='#'
							className='text-indigo-600 hover:text-indigo-700 font-medium'
						>
							customer support
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default PaymentSuccessPage;
