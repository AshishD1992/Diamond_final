
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-anderbahar',
  templateUrl: './anderbahar.component.html',
  styleUrls: ['./anderbahar.component.scss']
})
export class AnderbaharComponent implements OnInit {

  modalRef!: BsModalRef;
   constructor(private modalService: BsModalService) {}

   openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
   }

  ngOnInit(): void {
  }

}
