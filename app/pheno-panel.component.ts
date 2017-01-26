import { Component } from '@angular/core';
import { PhenotypeService } from './phenotype.service';
import { Phenotype } from './phenotype';

@Component({
  selector: 'my-pheno-panel',
  template: `
  <h4>Phenotype panel</h4>
  <ul>
  <li *ngFor="let phenotype of phenotypes">
    <span class="badge badge-info">{{phenotype.id}}</span> {{phenotype.name}}
    <span class="badge badge-danger" (click)="remove(phenotype.id)">remove</span>
  </li>
</ul>`,
})
export class PhenoPanelComponent  {

  phenotypes : Phenotype[];

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
