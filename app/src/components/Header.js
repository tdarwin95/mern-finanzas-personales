import React from 'react'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'

const propTypes={
	onLogout: PropTypes.func.isRequired
}

//componente sin estado o representacional 
//No importamos Component, pero si react porque estamos usando jsx
function Header({onLogout}) {
	return (
		//colocando clases a las etiquetas html
		<nav className="light-blue">
		    <div className="container">
		      <a href="#" className="brand-logo">Finanzas Personales</a>
		      <ul id="nav-mobile" className="right hide-on-med-and-down">
		      	 <li>
		        	<Link to='/'>
						<span>Actividad</span>
					</Link>
		        </li>

		        <li>
		        	<Link to='/category'>
						<span>Categorias</span>
					</Link>
		        </li>

		        <li>
		        	<Link to='/reportes'>
						<span>Reportes</span>
					</Link>
		        </li>
		        <button 
		        		className="btn red darken-2" 
		        		style={{margin: '4px'}}
		        		onClick={onLogout}>
					Salir
				</button>
		      </ul>
		    </div>
		</nav>
	)
}

Header.propTypes = propTypes

export default Header