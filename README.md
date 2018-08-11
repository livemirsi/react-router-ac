# Example animated transitions for react router/styled-component/@keyframe
reactjs, react-router, styled-components

## Online demo
[go to demo online](https://react-router-ac.surge.sh/)

## Using provider
```js
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
```

## Using consumer for styled component
```js
import { withConsumerAC } from 'hocs/AC';
withConsumerAC(StyledComponent)
```

withConsumerAC provide props "stage" inside your component. Stage have varinats: 'start', 'end'.


'start' - when page is create


'end' - when page is destroy


```js
animation: ${({ stage }) => stage === 'end' ? animationEnd : animationStart} 0.5s linear forwards;
```

## Start project
yarn run dev
