import { Component } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/shared/buttons/primary-button/primary-button.component";
import { DefaultButtonComponent } from "../../components/shared/buttons/default-button/default-button.component";
import { DashedButtonComponent } from "../../components/shared/buttons/dashed-button/dashed-button.component";
import { LinkButtonComponent } from "../../components/shared/buttons/link-button/link-button.component";
import { DisabledButtonsComponent } from "../../components/shared/buttons/disabled-button/disabled-button.component";
import { DropdownButtonComponent } from "../../components/shared/buttons/dropdown-button/dropdown-button.component";
import { IconButtonsComponent } from "../../components/shared/buttons/icon-button/icon-button.component";

@Component({
  selector: 'app-welcome',
  templateUrl: './button-example.component.html',
  styleUrl: './button-example.component.scss',
  imports: [PrimaryButtonComponent, DefaultButtonComponent, DashedButtonComponent, LinkButtonComponent, DisabledButtonsComponent, DropdownButtonComponent, IconButtonsComponent,]
})
export class WelcomeComponent {
  constructor() {}
}
