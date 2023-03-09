import { Component, OnDestroy, OnInit } from '@angular/core';
import { CandidateService } from "../../../services/api/candidate.service";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Candidate } from "../../../model/candidate";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Job } from 'src/app/model/job';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {JobService} from "../../../services/api/job.service";
import {firstValueFrom} from "rxjs";
import {SubRol} from "../../../model/enums/SubRol";
import {CandidateStatus} from "../../../model/enums/CandidateStatus";
import {ContactMethod} from "../../../model/enums/ContactMethod";


@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.scss']
})

export class CreateCandidateComponent implements OnInit {

  statusValues: CandidateStatus[] = Object.values(CandidateStatus);
  contactoValues: ContactMethod[] = Object.values(ContactMethod);
  displayedColumns = ['select', 'rol', 'description', 'sub_rol', 'status'];
  //dataSource = jobs;
  dataSource:MatTableDataSource<Job>;
  selection = new SelectionModel<Job>(true, []);
  job: Job;

  sR = SubRol;
  // selected = this.selection.selected;


  constructor(private candidateService: CandidateService, private fb: FormBuilder, private snack: MatSnackBar,
    private translateService: TranslateService, private jobS:JobService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.required]],
      description: ['', [Validators.required]],
      rejection_reason: ['', [Validators.required]],
      cv_date: ['', [Validators.required]],
      interview_date: ['', [Validators.required]],
      hiring_date: ['', [Validators.required]],
      first_contact_date: ['', [Validators.required]],
      status: ['', [Validators.required]],
      contacto: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    firstValueFrom(this.jobS.getAll()).then(jobs=>{
      this.dataSource = new MatTableDataSource(jobs);
  }).catch(async error => {
      this.snack.open(await firstValueFrom(this.translateService.get("Error en la peticion, no se pudo cargar las ofertas")), 'Ok', {duration: 5000});
    })
  }


  getSelected(): void {
    const selected = this.selection.selected;
    selected.values
    console.log(selected);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public form: FormGroup;


  submit() {
    if (this.selection.selected.length === 1) {
      const selectedJob = this.selection.selected[0];

      const candidate: Candidate = {
        name: this.form.get('name')?.value,
        surname: this.form.get('surname')?.value,
        description: this.form.get('description')?.value,
        rejectionReason: this.form.get('rejection_reason')?.value,
        cvDate: this.form.get('cv_date')?.value,
        interviewDate: this.form.get('interview_date')?.value,
        hiringDate: this.form.get('hiring_date')?.value,
        firstContactDate: this.form.get('first_contact_date')?.value,
        contact: this.form.get('contacto')?.value,
        status: this.form.get('status')?.value,
        Rolid: selectedJob.id
      };
      firstValueFrom(this.candidateService.insert(candidate)).then(response => {
        if (response) {
          this.snack.open('Candidato creado correctamente', 'Ok', {duration: 5000});
        } else {
          this.snack.open('Error al insertar candidato', 'Ok', {duration: 5000});
        }
      })
        .catch(async error => {
          this.snack.open(await firstValueFrom(this.translateService.get("Error en la peticion")), 'Ok', {duration: 5000});
        })
    }else{
      this.snack.open('Debe seleccionar una oferta', 'Ok', {duration: 5000});
    }
  }

  private resetForm() {
    this.form.reset();
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

}
