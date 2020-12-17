import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './users/users.service';
import {MaterialLibModule} from './material/material.module';



@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        FormsModule,
      NgbModule,
      MaterialLibModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, SmartTableComponent]
})
export class LayoutModule {}
