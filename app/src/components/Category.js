import React, {Component} from 'react'
import PropTypes from 'prop-types'

const propTypes = {
	user: PropTypes.object.isRequired
}

class Category extends Component{

	constructor(props){
		super(props);

		this.state = {
			name: '',
			categories:[],
			_id: '',
			user: this.props.user
		};

		this.addCategory = this.addCategory.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.fetchCategories = this.fetchCategories.bind(this)
	}

	componentDidMount(){
		console.log('componente Category')
		console.log(this.state.user)
		this.fetchCategories()
	}

	/*AGREGA O EDITA UNA Categoria SEGUN SEA EL CASO*/
	addCategory(){

		//Editar
		if (this.state._id) {
			console.log(this.state._id)
			fetch('/api/category/'+this.state._id, {
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
		    	this.setState({name: '', _id: ''})
		    	//mostramos por pantalla los datos
		    	this.fetchCategories();
		    })
		    .catch(err => console.error(err))
			

		}else{
			//Agregar categoria
			//peticion post al servidor
			const category = {
				name: this.state.name,
				userId: this.state.user._id
			}

			fetch('/api/category', {
				method: 'POST',
				body: JSON.stringify(category),
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
		    	this.setState({name: ''})
		    	//mostramos por pantalla los datos
		    	this.fetchCategories();
		    })
		    .catch(err => console.error(err))

		}

		event.preventDefault()
	}

	/*OBTIENE TODAS LAS Categorias del usurio*/
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
		const {name, value} = e.target;

		//actualizamos el estado
		this.setState({
			[name]:value
		});

		console.log(this.state)
	}


	/*ELIMINA UNA Categoria*/
	deleteCategory(id){
		if (confirm('Esta seguro que desea eliminar?')) {
			//peticion post al servidor
			fetch('/api/category/'+id, {
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
		    	this.fetchCategories();
		    })
		    .catch(err => console.error(err))
		}

	}


	/*EDITA UNA Categoria*/
	editCategory(id){
		console.log('editando'+ id)
		//obtenemos el dato del servidor
		fetch('/api/category/'+id)
		.then(res=> res.json())
		.then(data=> {
			console.log(data)

			this.setState({
				name : data.category.name, 
				_id: data.category._id
			})
		})
	}

	render(){
		return(
			<div>
				<div className="container">
					<div className="row">
						
						<div className="col s5">
						<br/>
							<div className="card">
								<div className="card-content">

									<form action="" onSubmit={this.addCategory}>
										<div className="row">
										    <div className="input-field col s12">
										      <input 
										      		name="name" 
										      		onChange={this.handleChange} 
										      		type="text" 
										      		className="validate" 
										      		placeholder="Nombre"
										      		value={this.state.name}/>
										    </div>

										</div>

										<button type="submit" className="btn light-blue darken-4">Enviar</button>
									</form>
									
								</div>
							</div>
						</div>

						
						<div className="col s7">
						<br/>
							<table>
								<thead>
									<tr>
										<th>Nombre</th>
									</tr>
								</thead>
								<tbody>
									{
										this.state.categories.map(categories => {
											return (

												<tr key={categories._id} >
													<td>{categories.name}</td>
													<td>
														<button className="btn blue darken-2" onClick={() => this.editCategory(categories._id)}>
															<i className="material-icons">edit</i>
														</button>

														<button className="btn red darken-2" style={{margin: '4px'}} onClick={() => this.deleteCategory(categories._id)}>
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
		)
	}

}

Category.propTypes = propTypes

export default Category