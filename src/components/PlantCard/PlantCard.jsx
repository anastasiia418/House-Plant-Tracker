import './style.css';

import succulentImg from '../../assets/images/Succulent.png';
import cactusImg from '../../assets/images/Cactus.png';
import fernImg from '../../assets/images/Fern.png';
import orchidImg from '../../assets/images/Orchid.png';
import bonsaiImg from '../../assets/images/Bonsai.png';
import monsteraImg from '../../assets/images/Monstera.png';
import otherImg from '../../assets/images/Other 1.png';

function PlantCard( {plantData, onEdit, onDelete, highlight} ) {
    const plantTypeImages = {
        Succulent: succulentImg,
        Cactus: cactusImg,
        Fern: fernImg,
        Orchid: orchidImg,
        Bonsai: bonsaiImg,
        Monstera: monsteraImg,
        Other: otherImg,
    };
    const image = plantTypeImages[plantData.plantType] || otherImg;

    return (
        <div
            className={`plant-card${highlight ? ' highlight-blink' : ''}`}
            id={`plant-card-${plantData.id}`}
        >
            <img src={image} alt={plantData.plantName} />
            <h3>{plantData.plantName}</h3>
            <p>{plantData.plantType}</p>
            <div className='button-row'>
                <button 
                    className='edit-button' 
                    // onClick={onEdit}
                >Edit</button>
                <button className='delete-button' onClick={() => onDelete(plantData.id)}>Delete</button>
            </div>
        </div>
    );
}

export default PlantCard;