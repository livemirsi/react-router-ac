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

const Content = styled.div`
	animation: ${({ stage }) => stage === 'end' ? animationEnd : animationStart} 1.5s linear forwards;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 40px - 100px);
	font-size: 28px;
	background-color: #f5f5f5;
	text-transform: uppercase;
	text-align: center;
`;

export default withConsumerAC(Content);
