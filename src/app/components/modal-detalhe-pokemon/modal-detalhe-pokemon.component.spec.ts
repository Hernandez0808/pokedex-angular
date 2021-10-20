import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalhePokemonComponent } from './modal-detalhe-pokemon.component';

describe('ModalDetalhePokemonComponent', () => {
  let component: ModalDetalhePokemonComponent;
  let fixture: ComponentFixture<ModalDetalhePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalhePokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalhePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
