import {ElementRef} from '@angular/core';
import {MaterialModal} from '../interfaces/material-modal';

declare const M;

export class MaterialService {

  static toast(message: string) {
    M.toast({html: message});
  }

  static updateTextInputs() {
    M.updateTextFields();
  }

  static initModal(ref: ElementRef): MaterialModal {
    return M.Modal.init(ref.nativeElement);
  }
}
