import {atom} from 'jotai';

import {cities} from '../utils/config';



export const currentCityAtom = atom(cities?.[0] ?? null);