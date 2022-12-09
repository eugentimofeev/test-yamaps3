import { useEffect, useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { Feature, YMapClusterer } from '@yandex/ymaps3-types/packages/clusterer';
import { LngLat } from '@yandex/ymaps3-types';

import { IMark } from '../../../services/api';

import { providerStateAtom } from '../map';



interface IMarksProps {
	type: 'public' | 'sensors';
	data: IMark[]; 
	onMarkClick: (id: IMark['id']) => void; 
	activeMarkId?: string | null;
};

let yMarksMutable: YMapClusterer | null = null;

const Marks: React.FC<IMarksProps> = ({ data, type, onMarkClick, activeMarkId }) => {
	const YMapData = useAtomValue(providerStateAtom);

	const createMarks = useCallback(() => {
		if(!YMapData?.yMapMutable || !YMapData?.yMapModules || !data.length) return;

		const { yMapMutable } = YMapData;
		const { YMapClusterer, clusterByGrid, YMapMarker } = YMapData.yMapModules;

		const marker = (feature: Feature) => { 
			const content = document.createElement('div');
			const className = feature.id === activeMarkId ? `marker ${type} active` : `marker ${type}`;
			const hint = feature.properties?.hint ? `<div class="marker-hint">${feature.properties?.hint}</div>` : '';
			const racurs = feature.properties?.hasRacurs 
				? `<div class="marker-racurs" style="--marker-radius: ${feature.properties.racurs}"><span></span></div>` 
				: '';

			content.classList.add('marker-container');
			content.innerHTML = `
				<div class="${className}"></div>
				${racurs}
				${hint}
			`;
			content.addEventListener('click', () => onMarkClick(feature.id));

			return new YMapMarker({   
				source: 'my-source',
				coordinates: feature.geometry.coordinates,
				properties: feature.properties,
			}, content);
		};

		function circle(count: number) {
			const circle = document.createElement('div');
			circle.classList.add('cluster-container');
			circle.innerHTML = ` 
				<div class="cluster ${type}">
					<span>${count}</span>
				</div>
			`;

			return circle;  
		}

		const cluster = (coordinates: LngLat, features: Feature[]) => new YMapMarker({
			coordinates,
			source: 'my-source',
		}, circle(features.length));  

		const features: Feature[] = data.map(item => ({
			type: 'Feature',
			id: item.id,
			geometry: {coordinates: item.coordinates, type: 'Point'},
			properties: {
				hint: item.name,
				hasRacurs: item.hasRakurs,
				racurs: item.racurs,
			},
		}));

		yMarksMutable = new YMapClusterer({
			method: clusterByGrid({gridSize: 64}),
			features: features,
			marker,
			cluster,
		});

		yMapMutable.addChild(yMarksMutable); 
	}, [YMapData, data, type, onMarkClick, activeMarkId]);

	const destroyMarks = useCallback(() => {
		if(YMapData?.yMapMutable && yMarksMutable) YMapData.yMapMutable.removeChild(yMarksMutable);
	}, [YMapData]);

	useEffect(() => {
		createMarks();
		return destroyMarks;
	}, [createMarks, destroyMarks]);

	return null;
};

export default Marks;