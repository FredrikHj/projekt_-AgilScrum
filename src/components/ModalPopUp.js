import React from 'react';
import { Button } from './Button.js';

export const GameMordal = (props) => {
    return (
        <section className="">
            <div>
                <label id="chessName">Chess game --></label>
                <input type="text" id="chessName" onChange={ props.runAddGameName } value={ props.addGameName } />
            </div>

            <Button 
                name="Add Game"
                function={ props.runNewGame }
            /> 
            
        </section>
    );
}