import Modal from 'react-modal';
import { useState } from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';

import succulentImg from '../../assets/images/Succulent.png';
import cactusImg from '../../assets/images/Cactus.png';
import fernImg from '../../assets/images/Fern.png';
import orchidImg from '../../assets/images/Orchid.png';
import bonsaiImg from '../../assets/images/Bonsai.png';
import monsteraImg from '../../assets/images/Monstera.png'; // default
import otherImg from '../../assets/images/Other 1.png';

const AddPlantForm = (props) => {
    // sometimes is required to alphabetize the state variables
    const [plantName, setPlantName] = useState('');
    const [plantType, setPlantType] = useState('');
    const [lastWateredDate, setlastWateredDate] = useState(false);
    const [lastFertilizedDate, setlastFertilizedDate] = useState(false);
    const [notes, setNotes] = useState('');
    const [success, setSuccess] = useState(false);
    const [nameError, setNameError] = useState('');

    const successMessage = success && (
        <h3 className="success-popup">Plant added successfully!</h3>
    );

    const resetForm = () => {
        setPlantName('');
        setPlantType('');
        setlastWateredDate('');
        setlastFertilizedDate('');
        setNotes('');
        setSuccess(false);
        setNameError('');
        props.onClose();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (props.plantData.some((plant) => plant.plantName.toLowerCase() === plantName.toLowerCase())) {
            // If a plant with the same name already exists, show an error message under the input plantName field
            setNameError('A plant with this name already exists. Please choose a different name.');
            return;
        }
        const newPlant = {
            id: uuidv4(), // generate a unique ID for the plant
            plantName,
            plantType,
            lastWateredDate,
            lastFertilizedDate,
            notes,
        };
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            resetForm();
        }, 1500);
        props.onSave(newPlant);
        props.onClose();
    };

    const assignedPlantImage = {
        Succulent: succulentImg,
        Cactus: cactusImg,
        Fern: fernImg,
        Orchid: orchidImg,
        Bonsai: bonsaiImg,
        Monstera: monsteraImg,
        Other: otherImg,
    }
    // const plantImage = assignedPlantImage[plantType] || otherImg; 
    const plantImage = plantType
        ? assignedPlantImage[plantType] || otherImg // fallback if type not found
        : otherImg; 
    
    return (
        <> 
            
            {/* {successMessage} */}
            <Modal isOpen={props.isOpen} className='container' style={{ overlay: { display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)'}, content: { background: '#EEF8E8' } }} onRequestClose={resetForm}>
                <button className='close-button' onClick={resetForm}>❌</button>
                <div className="title">
                    <h1>Add New Plant</h1>
                </div>
                <div className="img-form">
                    <img src={plantImage} alt="plant" className='form-image' />
                </div>
                <div className='content'>
                    <form onSubmit={handleSave}>
                        <label htmlFor="plantName"> Plant Name:</label>
                        <input type="text" id="plantName" name="plantName" required value={plantName} onChange={(e) => {setPlantName(e.target.value); setNameError('')}} />
                        {nameError && <div className="error-message">{nameError}</div>}
                        <label htmlFor="plantType">🪴Type:</label>
                        <select id="plantType" name="plantType" value={plantType} required onChange={(e) => setPlantType(e.target.value)} >
                            <option value="">Select a type</option>
                            <option value="Succulent">Succulent</option>
                            <option value="Cactus">Cactus</option>
                            <option value="Monstera">Monstera</option>
                            <option value="Fern">Fern</option>
                            <option value="Orchid">Orchid</option>
                            <option value="Bonsai">Bonsai</option>
                            <option value="Other">Other</option>
                        </select>
                        <label htmlFor="lastWateredDate">💧 Last watered:</label>
                        <input type="date" id="lastWateredDateDate" name="lastWateredDate" required value={lastWateredDate} onChange={(e) => setlastWateredDate(e.target.value)} />
                        <label htmlFor="lastFertilizedDate">🐝 Last fertilized:</label>
                        <input type="date" id="lastFertilizedDate" name="lastFertilizedDate" required value={lastFertilizedDate} onChange={(e) => setlastFertilizedDate(e.target.value)} />
                        <label htmlFor="notes">📝 Notes:</label>
                        <textarea id="notes" name="notes" rows="4" cols="50" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                        
                        
                        <div className='button-row'>
                            <button type="submit" className='save-button'>Save</button>
                            <button type="button" className='cancel-button' onClick={resetForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
};

export default AddPlantForm;