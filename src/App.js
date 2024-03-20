import React, { useEffect, useState, useMemo } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import NewCardForm from './components/NewCardForm';

// Firestore imports
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';

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
	useEffect(() => {
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

		// Make sure to call the function at the end (is a workaround to use async)
		getCardList();
	}, [cardsCollectionRef]);

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
			{showInputForm && <NewCardForm toggleInputForm={toggleInputForm} />}
		</div>
	);
}

// 9d4edd purple for later
// 95d5b2 green for later
// 0066ff blue for later
