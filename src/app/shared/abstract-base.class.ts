import { ToastController } from '@ionic/angular';

export abstract class BaseAbstractClass {

    protected constructor(
        public toastController: ToastController
    ) {}

    async presentToast(text: string, c: string = 'dark') {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000,
            color: c
        });
        await toast.present();
    }
}
