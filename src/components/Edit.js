import React, {useState} from 'react'

const Edit = ({tourney, handleEdit}) => {
  const [editTourney, setEditTourney] = useState(tourney)

  const handleChange = (e) => {
    setEditTourney({...editTourney, [e.target.name]: e.target.value},)
  }
  const handleCheckedChange = (e) => {
    setEditTourney({...editTourney, [e.target.name]: e.target.checked},)
  }
  // e.target.checked

  const handleSubmit = (e) => {
    e.preventDefault()
    handleEdit(editTourney)
  }

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
          <label htmlFor='complete'>Is complete: </label>
          <input type='checkbox' name='complete' value={editTourney.complete} onChange={handleCheckedChange}/>
          <br />
          <br />
          <label htmlFor='locked'>locked: </label>
          <input type='checkbox' name='locked' value={editTourney.locked} onChange={handleCheckedChange}/>
          <br />
          <br />
          <label htmlFor='prizes'>prizes: </label>
          <input type='text' name='prizes' value={editTourney.prizes} onChange={handleChange}/>
          <input type='submit'/>
        </form>
      </details>
    </>
  )
}


export default Edit;
