import React from 'react';

export default function NewCardForm() {
	return (
		<form className='new-card'>
			<div>
				<input type='text' placeholder='Title' />
				<select>
					<option value='school'></option>
					<option value='work'></option>
					<option value='personal'></option>
				</select>
				<input type='date' />
				<input type='time' />
				<input type='text' placeholder='location' />
				<input type='checkbox' />
			</div>
		</form>
	);
}
