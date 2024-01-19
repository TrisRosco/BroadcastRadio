import { useParams, useNavigate } from 'react-router';

/*
 * Higher-order-components to pass React Router v6 as props to a Component
 */

function withParams (Component) {
	return function (props) {
		return <Component {...props} params={ useParams() } />
	}
}

function withNavigate (Component) {
	return function (props) {
		return <Component {...props} navigate={ useNavigate() } />
	}
}

export { withParams, withNavigate }