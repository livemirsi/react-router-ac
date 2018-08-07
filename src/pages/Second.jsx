import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Header, Title, Menu, Content } from 'ui';
import MyFeatures from 'features/MyFeatures/MyFeatures';

const Second = () => (
	<Fragment>
		<Header>
			<Title>Second page</Title>
		</Header>
		<Menu>
			<Link to={'/'}>Main</Link>
			<Link to={'/second'}>Second</Link>
		</Menu>
		<Content>
			<MyFeatures />
		</Content>
	</Fragment>
);

export const SecondPage = Second;
