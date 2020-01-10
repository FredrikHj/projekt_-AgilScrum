/* eslint-env jest */
/* eslint-disable prefer-arrow-callback, func-names */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import StartPage from '../components/pages/startPage';
import LobbyPage from '../components/pages/lobbyPage';

Enzyme.configure({ adapter: new Adapter() });

describe('StartPage test', function () {
  it('Handle a userName input', function () {
    const wrapper = shallow(<StartPage />);
    expect(wrapper.find('.inputUsername').length).toBe(1);
  });
  it('Render three <Lobby/> class = lobby-container inclusive 2 children components, named: GameList and GameCreation', function () {
    const wrapper = shallow(<LobbyPage />);
    expect(wrapper.find('.lobby-container').children().length).toBe(2);
    expect(wrapper.find('Gamelist'));
    expect(wrapper.find('GameCreation'));
  });
});
