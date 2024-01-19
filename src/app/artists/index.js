import React from 'react';
import { NavLink } from 'react-router-dom';

import api from '../api';

export default class Artists extends React.Component {
	state = {}

	async componentDidMount () {
		// load the artists from the backend
		const data = await api('/artists')

		this.setState({
			data
		})
	}

	render () {
		return (
			<div className="artists_container">
				<div className="artists_menu">
					<button onClick={ this.add }>
						Add
					</button>
				</div>

				{ this.renderList() }
			</div>
		)
	}

	add = () => {

	}

	renderList () {
		if (!this.state.data) {
			return null;
		}

		return (
			<table className="artists_list">
				<thead>
					<tr>
						<th>
							Artist
						</th>
						<th>
							Label
						</th>
						<th>
							Description
						</th>
					</tr>
				</thead>
				<tbody>
					{
						this.state.data.map(this.renderListItem)
					}
				</tbody>
			</table>
		)
	}

	renderListItem (item) {
		return (
			<tr>
				<td>
					<NavLink to={ "/artists/" + item.id }>
						{ item.name }
					</NavLink>
				</td>

				<td>
					{ item.label }
				</td>

				<td>
					{ item.description }
				</td>

			</tr>
		)
	}

}
