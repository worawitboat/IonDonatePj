import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class crudapi {
    temp: any;
    constructor(private fs: AngularFirestore) { }

    readData() {
        return this.fs.collection('donatePlace').snapshotChanges();
    }
    addData(item:any) {

        this.temp = this.fs.collection('donatePlace');
        this.temp.add(item);

    }
    delData(docId: any) {
        return this.fs.doc('donatePlace/' + docId).delete();
    }
    updateData(item) {
        return this.fs.doc('donatePlace/' + item.id).update(item);

    }
}