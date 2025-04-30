import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const AddPlant = (props) => {
    const [plantName, setPlantName] = useState('');
    const [plantType, setPlantType] = useState('');
    const [watered, setWatered] = useState('');
    const [fertilized, setFertilized] = useState('');   
    const [notes, setNotes] = useState('');

    const saveHandler = () => {
        props.onSave(            
            plantName,
            plantType,
            watered,
            fertilized,
            notes);          
        setPlantName('');
        setPlantType('');
        setWatered('');
        setFertilized('');
        setNotes('');
        props.onClose();
        return (
            <h3>Plant added succesfully!</h3>
        )
    }

    return (
        <Modal
            isOpen={true}
        >
            <h1>Add a Plant</h1>
            <form>
                <label htmlFor="plantName">Plant Name:</label>
                <input type="text" id="plantName" name="plantName" required />
                <label htmlFor="plantType">Type:</label>
                <input type="text" id="plantType" name="plantType" required />
                <label htmlFor="watered">Last Watered:</label>
                <input type="date" id="watered" name="watered" required />
                <label htmlFor="fertilized">Last fertilized:</label>
                <input type="date" id="fertilized" name="fertilized" required />
                <label htmlFor="notes">Notes:</label>
                <textarea id="notes" name="notes" rows="4" cols="50"></textarea>
                <button type="save" onClick={saveHandler}>Save</button>
                <button type="cancel" onClick = {props.onClose}>Cancel</button>
            </form>
        </Modal>
    )
};

export default AddPlant;