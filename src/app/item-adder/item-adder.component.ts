import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../shared/item.model';
import * as firebase from 'firebase';
import { User } from '../shared/user.model';
import { ToastController } from '@ionic/angular';
import { BaseAbstractClass } from '../shared/abstract-base.class';
import { Router } from '@angular/router';


@Component({
  selector: 'app-item-adder',
  templateUrl: './item-adder.component.html',
  styleUrls: ['./item-adder.component.scss'],
})
export class ItemAdderComponent extends BaseAbstractClass implements OnInit {

  userItem: Item;
  user: User;

  constructor(
      private fireStore: AngularFirestore,
      public toastController: ToastController,
      public router: Router
  ) {
    super(toastController);
    this.userItem = ({} as Item);
  }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
  }

  save(){

    if ( !this.userItem.name ) {
      this.presentToast('Вы не ввели названия дела!');
    }

    this.userItem.authorName = this.user && this.user.displayName || 'unknown user';
    this.userItem.date = new Date().toISOString().substring(0, 10);
    this.userItem.id = this.fireStore.createId();
    this.userItem.done = false;

    this.fireStore.collection<any>('items')
        .doc(this.userItem.id).set(this.userItem)
        .then( () => {
           this.presentToast('Ваше дело успешно сохранено');
           // this.userItem = ({} as Item);
           this.router.navigate(['/home']);
        })
        .catch(() => {
          this.presentToast('Ошибка сохранения', 'danger');
        });
  }

}
