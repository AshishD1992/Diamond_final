import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-teen-virtual',
  templateUrl: './teen-virtual.component.html',
  styleUrls: ['./teen-virtual.component.scss']
})
export class TeenVirtualComponent implements OnInit {

  modalRef!: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

}
