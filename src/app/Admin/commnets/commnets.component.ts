import { Component, Injector, OnInit } from '@angular/core';
import { JalaliDateSimplePipe } from "../../jalali-date-simple.pipe";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmModalDeleteComponent } from "../confirm-modal-delete/confirm-modal-delete.component";
import { CommnetService } from './commnet.service';
import { AuthService } from '../../auth/auth.service';
import { Comment } from '../../Models/comment.model';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-commnets',
  standalone: true,
  imports: [JalaliDateSimplePipe, ReactiveFormsModule, CommonModule, ConfirmModalDeleteComponent],
  templateUrl: './commnets.component.html',
  styleUrl: './commnets.component.css'

})
export class CommnetsComponent implements OnInit {
  CommentForm!: FormGroup
  comment!: Comment[]
  body: string = ''
  commentID: string = ''
  notAccept!: Comment[]
  countIaAcceptZero: number = 0;
  constructor(private commentService: CommnetService, private authService: AuthService,private injector: Injector,
    private adminService:AdminService
  ) { }
  ngOnInit(): void {
    this.adminService.setTitle('کامنت ها')
    this.CommentForm = new FormGroup({
      body: new FormControl(null, [Validators.required])
    })
    this.ShowComments()
  }
  ShowComments() {
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.commentService.ShowAllComments().subscribe({
          next: (res: Comment[]) => {
          
            this.comment = [...res]
            this.notAccept=res
            this.countIaAcceptZero=this.notAccept.filter(comment=>comment.iaAccept===0).length
            
            this.commentService.updateIaAcceptCount(this.countIaAcceptZero)
          }
        })
      }
    })
  }
  selectedByAnswer(body: string, id: string) {
    this.body = body
    this.commentID = id
  }
  accept(id: string) {
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.commentService.PutAcceptComment(id).subscribe({
          complete:()=>{
            this.ShowComments()
           
          }
        })
      }
    })
  }
  reject(id: string) {
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.commentService.PutRejectComment(id).subscribe({
          complete:()=>{
           
            this.ShowComments()
          }
        })
      }
    })
  }
  sendAnswerComment(){
    const body=this.CommentForm.value
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.commentService.PostSendAnswer(this.commentID,body).subscribe({
          complete:()=>{
            this.ShowComments()
            const toastr = this.injector.get(ToastrService);
            toastr.success(`جواب کامنت به شخص مورد نظرارسال شد`, ''); 
          }
        })
      }
    })
  }
  DeleteComment(id:string){
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.adminService.openModal('حذف کامنت',id,()=>{
          this.commentService.DeleteComment(id).subscribe({
          complete:()=>{
            this.ShowComments()
            const toastr = this.injector.get(ToastrService);
          toastr.success(`کامنت حذف شد`, ''); 
          }
        })
        })
        
      }
    })
  }
}
