# API endpoints

### GET /api/lobby
Returns all active games

##### Responses

**200**
###### Example
```JSON
[
  {
       "id": "d9a10f80-3213-11ea-bf22-01476b9db8dd",
       "gameName": "katlas feared cave",
       "players": [
           {
               "id": "d9a10f81-3213-11ea-bf22-01476b9db8dd",
               "playerName": "katla",
               "color": "white"
           }
       ],
       "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
       "history": []
   }
]
```

<br/>

### POST /api/lobby
Creates a new game

#### Parameters

**gameName** - desired name of the game created

**playerName** - name of the player that creates the game

###### Example
```JSON
{
  "gameName": "katlas feared cave",
  "playerName": "katla"
}
```

##### Responses

**201** - successful operation

###### Example

```JSON
{
    "id": "d9a10f80-3213-11ea-bf22-01476b9db8dd",
    "gameName": "katlas feared cave",
    "players": [
        {
            "id": "d9a10f81-3213-11ea-bf22-01476b9db8dd",
            "playerName": "katla",
            "color": "white"
        }
    ],
    "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "history": []
}
```

**400** - missing parameters


<br/>


### GET /api/game/:id
Returns all data for a specified game

##### Parameters

**id** - ID of game that you want data from

<br/>

##### Responses

**200** - successful operation

**404** - game not found

<br/>



### DELETE /api/game/:id
Deletes the specified game

##### Parameters

**id** - ID of game that you want to delete

<br/>

##### Responses

**200** - successful operation

**404** - game not found

<br/>

### POST /api/game/:id/join
Used to join a specific game

##### Parameters

**id** - ID of game that you want to join

**playerName** - name of the player that should join the game

###### Example
```JSON
{
  "playerName": "tengil"
}
```

##### Responses

**200** - successful operation

###### Example

```JSON
{
    "message": "joined",
    "player": {
        "id": "344703c0-3216-11ea-bf22-01476b9db8dd",
        "playerName": "tengil",
        "color": "black"
    },
    "gameId": "d9a10f80-3213-11ea-bf22-01476b9db8dd"
}
```

**400** - missing parameters

**403** - game is full

**404** - game not found

<br/>



### POST /api/game/:id/move
Used to make a move on the chessboard in the specified game

##### Parameters

**id** - ID of game game where the player makes a move

**newMove** - object containing new fen key along with the actual move

###### Example

```JSON
    {
      "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "move": {"name": "tengil", "from": "e4", "to": "e6"}
    }
```


##### Responses

**200** - successful operation

**400** - missing parameters






