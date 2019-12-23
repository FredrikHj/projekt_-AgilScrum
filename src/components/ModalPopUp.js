import React from 'react';
import Button from './Button.js';

const GameMordal = (props) => {
    return (
        <section className="">
            <div>
                <label id="chessName">Chess game --></label>
                <input type="text" id="chessName" onChange={ props.runAddGameName } value={ props.addGameName } />
            </div>

            <Button name="Start Game" function={ props.function } />
        </section>
    );
}
export default GameMordal;