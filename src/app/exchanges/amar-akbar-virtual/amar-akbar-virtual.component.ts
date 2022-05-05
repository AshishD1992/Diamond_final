import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-amar-akbar-virtual',
  templateUrl: './amar-akbar-virtual.component.html',
  styleUrls: ['./amar-akbar-virtual.component.scss']
})
export class AmarAkbarVirtualComponent implements OnInit {

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

