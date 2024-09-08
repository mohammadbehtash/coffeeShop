import { Component, OnInit } from '@angular/core';
import { InfoService } from '../Admin/infos/info.service';
import { Info } from '../Models/info.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  info: Info | undefined;

  constructor(private infoService:InfoService){}

  ngOnInit(): void {
    this.ShowInfo()
  }
  ShowInfo() {
    this.infoService.ShowInfo().subscribe({
      next: (data: Info) => {
       
        this.info = data
      }
    })
  }

}
