import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-card-virtual',
  templateUrl: './card-virtual.component.html',
  styleUrls: ['./card-virtual.component.scss']
})
export class CardVirtualComponent implements OnInit {

  modalRef!: BsModalRef;
   constructor(private modalService: BsModalService) {}

   openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
   }

  ngOnInit(): void {
  }

}
