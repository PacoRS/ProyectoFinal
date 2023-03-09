import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Candidate } from 'src/app/model/candidate';
import { CandidateStatus } from 'src/app/model/enums/CandidateStatus';
import { RolStatus } from 'src/app/model/enums/RolStatus';
import { CandidateService } from 'src/app/services/api/candidate.service';
import { CreateCandidateComponent } from '../create-candidate/create-candidate.component';



@Component({
  selector: 'app-candidates-overview',
  templateUrl: './candidates-overview.component.html',
  styleUrls: ['./candidates-overview.component.scss']
})
export class CandidatesOverviewComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  candidates: Candidate[] = [];
  Status=CandidateStatus
  displayedColumns: string[] = ['name', 'surname', 'description', 'status', 'Botones'];
  dataSource: MatTableDataSource<Candidate>;

  

  constructor(private candidateServ: CandidateService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.GetAllCandidates();

  }
  abrirPopup(candidate?: Candidate) {
    const data = candidate?{mode:'Edit',job:candidate}:{mode:'Create'};
    const dialogRef = this.dialog.open(CreateCandidateComponent,
      {
        data:data,
        width: '80%',
        height: '80%',
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`);
      this.GetAllCandidates();
    });
  }
  public GetAllCandidates(){
    this.candidateServ.getAll().subscribe(candidates => {
      this.candidates = candidates;
      this.dataSource = new MatTableDataSource(this.candidates);
      this.dataSource.paginator = this.paginator;
    });
  }
  public formatBirthdate(birthdate: string) {
    return new Date(birthdate).toLocaleDateString();
  }
  public getEnumValueFromOrder(order:number,myEnum: any): string {
    if(order<0 || order>myEnum.length-1) return "";
    let i=0;
    for(let key in myEnum) {
      if (i==order){
        return myEnum[key]
      }
      i++;
    }
    return myEnum[order];
  }
  deleteCandidate(element:Candidate){
    this.candidateServ.deleteById(element.id).subscribe(offer => {
      this.GetAllCandidates();
    });
  }
}
