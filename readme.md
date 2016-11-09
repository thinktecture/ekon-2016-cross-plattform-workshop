# EKON 20 - November 2016 - Workshop 

##Voraussetzungen
* Node: https://nodejs.org/en/

## Project structure

* _build_: Enthält nach dem Build alle Dateien des Clients
* _api_: Enthält den Serveranteil der Anwendung
* _client_: Demo-Applikation mit Angular 2

## Setup Instructions

Um das Setup für die Demo-Applikation zu starten den Befehl `npm install` im Ordner `client` und im Ordner `api` ausführen.

Um die API zu starten im Ordner `api` den Befehl `npm start` ausführen. Die API ist nun über den Port `8000` erreichbar.

Um die Angular 2 Anwendung zu starten muss der Befehl `npm start` im Ordner `client` ausgeführt werden. Damit wird unter anderem ein Web-Server `http://localhost:8020/` gestartet.

Damit API und Client miteinander kommunizieren können muss die API-Url in der Datei `client/src/app/services/pokemonService.ts` angepasst werden: `this._baseUrl = 'http://ip-der-api:8000';`
