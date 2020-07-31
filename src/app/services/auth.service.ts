import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../shared/user.model';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    userData: any;

    constructor(
        public afStore: AngularFirestore,
        public ngFireAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone
    ) {
        this.ngFireAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    googleAuth() {
        return this.authLogin(new auth.GoogleAuthProvider());
    }

    authLogin(provider) {
        return this.ngFireAuth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['home']);
                });
                this.setUserData(result.user);
            }).catch((error) => {
                window.alert(error);
            });
    }

    setUserData(user) {

        const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);

        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        };

        return userRef.set(userData, {
            merge: true
        });
    }

    signOut() {
        return this.ngFireAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        });
    }

}
