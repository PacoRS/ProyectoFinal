import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.scss']
})
export class SwitchLangComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }
  translateSpanish(){
    this.translate.use("es");
  }
  translateEnglish(){
    this.translate.use("en");
  }
}
