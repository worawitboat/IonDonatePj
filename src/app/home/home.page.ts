import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GoogleMapOptions, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { crudapi } from './crudapi';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tempObj: any;
  map: any;
  constructor(private fireStore: AngularFirestore, private getCrud: crudapi) { }


  ngOnInit() {
    this.getCrud.readData().subscribe(data => {
      this.tempObj = data.map(e => {
        return {
          id: e.payload.doc.id,
          img: e.payload.doc.data()['img'.toString()],
          cname: e.payload.doc.data()['cname'.toString()],
          capital: e.payload.doc.data()['capital'.toString()]
        }
      });
      console.log(this.tempObj);
    });
      this.initMap();
  }

  initMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas',
      mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
              });
          });
      });

  }

}
