import { useState, useMemo, useEffect } from 'react';
import AddPlantForm from '../AddPlantForm/AddPlant';
import plantImage from '../../assets/images/Happy.png';
import './style.css';
import PlantCard from '../PlantCard/PlantCard'; 

function PlantList() {
    const [openModal, setOpenModal] = useState(false);
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

    // useEffect(() => {
    //     // Fetch plant data from local storage or API
    //     const storedPlants = JSON.parse(localStorage.getItem('plants')) || [];
    //     setPlantData(storedPlants);
    // }, []);
    
    const addPlantsMessage = (
        <div>
            <img src={plantImage} alt="a little plant inside a pot" />
            <h2>No plants added yet!</h2>
            <p>Start your collection by adding your first plant below.</p>
        </div>
    );

    const plantList = useMemo( () => (
        <div className="plant-list">
            {plantData.map((plant) => (
                <PlantCard key={plant.id} plantData={plant} />
            ))}
        </div>
    ), [plantData]);

    const handleSave = (newPlant) => {
        setPlantData([...plantData, newPlant]);
    };

    const displayContent = plantData.length === 0 ? addPlantsMessage : plantList;

    return (
        <div className='plant-list-container'>
            <h1>House Plant Inventory</h1>
            {displayContent}
            <button 
                className='add-plant-button'
                onClick={ () => {setOpenModal(true); }}
            >
                + Add Plant
            </button>
            {openModal && (
                <AddPlantForm 
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    onSave={handleSave}
                    plantData={plantData} // for the name error check
                />
            )}
            {/* <PlantCard plantData={plantData} /> */}
        </div>
    );
};

export default PlantList;