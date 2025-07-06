import { useState, useMemo, useEffect } from 'react';
import AddPlantForm from '../AddPlantForm/AddPlant';
import plantImage from '../../assets/images/Happy.png';
import PlantCard from '../PlantCard/PlantCard'; 
// import PlantCardEdit from '../PlantCardEdit/PlantCardEdit';
import { PlantCardEdit } from '../components';
import './style.css';

function PlantList() {
    const [openModal, setOpenModal] = useState(false);
    const [editPlantID, setEditPlantID] = useState(null);
    const [plantData, setPlantData] = useState( () => {
        const storedPlants = localStorage.getItem('plantData');
        return storedPlants ? JSON.parse(storedPlants) : [];
    });

    useEffect(() => {
        localStorage.setItem('plantData', JSON.stringify(plantData));
    }, [plantData]);
    
    // 
    // useEffect(() => {
        //     // Fetch plant data from API
        //     const fetchPlants = async () => {
            //         const response = await fetch('https://some-plant-api.com');
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
            <img src={plantImage} alt="a little plant inside a pot" className='intro-img'/>
            <h2 className='intro-h2'>No plants added yet!</h2>
            <p className='intro-p'>Start your collection by adding your first plant below.</p>
        </div>
    );
    
    const handleEdit = (plantId) => setEditPlantID(plantId);
    
    const handleSave = (newPlant, updatedPlant) => {
        if (newPlant) {
            setPlantData([...plantData, newPlant]);
        }
        if (updatedPlant) {
            setPlantData(plantData.map(plant => 
                plant.id === updatedPlant.id ? updatedPlant : plant
            ));
            setEditPlantID(null);
        }
    };
    
    const handleDelete = (plantId) => {
        setPlantData(plantData.filter(plant => plant.id !== plantId));
    };
    const handleCancel = () => setEditPlantID(null);

    // const plantList = useMemo( () => (
        //     <div className="plant-list">
        //         {plantData.map((plant) => (
    //             <PlantCard key={plant.id} plantData={plant} />
    //         ))}
    //     </div>
    // ), [plantData]);

    // should I separate the plant render logic into a separate component/function?
    const plantList = useMemo( () => (
        <div className="plant-list">
            {plantData.map((plant) =>
                editPlantID === plant.id ? (
                    <PlantCardEdit
                        key={plant.id}
                        plant={plant}
                        plantData={plantData}
                        onSave={updatedPlant => handleSave(null, updatedPlant)}
                        onCancel={handleCancel}
                    />
                ) : (
                    <PlantCard
                        key={plant.id}
                        plantData={plant}
                        // is handleEdit 
                        onEdit={() => handleEdit(plant.id)}
                    />
                )
            )}
        </div>
    ), [plantData, editPlantID]);


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
        </div>
    );
};

export default PlantList;