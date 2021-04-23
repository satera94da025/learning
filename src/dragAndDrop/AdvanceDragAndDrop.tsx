import React, {useState} from "react";


type itemsType = {
    id: number
    title: string
}

type boardType = {
    id: number
    title: string
    items: Array<itemsType>
}

export const AdvanceDragAndDrop = () => {
    const [boards, setBoards] = useState<Array<boardType>>([
        {
            id: 1,
            title: 'Сделать',
            items: [{id: 1, title: 'Пойти в магазин'}, {id: 2, title: 'Пойти в музей'}, {id: 3, title: 'Пойти в кафе'}]
        },
        {id: 2, title: 'Проверить', items: [{id: 4, title: 'код'}, {id: 5, title: 'задание'}, {id: 6, title: 'счет'}]},
        {
            id: 3,
            title: 'Сделано',
            items: [{id: 7, title: 'снять видео'}, {id: 8, title: 'купить шаурму'}, {id: 9, title: 'Пойти зал'}]
        }
    ])

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    function dragOverHandler(event: any) {
        event.preventDefault()
        if (event.target.className === 'item') {
            event.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    function dragLeaveHandler(event: any) {
        event.target.style.boxShadow = 'none'
    }

    function dragStartHandler(event: React.DragEvent<HTMLDivElement>, board: boardType, item: itemsType | null) {
        // @ts-ignore
        setCurrentBoard(board)
        // @ts-ignore
        setCurrentItem(item)
    }


    function dragEndHandler(event: any) {
        event.target.style.boxShadow = 'none'
    }

    function dropHandler(event: any, board: boardType, item: itemsType) {
        event.preventDefault()
        // @ts-ignore
        const currentIndex = currentBoard.items.indexOf(currentItem)
        // @ts-ignore
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        // @ts-ignore
        board.items.splice(dropIndex + 1, 0, currentItem)
        // @ts-ignore
        setBoards(boards.map((b) => {
            if (b.id === board.id) {
                return board
            }
            // @ts-ignore
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        event.target.style.boxShadow = 'none'
    }


    function dropCardHandler(event: any, board: boardType) {
        // @ts-ignore
        board.items.push(currentItem)
        // @ts-ignore
        const currentIndex = currentBoard.items.indexOf(currentItem)
        // @ts-ignore
        currentBoard.items.splice(currentIndex, 1)
        // @ts-ignore
        setBoards(boards.map((b) => {
            if (b.id === board.id) {
                return board
            }
            // @ts-ignore
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        event.target.style.boxShadow = 'none'
    }

    return (
        <div className={'App'}>
            {boards.map((board) => {
                return <div className={'board'}
                            onDragOver={(event => dragOverHandler(event))}
                            onDrop={(event => dropCardHandler(event, board))}

                >
                    <div className={'board__title'}>{board.title}</div>
                    {board.items.map((item) => {
                        return <div className={'item'}
                                    draggable
                                    onDragOver={(event => dragOverHandler(event))}
                                    onDragLeave={(event => dragLeaveHandler(event))}
                                    onDragStart={(event => dragStartHandler(event, board, item))}
                                    onDragEnd={(event => dragEndHandler(event))}
                                    onDrop={(event => dropHandler(event, board, item))}

                        > {item.title}</div>
                    })}
                </div>
            })}
        </div>
    )
}

