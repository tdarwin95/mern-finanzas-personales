import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route} from "react-router-dom";//manejo de rutas

import Header from './Header'
import Category from './Category'
import Reportes from './Reportes'
import Activity from './Activity'

const propTypes = {
	user: PropTypes.object.isRequired,
	onLogout: PropTypes.func.isRequired
}

class Main extends Component{

	constructor(props){
		super(props);

		this.state = {
			user: this.props.user
		};
	}

	render(){
		return(
			<Router>
			<div>

				<Header 
					onLogout={this.props.onLogout}
				/>
				
				<Route exact path="/" component={()=>{
					return(
						<Activity
							user={this.props.user} 
						/>
					)
				}} />

				<Route path="/category" component={()=>{
					return(
						<Category
							user={this.props.user} 
						/>
					)
				}} />

				<Route path="/reportes" component={()=>{
					return(
						<Reportes
							
						/>
					)
				}} />

			</div>
			</Router>
		)
	}
}

Main.propTypes = propTypes

export default Main;