import React, {useState} from "react";

type CardsType = {
    id: number
    order: number
    text: string
}

export const DragCards = () => {

    const [cardsList, setCardsList] = useState<Array<CardsType>>([
        {id: 1, order: 1, text: 'CARD 1'},
        {id: 2, order: 2, text: 'CARD 2'},
        {id: 3, order: 3, text: 'CARD 3'},
        {id: 4, order: 4, text: 'CARD 4'}
    ])

    const [currentCard, setCurrentCard] = useState(null)

    const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, card: CardsType) => {
        setCurrentCard(card as unknown as null)
    }
    const dragEndHandler = (event: any) => {
        event.target.style.background = 'white'
    }


    const dropHandler = (event: any, card: CardsType) => {
        event.preventDefault()
        setCardsList(cardsList.map((c) => {
            if (c.id === card.id) {
                // @ts-ignore
                return {...c, order: currentCard.order}
            }
            // @ts-ignore
            if (c.id === currentCard.id) {
                return {...c, order: card.order}
            }
            return c
        }))
        event.target.style.background = 'white'
    }
    const dragOverHandler = (event: any) => {
        event.preventDefault()
        event.target.style.background = 'lightgray'
    }


    return <div className="App">
        {cardsList.sort((a, b) => a.order - b.order)
            .map((card) => <div key={card.id} className={'card'} draggable
                                onDragStart={(event => dragStartHandler(event, card))}
                                onDragEnd={(event => dragEndHandler(event))}
                                onDragLeave={(event => dragEndHandler(event))}
                                onDragOver={(event => dragOverHandler(event))}
                                onDrop={(event => dropHandler(event, card))}> {card.text} </div>)}
    </div>
}