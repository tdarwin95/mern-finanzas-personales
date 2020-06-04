import React, {Component} from 'react'
import PropTypes from 'prop-types'



const propTypes = {
	user: PropTypes.object.isRequired
}

class Activity extends Component{

	constructor(props){
		super(props);

		this.state = {
			title : '',
			description: '',
			amount: '',
			type: '',
			category: '',
			currency: '',
			activities: [],
			_id: '',
			balance: 0,
			user: this.props.user,
			categories:[]

		};

		this.addActivity = this.addActivity.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.fetchActivities = this.fetchActivities.bind(this)
		this.fetchCategories = this.fetchCategories.bind(this)
	}

	/*AGREGA O EDITA UNA ACTIVIDAD SEGUN SEA EL CASO*/
	addActivity(){

		//Editar activida
		//comprobamos si el estado contiene un id, si lo tiene editamos el registro, si no guardamos el registro
		if (this.state._id) {

			fetch('/api/activity/'+this.state._id, {
				method: 'PUT',
				body: JSON.stringify(this.state),
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
		    	M.toast({html: data.status})
		    	//borramos el estado
		    	this.setState({title : '', description: '', amount: '', type: '', category: '', currency: '', _id: ''})
		    	//mostramos por pantalla los datos
		    	this.fetchActivities();
		    })
		    .catch(err => console.error(err))
			

		}else{
			//Agregar actividad
			//peticion post al servidor
			const activity = {
				title: this.state.title,
				description: this.state.description,
				amount: this.state.amount,
				type: this.state.type,
				category: this.state.category,
				currency: this.state.currency,
				userId: this.state.user._id
			}

			console.log(activity)

			fetch('/api/activity', {
				method: 'POST',
				body: JSON.stringify(activity),
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
		    	M.toast({html: data.status})
		    	//borramos el estado
		    	this.setState({title : '', description: '', amount: '', type: '', category: '', currency: ''})
		    	//mostramos por pantalla los datos
		    	this.fetchActivities();
		    })
		    .catch(err => console.error(err))

		}
	    //prevenir el conportamiento del formulario
		event.preventDefault()
	}

	/*LO PRIMERO QUE SE EJECUTA CUANDO ACTUALIZO LA APLICACIO*/
	componentDidMount(){
		console.log('componentDidMout')
		this.fetchActivities()
		this.fetchCategories()

		console.log(this.state.user)
	}

