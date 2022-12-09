import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from 'react-query';

import './assets/styles/global.css';
import Routes from './routes';



const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
		 	refetchOnWindowFocus: false,
			retry: 3,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
	
		<Routes/>

	</QueryClientProvider>,
);