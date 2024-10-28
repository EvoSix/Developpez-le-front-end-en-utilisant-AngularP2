import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-block',
  standalone: true,
  imports: [],
  templateUrl: './text-block.component.html',
  styleUrl: './text-block.component.scss'
})
export class TextBlockComponent {
@Input() title:string ="";
@Input() message:number=0;

}
