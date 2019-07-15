import React from 'react';
import { submit } from "./scripts/FormUtil";

import './styles/styles.css';

export default function App() {
    function handleClick(e) {
        submit(e, document.forms["form"]);
    }

    return (
        <div className="app">
            <h1 >Formulaire d'envoi de planning :</h1>
            <form id="form" encType="multipart/form-data">
                <div id="nameContainer">
                    <label htmlFor="name">Nom :</label>
                    <input name="name" id="name" />
                    <span>Pas de caractères spéciaux acceptés</span>
                </div>
                <div id="phoneContainer">
                    <label htmlFor="phone">Téléphone :</label>
                    <input name="phone" id="phone" />
                    <span>Format de numéro standard : 0123456789</span>
                </div>
                <div id="messageContainer">
                    <label htmlFor="message">Message :</label>
                    <textarea name="message" id="message"></textarea>
                    <span>Pas de restriction de taille du message</span>
                </div>
                <button type="submit" id="button" onClick={(e) => handleClick(e)}>Valider</button>
            </form>
        </div>
    );
}