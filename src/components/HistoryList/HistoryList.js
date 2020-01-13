import React from 'react';
import './HistoryList.css';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function HistoryList({ history }) {
  return (
    <div className="history-list__container">
      <TransitionGroup className="history-list__list" component="ul">
        {
                    history
                      ? history.map((move, idx) => (
                        <CSSTransition key={move.id} timeout={300} classNames="history-list__slide">
                          <li key={move.id} className="history-list__list-item">
                            <div className="history-list__list-number">
                                #
                              {idx + 1}
                            </div>
                            <div>
                              <div className="history-list__name">{move.name}</div>
                              <div className="history-list__move">
                                {move.from}
                                {' '}
                                <FontAwesomeIcon icon={faLongArrowAltRight} size="lg" style={{ color: '#bbb' }} />
                                {' '}
                                {move.to}
                              </div>
                            </div>
                          </li>
                        </CSSTransition>
                      )).reverse()
                      : null
                }
      </TransitionGroup>
    </div>
  );
}

export default HistoryList;
