import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import NewCardModal from './components/NewCardModal';

// Firestore imports
import { db } from './config/firebase';
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';
import NewCategoryModal from './components/NewCategoryModal';

export default function App() {
	/* ============================================================================================
    All States
    ============================================================================================ */

	// Implementing firestore database
	// useMemo memoizes the nested function, so it doesn't get called every rerender
	// useCallback is similar to useMemo but instead of memoizing the function it returns the function itself
	const [cardList, setCardList] = useState([]);
	const [importantCardList, setImportantCardList] = useState([]);
	const cardsCollectionRef = useMemo(() => collection(db, 'cards'), []);

	// States that track the current list of categories
	const [categoryList, setCategoryList] = useState([]);
	const categoriesCollectionRef = useMemo(
		() => collection(db, 'categories'),
		[]
	);

	// New card states
	const [newTitle, setNewTitle] = useState('');
	const [newDate, setNewDate] = useState('');
	const [newStart, setNewStart] = useState('');
	const [newEnd, setNewEnd] = useState('');
	const [newLocation, setNewLocation] = useState('');
	const [newCategory, setNewCategory] = useState('');
	const [isUrgent, setIsUrgent] = useState(false);

	// State that tracks if new card modal should show, and function to toggle it
	const [showInputModal, setshowInputModal] = useState(false);
	const toggleInputModal = () => {
		setshowInputModal((prevshowInputModal) => !prevshowInputModal);
	};

	// States that track if the new category modal is shown
	const [showCategoryModal, setShowCategoryModal] = useState(false);
	const toggleShowCategory = () => {
		setShowCategoryModal((prevShowCategoryModal) => !prevShowCategoryModal);
	};

	// States that toggles between either filter by date or category
	const [filterByCategory, setfilterByCategory] = useState(false);

	// States that toggles whether important cards are visible or not
	const [importantVisibility, setImportantVisibility] = useState(true);

	/* ============================================================================================
    Deleting Cards / Categories 
    ============================================================================================ */

	// Async function for deleting cards, and gets card list again afterwards
	const deleteCard = async (id) => {
		try {
			const cardDoc = doc(db, 'cards', id);
			await deleteDoc(cardDoc);
			getCardList();
		} catch (error) {
			console.log('Error Deleting Card: ', error);
		}
	};

	// Async function for deleting categories
	const deleteCategory = async (id) => {
		try {
			const categoryDoc = doc(db, 'categories', id);
			await deleteDoc(categoryDoc);
			getCategoryList();
		} catch (error) {
			console.log('Error deleting category', error);
		}
	};

	/* ============================================================================================
    Editing Cards / Categories 
    ============================================================================================ */

	// Async function for updating cards, and gets card list again afterwards
	const updateCard = async (id, obj) => {
		try {
			const cardDoc = doc(db, 'cards', id);
			await updateDoc(cardDoc, obj);
			getCardList();
		} catch (error) {
			console.log('Error editing card', error);
		}
	};

	// Async function for updating categories
	const updateCategory = async (id, obj) => {
		try {
			const categoryDoc = doc(db, 'categories', id);
			await updateDoc(categoryDoc, obj);
			getCategoryList();
		} catch (error) {
			console.log('Error editing category', error);
		}
	};

	/* ============================================================================================
    Creating Initial Cards / Categories 
    ============================================================================================ */

	// Asynchronous functions don't halt the program while waiting to finish, instead it awaits for functions to complete
	const getCardList = useCallback(async () => {
		// Function that filters the given list by date
		const filtterByDate = (arrayOfCards) => {
			arrayOfCards.sort((a, b) => {
				const d1 = new Date(a.date);
				const d2 = new Date(b.date);
				return d1 - d2;
			});
		};

		// Automatically deletes any cards that have passed by 3 days
		const filterOverdueCards = (arrayOfCards) => {
			const today = new Date();
			today.setDate(today.getDate() - 3);
			const cardsToKeep = arrayOfCards.filter((card) => {
				const d = new Date(card.date);
				return d > today;
			});
			const cardsToDelete = arrayOfCards.filter((card) => {
				const d = new Date(card.date);
				return today > d;
			});
			if (cardsToDelete) {
				cardsToDelete.forEach((card) => deleteCard(card.id));
			}
			return cardsToKeep;
		};

		try {
			// Gets collection from database and filters it, and attaches the id
			const data = await getDocs(cardsCollectionRef);
			let organizedData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			console.log('Tried getting cards');
			organizedData = filterOverdueCards(organizedData);

			// Splits the cards into important and non-important cards to render them seperately
			const importantFilteredData = organizedData.filter(
				(card) => card.isImportant
			);
			filtterByDate(importantFilteredData);
			setImportantCardList(importantFilteredData);

			// Non-important cards abide by the filter rules
			const filteredData = organizedData.filter((card) => !card.isImportant);
			if (filterByCategory) {
				// Filters cards by category, by first reducing the array into an object of arrays where the keys are unique categories
				// Then iterating through the object.values() and concatenating them to a final array and setting the state
				const groupedByCategory = filteredData.reduce((acc, obj) => {
					const { category } = obj;
					if (!acc[category]) {
						acc[category] = [];
					}
					acc[category].push(obj);
					return acc;
				}, {});

				let sortedArray = [];
				for (let arr of Object.values(groupedByCategory)) {
					filtterByDate(arr);
					sortedArray = sortedArray.concat(arr);
				}
				setCardList(sortedArray);
			} else {
				// Filters the cards by date with most recent being at the top
				filtterByDate(filteredData);
				setCardList(filteredData);
			}
		} catch (error) {
			console.log('Error getting card list: ', error);
		}
	}, [cardsCollectionRef, filterByCategory]);

	// Gets the list of categories from firebase
	const getCategoryList = useCallback(async () => {
		try {
			const data = await getDocs(categoriesCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			console.log('Tried getting categories');
			setCategoryList(filteredData);
		} catch (error) {
			console.log('Error getting categories', error);
		}
	}, [categoriesCollectionRef]);

	// useEffect runs everytime the page is rendered or if any of its dependencies (elements in the list) are changed
	useEffect(() => {
		getCardList();
		getCategoryList();
	}, [getCardList, getCategoryList]);

	// Creates multiple card elements by mapping their properties
	const createCardList = (list) => {
		return list.map((card) => (
			<Card
				key={card.id}
				id={card.id}
				title={card.title}
				category={card.category}
				date={card.date}
				start={card.start}
				end={card.end}
				location={card.location}
				isImportant={card.isImportant}
				deleteCard={deleteCard}
				updateCard={updateCard}
				categoryList={categoryList}
			/>
		));
	};

	const cardElements = createCardList(cardList);
	const importantCardElements = createCardList(importantCardList);

	/* ============================================================================================
    Creating New Cards / Categories
    ============================================================================================ */

	// onClick function for adding new cards
	const onAddCard = async () => {
		try {
			// Adds this object to the database reference
			await addDoc(cardsCollectionRef, {
				title: newTitle,
				date: newDate,
				start: newStart,
				end: newEnd,
				location: newLocation,
				category: newCategory,
				isImportant: isUrgent,
			});

			// Gets card list again after
			getCardList();
		} catch (err) {
			console.error(err);
		}
	};

	// Adds category and gets the list of categories again
	const onAddCategory = async (obj) => {
		try {
			await addDoc(categoriesCollectionRef, obj);
			getCategoryList();
		} catch (error) {
			console.log('Error adding category', error);
		}
	};

	return (
		<div id='container'>
			<Header
				toggleInputModal={toggleInputModal}
				importantVisibility={importantVisibility}
				setImportantVisibility={setImportantVisibility}
			/>
			<main id='card-container'>
				{importantVisibility && importantCardElements}
				{cardElements}
			</main>
			<Footer
				toggleShowCategory={toggleShowCategory}
				filterByCategory={filterByCategory}
				setfilterByCategory={setfilterByCategory}
			/>
			{showInputModal && (
				<NewCardModal
					toggleInputModal={toggleInputModal}
					onAddCard={onAddCard}
					setNewTitle={setNewTitle}
					setNewDate={setNewDate}
					setNewStart={setNewStart}
					setNewEnd={setNewEnd}
					setNewLocation={setNewLocation}
					setNewCategory={setNewCategory}
					setIsUrgent={setIsUrgent}
					isUrgent={isUrgent}
					categoryList={categoryList}
				/>
			)}
			{showCategoryModal && (
				<NewCategoryModal
					categoryList={categoryList}
					toggleShowCategory={toggleShowCategory}
					onAddCategory={onAddCategory}
					deleteCategory={deleteCategory}
					updateCategory={updateCategory}
				/>
			)}
		</div>
	);
}

// 9d4edd purple for later
// 95d5b2 green for later
// 0066ff blue for later
