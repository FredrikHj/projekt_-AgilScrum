# Sprint 1 (2019-12-16 - 2020-01-02)
> Scrum master: Emil

## Sprint plan

* Gemensamt komma överens om vad som ska ingå i projektet och hur arbetsflödet ska fungera
  * GitHub projects baserat på issues
  * Jest, mocha, supertest
  * Eslint (regler etc)
  * react-router-dom
  * husky (lintar & testar)
  * chess.js & chessground
* Deligera uppgifter
  * Fredrik - landing page, dum knapp som ska kunna återanvändas på flera ställen & lobby
  * Emil & Jonas - backend i express (GET /api/lobby & POST /api/lobby med tester), deployment & mock data
  * Rasmus - rendera ut brädet med hjälp av chess.js & chessground, routing

  <br/>
## Sprint review

Till största del uppfyllt ovanstående mål med sprinten. Överestimerade vad vi skulle hinna göra med tanke på jultider och andra roliga aktiviteter!

<br/>

### Frontend

**Landing page** fungerar som så att man väljer ett användarnamn som läggs i localstorage innan man blir skickad till lobbyn.

**Den dumma knappen** tar en funktion som props och boolean som avgör om den ska vara en länk eller knapp.

**Lobbyn** visar i nuläget vilket användarnamn som valts i landing page. Visar knappar för att skapa nytt spel men saknar funktionalitet just nu. Ska även visa en lista över aktiva spel. Hade först tänkt ha en modal som dök upp när vi skulle skapa nytt spel men valde att göra det enklare för oss genom ett inputfält då det inte behövdes mycket mer.

**chess.js & chessground** - brädet renderas ut, validering av drag finns men går ännu inte att spela mot varandra för backend har inte stöd. Även skrivit ett test för en utils funktion.

<br/>

### Backend

Försökte att deploya backend & frontend på heroku men lyckades inte riktigt som vi ville så Emil satte upp en egen server som backend ligger på. 

Implementerat **GET /api/lobby** & **POST /api/lobby** för att lista alla rum samt lägga till nya samt skrivit tester för båda endpoints.


# Sprint 2 (2020-01-02 - 2020-01-08)

## Sprint plan

### Frontend
* Landing page
  * Endast spara ett namn i localstorage
  * Tester
* Lobby
  * Endast innehålla ett namn
  * Lista aktiva spel till vänster
  * Skapa ett inputfält med knapp till höger för att skapa nytt spel
  * Gå med i ett spel
  * Tester
* Modal som ska kunna återanvändas
* Lista spelare i spelvyn
* Komponent för att rendera ut historiken av drag
* Positionera spelare beroende på färg av pjäser

### Backend
* POST /api/game/:id/move - göra ett drag
* GET /api/game/:id - hämta all data för ett spel
* POST /api/game/:id/join - gå med i ett spel
* Tester för dessa endpoints

