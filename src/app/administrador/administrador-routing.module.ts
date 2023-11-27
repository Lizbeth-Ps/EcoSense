import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdministradorComponent } from "./administrador.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: AdministradorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdmininistradorPageRoutingModule {}