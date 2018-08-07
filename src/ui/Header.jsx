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

const Header = styled.div`
	animation: ${({ stage }) => stage === 'end' ? animationEnd : animationStart} 0.5s linear forwards;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100px;
	font-size: 28px;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.85);
	text-transform: uppercase;
	text-align: center;
`;

export default withConsumerAC(Header);
