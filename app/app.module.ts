import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }             from './app.component';
import { PhenoMarksComponent }      from './pheno-marks.component';
import { SimilarDiseasesComponent } from './similar-diseases.component';
import { PhenoPanelComponent }      from './pheno-panel.component';


import { PhenotypeService } from './phenotype.service';

import { AppRoutingModule }     from './app-routing.module';

/*** extra ***/
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2AutoCompleteModule
  ],
  declarations: [
    AppComponent,
    PhenoMarksComponent,
    SimilarDiseasesComponent,
    PhenoPanelComponent
  ],
  providers: [ PhenotypeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
