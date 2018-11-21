import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MainService{
    http: any;
    baseUrl: string;
    baseImageUrl: string;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = 'https://stats.nba.com/stats/';
        this.baseImageUrl = 'https://pixabay.com/api/?key=10756076-fd360053d1d3da2a3c30b4b4f';
    }

    getScoreBoardByDate(date){
        return this.http.get(this.baseUrl + 'scoreboard/?GameDate=' + date + '&LeagueID=00&DayOffset=0',
            { 'Content-Type': 'application/json' })
            .map(res => res.json());
    }

    getCityInfo(cityName){
        return this.http.get(this.baseImageUrl + '&q='+ cityName+'&image_type=photo&pretty=true',
            { 'Content-Type': 'application/json' })
            .map(res => res.json());
    }

    getTeamInfoCommon(teamId){
        return this.http.get(this.baseUrl + 'teaminfocommon/?TeamID=' + teamId + '&Season=2018-19&SeasonType=Regular Season&LeagueID=00',
            { 'Content-Type': 'application/json' })
            .map(res => res.json());
    }
}