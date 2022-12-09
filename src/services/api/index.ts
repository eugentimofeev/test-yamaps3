/*TODO переписать типы*/

export interface IMark {
	id: string;
	coordinates: [number, number];
	name: string;
	hasRakurs: boolean;
	racurs: string;
};

interface IPublicMarksFromServer {
	id: string;
	name: string;
	lat: number;
	lon: number;
	img: string;
	src: string;
	audio: boolean;
	has_rakurs: string;
	rakurs: string;
	incident: false;
	nopreroll: boolean;
};

interface ISensorsMarksFromServer {
	id: string;
	lat: number;
	lon: number;
	temp: Object;
	humidity: Object;
};

type PublicMarksResponse = Record<string, IPublicMarksFromServer>
type SensorsMarksResponse = Record<string, ISensorsMarksFromServer>

const parseData = (data: PublicMarksResponse | SensorsMarksResponse): IMark[] => Object.values(data).map((value) => ({
	id: value.id, 
	coordinates: [value.lon, value.lat],
	name: value?.name ? value.name : '',
	hasRakurs: Boolean(Number(value.has_rakurs)),
	racurs: Number(value?.rakurs) ? `${value.rakurs}deg` : '',
}));

export const getPublicMarks = async (cityKey: string) => {
	const query = cityKey === 'ptz' ? '' : `&city=${cityKey}`;
	const response = await fetch(`https://moidom.karelia.pro/api/?mode=getPublicCams${query}`);

	if (!response.ok) throw new Error('Что-то пошло не так');
	
	const data: PublicMarksResponse = await response.json(); 
	const dataParsed = parseData(data);

	return dataParsed;
};

export const getSensorsMarks = async (cityKey: string) => {
	const query = cityKey === 'ptz' ? '' : `&city=${cityKey}`;
	const response = await fetch(`https://moidom.karelia.pro/razor_test/api.php?mode=list${query}`);

	if (!response.ok) throw new Error('Что-то пошло не так');

	const data: SensorsMarksResponse = await response.json();
	const dataParsed = parseData(data);

	return dataParsed;
};