/* File che mostra la classifica all'utente nella home page
*
* Copyright 2018 Carmine Zaccagnino
*
* Licensed under the EUPL, Version 1.1 or – as soon they
* will be approved by the European Commission - subsequent
* versions of the EUPL (the "Licence");
* You may not use this work except in compliance with the
* Licence.
* You may obtain a copy of the Licence at:
* https://joinup.ec.europa.eu/software/page/eupl
*
* Unless required by applicable law or agreed to in
* writing, software distributed under the Licence is
* distributed on an "AS IS" basis,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
* express or implied.
* See the Licence for the specific language governing
* permissions and limitations under the Licence.
*/

'use strict';

const inter = 1;
const juve = 2;
const napoli = 3;
const milan = 4;
const lazio = 5;
const parma = 0;
const sampdoria = 6;
const roma = 7;
const frosinone = 8;
const torino = 9;
const atalanta = 10;
const spal = 11;
const empoli = 12;
const chievo = 13;
const fiorentina = 14;
const udinese = 15;
const genoa = 16;
const sassuolo = 17;
const cagliari = 18;
const bologna = 19;
const quotaCS = 2.5;
const quotaGS = 1.5;
const quotaGF = 1.3;

class Squadra {
  nomeSquadra: string;
  alias: string[];
  punti: number;
  puntiTrad: number;
  golfatti: number;
  golsubiti: number;
  sconfitte: number;
  pareggi: number;
  vittorie: number;
  somma: number;
  constructor(nome: string) {
    this.nomeSquadra = nome;
    this.punti = 0;
    this.puntiTrad = 0;
    this.golfatti = 0;
    this.golsubiti = 0;
    this.pareggi = 0;
    this.sconfitte = 0;
    this.vittorie = 0;
    this.somma = 0;
    this.alias = [];
  }
  aggiungipartita(GFa, GSa) {
    if (GFa > GSa) {
      this.puntiTrad = this.puntiTrad + 3;
      this.vittorie = this.vittorie + 1;
    }
    if (GFa == GSa) {
      this.puntiTrad = this.puntiTrad + 1;
      this.pareggi = this.pareggi + 1;
    }
    if (GFa < GSa)  {
      this.sconfitte = this.sconfitte + 1;
    }

    if (GSa == 0) {
      this.punti = this.punti + quotaCS;
    } else {
      if (GSa == 1) {
        this.punti = this.punti + 1.5;
      }
    }
    if (GFa > 0) {
      this.punti = this.punti + 1.3;
    }
    this.golfatti = this.golfatti+GFa;
    this.golsubiti = this.golsubiti+GSa;
  }
  getPunti(): number {
    return this.punti;
  }
  getPuntiTrad(): number {
    return this.puntiTrad;
  }
  getGolFatti(): number {
    return this.golfatti;
  }
  getGolSubiti(): number  {
    return this.golsubiti;
  }
  getVittorie(): number {
    return this.vittorie;
  }
  getPareggi(): number  {
    return this.pareggi;
  }
  getSconfitte(): number  {
    return this.sconfitte;
  }
  azzeraPunti() {
    this.punti=0;
  }
  azzeraPuntiTrad() {
    this.puntiTrad=0;
  }
  resettaGol()  {
    this.golfatti = 0;
    this.golsubiti = 0;
  }
  resettaPartiteVintePersePareggiate()  {
    this.vittorie = 0;
    this.pareggi = 0;
    this.sconfitte = 0;
  }
  calcolaSomma()  {
    this.somma = this.punti + this.puntiTrad;
  }
  getSomma()  {
    return this.somma;
  }
  aggiungiAlias(alias: string[])  {
    if(alias) {
      alias.forEach(al =>  {
        this.alias.push(al);
      })
    }
  }
};

var Inter = new Squadra("Inter");
var Juve = new Squadra("juventus");
Juve.aggiungiAlias([
  "Juventus",
  "Juve",
  "juve"
])
var Napoli = new Squadra("Napoli");
var Milan = new Squadra("Milan");
var Lazio = new Squadra("Lazio");
var Frosinone = new Squadra("Frosinone");
var Sampdoria = new Squadra("Sampdoria");
var Roma = new Squadra("Roma");
var Empoli = new Squadra("Empoli");
var Torino = new Squadra("Torino");
var Atalanta = new Squadra("Atalanta");
var Spal = new Squadra("Spal");
Spal.aggiungiAlias([
  "SPAL"
])
var Parma = new Squadra("Parma");
var Chievo = new Squadra("Chievo");
Chievo.aggiungiAlias([
  "ChievoVerona",
  "Chievo Verona"
])
var Fiorentina = new Squadra("Fiorentina");
var Udinese = new Squadra("Udinese");
var Genoa = new Squadra("Genoa");
var Sassuolo = new Squadra("Sassuolo");
var Cagliari = new Squadra("Cagliari");
var Bologna = new Squadra("Bologna");

