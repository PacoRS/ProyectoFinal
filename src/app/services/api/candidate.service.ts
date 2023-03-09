import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/model/candidate';
import { environment } from 'src/environments/environment';
import {CandidateStatus} from "../../model/enums/CandidateStatus";
import {Rol} from "../../model/enums/Rol";
import {SubRol} from "../../model/enums/SubRol";
import {Localization} from "../../model/enums/Localization";
import {RolStatus} from "../../model/enums/RolStatus";
import {ContactMethod} from "../../model/enums/ContactMethod";

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  public insert(candidate: Candidate): Observable<boolean> {
    candidate.status = this._getValueOrdinal(CandidateStatus, candidate.status);
    candidate.contact = this._getValueOrdinal(ContactMethod, candidate.contact);
    /*candidate.job.rol = this._getValueOrdinal(Rol,  candidate.job.rol);
    candidate.job.subRol = this._getValueOrdinal(SubRol,  candidate.job.subRol);
    candidate.job.localization = this._getValueOrdinal(Localization,  candidate.job.localization);
    candidate.job.status = this._getValueOrdinal(RolStatus,  candidate.job.status);*/

    console.log(candidate)
    return this.http.post<boolean>(`${environment.api.url}${environment.api.endpoints.candidateInsert}`,candidate)
  }

  getById(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${environment.api.url}${environment.api.endpoints.candidateGetById}/${id}`);
  }

  getAll(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${environment.api.url}${environment.api.endpoints.candidateGetAll}`);
  }
  deleteById(id?: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api.url}${environment.api.endpoints.candidateDelete}${id}`);
  }

  private _getValueOrdinal(enumObj: any, value: any) {
    let index =-1;
    for(let key in enumObj) {
      index++;
      if (enumObj[key] === value) {
        return index;
      }
    }
    return index;
  }
}
