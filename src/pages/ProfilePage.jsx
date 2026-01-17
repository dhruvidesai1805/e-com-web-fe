import { User, Mail, MapPin, Package, Settings, LogOut } from 'lucide-react';

const ProfilePage = () => {
	const user = {
		name: 'John Doe',
		email: 'john@example.com',
		location: 'New York, USA',
		joined: 'January 2024',
		orders: [
			{
				id: 'ORD_123',
				date: '2024-01-10',
				status: 'Delivered',
				total: 15000.0,
			},
			{
				id: 'ORD_456',
				date: '2024-01-05',
				status: 'Processing',
				total: 2999.99,
			},
		],
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<div className='lg:grid lg:grid-cols-12 lg:gap-x-12'>
				{/* Sidebar */}
				<aside className='lg:col-span-4'>
					<div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>
						<div className='bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-12 flex flex-col items-center text-center'>
							<div className='w-24 h-24 bg-white rounded-full flex items-center justify-center text-indigo-600 mb-4 shadow-lg ring-4 ring-white/20'>
								<User className='h-12 w-12' />
							</div>
							<h2 className='text-2xl font-bold text-white'>{user.name}</h2>
							<p className='text-indigo-100 opacity-90'>{user.email}</p>
						</div>

						<nav className='p-6 space-y-2'>
							<button className='w-full flex items-center space-x-3 px-4 py-3 text-indigo-600 bg-indigo-50 rounded-xl font-medium transition-colors'>
								<User className='h-5 w-5' />
								<span>Personal Information</span>
							</button>
							<button className='w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors'>
								<Package className='h-5 w-5' />
								<span>My Orders</span>
							</button>
							<button className='w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors'>
								<Settings className='h-5 w-5' />
								<span>Account Settings</span>
							</button>
							<div className='pt-4 mt-4 border-t border-gray-100'>
								<button className='w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors'>
									<LogOut className='h-5 w-5' />
									<span>Sign Out</span>
								</button>
							</div>
						</nav>
					</div>
				</aside>

				{/* Main Content */}
				<main className='lg:col-span-8 mt-8 lg:mt-0 space-y-8'>
					{/* User Info Card */}
					<div className='bg-white rounded-3xl shadow-sm border border-gray-100 p-8'>
						<h3 className='text-xl font-bold text-gray-900 mb-6'>
							Member Details
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl'>
								<div className='p-3 bg-white rounded-xl shadow-sm'>
									<Mail className='h-5 w-5 text-indigo-600' />
								</div>
								<div>
									<p className='text-xs text-gray-500 font-medium uppercase tracking-wider'>
										Email Address
									</p>
									<p className='text-gray-900 font-semibold'>{user.email}</p>
								</div>
							</div>
							<div className='flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl'>
								<div className='p-3 bg-white rounded-xl shadow-sm'>
									<MapPin className='h-5 w-5 text-indigo-600' />
								</div>
								<div>
									<p className='text-xs text-gray-500 font-medium uppercase tracking-wider'>
										Primary Location
									</p>
									<p className='text-gray-900 font-semibold'>{user.location}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Order History */}
					<div className='bg-white rounded-3xl shadow-sm border border-gray-100 p-8'>
						<div className='flex items-center justify-between mb-6'>
							<h3 className='text-xl font-bold text-gray-900'>Recent Orders</h3>
							<button className='text-indigo-600 font-semibold text-sm hover:underline'>
								View All
							</button>
						</div>
						<div className='overflow-x-auto overflow-hidden rounded-2xl border border-gray-100'>
							<table className='w-full text-left'>
								<thead className='bg-gray-50'>
									<tr>
										<th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>
											Order ID
										</th>
										<th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>
											Date
										</th>
										<th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>
											Status
										</th>
										<th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>
											Total
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-gray-100'>
									{user.orders.map((order) => (
										<tr
											key={order.id}
											className='hover:bg-gray-50 transition-colors'
										>
											<td className='px-6 py-4 text-sm font-semibold text-indigo-600 font-mono'>
												{order.id}
											</td>
											<td className='px-6 py-4 text-sm text-gray-600'>
												{order.date}
											</td>
											<td className='px-6 py-4'>
												<span
													className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered'
														? 'bg-green-100 text-green-800'
														: 'bg-blue-100 text-blue-800'
														}`}
												>
													{order.status}
												</span>
											</td>
											<td className='px-6 py-4 text-sm font-bold text-gray-900'>
												₹{order.total.toFixed(2)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default ProfilePage;
