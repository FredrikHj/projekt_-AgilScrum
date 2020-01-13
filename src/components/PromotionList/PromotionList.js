import React from 'react';
import './PromotionList.css';

function PromotionList({ color, promoteFunc }) {
  return (
    <div className="promotion-container">
      {
                color === 'white'
                  ? (
                    <>
                      <button type="button" aria-label="white queen" className="promotion__piece-btn promotion__queen-white" onClick={() => promoteFunc('q')} />
                      <button type="button" aria-label="white rook" className="promotion__piece-btn promotion__rook-white" onClick={() => promoteFunc('r')} />
                      <button type="button" aria-label="white knight" className="promotion__piece-btn promotion__knight-white" onClick={() => promoteFunc('n')} />
                      <button type="button" aria-label="white bishop" className="promotion__piece-btn promotion__bishop-white" onClick={() => promoteFunc('b')} />
                    </>
                  )
                  : (
                    <>
                      <button type="button" aria-label="black queen" className="promotion__piece-btn promotion__queen-black" onClick={() => promoteFunc('q')} />
                      <button type="button" aria-label="black rook" className="promotion__piece-btn promotion__rook-black" onClick={() => promoteFunc('r')} />
                      <button type="button" aria-label="black knight" className="promotion__piece-btn promotion__knight-black" onClick={() => promoteFunc('n')} />
                      <button type="button" aria-label="black bishop" className="promotion__piece-btn promotion__bishop-black" onClick={() => promoteFunc('b')} />
                    </>
                  )
            }

    </div>
  );
}

export default PromotionList;
