import { Component, Input, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/operator/map';
import 'rxjs/Rx';
import { PhenotypeService } from './phenotype.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-pheno-marks',
  template: `
  <!--<div class="col-xs-12">-->
  <div class="row pb-1">
    <div class="col-xs-9">
      <textarea [(ngModel)]="query" rows="5" class="border-no width-full" placeholder="Paste epicrysis here" (change)=postItems()></textarea>
    </div>
    <div class="col-xs-3">
      <a class="btn btn-info width-full mb-1" (click)=example()>example</a>
      <a class="btn btn-success width-full mb-1" (click)=postItems()>submit</a>
    </div>
  </div>
  <div class="row pb-1">
    <div [innerHTML]="output" style="clear: both;"></div>
  </div>
  <!--</div>-->
  <!--<a class="mark-button" (click)=getItems()>get</a>-->
  <!--<a class="mark-button" (click)=postItems()>submit</a>
  </div>
  <div [innerHTML]="output" style="clear: both;"></div>-->


  <!--<h1>Symptom {{name}}</h1>
  <button (click)="addData()">Add data {{ dataToAdd }}</button>
      child: {{ values }}-->
  `,
})
export class PhenoMarksComponent  {

  private EXAMPLE_MICRO: String = "Warburg et al. (1993) used the designation Micro syndrome for an autosomal recessive syndrome comprising microcephaly, microcornea, congenital cataract, mental retardation, optic atrophy, and hypogenitalism. They described an affected brother and sister and their male cousin. The sibs were offspring of a consanguineous Pakistani marriage; the parents of the cousin denied consanguinity. Agenesis of the corpus callosum, prominent root of the nose, large anteverted ears, facial hypertrichosis, small pupils with posterior synechiae, hypotonia, mild to moderate spastic palsy with hip dislocations, and hormonal dysfunction, presumably of hypothalamic origin, were other features. The children were almost blind, whether or not the cataracts had been operated on. The electroretinographic responses indicated dysfunction of both retinal rods and cones, and the visual evoked potentials confirmed optic nerve atrophy. The children were late walkers and were incontinent of urine and stools. In the differential diagnosis, Warburg et al. (1993) considered COFS syndrome (214150), CAMAK/CAMFAK syndromes (212540), Martsolf syndrome (212720), lethal Rutledge syndrome (270400), and lethal Neu-Laxova syndrome (256520).";
  private query: String = "";
  private output: String = "";

  example() {
       this.query = this.EXAMPLE_MICRO;
  }

  postItems() {
       var data = JSON.stringify({ "query": this.query });
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       //console.log(this.query);
       this.http.post('http://localhost:8080/parse-text', data, {headers: headers})
                 .map(response => response.json())
                 .subscribe(result => this.output = result.response);
     }

  /*private name = 'Marks';
  private values: Array<string> = [];

  //@Input()
  private dataToAdd: string;

    addData() {
      //this.values.push("a");
      this.dataService.addPhenotype(this.dataToAdd);
    }*/

    constructor(
      private route: ActivatedRoute,
      private dataService: PhenotypeService,
      private http: Http ) {
      //this.values = this.dataService.getPhenotypes();
    }

    /*ngOnInit(): void {
      this.route.params.subscribe(params => {this.dataToAdd = params['dataToAdd'];});
    }*/

    //constructor(private dataService: PhenotypeService, private route: ActivatedRoute) {
    //  dataService.data$.subscribe((value:string) => {
    //    this.values.push(value);
    //  });
    //}
}
