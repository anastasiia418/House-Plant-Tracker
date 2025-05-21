import Modal from 'react-modal';
import { useState } from 'react';
import plantImage from '../../assets/images/Plant 1.png';
import './style.css';

const AddPlantForm = (props) => {
    // sometimes is required to alphabetize the state variables
    const [plantName, setPlantName] = useState('');
    const [plantType, setPlantType] = useState('');
    const [watered, setWatered] = useState(false);              // boolean or string?
    const [fertilized, setFertilized] = useState(false);        // boolean or string?
    const [notes, setNotes] = useState('');
    const [success, setSuccess] = useState(false);

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
        props.onClose();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const newPlant = {
            plantName,
            plantType,
            watered,
            fertilized,
            notes
        };
        setSuccess(true);
        setTimeout(() => {
            resetForm();
        }, 1000);
        props.onSave(newPlant);
    };

    return (
        <Modal isOpen={props.isOpen} className='container' style={{ overlay: { position: 'fixed'}, content: { background: '#EEF8E8' } }} onRequestClose={resetForm}>
            <img src={plantImage} alt="plant" className='form-image' />
            <div className='content'>
                <h1>Add a Plant</h1>
                <form onSubmit={handleSave}>
                    <label htmlFor="plantName"> Plant Name:</label>
                    <input type="text" id="plantName" name="plantName" required value={plantName} onChange={(e) => setPlantName(e.target.value)} />
                    <label htmlFor="plantType">🪴Type:</label>
                    <input type="text" id="plantType" name="plantType" required value={plantType} onChange={(e) => setPlantType(e.target.value)} />
                    <label htmlFor="watered">💧 Last Watered:</label>
                    <input type="date" id="watered" name="watered" required value={watered} onChange={(e) => setWatered(e.target.value)} />
                    <label htmlFor="fertilized">🐝 Last fertilized:</label>
                    <input type="date" id="fertilized" name="fertilized" required value={fertilized} onChange={(e) => setFertilized(e.target.value)} />
                    <label htmlFor="notes"> 📝 Notes:</label>
                    <textarea id="notes" name="notes" rows="4" cols="50" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                    <button type="submit">Save</button>
                    <button type="button" onClick={resetForm}>Cancel</button>
                    {successMessage}
                </form>
            </div>
        </Modal>
    )
};

export default AddPlantForm;