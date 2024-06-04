import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { ImPencil } from 'react-icons/im';
import './styles/newCategoryModal.css';

export default function CategoryElement(props) {
	// Deconstructing props
	const { id, category, colour, deleteCategory } = props;

	// States that track updated values for category
	const [updatedCategory, setupdatedCategory] = useState(category);
	const [updatedColour, setUpdatedColour] = useState(colour);

	return (
		<div className='category-element'>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<input
					type='color'
					value={updatedColour}
					onChange={(e) => setUpdatedColour(e.target.value)}
				/>
				<p>{updatedCategory}</p>
			</div>
			<div>
				<ImPencil id='category-img' />
				<ImCross id='category-img' onClick={() => deleteCategory(id)} />
			</div>
		</div>
	);
}
