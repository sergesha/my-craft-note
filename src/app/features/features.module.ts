import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { EditFeatureComponent } from './edit-feature/edit-feature.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';

@NgModule({
  declarations: [
    FeaturesComponent,
    EditFeatureComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
  ],
})
export class FeaturesModule {
}
