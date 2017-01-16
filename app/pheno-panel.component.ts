import { Component } from '@angular/core';

@Component({
  selector: 'my-pheno-panel',
  template: `<h1>Phenotype {{name}}</h1>`,
})
export class PhenoPanelComponent  { name = 'Panel'; }
