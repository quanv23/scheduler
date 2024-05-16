import React, { useEffect, useState, useMemo } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import NewCardForm from './components/NewCardForm';

// Firestore imports
import { db } from './config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';

export default function App() {
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
	const [cardList, setCardList] = useState([]);
	const cardsCollectionRef = useMemo(() => collection(db, 'cards'), []);

	// useEffect runs everytime the page is rendered or if any of its dependencies (elements in the list) are changed
	// Asynchronous functions don't halt the program while waiting to finish, instead it awaits for functions to complete
	const getCardList = async () => {
		try {
			// Gets collection from database and filters it, and attaches the id
			const data = await getDocs(cardsCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			console.log('render useEffect');
			setCardList(filteredData);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCardList();
	}, []);

	// New card states
	const [newTitle, setNewTitle] = useState('');
	const [newDate, setNewDate] = useState('');
	const [newStart, setNewStart] = useState('');
	const [newEnd, setNewEnd] = useState('');
	const [newLocation, setNewLocation] = useState('');
	const [newCategory, setNewCategory] = useState('');
	const [isUrgent, setIsUrgent] = useState(false);

	const onAddCard = async () => {
		try {
			await addDoc(cardsCollectionRef, {
				title: newTitle,
				date: newDate,
				start: newStart,
				end: newEnd,
				location: newLocation,
				category: newCategory,
				isImportant: isUrgent,
			});

			setIsUrgent(false);
			getCardList();
		} catch (err) {
			console.error(err);
		}
	};

	// Creates multiple card elements by mapping their properties
	const cardElements = cardList.map((card) => (
		<Card
			key={card.id}
			title={card.title}
			category={card.category}
			date={card.date}
			start={card.start}
			end={card.end}
			location={card.location}
			isImportant={card.isImportant}
		/>
	));

	// State that tracks if the form overlay should show, and function to toggle it
	const [showInputForm, setShowInputForm] = useState(false);
	const toggleInputForm = () => {
		setShowInputForm((prevShowInputForm) => !prevShowInputForm);
	};

	return (
		<div className='container'>
			<Header toggleInputForm={toggleInputForm} />
			<main className='card-container'>{cardElements}</main>
			<Footer />
			{showInputForm && (
				<NewCardForm
					toggleInputForm={toggleInputForm}
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
