import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
<div class="container">
  <div class="row py-1" data-spy="affix">
    <div class="col-xs-6 col-sm-4">
      <h1>explorare</h1>
    </div>
    <div class="col-xs-6 col-sm-2">
      Phenotypes
    </div>
  </div>
  <div class="row pb-1">

    <div class="col-xs-6 col-sm-2">
        <a class="btn btn-primary btn-block px-0 mb-1" style="white-space: normal;" [routerLink]="['/pheno-marks',{dataToAdd:'a'}]" routerLinkActive="active">
          Pheno Marks</a>
          <p class="small text-xs-center">epicrysis analyser. Paste text and get phenotypes</p>

    </div>
    <div class="col-xs-6 col-sm-2">
        <a class="btn btn-primary btn-block px-0 mb-1" style="white-space: normal;" routerLink="/pheno-panel" routerLinkActive="active">Disease Input</a>
    </div>
    <div class="col-xs-6 col-sm-2">
        <a class="btn btn-primary btn-block px-0 mb-1" style="white-space: normal;" routerLink="/pheno-panel" routerLinkActive="active">Pheno Panel</a>
    </div>
    <div class="col-xs-6 col-sm-2">
        <a class="btn btn-primary btn-block px-0 mb-1" style="white-space: normal;" routerLink="/pheno-panel" routerLinkActive="active">Genes</a>
    </div>
    <div class="col-xs-6 col-sm-2">
        <a class="btn btn-primary btn-block px-0 mb-1" style="white-space: normal;" routerLink="/pheno-panel" routerLinkActive="active">Diseases</a>
    </div>
  </div>
  <router-outlet></router-outlet>
</div>
  `,
})
export class AppComponent  { name = 'Angular'; }
