import React from 'react';

export default function NewCardForm(props) {
	const { toggleInputForm } = props;
	return (
		<div className='new-card-container' onClick={toggleInputForm}>
			<form className='new-card'>
				<div>
					<input type='text' placeholder='Title' />
					<select>
						<option value=''>Category</option>
						<option value='school'>School</option>
						<option value='work'>Work</option>
						<option value='personal'>Personal</option>
					</select>
					<input type='date' />
					<input type='time' />
					<input type='text' placeholder='location' />
					<input type='checkbox' />
				</div>
			</form>
		</div>
	);
}
