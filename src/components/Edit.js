import React, {useState, useEffect} from 'react'

const Edit = ({tourney, handleEdit, handleDeleteTourney, getTournaments, tournaments}) => {
  const [editTourney, setEditTourney] = useState(tourney)
  const [startRemove, setStartRemove] = useState(false)

  const handleChange = (e) => {
    setEditTourney({...editTourney, [e.target.name]: e.target.value},)
  }
  const handleCheckedChange = (e) => {
    setEditTourney({...editTourney, [e.target.name]: e.target.checked})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleEdit(editTourney)
  }

  const startRemoveProcess = () => {
    setStartRemove(true)
  }

  const cancelRemove = () => {
    setStartRemove(false)
  }

  useEffect(() => {
      setEditTourney(tourney)
  }, [tournaments, tourney])

  return(
    <>
      <details>
        <summary>Edit Tourney</summary>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name: </label>
          <input type='text' name='name' value={editTourney.name} onChange={handleChange}/>
          <br />
          <br />
          <label htmlFor='game'>game: </label>
          <input type='text' name='game' value={editTourney.game} onChange={handleChange}/>
          <br />
          <br />
          <label htmlFor='limit'>limit: </label>
          <input type='number' name='limit' value={editTourney.limit} onChange={handleChange}/>
          <br />
          <br />
          <label htmlFor='details'>details: </label>
          <input type='text' name='details' value={editTourney.details} onChange={handleChange}/>
          <br />
          <br />
          <label htmlFor='locked'>locked: </label>
          {editTourney.locked ?
            <input type='checkbox' name='locked' value={editTourney.locked} onChange={handleCheckedChange} checked/>
            :
            <input type='checkbox' name='locked' value={editTourney.locked} onChange={handleCheckedChange}/>
          }
          <br />
          <br />
          <label htmlFor='prizes'>prizes: </label>
          <input type='text' name='prizes' value={editTourney.prizes} onChange={handleChange}/>
          <input type='submit'/>
        </form>
        {startRemove ?
        <>
        <p>ARE YOU SURE?</p>
        <button value={tourney.id} onClick={handleDeleteTourney}>YES</button>
        <button value={tourney.id} onClick={cancelRemove}>NO</button>
        </>
        :
        <button value={tourney.id} onClick={startRemoveProcess}>DELETE TOURNAMENT</button>
        }
      </details>
    </>
  )
}


export default Edit;
