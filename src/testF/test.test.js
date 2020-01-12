/* eslint-env jest */
/* eslint-disable prefer-arrow-callback, func-names */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render } from 'enzyme';
import StartPage from '../components/pages/startPage';
import LobbyPage from '../components/pages/lobbyPage';
import PlayerList from '../components/PlayerList/PlayerList';
import HistoryList from '../components/HistoryList/HistoryList';
import Modal from '../components/Modal/Modal';
import PromotionList from '../components/PromotionList/PromotionList';
import Chessboard from '../components/ChessBoard/ChessBoard';

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

  describe('HistoryList component', function () {
    const mockHistory = [
      {
        id: '1', name: 'player1', from: 'f2', to: 'f3',
      },
      {
        id: '2', name: 'player2', from: 'e7', to: 'e5',
      },
      {
        id: '3', name: 'player1', from: 'g2', to: 'g4',
      },
      {
        id: '4', name: 'player2', from: 'e1', to: 'e2',
      },
    ];
    it('Should render 1 .history-list__container', function () {
      const wrapper = shallow(<HistoryList history={mockHistory} />);
      expect(wrapper.find('.history-list__container').length).toBe(1);
    });
    it('Should render three <li> tags', function () {
      const wrapper = shallow(<HistoryList history={mockHistory} />);
      expect(wrapper.find('li').length).toBe(4);
    });
    it('Should render reversed', function () {
      const wrapper = render(<HistoryList history={mockHistory} />);
      expect(wrapper.find('.history-list__name')[0].children[0].data).toEqual('player2');
      expect(wrapper.find('.history-list__name')[1].children[0].data).toEqual('player1');
      expect(wrapper.find('.history-list__name')[2].children[0].data).toEqual('player2');
      expect(wrapper.find('.history-list__name')[3].children[0].data).toEqual('player1');
    });
  });

  describe('Modal component', function () {
    it('Should render Modal', function () {
      const wrapper = shallow(<Modal title="Test" content={<p className="test-content">test content</p>} show />);
      expect(wrapper.find('.modal-container').length).toBe(1);
    });
    it('Should render content correctly', function () {
      const wrapper = shallow(<Modal title="Test" content={<p className="test-content">test content</p>} show />);
      expect(wrapper.find('.test-content').length).toBe(1);
      expect(wrapper.find('.test-content').text()).toEqual('test content');
    });
    it('Should call function when close btn is pressed', function () {
      const mockFunc = jest.fn();
      const wrapper = shallow(<Modal title="Test" content={<p className="test-content">test content</p>} show close={mockFunc} />);
      wrapper.find('.close-btn').simulate('click');
      expect(mockFunc.mock.calls.length).toEqual(1);
    });
  });

  describe('PromotionList component', function () {
    
    it('Should render PromotionList', function () {
      const wrapper = shallow(<PromotionList color="white" />);
      expect(wrapper.find('.promotion-container').length).toBe(1);
    });
    it('Should render four buttons', function () {
      const wrapper = shallow(<PromotionList color="white" />);
      expect(wrapper.find('button').length).toBe(4);
    });
    it('Should render buttons with correct classes', function () {
      const wrapper = shallow(<PromotionList color="white" />);
      expect(wrapper.find('.promotion__queen-white').length).toBe(1);
      expect(wrapper.find('.promotion__rook-white').length).toBe(1);
      expect(wrapper.find('.promotion__knight-white').length).toBe(1);
      expect(wrapper.find('.promotion__bishop-white').length).toBe(1);
    });
    it('Should render black pieces if color=black', function () {
      const wrapper = shallow(<PromotionList color="black" />);
      expect(wrapper.find('.promotion__queen-black').length).toBe(1);
      expect(wrapper.find('.promotion__rook-black').length).toBe(1);
      expect(wrapper.find('.promotion__knight-black').length).toBe(1);
      expect(wrapper.find('.promotion__bishop-black').length).toBe(1);
    });
    it('Should call function when a button is clicked', function () {
      const mockFunc = jest.fn();
      const wrapper = shallow(<PromotionList color="white" promoteFunc={mockFunc} />);
      wrapper.find('.promotion__queen-white').simulate('click');
      expect(mockFunc.mock.calls.length).toEqual(1);
    });
  });

  describe('Chessboard component', function () {
    it('Should render board', function () {
      const wrapper = shallow(<Chessboard fenKey="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" color="white" />);
      expect(wrapper.find('.board').length).toBe(1);
    });
  });
});
