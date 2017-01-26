import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Http, Headers } from '@angular/http';
import 'rxjs/operator/map';
import 'rxjs/Rx';
import { Phenotype } from './phenotype';

@Injectable()
export class PhenotypeService {

  /*** parsed text ***/
  parsedText = new BehaviorSubject<string>("");

  /*** phenotypes ***/
  phenotypes = new BehaviorSubject<Phenotype[]>([]);


  /*** REQUESTS ***/
  parseText(query: string) {
    var data = JSON.stringify({ "query": query });
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //console.log(this.query);
    this.http.post('http://localhost:8080/parse-text', data, {headers: headers})
              .map(response => response.json())
              .subscribe(result =>
                { this.parsedText.next(result.markedText);
                  this.phenotypes.next(<Phenotype[]> result.hpoTerms);
                  console.log(result.hpoTerms);});
  }

  getPhenotypesByDisease(disease: string) {
    var parsedDisease = disease.replace(/ /g, '%20');
    var url = "http://localhost:8080/get-phenotypes-by-disease?disease="+parsedDisease;
    this.http.get(url)
              .map(response => response.json())
              .subscribe(result =>
                { this.phenotypes.next(<Phenotype[]> result.results[0]);
                  console.log(result.hpoTerms);});
  }

  constructor( private http: Http ) { }

}
