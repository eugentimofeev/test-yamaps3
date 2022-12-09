import {useState, useCallback, useEffect} from 'react';

import { IMark } from '../../services/api';
import { YandexMapMarks } from '../yandexMap';



interface IMapRoutLayout {
	markType: 'public' | 'sensors';
	marks: IMark[];
	renderItem: (activeMark: IMark, onCloseItem: React.MouseEventHandler<HTMLButtonElement>) => JSX.Element;
};

const MapRoutLayout: React.FC<IMapRoutLayout> = ({ markType, marks, renderItem }) => {
	const [activeMarkId, setActiveMarkId] = useState<string | null>(null);
	const activeMark = marks.find(item => item.id === activeMarkId);

	const onMarkClick = useCallback((id: string) => {
		setActiveMarkId(id);
	}, []);

	const onCloseItem = () => {
		setActiveMarkId(null);
	};

	useEffect(() => {
		setActiveMarkId(null);
	}, [marks]);

	return(
		<div className='map-layout'>
			{activeMark && renderItem(activeMark, onCloseItem)}

			<YandexMapMarks
				type={markType}
				data={marks}
				onMarkClick={onMarkClick}
				activeMarkId={activeMarkId}
			/>
		</div>
	);
};

export default MapRoutLayout;