import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class PhenotypeService {

  phenotypes: string[] = [];

  getPhenotypes(): string[] {
    return this.phenotypes;
  }

  addPhenotype(phenotype: string) {
    this.phenotypes.push(phenotype);
  }
}
