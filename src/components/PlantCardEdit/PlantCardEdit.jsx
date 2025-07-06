import { useState } from 'react';
import './style.css';

import succulentImg from '../../assets/images/Succulent.png';
import cactusImg from '../../assets/images/Cactus.png';
import fernImg from '../../assets/images/Fern.png';
import orchidImg from '../../assets/images/Orchid.png';
import bonsaiImg from '../../assets/images/Bonsai.png';
import monsteraImg from '../../assets/images/Monstera.png'; // default
import otherImg from '../../assets/images/Other 1.png';
import other2Img from '../../assets/images/Other 2.png'; // default


const assignedPlantImage = {
    Succulent: succulentImg,
    Cactus: cactusImg,
    Fern: fernImg,
    Orchid: orchidImg,
    Bonsai: bonsaiImg,
    Monstera: monsteraImg,
    Other: otherImg,
}

function PlantCardEdit({ plant, onSave, onCancel, plantData }) {
    const [plantName, setPlantName] = useState(plant.plantName);
    const [plantType, setPlantType] = useState(plant.plantType);
    const [watered, setWatered] = useState(plant.watered);
    const [fertilized, setFertilized] = useState(plant.fertilized);
    const [notes, setNotes] = useState(plant.notes);
    const [success, setSuccess] = useState();
    const [nameError, setNameError] = useState('');

    const successMessage = success && (
        <div>
            <h3>Plant was edited successfully!</h3>
        </div>
    );

    const plantImage = plantType ? assignedPlantImage[plantType] : other2Img;

    const handleSave = async (e) => {
        e.preventDefault();
        if (plantData && plantData.some((p) => p.plantName.toLowerCase() === plantName.toLowerCase() && p.id !== plant.id)) {
            setNameError('A plant with this name already exists. Please choose a different name.');
            return;
        }
        onSave({
            ...plant,
            plantName,
            plantType,
            watered,    
            fertilized,
            notes,
        });

        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            onCancel();
        }, 1500);
    };
    
    return (
        <div className="plant-card edit-mode">
            {console.log('Rendering edit form for', plant.id)}
            <img src={plantImage} alt={plantName} className="plant-image" />
            {successMessage}
            <form onSubmit={handleSave}>
                <label>Name:</label>
                <input type="text" value={plantName} onChange={e => { setPlantName(e.target.value); setNameError(''); }} required />
                {nameError && <div className="error-message">{nameError}</div>}
                <label>Type:</label>
                    <select value={plantType} onChange={e => setPlantType(e.target.value)} required >
                        <option value="">Select a type</option>
                        <option value="Succulent">Succulent</option>
                        <option value="Cactus">Cactus</option>
                        <option value="Monstera">Monstera</option>
                        <option value="Fern">Fern</option>
                        <option value="Orchid">Orchid</option>
                        <option value="Bonsai">Bonsai</option>
                        <option value="Other">Other</option>
                    </select>
                <label>Last watered:</label>
                <input type="date" value={watered} onChange={e => setWatered(e.target.value)} required />
                <label>Last fertilized:</label>
                <input type="date" value={fertilized} onChange={e => setFertilized(e.target.value)} required />
                <label>Notes: </label>
                <textarea rows="4" cols="50" value={notes} onChange={e => setNotes(e.target.value)} />
                <div className="button-row">
                    <button type="submit" className="save-button">Save</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default PlantCardEdit;