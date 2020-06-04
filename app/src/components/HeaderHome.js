import React from 'react'
import {Link} from "react-router-dom"

//componente sin estado o representacional 
//No importamos Component, pero si react porque estamos usando jsx
function HeaderHome() {
	return (
		//colocando clases a las etiquetas html
		<nav className="light-blue">
		    <div className="container">
		      <a href="#" className="brand-logo">Finanzas Personales</a>
		      <ul id="nav-mobile" className="right hide-on-med-and-down">
		        <li>
		        	<Link to='/'>
						<span>Login</span>
					</Link>
		        </li>

		        <li>
		        	<Link to='/register'>
						<span>Registrarse</span>
					</Link>
		        </li>
		        
			
		        <li><a href="#">Contactos</a></li>
		      </ul>
		    </div>
		</nav>
	)
}

export default HeaderHome