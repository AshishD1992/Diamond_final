import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sicbo',
  templateUrl: './sicbo.component.html',
  styleUrls: ['./sicbo.component.scss']
})
export class SicboComponent implements OnInit {

  modalRef!: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
  }

}
