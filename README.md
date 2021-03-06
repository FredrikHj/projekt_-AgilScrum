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
> Scrum master: Jonas

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


## Sprint review

<br/>

**Backenddelen** : Helt klar, med reservation för att fixa buggar. 

**Frontenddelen** : Inte helt klar. 
Vi har följande kvar:
* Att rendera ut aktivar spel och att användare ska kunna gå med i ett spel
* Hantera speldraget "shack"
* Hantera om spelare "ger upp" eller lämnar
* Tester 

**Tester**: Fredrik fortsätter med tester till nästa sprint då han inte blev klar till denna sprint.

**Lista aktva spel & gå med i spel**: Dessa Issues blev inte klara för testerna drog ut på tiden. Fredrik fortsätter med tester. Emil och Jonas tar över dessa issues.

**Färdigt issues** : Resterande Issues blev klara.  

### Retrospektiv

Fredrik tyckte han skulle ha vara mer uppmärksam på lektionerna som handlade om tester.

Rasmus tyckte att han kunde ha förbättrat sin kodstruktur.

Emil och Jonas som har jobbat med servern, tyckte att de kunde ha gjort fler utförliga tester.

## Sprint 3 (2020-01-08 - 2020-01-13)
> Scrum master: Rasmus & Fredrik

## Sprint plan

### Frontend
* Landing page
    * Lite mer styling

* Lobby page
    * Skriva tester

* Game page
    * Hantering av (game_over) schack matt
    * Hantering när spelare lämnar spelet
    * Kopplingen vid join av game
    * Skriva tester

### Backend
Allt ska vara färdigt, om inte buggar hittas

## Sprint review

**Frontenddelen** : 
* Landing page
    * Vi har ändrat typen av knappen till en submit
    * Gjort om styling av sidan så den matchar resten av sidor

* Lobby page
    * Polling i lobbyn är fixad (Memory leak bug fixad)
    * Join game funktionalitet tillagd
    * Create game funktionalitet tillagd
    * Gjort om styling av sidan så den matchar resten av sidor
    * Bug fixad när spelare haft samma namn. (Sätter även ID i localStorage)
    * Game list tillagd, renderar ut alla spel

* Game page
    * Piece promotion tillagd, kan välja mellan fyra pjäser.
    * Funktionalitet om spelare hamnar i schack
    * Bug fixad när spelare haft samma namn. (Hämtar istället ID från localStorage)
    * History list tillagd (Bug fixad med reverse)
    * Hantering så spelplanen är rättvänd relativt till vilken färg man är tilldelad
    * Spel resultat modaler tillagda, både för schack matt och "ge upp"
    * funktionalitet när spelare ger upp, tar bort spelet från servern

* Tester
    * Tester skrivna för Landing page
    * Tester skrivna för Lobby page
    * Tester skrivna för de flesta komponenter som används på Game page
    * fixade så jest/enzyme tester körs via husky (fixat så det inte fastnar i watch mode)
    
**Backenddelen**
* Dokumentation för alla endpoints skapad

### Retrospektiv

**Fredrik**

**+** Fredrik var nöjd med testerna som skrivits och känner att han lärt sig mer om testing.

**-**

**Jonas**

**+** Nöjd med styling för Lobby och Landingpage

**+** Fått en ny uppfattning av tester och hur kraftfullt det är

**+** Fått en större förståelse över hur man arbetar i olika branches

**+** Gått smidigt att arbeta i grupp

**-** Fler issues än det som var planerat kom till efter hand

**Emil**

**+** Nöjd med slutresultatet

**+** Grupp dynamiken har fungerat utmärkt

**+** Fått jobba och lära mig mer om tester

**-** Känt mig smått blockerad när många PR:s legat ute samtidigt

**Rasmus**

**+** Tycker vi har haft bra kommunikation

**+** Vi har klarat sprinten

**+** Vi har skrivit många bra tester

**+** Arbetet i gruppen har fungerat bra, vi har inte krockat med varandra (inte mycket konflikter)

**-** Känt mig smått blockerad när många PR:s legat ute samtidigt

**-** Blev blockarede av husky jest/enzyme kördes i watch mode och vi kunde då inte commita. Lösningen fanns redan i en PR så var inte så länge.