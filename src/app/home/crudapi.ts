import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class crudapi {
    temp: any;
    constructor(private fs: AngularFirestore) { }

    readData() {
        return this.fs.collection('AEC').snapshotChanges();
    }
    addData() {

        this.temp = this.fs.collection('AEC');
        this.temp.add({
            img: 'https://s.isanook.com/mn/0/ud/13/69225/cambodia.jpg',
            cname: 'Cambodia',
            capital: 'Phnom Penh'
            // Other info you want to add here
        });

    }
    delData(docId: any) {
        return this.fs.doc('AEC/' + docId).delete();
    }
    updateData(docId: any) {
        return this.fs.doc('AEC/' + docId).update({
            img: 'https://img.kapook.com/u/2015/thachapol/zzz999999999/d11.jpg',
            cname: 'UUUU',
           
            // Other info you want to add here
        })

    }
}