import { Component } from '@angular/core';
import { HorizontalNavComponent } from "../../components/shared/navigation/horizontal-nav/horizontal-nav.component";
import { InlineNavComponent } from "../../components/shared/navigation/inline-nav/inline-nav.component";
import { PaginationNavComponent } from "../../components/shared/navigation/pagination-nav/pagination-nav.component";
import { StepHorizontalNavComponent } from "../../components/shared/navigation/step-horizontal-nav/step-horizontal-nav.component";
import { StepVerticalNavComponent } from "../../components/shared/navigation/step-vertical-nav/step-vertical-nav.component";

@Component({
  selector: 'app-nav-example',
  templateUrl: './nav-example.component.html',
  styleUrl: './nav-example.component.scss',
  imports: [HorizontalNavComponent, InlineNavComponent, PaginationNavComponent, StepHorizontalNavComponent, StepVerticalNavComponent]
})
export class NavExamplesComponent {
  constructor() {
  }
}
