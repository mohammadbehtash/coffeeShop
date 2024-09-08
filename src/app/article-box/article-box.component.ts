import { Component, Input } from '@angular/core';
import { JalaliDatePipe } from "../jalali-date.pipe";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-box',
  standalone: true,
  imports: [JalaliDatePipe,RouterModule],
  templateUrl: './article-box.component.html',
  styleUrl: './article-box.component.css'
})
export class ArticleBoxComponent {
@Input() item:any
}
