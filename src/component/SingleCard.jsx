import './SingleCard.css'
export default function SingleCard({cards}) {
  return (
    <div>
       <div className="card-grid">
        {cards.map(card => (
          <div className="card" key={card.id}>
            <div>
              <img className="front" src={card.src} alt="card front" />
              <img className="back" src="/img/cover.png" alt="cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
