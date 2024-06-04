import React, { useState, useRef } from 'react';
import { ImCross, ImPencil, ImCheckmark } from 'react-icons/im';
import { FaTrashAlt } from 'react-icons/fa';
import './styles/newCategoryModal.css';

export default function CategoryElement(props) {
	// Deconstructing props
	const { id, category, colour, deleteCategory, updateCategory } = props;

	// States that track updated values for category
	const [updatedCategory, setupdatedCategory] = useState(category);
	const [updatedColour, setUpdatedColour] = useState(colour);

	// State that tracsks wheter editing is live
	const [showEdit, setShowEdit] = useState(false);
	const toggleShowEdit = () => {
		setShowEdit((prevShowEdit) => !prevShowEdit);
	};

	// Reference to input text when editing
	const textBoxRef = useRef(null);

	// Handles when edit button is clicked
	const handleFocusCategory = () => {
		toggleShowEdit();
		textBoxRef.current.focus();
	};

	// Handles when the edit is confirmed, changing the color and title
	const handleConfirmEdit = () => {
		updateCategory(id, { category: updatedCategory, colour: updatedColour });
		toggleShowEdit();
	};

	// Handles when edit is cancelled, reverting back to prev states
	const handleCancelEdit = () => {
		setupdatedCategory(category);
		setUpdatedColour(colour);
		toggleShowEdit();
	};

	// Dynamic styling for colour boxes to disable them when edit mode isn't on
	const colourStyles = showEdit
		? { pointerEvents: 'auto' }
		: { pointerEvents: 'none' };

	return (
		<div className='category-element'>
			<div style={{ display: 'flex', alignItems: 'center', width: '75%' }}>
				<input
					id='colour-picker'
					type='color'
					value={updatedColour}
					onChange={(e) => setUpdatedColour(e.target.value)}
					style={colourStyles}
				/>
				<input
					id='category-name-input'
					type='text'
					ref={textBoxRef}
					value={updatedCategory}
					onChange={(e) => setupdatedCategory(e.target.value)}
					placeholder='Empty'
					style={colourStyles}
				/>
			</div>
			<div>
				{!showEdit && (
					<ImPencil className='category-img' onClick={handleFocusCategory} />
				)}
				{showEdit && (
					<ImCheckmark
						className='category-img'
						onClick={handleConfirmEdit}
						size={19}
						fill='#a7c957'
					/>
				)}
				{!showEdit && (
					<FaTrashAlt
						className='category-img'
						onClick={() => deleteCategory(id)}
					/>
				)}
				{showEdit && (
					<ImCross
						className='category-img'
						onClick={handleCancelEdit}
						fill='#E5383B'
					/>
				)}
			</div>
		</div>
	);
}
