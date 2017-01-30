import { Component, Input, Injectable  } from '@angular/core';
import 'rxjs/operator/map';
import 'rxjs/Rx';

import { PhenotypeService } from './phenotype.service';
import { Phenotype } from './phenotype';
import { Disease } from './disease';
import { Gene } from './gene';

@Component({
  selector: 'my-pheno-panel',
  template: `
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
  <div class="row pb-1 border-between">
    <div class="col-sm-5 pt-2">
      <h5>Phenotypes</h5>
      <ul>
        <li *ngFor="let phenotype of phenotypes">
          <span class="badge badge-info">{{phenotype.id}}</span> {{phenotype.name}}
          <span class="badge badge-danger" (click)="remove(phenotype.id)">remove</span>
        </li>
      </ul>
    </div>
    <div class="col-sm-5 pt-2">
      <h5>Diseases <span class="badge badge-pill badge-default">% match</span></h5>
      <ul>
        <li *ngFor="let disease of diseases">
          {{disease.name}} <span class="badge badge-pill badge-default">{{disease.score.toFixed(1)}}</span>
        </li>
      </ul>
    </div>
    <div class="col-sm-2 pt-2">
      <h5>Genes <span class="badge badge-pill badge-default">% match</span></h5>
      <ul>
        <li *ngFor="let gene of genes">
          {{gene.name}} <span class="badge badge-pill badge-default">{{gene.score.toFixed(1)}}</span>
        </li>
      </ul>
    </div>
  </div>
  <!-- Button trigger modal -->
  <div class="modal fade">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`,
styles: [`
  ng2-auto-complete, input {
    display: block; border: 0px solid #ccc; width: 300px;
  }
 .border-between > [class*='col-']:before {
 background: #e3e3e3;
 bottom: 0;
 content: " ";
 left: 0;
 position: absolute;
 width: 1px;
 top: 0;
}
.border-between > [class*='col-']:first-child:before {
 display: none;
}
`],
})
export class PhenoPanelComponent  {

  phenotypes : Phenotype[];
  diseases : Disease[];
  genes : Gene[];
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
    phenotypeService.diseases.subscribe(value => this.diseases = value);
    phenotypeService.genes.subscribe(value => this.genes = value);
  }
}
