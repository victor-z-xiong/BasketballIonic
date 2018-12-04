import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MainService{
    http: any;
    baseUrl: string;
    baseImageUrl: string;
    baseHockeyUrl: string;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = 'https://stats.nba.com/stats/';
        this.baseImageUrl = 'https://pixabay.com/api/?key=10756076-fd360053d1d3da2a3c30b4b4f';
        this.baseHockeyUrl = 'https://statsapi.web.nhl.com/api/v1/schedule';
    }

    getScoreBoardByDate(date){
        return this.http.get(this.baseUrl + 'scoreboard/?GameDate=' + date + '&LeagueID=00&DayOffset=0',
            { 'Content-Type': 'application/json' })
            .map(res => res.json());
    }

    getCityInfo(cityName){
        return this.http.get(this.baseImageUrl + '&q='+ cityName+'&image_type=photo&pretty=true&min_height=1200',
            { 'Content-Type': 'application/json' })
            .map(res => res.json());
    }

    getTeamInfoCommon(teamId){
        return this.http.get(this.baseUrl + 'teaminfocommon/?TeamID=' + teamId + '&Season=2018-19&SeasonType=Regular Season&LeagueID=00',
            { 'Content-Type': 'application/json' })
            .map(res => res.json());
    }

    getHockeyScoreBoardByDate(date){
        return this.http.get(this.baseHockeyUrl + '?date=' + date,
            { 'Content-Type': 'application/json' })
            .map(res => res.json());
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

    getHockeyCurrentDate() : string {
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
        
        return yyyy + '-' + mm + '-' + dd;
      }
    
}