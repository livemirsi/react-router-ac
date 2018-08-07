import styled, { keyframes } from 'styled-components';
import { withConsumerAC } from 'hocs/AC';

const animationStart = keyframes`
	from {
		width: 0%;
	}

	to {
		width: 100%;
	}
`;

const animationEnd = keyframes`
	from {
		width: 100%;
	}

	to {
		width: 0%;
	}
`;

const Menu = styled.div`
	animation: ${({ stage }) => stage === 'end' ? animationEnd : animationStart} 1s linear forwards;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	border-bottom: 1px solid #ccc;
	color: #494949;
	background-color: #f5f5f5;

	a {
		margin-left: 20px;
		color: black;
	}
`;

export default withConsumerAC(Menu);
