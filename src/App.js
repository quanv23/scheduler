import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';

export default function App() {
	// Example state of card to be deleted later
	const ex = [
		{
			id: nanoid(),
			title: 'Crochet Club',
			category: 'School',
			date: 'Jan. 5, 2024',
			time: '3pm - 5pm',
			location: 'McMaster',
			isImportant: false,
		},
		{
			id: nanoid(),
			title: 'Book Club Meeting',
			category: 'Personal',
			date: 'Feb. 10, 2024',
			time: '6pm - 8pm',
			location: 'Local Library',
			isImportant: false,
		},
		{
			id: nanoid(),
			title: 'Team Meeting',
			category: 'Work',
			date: 'Mar. 20, 2024',
			time: '9am - 11am',
			location: 'Office Conference Room',
			isImportant: false,
		},
		{
			id: nanoid(),
			title: 'Birthday Party',
			category: 'School',
			date: 'Apr. 15, 2024',
			time: '2pm - 6pm',
			location: "Friend's House",
			isImportant: true,
		},
		// {
		// 	id: nanoid(),
		// 	title: 'Birthday Party',
		// 	category: 'School',
		// 	date: 'Apr. 15, 2024',
		// 	time: '2pm - 6pm',
		// 	location: "Friend's House",
		// 	isImportant: true,
		// },
		// {
		// 	id: nanoid(),
		// 	title: 'Birthday Party',
		// 	category: 'School',
		// 	date: 'Apr. 15, 2024',
		// 	time: '2pm - 6pm',
		// 	location: "Friend's House",
		// 	isImportant: true,
		// },
		// {
		// 	id: nanoid(),
		// 	title: 'Birthday Party',
		// 	category: 'School',
		// 	date: 'Apr. 15, 2024',
		// 	time: '2pm - 6pm',
		// 	location: "Friend's House",
		// 	isImportant: true,
		// },
	];

	/*
    card :: {
        Title : String 
        Category : String
        Date : String (TODO find better input method)
        Time : String (TODO find better input method)
        Location : String
        isImportant : Bool
    } 
    */
	const [cards, setCard] = useState(ex);

	// Creates multiple card elements by mapping their properties
	const cardElements = cards.map((card) => (
		<Card
			id={card.id}
			title={card.title}
			category={card.category}
			date={card.date}
			time={card.time}
			location={card.location}
			isImportant={card.isImportant}
		/>
	));

	return (
		<div className='container'>
			<Header />
			<main className='card-container'>{cardElements}</main>
			<Footer />
		</div>
	);
}

// 9d4edd purple for later
// 95d5b2 green for later
// 0066ff blue for later
