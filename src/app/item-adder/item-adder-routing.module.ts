import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemAdderComponent } from './item-adder.component';

const routes: Routes = [
    {
        path: '',
        component: ItemAdderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ItemAdderRoutingModule {}
