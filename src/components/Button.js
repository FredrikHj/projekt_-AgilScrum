import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom';

const Button = (props) => {
    console.log(props);
    
    return (
        <>
            {(props.patchLink === true)
                ?   <Link to={ props.patchTo }>
                        <button className="button">{ props.name }</button>
                    </Link>

                :   <button className="button" onclick={ props.function }>{ props.name }</button>
            }
        </>
    );
}
export default Button;