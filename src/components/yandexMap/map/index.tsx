import { useEffect, useRef, useCallback, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { YMap, YMapLocationRequest } from '@yandex/ymaps3-types';

import { YMapModules } from '../types';



interface IMapProps {
	center: YMapLocationRequest;
};

interface IMapContext {
	yMapMutable: YMap | null;
	yMapModules: YMapModules | null;
};

let isMapCreated = false;
let yMapMutable: IMapContext['yMapMutable'] = null;
let yMapModules: IMapContext['yMapModules'] = null;

export const providerStateAtom = atom<IMapContext | null>(null);

const Map: React.FC<React.PropsWithChildren<IMapProps>> = ({ center, children }) => {
	const [azimut, setAzimut] = useState<number>(0);
	const mapRootNode = useRef<HTMLDivElement>(null);
	const [, setProviderState] = useAtom(providerStateAtom);

	const createMap = useCallback(async (center: YMapLocationRequest) => {
		if(typeof ymaps3 === 'undefined' || !mapRootNode.current) return;
		await ymaps3.ready;

		const { YMapClusterer, clusterByGrid } = await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');
		const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
		const { YMapHint, YMapHintContext } = await ymaps3.import('@yandex/ymaps3-hint@0.0.1');
		const { 
			YMap,
			YMapDefaultSchemeLayer,
			YMapFeatureDataSource,
			YMapLayer,
			YMapControls,
			YMapListener,
		} = ymaps3;

		yMapModules = {
			...ymaps3,
			YMapClusterer,
			clusterByGrid,
			YMapZoomControl,
			YMapHint,
			YMapHintContext,
		};
		
		yMapMutable = new YMap(mapRootNode.current, {
			location: center,
			behaviors: ['drag', 'scrollZoom', 'mouseTilt', 'mouseRotate'],
		});

		yMapMutable.addChild(new YMapDefaultSchemeLayer({}))
			.addChild(new YMapFeatureDataSource({id: 'my-source'}))
			.addChild(new YMapLayer({source: 'my-source', type: 'markers', zIndex: 1800}))
			.addChild(new YMapControls({position: 'right'}).addChild(new YMapZoomControl({})))
			.addChild(new YMapListener({
				onUpdate: (value) => setAzimut(() => (value.camera.azimuth ?? 0) * 180 / Math.PI),
			}));

		isMapCreated = true;
		setProviderState({yMapMutable, yMapModules});
	}, [setProviderState]);

	const destroyMap = useCallback(() => {
		yMapMutable?.destroy();
		setProviderState(null);

		isMapCreated = false;
	}, [setProviderState]);

	const updateMap = (center: YMapLocationRequest) => {
		yMapMutable?.setLocation(center);
	};

	useEffect(() => {
		if(isMapCreated) updateMap(center);
		else createMap(center);
	}, [center, createMap]);

	useEffect(() => {
		return destroyMap;
	}, [destroyMap]);

	return(
		<div 
			ref={mapRootNode}
			className='yandex-map-root'
			style={{
				'--azimut': `${azimut}deg`,
			} as React.CSSProperties}
		>
			{children}
		</div>
	);
};

export default Map;