import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-poker-virtual',
  templateUrl: './poker-virtual.component.html',
  styleUrls: ['./poker-virtual.component.scss']
})
export class PokerVirtualComponent implements OnInit {

  modalRef!: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
  }

}
