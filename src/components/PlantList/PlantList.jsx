import React, { useState, useMemo, useEffect } from 'react';
import AddPlantForm from '../AddPlantForm/AddPlant';

const PlantList = () => {
    const [addClicked, setAddClicked] = useState(false);
    const [plantData, setPlantData] = useState( () => {
        const storedPlants = localStorage.getItem('plantData');
        return storedPlants ? JSON.parse(storedPlants) : [];
    });

    // update plantData in local storage whenever it changes
    useEffect(() => {
        // Save plant data to local storage
        localStorage.setItem('plantData', JSON.stringify(plantData));
    }, [plantData]);
    
    // useEffect(() => {
    //     // Fetch plant data from API
    //     const fetchPlants = async () => {
    //         const response = await fetch('https://api.example.com/plants');
    //         const data = await response.json(); 
    //         setPlantData(data);
    //     };
    //     fetchPlants();
    // }, []);
    
    const addPlantsMessage = (
        <div>
            <h2>No plants added yet!</h2>
            <p>Start your collection by adding your first plant below.</p>
        </div>
    );

    // make this a JSX snippet, since the list is going to be displayed only once; use memo?
    const plantList = useMemo( () => (
        <ul>
            { plantData.map((plant, index) => (
                // plantCard component here
                // need to use a unique key for each plant
                <li key={index}>
                    {plant.plantName} - {plant.plantType} {plant.watered && "Watered"} {plant.fertilized && "Fertilized"}
                    <br />
                    {plant.notes}
                </li>
            )) }
        </ul>
    ), [plantData]);

    const handleSave = (newPlant) => {
        setPlantData([...plantData, newPlant]);
        // setAddClicked(false);
    };

    const displayContent = plantData.length === 0 ? addPlantsMessage : plantList;

    return (
        <div>
            <h1>Plant List</h1>
            {displayContent}
            
            <AddPlantForm
                isOpen={addClicked}
                onClose={() => setAddClicked(false)}
                onSave={handleSave}
            />

            {!addClicked && (
                <button onClick={() => setAddClicked(true)}>Add a Plant</button>
            )}

            {/* props.onSave(NewPlant);
            resetForm();
            props.onClose(); */}
        </div>
    );
};

export default PlantList;