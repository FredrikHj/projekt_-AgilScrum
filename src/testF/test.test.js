/* eslint-env jest */
/* eslint-disable prefer-arrow-callback, func-names */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import StartPage from '../components/pages/startPage';
import LobbyPage from '../components/pages/lobbyPage';

Enzyme.configure({ adapter: new Adapter() });

describe('StartPage test', function () {
  it('Renders three <Lobby/> and its main', function () {
    const wrapper = shallow(<LobbyPage />);
    expect(wrapper.find('main').length).toBe(1);
  });

  it('Handle a userName input', function () {
    const wrapper = shallow(<StartPage />);
    expect(wrapper.find('.inputUsername').length).toBe(1);
  });
});
