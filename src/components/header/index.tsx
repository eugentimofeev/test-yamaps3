import {NavLink} from 'react-router-dom';
import {useAtom} from 'jotai';

import {cities} from '../../utils/config';
import {currentCityAtom} from '../../store';



const Header: React.FC = () => {
	const [currentCity, setCurrentCity] = useAtom(currentCityAtom);
	
	return(
		<header className='header'>
			<div className='header-container'>
				<nav className='header-nav'>
					<NavLink to='/'>public</NavLink>
					<NavLink to='sensors'>sensors</NavLink>
				</nav>

				<nav className='header-nav'>
					{cities.map(item => (
						<button 
							className={`${currentCity.key === item.key ? 'active' : ''}`}
							key={item.key} 
							onClick={() => setCurrentCity(item)}
						>
							{item.key}
						</button>
					))}
				</nav>
			</div>
		</header>
	);
};

export default Header;