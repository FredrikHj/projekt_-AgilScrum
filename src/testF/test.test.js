/* eslint-env jest */
/* eslint-disable prefer-arrow-callback, func-names */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render } from 'enzyme';
import StartPage from '../components/pages/startPage';
import LobbyPage from '../components/pages/lobbyPage';
import PlayerList from '../components/PlayerList/PlayerList';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests', function () {
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

  describe('PlayerList component', function () {
    const mockPlayers = [{ id: '1', playerName: 'player1', color: 'white' }, { id: '2', playerName: 'player2', color: 'black' }];
    it('Should render 1 .player-list__container', function () {
      const wrapper = shallow(<PlayerList players={mockPlayers} turn="white" />);
      expect(wrapper.find('.player-list__container').length).toBe(1);
    });
    it('Should render 1 <ul> tag', function () {
      const wrapper = shallow(<PlayerList players={mockPlayers} turn="white" />);
      expect(wrapper.find('ul').length).toBe(1);
    });
    it('Should render 2 <li> tags', function () {
      const wrapper = shallow(<PlayerList players={mockPlayers} turn="white" />);
      expect(wrapper.find('ul').children().length).toBe(2);
    });
    it('Should render span with correct name', function () {
      const wrapper = render(<PlayerList players={mockPlayers} turn="white" />);
      expect(wrapper.find('span')[0].children[0].data).toEqual('player1');
      expect(wrapper.find('span')[1].children[0].data).toEqual('player2');
    });
  });
});
