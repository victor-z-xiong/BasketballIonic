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
  mapCityToImageURL: any;   

  constructor(public navCtrl: NavController, private mainService: MainService) {
    this.scoreboardReponse = null;
    this.linescoreItems = null;
    this.linescoreIndex = 0;
    this.mapCityToImageURL = {};
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
     this.initCityImageMap(this.linescoreItems);
    });
  }

  initCityImageMap(linescoreItems){
    var cityName = '';
    linescoreItems.forEach(element => {
      cityName = element[5];
      this.mapCityImageUrlByName(cityName);
    });
  }

  mapCityImageUrlByName(cityName){
    this.mainService.getCityInfo(cityName).subscribe(response => {
      this.mapCityToImageURL[cityName] = response.hits[0].largeImageURL;
     });
  }
}
