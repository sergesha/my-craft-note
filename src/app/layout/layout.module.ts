import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    HeaderComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDividerModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class LayoutModule { }
