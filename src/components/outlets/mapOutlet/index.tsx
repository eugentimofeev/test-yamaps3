import {useAtomValue} from 'jotai';
import {Outlet} from 'react-router-dom';

import Header from '../../header';
import YandexMap from '../../yandexMap';

import {currentCityAtom} from '../../../store';



const MapOutlet: React.FC = () => {
	const currentCity = useAtomValue(currentCityAtom);
	const mapCenter = {center: currentCity.center, zoom: currentCity.zoom};

	return (
		<div className='main-container'>
			<Header/>
			
			<YandexMap center={mapCenter}>
				<Outlet/>
			</YandexMap>
		</div>
	);
};

export default MapOutlet;