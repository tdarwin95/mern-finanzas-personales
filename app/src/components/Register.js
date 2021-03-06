import React from 'react'
import PropTypes from 'prop-types'

import HeaderHome from './HeaderHome'

const propTypes = {
	onRegisterData: PropTypes.func.isRequired,
}

function Register ({onRegisterData}) {
	
	return(
		<div>
		<HeaderHome />
		<br/>
		<div className="container">
		<div className="row">
		<div className="col s7">
			<div className="card" >
				<div className="card-content">
					<div className="row">
					<form onSubmit={onRegisterData}>
					    <div className="input-field col s12">
					      <input 
					      		name="email" 
					      		type="text" 
					      		className="validate" 
					      		placeholder="email" 
					      		/>
					    </div>
					    <div className="input-field col s12">
					      <input 
					      		name="password" 
					      		type="password" 
					      		className="validate" 
					       		placeholder="password" 
					       	    />
					    </div>

					    <button
					    	   className="btn light-blue darken-4"
					    	   type='submit'>Register</button>
					</form>
					</div>
				</div>
	        </div>
	        </div>	
	        </div>	
	        </div>		
		</div>
	)

}

Register.propTypes = propTypes

export default Register