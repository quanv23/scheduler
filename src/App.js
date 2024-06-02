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

export default function App() {
	/* ============================================================================================
    Deleting Cards
    ============================================================================================ */

	// Async function for deleting cards, and gets card list again afterwards
	const deleteCard = async (id) => {
		console.log('Tried Deleting');
		try {
			const cardDoc = doc(db, 'cards', id);
			await deleteDoc(cardDoc);
			getCardList();
		} catch (error) {
			console.log('Error Deleting Card: ', error);
		}
	};

	/* ============================================================================================
    Editing Cards
    ============================================================================================ */

	// Async function for updating cards, and gets card list again afterwards
	const updateCard = async (id, obj) => {
		console.log('Tried editing');
		try {
			const cardDoc = doc(db, 'cards', id);
			await updateDoc(cardDoc, obj);
			getCardList();
		} catch (error) {
			console.log('Error editing card', error);
		}
	};

	/* ============================================================================================
    Creating Initial Cards 
    ============================================================================================ */

	/*
    card :: {
        Title : String 
        Category : String
        Date : String (TODO find better input method)
        Start : String
        End : String
        Location : String
        isImportant : Bool
    } 
    */

	// Implementing firestore database
	// useMemo makes it so that the nested function only runs anytime something actually changes, and not everytime it renders
	// Returns the return value of the function instead of the function itself which is what seperates it from useCallback
	const [cardList, setCardList] = useState([]);
	const cardsCollectionRef = useMemo(() => collection(db, 'cards'), []);

	// Asynchronous functions don't halt the program while waiting to finish, instead it awaits for functions to complete
	const getCardList = useCallback(async () => {
		try {
			// Gets collection from database and filters it, and attaches the id
			const data = await getDocs(cardsCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			console.log('Tried reading cards');
			setCardList(filteredData);
		} catch (error) {
			console.log('Error getting card list: ', error);
		}
	}, [cardsCollectionRef]);

	// useEffect runs everytime the page is rendered or if any of its dependencies (elements in the list) are changed
	useEffect(() => {
		getCardList();
	}, [getCardList]);

	// Creates multiple card elements by mapping their properties
	const cardElements = cardList.map((card) => (
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
		/>
	));

	/* ============================================================================================
    Creating New Cards
    ============================================================================================ */

	// New card states
	const [newTitle, setNewTitle] = useState('');
	const [newDate, setNewDate] = useState('');
	const [newStart, setNewStart] = useState('');
	const [newEnd, setNewEnd] = useState('');
	const [newLocation, setNewLocation] = useState('');
	const [newCategory, setNewCategory] = useState('');
	const [isUrgent, setIsUrgent] = useState(false);

	// State that tracks if the form overlay should show, and function to toggle it
	const [showInputModal, setshowInputModal] = useState(false);
	const toggleInputModal = () => {
		setshowInputModal((prevshowInputModal) => !prevshowInputModal);
	};

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

	return (
		<div id='container'>
			<Header toggleInputModal={toggleInputModal} />
			<main id='card-container'>{cardElements}</main>
			<Footer />
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
				/>
			)}
		</div>
	);
}

// 9d4edd purple for later
// 95d5b2 green for later
// 0066ff blue for later