	/*OBTIENE TODAS LAS ACTIVIDADES*/
	fetchActivities(){
		console.log(this.state.user._id)
		fetch('/api/activities/'+this.state.user._id)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			this.setState({activities: data.activities})
			console.log(this.state.activities)

			var credito = 0
			var debito = 0

			this.state.activities.forEach(activities => {
				if (activities.type == 'credito') {
					credito = credito + activities.amount;
				}else{
					debito = debito + activities.amount;
				}
			})

			this.setState({balance: credito - debito})
		})
	}

	/*OBTIENE TODAS LAS categorias del usuario*/
	fetchCategories(){
		console.log(this.state.user._id)
		fetch('/api/categories/'+this.state.user._id)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			this.setState({categories: data.categories})
			console.log(this.state.categories)
		})
	}


	/*CAPTURA LOS CAMBIOS EN EL FORMULARIO Y SETEA EL ESTADO*/
	handleChange(e){
		//obtenemos del elemento el nombre y el valor
		//actualizamos el estado
		const {name, value} = e.target;

		//actualizamos el estado
		this.setState({
			[name]:value
		});

		console.log(this.state)
	}


	/*ELIMINA UNA ACTIVIDAD*/
	deleteActivity(id){
		if (confirm('Esta seguro que desea eliminar?')) {
			//peticion post al servidor
			fetch('/api/activity/'+id, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json', 
					'Content-Type': 'application/json'
				}
			})
			//convertimos la respuesta  en un objeto json
		    .then(res => res.json())

		    //mostramos la respuesta
		    .then(data => {
		    	console.log(data)
		    	//utilizamos M.toast de materialize para enviar un mensaje
		    	M.toast({html: data.status})
		    	//mostramos por pantalla los datos
		    	this.fetchActivities();
		    })
		    .catch(err => console.error(err))
		}

	}


	/*EDITA UNA ACTIVIDAD*/
	editActivity(id){
		console.log('editando'+ id)
		//obtenemos el dato del servidor

		fetch('/api/activity/'+id)
		.then(res=> res.json())
		.then(data=> {
			console.log(data)

			this.setState({
				title : data.activity.title, 
				description: data.activity.description, 
				amount: data.activity.amount, 
				type: data.activity.type, 
				category: data.activity.category, 
				currency: data.activity.currency,
				_id: data.activity._id
			})
		})
	}

	render(){
		return(
			<div>
				<div>
				<div className="container">
					<div className="row">
						
						<div className="col s5">
						<br/>
							<div className="card">
								<div className="card-content">

									<form action="" onSubmit={this.addActivity}>
										<div className="row">
										    <div className="input-field col s12">
										      <input 
										      		name="title" 
										      		onChange={this.handleChange} 
										      		type="text" 
										      		className="validate" 
										      		placeholder="titulo"
										      		value={this.state.title}/>
										    </div>
										    <div className="input-field col s12">
										      <input 
										      		name="description" 
										      		onChange={this.handleChange} 
										      		type="text" 
										      		className="validate" 
										       		placeholder="descriccion"
										      		value={this.state.description}/>
										    </div>
										    <div className="input-field col s12">
										      <input 
										      		name="amount" 
										      		onChange={this.handleChange} 
										      		type="number" 
										      		className="validate" 
										      		placeholder="Monto"
										      		value={this.state.amount}/>
										    </div>
										    <div>
										        
										        <label>
										            <input name="type" type="radio" value="credito" onChange={this.handleChange} checked  = {this.state.type=='credito' ? true : false}/>
										            <span>Credito</span>
										        </label>
										    	
										      	<label style={{marginLeft: '7px'}}>
											        <input name="type" type="radio" value="debito" onChange={this.handleChange} checked  = {this.state.type=='debito' ? true : false}/>
											        <span>Debito</span>
											    </label> 

										    </div>

											<br />
											<label >Categorias</label>
											 <select className="browser-default" name="category" value={this.state.category} onChange={this.handleChange}>
									            {
									            	this.state.categories.map(categories => {
									            		return(
									            			<option name="category" value={categories.name} key={categories._id}>{categories.name}</option>
									            		)
									            	})
									            }
									            
									          </select>

										    <div className="input-field col s12">
										      <input 
										      		name="currency"
										      		onChange={this.handleChange} 
										      		type="text" 
										      		className="validate" 
										      		placeholder="Moneda"
										      		value={this.state.currency}/>
										    </div>
										</div>

										<button type="submit" className="btn light-blue darken-4">Enviar</button>
									</form>
									
								</div>
							</div>
						</div>

						
						<div className="col s7">
						<br/>
						<div className="card" style={{padding: '20px'}}>
						
							<h1 style={{margin: '20px', fontSize: '20px', fontFamily:'Arial', fontWeight: 'bold'}}>Balance General: {this.state.balance} Dolares</h1>
						
						</div>
							<table>
								<thead>
									<tr>
										<th>Titulo</th>
										<th>Descriccion</th>
										<th>Monto</th>
										<th>Tipo</th>
										<th>Categoria</th>
										<th>Moneda</th>
										<th>Fecha</th>
									</tr>
								</thead>
								<tbody>
									{
										this.state.activities.map(activities => {
											return (

												<tr style={{background: activities.type=='credito' ? '#c8e6c9' : '#ffcdd2'}} key={activities._id} >
													<td>{activities.title}</td>
													<td>{activities.description}</td>
													<td>{activities.amount}</td>
													<td>{activities.type}</td>
													<td>{activities.category}</td>
													<td>{activities.currency}</td>
													<td>{activities.fecha}</td>
													<td>
														<button className="btn blue darken-2" onClick={() => this.editActivity(activities._id)}>
															<i className="material-icons">edit</i>
														</button>
													</td>

													<td>
														<button className="btn red darken-2" style={{margin: '4px'}} onClick={() => this.deleteActivity(activities._id)}>
															<i className="material-icons">delete</i>
														</button>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				</div>
			</div>
		)
	}
}

Activity.propTypes = propTypes

export default Activity;