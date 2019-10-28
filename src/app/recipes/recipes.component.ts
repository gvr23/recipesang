import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {relativeFrom} from '@angular/compiler-cli/src/ngtsc/file_system';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private router: Router, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  onNewRecipe = () => { this.router.navigate(['new'], { relativeTo: this.currentRoute }); };

}
