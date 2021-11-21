import { useState } from 'react';

const SelectChampion = ({ players, tourney, handleEdit }) => {
  const [updatedTourney, setUpdatedTourney] = useState(tourney);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const handleSelectChampion = (e) => {
    setReadyToSubmit(true);
    setUpdatedTourney({
        ...updatedTourney,
        champion: parseInt(e.target.value)
      });
  };

  const handleSetChampion = () => {
    handleEdit(updatedTourney);
  };

  return (
    <>
      <label htmlFor={`champion${tourney.id}`}>Winner:</label>
      <select onChange={handleSelectChampion} id={`champion${tourney.id}`}>
        <option disabled selected value>Select Winner</option>
        <option value={players[0]?.id}>{players[0]?.username}</option>
        <option value={players[1]?.id}>{players[1]?.username}</option>
      </select>
      {readyToSubmit &&
        <button onClick={handleSetChampion}>Select Champion</button>
      }
    </>
  );
};

export default SelectChampion;
