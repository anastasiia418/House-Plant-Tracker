import React from 'react';
import AddPlant from '../AddPlant/AddPlant';
import { useState, useEffect } from 'react';

const PlantList = () => {
    const [addClicked, setAddClicked] = useState(false);
    const [plantList, setPlantList] = useState([]);

    const saveHandler = (plantName, plantType, watered, fertilized, notes) => {
        const newPlant = {
            plantName: plantName,
            plantType: plantType,
            watered: watered,
            fertilized: fertilized,
            notes: notes
        };
        setPlantList([...plantList, newPlant]);
    };

    return (
        <div>
            <h1>Plant List</h1>
            {plantList.length === 0 ? (
                <div>
                    <h2>No plants added yet!</h2>
                    <p>Start your collection by adding your first plant below.</p>
                </div>
            ) : (
                <ul>
                    {plantList.map((plant, index) => (
                        <li key={index}>
                            {plant.plantName} - {plant.plantType} {plant.watered && "(Watered)"} {plant.fertilized && "(Fertilized)"}<br />
                            {plant.notes}
                        </li>
                    ))}
                </ul>
            )}
            
            {addClicked ?
                <AddPlant onClose={() => setAddClicked(false)} onSave={saveHandler} /> 
                : <button onClick={() => setAddClicked(true)}>Add a Plant</button>}
        </div>
    );
};




export default PlantList;