import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  formModal: any;
  open: boolean = true;
   disabled: boolean = true;
  modalRef!: BsModalRef;
   constructor(private modalService: BsModalService) {}

   openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
   }

   ngOnInit(): void {
     
   }
   log(isOpened: boolean){
    console.log(isOpened);
 }
}