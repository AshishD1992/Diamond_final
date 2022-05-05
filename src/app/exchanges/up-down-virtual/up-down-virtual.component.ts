import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-up-down-virtual',
  templateUrl: './up-down-virtual.component.html',
  styleUrls: ['./up-down-virtual.component.scss']
})
export class UpDownVirtualComponent implements OnInit {

  modalRef!: BsModalRef;
   constructor(private modalService: BsModalService) {}

   openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
   }


  ngOnInit(): void {
  }

}
