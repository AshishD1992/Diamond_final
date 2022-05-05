import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-oneday',
  templateUrl: './oneday.component.html',
  styleUrls: ['./oneday.component.scss']
})
export class OnedayComponent implements OnInit {

  modalRef!: BsModalRef;
   constructor(private modalService: BsModalService) {}

   openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
   }

  ngOnInit(): void {
  }

}
