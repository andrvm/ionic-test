import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ItemAdderComponent } from './item-adder.component';
import { ItemAdderRoutingModule } from './item-adder-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ItemAdderRoutingModule
    ],
    declarations: [
        ItemAdderComponent
    ]
})
export class ItemAdderModule {}
