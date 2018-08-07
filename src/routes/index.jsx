import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';

import { MainPage } from 'pages/Main';
import { SecondPage } from 'pages/Second';
import { withProviderAC } from 'hocs/AC';

const RouteEnhance = withProviderAC(Route);

const routes = (
	<Fragment>
		<Switch>
			<RouteEnhance exact path="/" render={props => <MainPage {...props}/>}/>
			<RouteEnhance path="/second" render={props => <SecondPage {...props}/>}/>
		</Switch>
	</Fragment>
);

export default routes;
