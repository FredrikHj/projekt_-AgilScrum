import React from 'react';
import {
  Link,
} from 'react-router-dom';

const Button = (props) => {
  const {
    patchLink, patchTo, name, bFunction,
  } = props;
  return (
    <>
      {(patchLink === true)
        ? (
          <Link to={patchTo}>
            <button type="button" className="button">{ name }</button>
          </Link>
        )

        : <button type="button" className="button" onClick={bFunction}>{ name }</button>}
    </>
  );
};
export default Button;
