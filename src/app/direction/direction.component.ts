import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-direction',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './direction.component.html',
  styleUrl: './direction.component.css'
})
export class DirectionComponent implements OnInit,OnDestroy{
  path = '';
  pathParts: string[] = [];
  @Input() item: any;
  USbscription:Subscription|undefined
  constructor(private activeRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.USbscription=this.activeRoute.url.subscribe(urlsegment=>{
      urlsegment.forEach((segment,index)=>{
        this.path+=segment.path
        if(index < urlsegment.length - 1){
          this.path += ' / '
        }
        this.pathParts.push(segment.path)
      })
    })
  }

  ngOnDestroy(): void {
    this.USbscription?.unsubscribe()
  }
}
