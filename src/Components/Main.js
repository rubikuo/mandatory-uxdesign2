import React, { useState, useRef, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import './styles/Main.scss';
import { BookIcon, MusicIcon, GameIcon, MovieIcon } from './ImgIcon.jsx';
import Button from 'react-bootstrap/Button';

const Main = () => {
	const [ catagories ] = useState([
		{ type: 'Books', id: 1, catagoryNum: 10 },
		{ type: 'Music', id: 2, catagoryNum: 12 },
		{ type: 'Video games', id: 3, catagoryNum: 15 },
		{ type: 'Film', id: 4, catagoryNum: 11 }
	]);

	const [ choice, setChoice ] = useState(null);
	const [ redirectToQuiz, setRedirectToQuiz ] = useState(false);
	const [ message, setMessage ] = useState('');
   
	const startQuiz = (e) => {
		console.log(choice);
		if (choice !== null) {
			setRedirectToQuiz(true);
		} else {
			setRedirectToQuiz(false);
			setMessage('Please select the catagory');
		}
	};

	const chooseCat = (catagory)=>{
		setChoice(catagory);
		setMessage("")
	}

	const catagoryRef = useRef(null)

	useEffect(()=>{

	})

	if (redirectToQuiz) {
		return (
			<Redirect
				to={{
					pathname: '/quiz',
					state: { catagory: choice }
				}}
			/>
		);
	}

	return (
		<>
		<main className="main">
			<Helmet>
				<title>iQuiz-Home</title>
			</Helmet>
			{/* <h3 style={{color:"white"}}  aria-live="assertive" aria-label="Please choose catatgory" tabIndex={0} id="catagory">Please choose catagory:</h3> */}
			<div role="radiogroup" aria-label="Please choose catatgory"  tabIndex={0} className="main__radiobtn-group">
			
				{catagories.map((cat, i) => {
					return (
						<label htmlFor={cat.type + i} className="main__radiobtn" key={cat.type}>
							<input
							    
								type="radio"
								className="main__radiobtn-input"
								name="catagory"
								id={cat.type + i}
								value={cat.type}
								onChange={() => chooseCat(cat)}
								checked={cat === cat.catagoryNum}
							/>
							<div className="main__radiobtn--fake">
								{cat.type === 'Books' ? (
									<BookIcon size={120}  	aria-labelledby={cat.type} 	className="main__img" />
								) : cat.type === 'Music' ? (
									<MusicIcon size={120} 	aria-labelledby={cat.type} className="main__img" />
								) : cat.type === 'Video games' ? (
									<GameIcon size={120}  	aria-labelledby={cat.type} className="main__img" />
								) : (
									<MovieIcon size={120} 	aria-labelledby={cat.type} className="main__img" />
								)}
							</div>

							<div id={cat.type} className="main__radiobtn-option">
								{cat.type}
							</div>
						</label>
					);
				})}
			</div>
			{message !== '' && <span role="alert" aria-live="assertive" >{message}</span>}
			<Button aria-label="Start Game" className="main__button-start" onClick={startQuiz}>
				Start
			</Button>
		</main>
	
		</>
	);
};

export default Main;
