import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService ,ModalModule} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-teenpatti',
  templateUrl: './teenpatti.component.html',
  styleUrls: ['./teenpatti.component.scss']
})
export class TeenpattiComponent implements OnInit {
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