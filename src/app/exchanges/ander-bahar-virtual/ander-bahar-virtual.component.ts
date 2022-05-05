import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-ander-bahar-virtual',
  templateUrl: './ander-bahar-virtual.component.html',
  styleUrls: ['./ander-bahar-virtual.component.scss']
})
export class AnderBaharVirtualComponent implements OnInit {
  modalRef!: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
  }
 

  ngOnInit(): void {
  }

}
