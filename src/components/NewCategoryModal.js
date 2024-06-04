import React, { useState } from 'react';
import CategoryElement from './CategoryElement';
import './styles/newCardModal.css';
import './styles/newCategoryModal.css';

export default function NewCategoryModal(props) {
	// Decontructing props
	const { categoryList, toggleShowCategory, onAddCategory, deleteCategory } =
		props;

	// States that track fields for new category
	const [newCategoryTitle, setNewCategoryTitle] = useState('');
	const [newCategoryColour, setNewCategoryColour] = useState('#1f252e');

	const resetStates = () => {
		setNewCategoryTitle('');
		setNewCategoryColour('#1f252e');
	};

	const handleAddCategory = (e) => {
		e.preventDefault();
		onAddCategory({ category: newCategoryTitle, colour: newCategoryColour });
		resetStates();
	};

	// Maps the category list onto multiple elements
	const categoryElements = categoryList.map((category) => {
		return (
			<CategoryElement
				key={category.id}
				id={category.id}
				category={category.category}
				colour={category.colour}
				deleteCategory={deleteCategory}
			/>
		);
	});

	return (
		<div id='new-card-container' onClick={toggleShowCategory}>
			<div
				id='category-modal'
				style={{
					border: '3px solid #D3D3D3',
					borderRadius: '20px 20px 0 0',
					margin: '0',
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<h2>CATEGORIES</h2>
				<div id='category-container'>{categoryElements}</div>
			</div>
			<form
				id='category-modal'
				style={{
					borderTop: '0',
					borderRight: '3px solid #D3D3D3',
					borderBottom: '3px solid #D3D3D3',
					borderLeft: '3px solid #D3D3D3',
					borderRadius: '0 0 20px 20px',
					margin: '0',
				}}
				onClick={(e) => e.stopPropagation()}
				onSubmit={handleAddCategory}
				autoComplete='off'
			>
				<div id='input-container'>
					<input
						id='category-title'
						type='text'
						placeholder='Category Title'
						value={newCategoryTitle}
						onChange={(e) => setNewCategoryTitle(e.target.value)}
					/>
					<input
						id='category-colour'
						type='color'
						value={newCategoryColour}
						onChange={(e) => setNewCategoryColour(e.target.value)}
					/>
				</div>
				<button id='add-category-btn' type='submit'>
					Add Category
				</button>
			</form>
		</div>
	);
}
