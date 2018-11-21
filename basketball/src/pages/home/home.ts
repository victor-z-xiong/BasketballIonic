import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MainService } from '../../app/services/main.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scoreboardReponse: any;
  cityUrl: any;
  linescoreItems: any;
  linescoreIndex: number;
  //mapCityToImageURL: any;   
  games: any;
  gameDate: any;

  constructor(public navCtrl: NavController, private mainService: MainService) {
    this.scoreboardReponse = null;
    this.linescoreItems = null;
    this.linescoreIndex = 0;
    this.games = [];
    this.gameDate = this.getCurrentDate().replace("/", "-").replace("/", "-");
  }

  getCurrentDate() : string {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
        dd = parseInt('0'+dd)
    } 
    
    if(mm<10) {
        mm = parseInt('0'+mm)
    } 
    
    return mm + '/' + dd + '/' + yyyy;
  }

  ngOnInit(){
    this.mainService.getScoreBoardByDate(this.getCurrentDate()).subscribe(response => {
     this.scoreboardReponse = response;
     this.linescoreItems = this.scoreboardReponse.resultSets[1].rowSet;
     this.constructGamesObject();
     this.assignGameBackgroundUrls();
    });
  }

  setDate(){
    var date = this.gameDate.replace("-", "/").replace("/", "-");
    this.mainService.getScoreBoardByDate(date).subscribe(response => {
      this.scoreboardReponse = response;
      this.linescoreItems = this.scoreboardReponse.resultSets[1].rowSet;
      this.games = [];
      this.constructGamesObject();
      this.assignGameBackgroundUrls();
     });
  }

  mapCityImageUrlByName(game){
    this.mainService.getCityInfo(game.homeTeamCity).subscribe(response => {
      game.gameBackgroundUrl = response.hits[0].largeImageURL;
     });
  }

  assignGameBackgroundUrls(){
    for(var i = 0; i < Object.keys(this.games).length; i++){
      this.mapCityImageUrlByName(this.games[i]);
    }
  }

  constructGamesObject(){
    for(var i = 0; i < Object.keys(this.linescoreItems).length; i+=2){
      var g : {homeTeamCity: string; awayTeamCity: string; gameBackgroundUrl: string; homeTeamScore: number; awayTeamScore: number; } 
      = {homeTeamCity: '', awayTeamCity: '', gameBackgroundUrl: '', homeTeamScore: 0, awayTeamScore: 0};
          g.homeTeamCity=this.linescoreItems[i][5] == "LA" ? this.linescoreItems[i][4] : this.linescoreItems[i][5];
          g.homeTeamScore= this.linescoreItems[i][21] == null ? "N/A" : this.linescoreItems[i][21];
          g.awayTeamCity=this.linescoreItems[i+1][5] == "LA" ? this.linescoreItems[i+1][4] : this.linescoreItems[i+1][5];
          g.awayTeamScore=this.linescoreItems[i+1][21] == null ? "N/A" : this.linescoreItems[i+1][21];
          this.games.push(g);
    }
  }
}
