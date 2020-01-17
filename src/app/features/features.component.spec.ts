import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BehaviorSubject } from 'rxjs';

import { SharedModule } from '../shared/shared.module';
import { EditFeatureComponent } from './edit-feature/edit-feature.component';
import { FeaturesComponent } from './features.component';

const FirestoreStub = {
  collection: (name: string) => ({
    snapshotChanges: () => new BehaviorSubject({ foo: 'bar' }),
    doc: (id: string) => ({
      set: (id: any) => new Promise((resolve, reject) => resolve()),
    }),
  }),
};

describe('FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [ FeaturesComponent, EditFeatureComponent ],
      providers: [
        { provide: FirebaseApp, useValue: {} },
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: AngularFireAuth, useValue: {} },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
