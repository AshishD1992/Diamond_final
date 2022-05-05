import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-t20',
  templateUrl: './t20.component.html',
  styleUrls: ['./t20.component.scss']
})
export class T20Component implements OnInit {

  modalRef!: BsModalRef;
   constructor(private modalService: BsModalService) {}

   openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
   }

  ngOnInit(): void {
  }

}
