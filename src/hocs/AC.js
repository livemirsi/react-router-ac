import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext('ac');

/*
1. First render, copy props of router, stage equal start
2. Changed history(key and path), stage equal end, render router and
pass stage equal 'end' for running animation
3. When all animations has finished, reset state and render router with prevProps
*/

const copyProps = props => ({
	...props,
	computedMatch: {
		...props.computedMatch,
		params: { ...props.computedMatch.params }
	},
	location: { ...props.location }
});

export const withProviderAC = WrapComponent => {

	return class WithProviderAC extends Component {

		static propTypes = {
			location: PropTypes.object,
			path:     PropTypes.string
		}

		state = {
			// variants: start, end
			stage:             'start',
			// counter for counting finished animations
			animationFinished: 0,
			// counter for registered components which have animation
			registered:        0,
			// for render old props when animation in process
			prevProps:         copyProps(this.props),
			// for detected changes histroy
			currentKey:        this.props.location.key,
			// for detected changes url page
			currentPath: 						this.props.path
		}

		// called for registering component
		register = () => {

			this.setState(({ registered }) => ({ registered: registered + 1 }));

		}

		// report about finishing animation, when all animation has finished will reset state
		report = () => {

			this.setState(({ registered, animationFinished }) => {

				const newFinished = animationFinished + 1;

				if (newFinished === registered) {

					return {
						stage:             'start',
						prevProps:         false,
						animationFinished: 0,
						registered:        0
					};

				}

				return { animationFinished: newFinished };

			});

		}

		static getDerivedStateFromProps(props, state) {

			// transition on new page, run animation
			if (state.currentKey !== props.location.key && state.currentPath !== props.path) {

				return {
					stage:       'end',
					currentKey:  props.location.key,
					currentPath: props.path
				};

			}

			// animation has finished,  save new props for rendering
			if (state.currentKey === props.location.key && !state.prevProps) {

				return { prevProps: copyProps(props) };

			}

			return null;

		}

		shouldComponentUpdate(nextProps, nextState) {

			// update component when has changed stage, run animation
			if (this.state.stage === 'start' && nextState.stage === 'end') {

				return true;

			}

			// update component when has changed stage, render new props
			if (this.state.stage === 'end' && nextState.stage === 'start') {

				return true;

			}

			return false;

		}

		render () {

			const { stage, prevProps } = this.state;
			const value = {
				stage,
				register: this.register,
				report:   this.report
			};

			return (
				<Provider value={value}>
					<WrapComponent {...prevProps}/>
				</Provider>
			);

		}

	};

};

const withRegisterAC = WrapComponent => {

	return class WithRegister extends Component {

		static propTypes = {
			register: PropTypes.func.isRequired,
			report:   PropTypes.func.isRequired,
			stage:    PropTypes.string.isRequired
		}

		passRefStyled = component => {

			this.refComponent = component;

		}

		handleEventEndAnimation = () => {

			const { report, stage } = this.props;

			if (report && stage === 'end') {

				report(stage);

			}

		}

		componentDidMount() {

			this.refComponent.addEventListener('animationend', this.handleEventEndAnimation);

			if (this.props.register) {

				this.props.register();

			}

		}

		componentWillUnmount() {

			this.refComponent.removeEventListener('animationend', this.handleEventEndAnimation);

		}

		render () {

			return (
				<WrapComponent {...this.props} innerRef={this.passRefStyled} />
			);

		}

	};

};

export const withConsumerAC = WrapComponent => {

	const WrapComponentEnhance = withRegisterAC(WrapComponent);

	return class WithConsumerAC extends Component {

		render () {

			return (
				<Consumer>
					{value => <WrapComponentEnhance {...value} {...this.props}/>}
				</Consumer>
			);

		}

	};

};
