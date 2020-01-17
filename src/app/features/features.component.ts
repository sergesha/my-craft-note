import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IFeature {
  id?: string;
  featureName: string;
  importance: number;
  quantity: number;
}

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: [ './features.component.scss' ],
})
export class FeaturesComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public dataSource: MatTableDataSource<IFeature> = new MatTableDataSource([]);
  public displayedColumns: string[] = ['name', 'importance', 'quantity'];
  public selectedItem$: BehaviorSubject<IFeature> = new BehaviorSubject(null);
  public maxQuantity = 0;

  private itemsCollection: AngularFirestoreCollection<IFeature>;

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.itemsCollection = this.afs.collection<IFeature>('Feature');

    this.dataSource.sort = this.sort;

    this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data: IFeature = a.payload.doc.data() as IFeature;
        const id: string = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe((items: IFeature[]) => {
      this.maxQuantity = items.reduce((max, item) => Math.max(max, item.quantity), 0);
      this.dataSource.data = items;
    });
  }

  public editItem(item: IFeature): void {
    if (item.id === null) {
      item = {
        ...item,
        id: this.afs.createId(),
      };
    }

    this.itemsCollection.doc(item.id).set(item);

    this.selectedItem$.next(null);
  }

  public deleteItem(item: IFeature): void {
    this.itemsCollection.doc(item.id).delete();

    this.selectedItem$.next(null);
  }

  public onSelect(item: IFeature): void {
    if (this.selectedItem$.getValue() === item) {
      this.selectedItem$.next(null);
    } else {
      this.selectedItem$.next(item);
    }
  }

  public getBarStyle(item: IFeature): string {
    return this.maxQuantity
      ? `bar-chart-${(100 * item.quantity / this.maxQuantity).toFixed(0)}`
      : 'bar-chart-0';
  }
}
