import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { crudapi } from './crudapi';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  id;
  dname;
  img;
  title;
  des;
  lat;
  lng;
  status;
  constructor(private ModalController: ModalController, private getCrud: crudapi, private router: Router) { }

  ngOnInit() {
  }
  async closeModal() {
    await this.ModalController.dismiss();
  }

  presentAlertPromptEdit() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Edit';
    alert.inputs = [
      {
        name: 'img',
        id: 'img',
        value: this.img,
        placeholder: 'Image'
      },
      {
        name: 'dname',
        id: 'dname',
        value: this.dname,
        placeholder: 'name'
      },
      {
        name: 'lat',
        id: 'lat',
        value: this.lat,
        placeholder: 'Lagitude'
      },
      {
        name: 'lng',
        id: 'lng',
        value: this.lng,
        placeholder: 'Longitude'
      },
      {
        name: 'title',
        id: 'title',
        value: this.title,
        placeholder: 'Title'
      },
      {
        name: 'des',
        id: 'des',
        value: this.des,
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
        handler: async (i) => {
          let item = {
            id: this.id,
            img: i.img,
            dname: i.dname,
            title: i.title,
            des: i.des,
            lat: i.lat,
            lng: i.lng,
          }
          this.getCrud.updateData(item);
          await this.ModalController.dismiss()
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }


  presentAlertConfirm() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Do you want to delete!';
    // alert.message = 'Message <strong>text</strong>!!!';
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {

        }
      }, {
        text: 'Okay',
        handler: () => {
          this.getCrud.delData(this.id).then(async () => {
            await this.ModalController.dismiss()
            this.router.navigate(['landing'])
          }
          );
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }
}
