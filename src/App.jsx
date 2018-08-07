import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { injectGlobal } from 'styled-components';

import routes from 'routes';

injectGlobal`
	body {
		margin: 0;
		padding: 0;
		background-color: #fff;
		font-family: 'Arial', serif;
		color: #202121;
		font-size: 14px;
	}
`;

class App extends Component {

	render() {

		return (
			<BrowserRouter>
				{routes}
			</BrowserRouter>
		);

	}

}

export default hot(module)(App);
