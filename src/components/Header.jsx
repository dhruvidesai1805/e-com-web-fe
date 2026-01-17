import { Link } from 'react-router-dom';
import { ShoppingCart, Store, User } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const Header = () => {
	const { cartItems } = useCartStore();
	const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

	return (
		<header className='bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<Link
						to='/'
						className='flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition'
					>
						<Store className='h-8 w-8' />
						<span className='font-bold text-xl tracking-tight text-gray-900'>
							ShopMERN
						</span>
					</Link>

					<nav className='flex items-center space-x-6'>
						{/* Profile Badge */}
						<Link
							to='/profile'
							className='flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group'
						>
							<div className='w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-lg transition-all'>
								<User className='h-5 w-5' />
							</div>
							<div className='hidden sm:block'>
								<p className='text-sm font-semibold text-gray-900 text-left leading-tight'>
									John Doe
								</p>
								<p className='text-xs text-gray-500 text-left'>
									john@example.com
								</p>
							</div>
						</Link>

						<Link
							to='/cart'
							className='relative group'
						>
							<div className='p-2 rounded-full hover:bg-gray-100 transition duration-300'>
								<ShoppingCart className='h-6 w-6 text-gray-600 group-hover:text-indigo-600' />
								{itemCount > 0 && (
									<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full'>
										{itemCount}
									</span>
								)}
							</div>
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
