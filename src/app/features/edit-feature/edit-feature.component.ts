import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { IFeature } from '../features.component';

@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature.component.html',
  styleUrls: ['./edit-feature.component.scss']
})
export class EditFeatureComponent implements OnInit, OnChanges {
  @Input() item: IFeature;
  @Output() readonly change: EventEmitter<IFeature> = new EventEmitter();
  @Output() readonly delete: EventEmitter<IFeature> = new EventEmitter();
  @ViewChild('ngForm', { static: false }) ngForm: NgForm;

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: [null],
      featureName: [ null, [
        Validators.required,
      ] ],
      importance: [ null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ] ],
      quantity: [ null, [
        Validators.required,
        Validators.min(1),
      ] ],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      changes.item.currentValue
        ? this.form.setValue(changes.item.currentValue)
        : this.ngForm && this.ngForm.resetForm();
    }
  }

  public buttonIcon(item: IFeature): string {
    return item.id ? 'save' : 'note_add';
  }

  public onDelete(): void {
    if (this.form.valid) {
      this.delete.next(this.form.value);

      this.ngForm && this.ngForm.resetForm();
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.change.next(this.form.value);

      this.ngForm && this.ngForm.resetForm();
    }
  }
}
