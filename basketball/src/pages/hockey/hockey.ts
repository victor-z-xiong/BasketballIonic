import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainService } from '../../app/services/main.service';

/**
 * Generated class for the HockeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hockey',
  templateUrl: 'hockey.html',
})
export class HockeyPage {
  scoreboardReponse: any;
  games: any;
  gameObjArr: any;
  gameDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mainService: MainService) {
    this.constructScoreBoard(this.mainService.getHockeyCurrentDate());
  }

  constructScoreBoard(date){
    this.mainService.getHockeyScoreBoardByDate(date).subscribe(response => {
     this.gameObjArr = [];
     this.games = [];
     this.scoreboardReponse = response;
     this.games = this.scoreboardReponse.dates[0].games;
     this.makeGameObj();
     this.assignGameBackgroundUrls();
    });
  }

  setDate(){
    this.constructScoreBoard(this.gameDate);
  }

  makeGameObj(){
    this.games.forEach(game => {
      var g : {homeTeamCity: string; awayTeamCity: string; gameBackgroundUrl: string; homeTeamScore: number; awayTeamScore: number; } 
      = {homeTeamCity: '', awayTeamCity: '', gameBackgroundUrl: '', homeTeamScore: 0, awayTeamScore: 0};
          g.homeTeamCity=(<any>game).teams.home.team.name;
          g.homeTeamScore= (<any>game).teams.home.score;
          g.awayTeamCity=(<any>game).teams.away.team.name;
          g.awayTeamScore=(<any>game).teams.away.score;
          this.gameObjArr.push(g);
    });
  }

  mapCityImageUrlByName(game){
    var cityName = game.homeTeamCity.substring(0, game.homeTeamCity.lastIndexOf(" "));
    this.mainService.getCityInfo(cityName).subscribe(response => {
      game.gameBackgroundUrl = response.hits[1].largeImageURL;
     });
  }

  assignGameBackgroundUrls(){
    for(var i = 0; i < Object.keys(this.gameObjArr).length; i++){
      this.mapCityImageUrlByName(this.gameObjArr[i]);
    }
  }
}
