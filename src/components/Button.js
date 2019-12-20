import React from 'react';

export let Button = (props) => {
    return (
        <button className="button" onclick={ props.function }>{ props.name} </button>
    );
}