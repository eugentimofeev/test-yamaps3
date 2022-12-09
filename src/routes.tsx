import {HashRouter, Routes, Route, Navigate} from 'react-router-dom';

import {MapOutlet, DefaultOutlet} from './components/outlets';

import {
	Public,
	Sensors,
} from './pages';



const MainRoutes: React.FC = () => {
	return (
		<HashRouter>
			<Routes>
				{/* Роуты с картой */}
				<Route path='/' element={<MapOutlet/>}>
					<Route index element={<Public/>}/>
					<Route path='/publist' element={<Navigate to='/' replace/>}/>

					<Route path='/sensors' element={<Sensors/>}/>
				</Route>

				{/* Роуты без карты но с шапокой */}
				<Route path='/' element={<DefaultOutlet/>}>
					<Route path='404' element={<div>404</div>}/>
					<Route path='*' element={<Navigate to='/404' replace/>}/>
				</Route>
			</Routes>
		</HashRouter>
	);
};

export default MainRoutes;