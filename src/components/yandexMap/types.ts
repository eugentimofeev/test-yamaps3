import { clusterByGrid, YMapClusterer } from '@yandex/ymaps3-types/packages/clusterer';
import { YMapZoomControl } from '@yandex/ymaps3-types/packages/controls';
import { YMapHint, YMapHintContext } from '@yandex/ymaps3-types/packages/hint';



export type YMapModules = typeof ymaps3 & {
	YMapClusterer: typeof YMapClusterer;
	clusterByGrid: typeof clusterByGrid;
	YMapZoomControl: typeof YMapZoomControl;
	YMapHint: typeof YMapHint;
	YMapHintContext: typeof YMapHintContext;
};
