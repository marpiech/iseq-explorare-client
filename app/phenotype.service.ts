import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Http, Headers } from '@angular/http';
import 'rxjs/operator/map';
import 'rxjs/Rx';

@Injectable()
export class PhenotypeService {

  /*** parsed text ***/
  parsedText = new BehaviorSubject<string>("");
  phenotypes: string[] = [];
  phenotypeCount = new BehaviorSubject<number>(0);



  getPhenotypes(): string[] {
    return this.phenotypes;
  }

  addPhenotype(phenotype: string) {
    this.phenotypes.push(phenotype);
  }

  increment() {
    console.log("increment");
    this.phenotypeCount.next(this.phenotypeCount.getValue() + 1);
  }

  /*** REQUEST ***/
  parseText(query: string) {
    var data = JSON.stringify({ "query": query });
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //console.log(this.query);
    this.http.post('http://localhost:8080/parse-text', data, {headers: headers})
              .map(response => response.json())
              .subscribe(result =>
                {this.parsedText.next(result.markedText);});
  }

  constructor( private http: Http ) { }

}
