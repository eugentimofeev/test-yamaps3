import {useAtom} from 'jotai';
import {useQuery} from 'react-query';

import {getPublicMarks} from '../../services/api';
import {currentCityAtom} from '../../store';
import MapRoutLayout from '../../components/mapRoutLayout';



const Public: React.FC = () => {
	const [currentCity] = useAtom(currentCityAtom);
	const { data, isLoading, error } = useQuery(['publicMarks', currentCity.key], () => getPublicMarks(currentCity.key), {
		staleTime: Infinity,
	});

	if(isLoading || error) return null;

	return(
		<MapRoutLayout
			markType='public'
			marks={data ?? []}
			renderItem={(activeMark, onCloseTablet) => (
				//camera item?
				<div className='tablet'>
					<span>Name: {activeMark.name}</span>
					<span>Id: {activeMark.id}</span>

					<button className='tablet-closer' onClick={onCloseTablet}>&#10006;</button>
				</div>
			)}
		/>
	);
};

export default Public;