var squadre = new Array(20);

var partite;

function carica() {
  $.getJSON("/api/partite", function (p) {
    alert("CARICATO!");
    partite = p;
    return 0;
  });
  squadre[inter] = Inter;
  squadre[juve] = Juve;
  squadre[milan] = Milan;
  squadre[sampdoria] = Sampdoria;
  squadre[torino] = Torino;
  squadre[roma] = Roma;
  squadre[parma] = Parma;
  squadre[empoli] = Empoli;
  squadre[atalanta] = Atalanta;
  squadre[spal] = Spal;
  squadre[frosinone] = Frosinone;
  squadre[chievo] = Chievo;
  squadre[fiorentina] = Fiorentina;
  squadre[napoli] = Napoli;
  squadre[bologna] = Bologna;
  squadre[cagliari] = Cagliari;
  squadre[genoa] = Genoa;
  squadre[sassuolo] = Sassuolo;
  squadre[lazio] = Lazio;
  squadre[udinese] = Udinese;

  $.getJSON("/api/giornata", function(g) {
      console.log(g);
      calcola(g);
      for(let i = g; i > 0; i--) {
        let li: HTMLLIElement = document.createElement("li");
        let input: HTMLInputElement = document.createElement("input");
        let label: HTMLLabelElement = document.createElement("label");

        input.type = "radio";
        input.onclick = () => {calcola(i)};

        label.innerText = `Giornata ${i}`;

        if(i == g) {
          input.checked = true;
        } else {
          input.checked = false;
        }

        $(li).append(input);
        $(li).append(label);
        $("#lista").append(li);
      }

  });
  return 0;
}


function calcola(giornata) {

  for(let p of partite) {
    if(p.giornata < giornata)
      partita(p.team1, p.team2, p.goal1, p.goal2);
  }
  squadre.sort((a, b) => b.somma - a.somma)
  let i = 0;
  for(let squadra of squadre) {
    let fila: HTMLTableRowElement = document.createElement("tr");
    let pos: HTMLTableCellElement = document.createElement("td");
    let nom: HTMLTableCellElement = document.createElement("td");
    let gF: HTMLTableCellElement = document.createElement("td");
    let gS: HTMLTableCellElement = document.createElement("td");
    let dR: HTMLTableCellElement = document.createElement("td");
    let trad: HTMLTableCellElement = document.createElement("td");
    let alt: HTMLTableCellElement = document.createElement("td");
    let som: HTMLTableCellElement = document.createElement("td");

    pos.innerText = `${i}`;
    nom.innerText = squadra.nomeSquadra;
    gF.innerText = `${squadra.getGolFatti}`;
    gS.innerText = `${squadra.getGolSubiti}`;
    dR.innerText = `${squadra.getGolFatti-squadra.getGolSubiti}`;
    trad.innerText = `${squadra.getPuntiTrad}`;
    alt.innerText = `${squadra.getPunti}`;
    som.innerText = `${squadra.getPunti+squadra.getPuntiTrad}`;


    $(fila).append(pos);
    $(fila).append(nom);
    $(fila).append(gF);
    $(fila).append(gS);
    $(fila).append(dR);
    $(fila).append(trad);
    $(fila).append(alt);
    $(fila).append(som);

    $("#tabella").append(fila);
    i++;
  }
}

function partita(squadra1, squadra2, goal1, goal2) {
  for (let corrente of squadre)  {
    if(corrente.nomeSquadra.toLowerCase() == squadra1.toLowerCase())       corrente.aggiungipartita(goal1,goal2);
    else if(corrente.nomeSquadra.toLowerCase() == squadra2.toLowerCase())  corrente.aggiungipartita(goal2,goal1);
    else {
      for (let al of corrente.alias)  {
        if(al.toLowerCase() == squadra1.toLowerCase())       corrente.aggiungipartita(goal1,goal2);
        else if(al.toLowerCase() == squadra2.toLowerCase())  corrente.aggiungipartita(goal2,goal1);
      }
    }
  }
}
