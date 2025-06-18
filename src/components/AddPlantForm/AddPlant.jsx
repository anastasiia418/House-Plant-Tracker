import Modal from 'react-modal';
import { useState } from 'react';
import plantImage from '../../assets/images/Plant 1.png';
import './style.css';
import { v4 as uuidv4 } from 'uuid';

const AddPlantForm = (props) => {
    // sometimes is required to alphabetize the state variables
    const [plantName, setPlantName] = useState('');
    const [plantType, setPlantType] = useState('');
    const [watered, setWatered] = useState(false);              // boolean or string?
    const [fertilized, setFertilized] = useState(false);        // boolean or string?
    const [notes, setNotes] = useState('');
    const [success, setSuccess] = useState(false);
    const [nameError, setNameError] = useState('');

    const successMessage = success && (
        <div>
            <h3>Plant added successfully!</h3>
        </div>
    );

    const resetForm = () => {
        setPlantName('');
        setPlantType('');
        setWatered('');
        setFertilized('');
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
            watered,
            fertilized,
            notes,
        };
        setSuccess(true);
        setTimeout(() => {
            resetForm();
        }, 1000);
        props.onSave(newPlant);
        props.onClose();
    };

    return (
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
                    <label htmlFor="plantType"> 🪴Type:</label>
                    <select id="plantType" name="plantType" required value={plantType} onChange={(e) => setPlantType(e.target.value)} >
                        <option value="">Select a type</option>
                        <option value="Succulent">Succulent</option>
                        <option value="Cactus">Cactus</option>
                        <option value="Fern">Fern</option>
                        <option value="Flowering">Flowering</option>
                        <option value="Herb">Herb</option>
                    </select>
                    <label htmlFor="watered"> 💧 Last watered:</label>
                    <input type="date" id="watered" name="watered" required value={watered} onChange={(e) => setWatered(e.target.value)} />
                    <label htmlFor="fertilized"> 🐝 Last fertilized:</label>
                    <input type="date" id="fertilized" name="fertilized" required value={fertilized} onChange={(e) => setFertilized(e.target.value)} />
                    <label htmlFor="notes"> 📝 Notes:</label>
                    <textarea id="notes" name="notes" rows="4" cols="50" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                    
                    {successMessage}
                </form>
            </div>
            <div className='button-row'>
                <button type="submit" className='save-button'>Save</button>
                <button type="button" className='cancel-button' onClick={resetForm}>Cancel</button>
            </div>
        </Modal>
    )
};

export default AddPlantForm;