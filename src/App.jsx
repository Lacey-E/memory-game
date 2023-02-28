import { useEffect, useState } from 'react'
import SingleCard from './component/SingleCard'
import './App.css'

const cardImages = [
  { "src": "/img/Image001.jpg", matched: false },
  { "src": "/img/Image003.jpg",  matched: false },
  { "src": "/img/Image004.jpg",  matched: false },
  { "src": "/img/Image005.jpg",  matched: false },
  { "src": "/img/Image006.jpg",  matched: false },
  { "src": "/img/Image007.jpg",  matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
const [disabled, setDisabled] = useState(false)


  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }
 

 // Handle choice
 const handleChoice = (card) => {
 choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}
  

//Compare 2 selected cards
useEffect(() => {

  if (choiceOne && choiceTwo) {
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
     setCards(prevCards => {
      return prevCards.map(card => {
        if (card.src === choiceOne.src) {
          return {...card, matched: true}
         } else {
          return card
         }
      })
     })
      resetTurn()
    } else {
     setTimeout(() => resetTurn(), 500) 
    }
  }
}, [choiceOne, choiceTwo])



//Reset Choices & increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}





  return (
    <div className="App">
    <h1>Hero Match</h1>
    <button onClick={shuffleCards}>New Game</button>
    <h2> Turns {turns}</h2>

    <div className="card-grid">
      {cards.map(card => (
        <SingleCard 
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled ={disabled}       
        />
      ))}
      
    </div>

  </div>

  );
}

export default App