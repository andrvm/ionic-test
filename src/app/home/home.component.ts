import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../shared/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../services/auth.service';
import { Item } from '../shared/item.model';
import { ToastController } from '@ionic/angular';
import { BaseAbstractClass } from '../shared/abstract-base.class';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent extends BaseAbstractClass implements OnInit {

  user: User;
  userItems: any;

  constructor(
      private fireStore: AngularFirestore,
      public authService: AuthenticationService,
      public toastController: ToastController) {
    super(toastController);
  }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    this.getData();
  }

  getData() {
    this.userItems = this.fireStore.collection<any>('items').valueChanges();
  }

  done(userItem: Item) {
    this.fireStore.collection('items').doc(userItem.id)
        .set({
          done: !userItem.done,
          authorDoneName: this.user ? this.user.displayName : 'unknown user'
        }, { merge: true })
        .then( () => {
          this.presentToast('Ваше дело успешно обновлено');
        })
        .catch(() => {
          this.presentToast('Ошибка обновления', 'danger');
        });
  }

}
