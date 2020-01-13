/* eslint-disable react/button-has-type */

import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './Button.css';

const Button = (props) => {
  const {
    patchLink, patchTo, name, bFunction, type, addedClassNames,
  } = props;
  return (
    <>
      {(patchLink === true)
        ? (
          <Link to={patchTo}>
            <button type={type} className="button">{name}</button>
          </Link>
        )

        : <button type={type} className={`button ${addedClassNames}`} onClick={bFunction}>{name}</button>}
    </>
  );
};
export default Button;
