import React from 'react';
import { Button } from './Button.js';

export const NewGameModal = (props) => {
    return (
        <section className="">
            <div>
                <label id="chessName">Chess game --></label>
                <input type="text" id="chessName" onChange={ props.runChessNameF } value={ props.chessName } />
            </div>

            <Button 
                name="Add Game"
                function={ props.runNewGame }
            /> 
            
        </section>
    );
}