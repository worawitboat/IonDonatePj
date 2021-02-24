import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ModalController} from '@ionic/angular';
import { GoogleMapOptions, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { crudapi } from './crudapi';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: any;
  data: any;
  constructor(public activatedRoute: ActivatedRoute, 
    private fireStore: AngularFirestore, 
    private getCrud: crudapi, 
    private ModalController: ModalController) { }



  ngOnInit() {
    const data = this.activatedRoute.snapshot.paramMap.get('data');
    this.data = JSON.parse(data);
    this.initMap();
  }

  async presentModal() {
    const modal = await this.ModalController.create({
      component: ModalPage,
      componentProps: {
        id:this.data.id,
        dname: this.data.dname,
        img: this.data.img,
        title: this.data.title,
        lat:this.data.lat,
        lng:this.data.lng,
        des: this.data.des,
        status: this.data.status
      }
    })
    return await modal.present();

  }

  initMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: Number(this.data.lat),
          lng: Number(this.data.lng)
        },
        zoom: 18,
        tilt: 30,

      },
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
            lat: Number(this.data.lat),
            lng: Number(this.data.lng)
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
