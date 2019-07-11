import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PositionService} from '../../../common/services/position.service';

import {Position} from '../../../common/interfaces/position';
import {MaterialService} from '../../../common/services/material.service';
import {MaterialModal} from '../../../common/interfaces/material-modal';

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

  constructor(
    private http: HttpClient,
    private positionService: PositionService,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.positionService.getAllPositionById(this.categoryId)
      .subscribe(positions => {
        this.positions = positions;
        this.loading = false;
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
    this.modal.open();
  }


  onSelectPosition(position: Position) {
    this.modal.open();
  }

}
