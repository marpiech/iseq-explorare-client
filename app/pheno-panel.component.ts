import { Component, Input, Injectable  } from '@angular/core';
import 'rxjs/operator/map';
import 'rxjs/Rx';

import { PhenotypeService } from './phenotype.service';
import { Phenotype } from './phenotype';

@Component({
  selector: 'my-pheno-panel',
  template: `
  <div class="row pb-1">
    <div class="col-xs-12">
    <h4>Phenotype panel</h4>
    </div>
  </div>
  <div class="row pb-1">
    <div class="col-xs-12">
        Add phenotype<input  ng2-auto-complete
          [(ngModel)]="phenotypeName"
          placeholder="Enter Phenotype Name"
          (ngModelChange)="addPhenotype($event)"
          [source]="phenotypeAutocompleteAdress"
          value-property-name=null
          display-property-name="name"
          path-to-data="results"
          min-chars="0" />
    </div>
  </div>
  <div class="row pb-1">
    <div class="col-xs-12 pt-2">
      <h5>Phenotypes</h5>
      <ul>
        <li *ngFor="let phenotype of phenotypes">
          <span class="badge badge-info">{{phenotype.id}}</span> {{phenotype.name}}
          <span class="badge badge-danger" (click)="remove(phenotype.id)">remove</span>
        </li>
      </ul>
    </div>
  </div>`,
styles: [`
  ng2-auto-complete, input {
    display: block; border: 0px solid #ccc; width: 300px;
  }
`],
})
export class PhenoPanelComponent  {

  phenotypes : Phenotype[];
  phenotypeName : string;
  phenotypeAutocompleteAdress: string = "http://localhost:8080/phenotype-autocomplete?firstLetters=:keyword&resultsCount=10";

  addPhenotype(phenotype : Phenotype) {
    //console.log(phenotype.name);
    if (phenotype.name != null) {
      this.phenotypeService.addPhenotype(phenotype);
    }
    //this.phenotypeService.getPhenotypesByDisease(disease);
  }

  remove(id : string) {
    for(let i = 0; i < this.phenotypes.length; i++) {
      if (this.phenotypes[i].id === id) {
        this.phenotypes.splice(i, 1);
        this.phenotypeService.phenotypes.next(this.phenotypes);
        break;
      }
    }
  }

  constructor(private phenotypeService: PhenotypeService) {
    phenotypeService.phenotypes.subscribe(value => this.phenotypes = value);
  }
}
