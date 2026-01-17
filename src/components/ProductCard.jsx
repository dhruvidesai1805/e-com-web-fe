import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const ProductCard = ({ product }) => {
	const addItem = useCartStore((state) => state.addItem);

	return (
		<Link
			to={`/product/${product._id}`}
			className='block h-full'
		>
			<div className='group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full'>
				<div className='relative aspect-video overflow-hidden bg-gray-200'>
					<img
						src={product.image}
						alt={product.name}
						className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
				</div>

				<div className='p-5 flex-1 flex flex-col'>
					<div className='flex-1'>
						<h3 className='text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors'>
							{product.name}
						</h3>
						<p className='text-gray-500 text-sm line-clamp-2 mb-4'>
							{product.description}
						</p>
					</div>

					<div className='flex items-center justify-between mt-4'>
						<span className='text-2xl font-bold text-gray-900'>
							₹{product.price}
						</span>
						<button
							onClick={(e) => {
								e.preventDefault();
								addItem(product);
							}}
							className='flex items-center justify-center p-3 rounded-xl bg-gray-50 text-gray-900 hover:bg-indigo-600 hover:text-white transition-all duration-300 group/btn'
						>
							<Plus className='h-5 w-5 group-hover/btn:rotate-90 transition-transform' />
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
