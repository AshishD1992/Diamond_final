import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-amar-akbar',
  templateUrl: './amar-akbar.component.html',
  styleUrls: ['./amar-akbar.component.scss']
})
export class AmarAkbarComponent implements OnInit {

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
