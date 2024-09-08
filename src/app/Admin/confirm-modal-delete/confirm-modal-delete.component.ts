import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-confirm-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal-delete.component.html',
  styleUrl: './confirm-modal-delete.component.css'
})
export class ConfirmModalDeleteComponent implements OnInit,OnDestroy {
  showModal = false;
  message = '';
  itemName = '';
  confimCallback!: () => void;
  subscription!: Subscription
  constructor(private adminService: AdminService) { }
  
  ngOnInit(): void {
    this.subscription=this.adminService.modalObserVeble$.subscribe((data)=>{
      this.message=data.message;
      this.itemName=data.itemName;
      this.confimCallback=data.confirm;
      this.showModal=true
    })
  }
closeModal(){
  this.showModal=false
}
confirm(){
 this.confimCallback()
 this.closeModal()
}
ngOnDestroy(): void {
  if(this.subscription){
    this.subscription.unsubscribe()
  }
}

}
