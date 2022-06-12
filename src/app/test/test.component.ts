import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";


export type Test = {
  question: string;
  answer: string;
  options: string[];
}

export type LabTests = {
  labName: string;
  tests: Test[]
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  labTests: LabTests[] = [];
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadFile();
  }

  private readFile(testObjs: Test[][]) {

    for (let i = 0; i < testObjs.length; i++) {
      const tests = testObjs[i];
      this.labTests.push({
        labName: 'lab' + (i + 1),
        tests: tests
      });
    }
  }


  private loadFile() {
    this.http.get('assets/files/tests.json', { responseType: 'text' }).subscribe(file => {


      let testObjs = <Test[][]>JSON.parse(file)
      this.readFile(testObjs);
    });
  }
}
