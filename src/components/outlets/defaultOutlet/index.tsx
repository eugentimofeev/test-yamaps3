import {Outlet} from 'react-router-dom';

import Header from '../../header';



const DefaultOutlet: React.FC = () => {
	return (
		<div className='main-container'>
			<Header/>

			<Outlet/>
		</div>
	);
};

export default DefaultOutlet;