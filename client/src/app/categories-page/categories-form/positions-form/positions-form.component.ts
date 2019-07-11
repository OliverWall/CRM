import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Position } from '../../../common/interfaces/position';
import { PositionService } from '../../../common/services/position.service';
import { MaterialService } from '../../../common/services/material.service';
import { MaterialModal } from '../../../common/interfaces/material-modal';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})

export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;

  positions: Position[] = [];
  modal: MaterialModal;
  loading = false;
  form: FormGroup;
  positionId = null;

  constructor(
    private http: HttpClient,
    private positionService: PositionService
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.positionService.getAllPositionById(this.categoryId)
      .subscribe(positions => {
        this.positions = positions;
        this.loading = false;
      });
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  closeModal() {
    this.modal.close();
  }

  onAddPosition() {
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: null
    });
    MaterialService.updateTextInputs();
    this.modal.open();
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    MaterialService.updateTextInputs();
    this.modal.open();
  }

  onSubmit() {
    this.form.disable();
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    };

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionService.updatePosition(newPosition).subscribe(
        position => {
          MaterialService.toast('Позиция отредактирована');
          const index = this.positions.findIndex(p => p._id === position._id);
          this.positions[index] = position;
        },
        error => MaterialService.toast(error.error.message),
        () => completed()
      );
    } else {
      this.positionService.createPosition(newPosition).subscribe(
        position => {
          MaterialService.toast('Позиция создана');
          this.positions.push(newPosition);
        },
        error => MaterialService.toast(error.error.message),
        () => completed()
      );
    }

    const completed = () => {
      this.modal.close();
      this.form.reset({name: '', cost: null});
      MaterialService.updateTextInputs();
      this.form.enable();
    };
  }

  onDeletePosition(event, position: Position) {
    event.stopPropagation();
    const decision = window.confirm(`Вы уверены, что хотите удалить позицию ${position.name}?`);

    if (decision) {
      this.positionService.deletePosition(position).subscribe(
        res => {
          const index = this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(index, 1);
          MaterialService.toast(res.message);
        },
        error => MaterialService.toast(error.error.message)
      );
    }
  }
}
