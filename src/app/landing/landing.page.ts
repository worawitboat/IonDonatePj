import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { crudapi } from './crudapi';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  tempObj: any;
  constructor(private fireStore: AngularFirestore, private getCrud: crudapi, private router: Router) { }

  ngOnInit() {
    this.getCrud.readData().subscribe(data => {
      this.tempObj = data.map(e => {
        return {
          id: e.payload.doc.id,
          img: e.payload.doc.data()['img'.toString()],
          dname: e.payload.doc.data()['dname'.toString()],
          lat: e.payload.doc.data()['lat'.toString()],
          lng: e.payload.doc.data()['lng'.toString()],
          title: e.payload.doc.data()['title'.toString()],
          des: e.payload.doc.data()['des'.toString()],
          status: e.payload.doc.data()['status']
        }
      });
      console.log(this.tempObj);
    });
  }
  detail(item) {
    const data = JSON.stringify(item);
    this.router.navigate(['/home', data]);
  }

  presentAlertPrompt() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Edit';
    alert.inputs = [
      {
        name: 'img',
        id: 'img',
        placeholder: 'Image'
      },
      {
        name: 'dname',
        id: 'dname',
        placeholder: 'name'
      },
      {
        name: 'lat',
        id: 'lat',
        placeholder: 'Lagitude'
      },
      {
        name: 'lng',
        id: 'lng',
        placeholder: 'Longitude'
      },
      {
        name: 'title',
        id: 'title',
        placeholder: 'Title'
      },
      {
        name: 'des',
        id: 'des',
        placeholder: 'description'
      },
    ];
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel')
        }
      }, {
        text: 'Ok',
        handler: (i) => {
          let item = {
            img: i.img,
            dname: i.dname,
            title: i.title,
            des: i.des,
            lat: i.lat,
            lng: i.lng,
            status: true
          }
          this.getCrud.addData(item);
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

}
