import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const ProductPage = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const addItem = useCartStore((state) => state.addItem);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const { data } = await axios.get(`/api/products/${id}`);
				setProduct(data);
			} catch (error) {
				console.error('Error fetching product:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (loading)
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
			</div>
		);
	if (!product)
		return <div className='text-center py-20 text-xl'>Product not found</div>;

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<Link
				to='/'
				className='inline-flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition-colors'
			>
				<ArrowLeft className='h-5 w-5 mr-2' />
				Back to Products
			</Link>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start'>
				{/* Left: Product Image */}
				<div className='sticky top-24'>
					<div className='aspect-square bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 p-12 flex items-center justify-center group'>
						<img
							src={product.image}
							alt={product.name}
							className='object-contain max-h-full max-w-full group-hover:scale-110 transition-transform duration-700 ease-out'
						/>
					</div>
				</div>

				{/* Right: Product Info */}
				<div className='flex flex-col space-y-8'>
					<div>
						<div className='flex items-center gap-3 mb-4'>
							<span className='px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-widest border border-indigo-100'>
								{product.brand}
							</span>
							<span className='px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-full uppercase tracking-widest border border-gray-100'>
								{product.category}
							</span>
						</div>
						<h1 className='text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-[1.1] tracking-tight'>
							{product.name}
						</h1>
						<div className='flex items-baseline gap-2'>
							<span className='text-4xl font-black text-indigo-600'>
								₹{product.price.toLocaleString()}
							</span>
							<span className='text-gray-400 text-sm font-medium line-through'>
								₹{(product.price * 1.2).toLocaleString()}
							</span>
						</div>
					</div>

					<div className='prose prose-indigo prose-lg text-gray-600'>
						<p className='leading-relaxed'>{product.description}</p>
					</div>

					{/* Key Features Section */}
					{product.features && product.features.length > 0 && (
						<div className='bg-white rounded-3xl p-8 border border-gray-100 shadow-sm'>
							<h3 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
								<div className='w-2 h-8 bg-indigo-600 rounded-full' />
								Key Features
							</h3>
							<ul className='grid grid-cols-1 gap-4'>
								{product.features.map((feature, index) => (
									<li
										key={index}
										className='flex items-start gap-3 group'
									>
										<div className='mt-1 bg-indigo-50 p-1 rounded-md group-hover:bg-indigo-600 transition-colors'>
											<Check className='h-4 w-4 text-indigo-600 group-hover:text-white transition-colors' />
										</div>
										<span className='text-gray-700 font-medium'>{feature}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					<div className='flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100'>
						<div
							className={`flex items-center gap-2 ${
								product.countInStock > 0 ? 'text-green-600' : 'text-red-600'
							}`}
						>
							<div
								className={`h-3 w-3 rounded-full animate-pulse ${
									product.countInStock > 0 ? 'bg-green-500' : 'bg-red-500'
								}`}
							/>
							<span className='font-bold uppercase tracking-wider text-sm'>
								{product.countInStock > 0
									? 'Available in Stock'
									: 'Currently Out of Stock'}
							</span>
						</div>
						{product.countInStock > 0 && (
							<span className='text-gray-400 text-sm font-medium'>
								{product.countInStock} items remaining
							</span>
						)}
					</div>

					<button
						onClick={() => addItem(product)}
						disabled={product.countInStock === 0}
						className='group relative w-full overflow-hidden bg-indigo-600 text-white px-8 py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]'
					>
						<ShoppingCart className='h-6 w-6 group-hover:animate-bounce' />
						<span className='text-lg font-bold uppercase tracking-wider'>
							Add to Shopping Bag
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
