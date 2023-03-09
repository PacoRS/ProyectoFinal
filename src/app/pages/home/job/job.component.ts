import { Component,Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Candidate } from 'src/app/model/candidate';
import { Localization } from 'src/app/model/enums/Localization';
import { Job } from 'src/app/model/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  candidates: Candidate[] = [];
  displayedColumns: string[] = ['name', 'surname', 'status', 'contact'];
  dataSource: MatTableDataSource<Candidate>;
  job:Job;
  Localization:Localization;
  arrayCandidates:number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {mode:string,job:Job}) { }

  ngOnInit(): void {
    if(this.data.job.candidates){
      this.arrayCandidates = this.data.job.candidates.length;
     }

    this.job = this.data.job;
    this.GetAllCandidates();
  }

  public GetAllCandidates(){
    if(this.job.candidates)
      for (let i = 0; i < this.job.candidates.length; i++) {
        this.candidates.push(this.job.candidates[i]);
      }
      this.dataSource = new MatTableDataSource(this.candidates);
      this.dataSource.paginator = this.paginator;
  }
  public formatBirthdate(birthdate: string) {
    return new Date(birthdate).toLocaleDateString();
  }
}
