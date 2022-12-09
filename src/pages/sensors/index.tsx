import {useAtom} from 'jotai';
import {useQuery} from 'react-query';

import {getSensorsMarks} from '../../services/api';
import {currentCityAtom} from '../../store';
import MapRoutLayout from '../../components/mapRoutLayout';



const Sensors: React.FC = () => {
	const [currentCity] = useAtom(currentCityAtom);
	const { data, isLoading, error } = useQuery(['sensorsMarks', currentCity.key], () => getSensorsMarks(currentCity.key), {
		staleTime: Infinity,
	});

	if(isLoading || error) return null;

	return(
		<MapRoutLayout
			markType='sensors'
			marks={data ?? []}
			renderItem={(activeMark, onCloseTablet) => (
				<div className='tablet'>
					<span>Name: нейма нет, но есть ид - {activeMark.id}</span>

					<button className='tablet-closer' onClick={onCloseTablet}>&#10006;</button>
				</div>
			)}
		/>
	);
};

export default Sensors;