import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-maticon',
  templateUrl: './maticon.component.html',
  styleUrls: ['./maticon.component.css']
})
export class MaticonComponent implements OnInit {
    @Input() type: string;
    @Input() showText: boolean
    @Input() text: string
  constructor() { }

  ngOnInit(): void {
  }

}
