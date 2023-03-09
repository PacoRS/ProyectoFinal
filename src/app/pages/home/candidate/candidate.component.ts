import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { Candidate } from 'src/app/model/candidate';
import { CandidateService } from 'src/app/services/api/candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  candidate:Candidate;
  constructor(private candidateServ: CandidateService,
    @Inject(MAT_DIALOG_DATA) public data: {mode:string,candidate:Candidate}) { }

  ngOnInit(): void {
    this.candidate = this.data.candidate;
  }

}
