import { Component } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/shared/buttons/primary-button/primary-button.component";
import { DefaultButtonComponent } from "../../components/shared/buttons/default-button/default-button.component";
import { DashedButtonComponent } from "../../components/shared/buttons/dashed-button/dashed-button.component";
import { LinkButtonComponent } from "../../components/shared/buttons/link-button/link-button.component";
import { DropdownButtonComponent } from "../../components/shared/buttons/dropdown-button/dropdown-button.component";
import { IconButtonComponent } from "../../components/shared/buttons/icon-button/icon-button.component";
import { FloatShapeButtonComponent } from "../../components/shared/buttons/float-shape-button/float-shape-button.component";
import { FloatMenuButtonComponent } from "../../components/shared/buttons/float-menu-button/float-menu-button.component";

@Component({
  selector: 'app-buttonExample',
  standalone: true,
  templateUrl: './button-example.component.html',
  styleUrl: './button-example.component.scss',
  imports: [PrimaryButtonComponent, DefaultButtonComponent, DashedButtonComponent, LinkButtonComponent, DropdownButtonComponent, IconButtonComponent, FloatShapeButtonComponent, FloatMenuButtonComponent]
})
export class buttonExamples {
  constructor() {}
}
