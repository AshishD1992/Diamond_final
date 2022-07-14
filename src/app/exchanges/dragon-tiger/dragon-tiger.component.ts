import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dragon-tiger',
  templateUrl: './dragon-tiger.component.html',
  styleUrls: ['./dragon-tiger.component.scss']
})
export class DragonTigerComponent implements OnInit {

  modalRef!: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
  }

 ngOnInit(): void {
 }

}