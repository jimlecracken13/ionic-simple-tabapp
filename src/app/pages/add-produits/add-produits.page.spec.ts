import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProduitsPage } from './add-produits.page';

describe('AddProduitsPage', () => {
  let component: AddProduitsPage;
  let fixture: ComponentFixture<AddProduitsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProduitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
