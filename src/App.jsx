import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import ProfilePage from './pages/ProfilePage';

function App() {
	return (
		<Router>
			<div className='min-h-screen bg-gray-50 font-sans antialiased text-gray-900'>
				<Header />
				<main>
					<Routes>
						<Route
							path='/'
							element={<HomePage />}
						/>
						<Route
							path='/product/:id'
							element={<ProductPage />}
						/>
						<Route
							path='/cart'
							element={<CartPage />}
						/>
						<Route
							path='/payment-success'
							element={<PaymentSuccessPage />}
						/>
						<Route
							path='/profile'
							element={<ProfilePage />}
						/>
					</Routes>
				</main>
				<Toaster
					position='top-center'
					toastOptions={{
						duration: 1000,
						style: {
							background: '#4F46E5',
							color: '#fff',
							fontWeight: '500',
						},
						success: {
							iconTheme: {
								primary: '#10B981',
								secondary: '#fff',
							},
						},
					}}
				/>
			</div>
		</Router>
	);
}

export default App;
