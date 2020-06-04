import React, {Component} from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom";//manejo de rutas

import HeaderHome from './HeaderHome'
import Main from './Main'
import Login from './Login'
import Register from './Register'


class App extends Component {
	//declaramos el estado del usuario
	//este estado se utilizara en toda la aplicaciom

	constructor(){
		super()
		this.state = {
			user: null
		}

		this.handleOnSendData = this.handleOnSendData.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.handleOnRegisterData = this.handleOnRegisterData.bind(this)
	}


	//login
	handleOnSendData(event){

		event.preventDefault()

		const user = {
			email: event.target.email.value,
			password: event.target.password.value
		}

		fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Accept': 'application/json', 
				'Content-Type': 'application/json'
			}
		})
		//convertimos la respuesta en un objeto json
	    .then(res => res.json())

	    //mostramos la respuesta
	    .then(data => {
	    	console.log(data)
	    	//utilizamos M.toast de materialize para enviar un mensaje
	    	if (data.status) {
	    		M.toast({html: data.status})
	    	}
	    	//setiamos es estado con la data del servidor
	    	this.setState({user : data.user})
	    })
	    .catch(err => console.error(err))
	}

	//logout
	handleLogout(){

		this.setState({user : null})
		console.log('Logout')
		
	}

	//Registro de usuario
    handleOnRegisterData(event){
    	event.preventDefault()

    	console.log('registro')

    	const user = {
			email: event.target.email.value,
			password: event.target.password.value
		}

		fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Accept': 'application/json', 
				'Content-Type': 'application/json'
			}
		})
		//convertimos la respuesta en un objeto json
	    .then(res => res.json())

	    //mostramos la respuesta
	    .then(data => {
	    	console.log(data)
	    	//utilizamos M.toast de materialize para enviar un mensaje
	    	if (data.status) {
	    		M.toast({html: data.status})
	    	}
	    })
	    .catch(err => console.error(err))
    }

	//HashRouter: componente para las rutas
	//Match: para especificar la ruta de cada componente
	render () {
		return( //no se puede retornar dos componentes, para solucionarlo se retornan varios componentes en un div
			<Router>
				<div>
					<Route exact path="/" component={()=>{
						if(this.state.user){
							return(
								
								<Main 
									user={this.state.user} 
									onLogout = {this.handleLogout}
								/>
							)
						}else{
							return(
								 <Login 
									onSendData={this.handleOnSendData}
								  />
							)
						}
					}} />


					<Route path="/register" component={()=>{
						return(
							<Register
								onRegisterData = {this.handleOnRegisterData}
							/>
						)
					}} />
				</div>	
			</Router>
		)
	}
}

export default App //exportamos App para que lo pueda usar el index principal
