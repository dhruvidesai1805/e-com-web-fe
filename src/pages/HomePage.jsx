import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const { data } = await axios.get('/api/products');
				setProducts(data);
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<div className='text-center mb-12'>
				<h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4'>
					Elevate Your Tech Experience
				</h1>
				<p className='text-xl text-gray-500 max-w-2xl mx-auto'>
					Discover cutting-edge technology and premium accessories. From gaming
					consoles to smart devices, find everything you need to stay connected
					and entertained.
				</p>
			</div>

			{loading ? (
				<div className='flex justify-center items-center h-64'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{Array.isArray(products) && products.length > 0 ? (
						products.map((product) => (
							<ProductCard
								key={product._id}
								product={product}
							/>
						))
					) : (
						<div className='col-span-full text-center text-gray-500 py-12'>
							No products found
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default HomePage;
