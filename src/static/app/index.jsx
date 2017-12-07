import {render} from 'react-dom';

import DoWhatever from './DoWhatever';

import '../sass/dowhatever.scss';

export function runProgram (config, params, user, elementId) {
	let component = null;

	switch(config.type){
		// tools
		case 'do-whatever':
			component = <DoWhatever config={config} params={params} user={user}/>;
		break;

		default:
			console.log(config);
			console.error('Please provide a valid config');
			return
		}

		// render the component
		if (component){
			render(component, document.getElementById(elementId));
		}
}

export {default as Doodler} from './components/Doodler';