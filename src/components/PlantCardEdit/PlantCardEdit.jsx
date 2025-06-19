import { useState, useMemo, useEffect } from 'react';
import AddPlantForm from '../AddPlantForm/AddPlant';
import plantImage from '../../assets/images/Plant 3.png';
import './style.css';

function PlantCardEdit( {plantData} ) {
    return (
        <div className="plant-card">
            {plantData.map((plant) => (
                <div key={plant.id} className="plant-item">
                    <h3>{plant.plantName}</h3>
                    <p>Type: {plant.plantType}</p>
                    <p>Watered: {plant.watered ? "Yes" : "No"}</p>
                    <p>Fertilized: {plant.fertilized ? "Yes" : "No"}</p>
                    <p>Notes: {plant.notes}</p>
                </div>
            ))}

        </div>
    );
}

export default PlantCardEdit;