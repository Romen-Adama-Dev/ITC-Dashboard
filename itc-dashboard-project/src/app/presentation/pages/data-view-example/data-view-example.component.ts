import { Component } from '@angular/core';
import { AppAvatarComponent } from "../../components/shared/data-view/avatar/avatar.component";
import { NzDemoAvatarBadgeComponent } from "../../components/shared/data-view/avatar-badge/avatar-badge.component";
import { AvatarGroupComponent } from "../../components/shared/data-view/avatar-group/avatar-group.component";
import { CardComponent } from "../../components/shared/data-view/card/card.component";
import { CardSkeletonComponent } from "../../components/shared/data-view/card-skeleton/card-skeleton.component";
import { EmptyComponent } from "../../components/shared/data-view/empty/empty.component";
import { ListComponent } from "../../components/shared/data-view/list/list.component";
import { PopoverComponent } from "../../components/shared/data-view/popover/popover.component";

@Component({
  selector: 'app-data-view-example',
  imports: [AppAvatarComponent, NzDemoAvatarBadgeComponent, AvatarGroupComponent, CardComponent, CardSkeletonComponent, EmptyComponent, ListComponent, PopoverComponent],
  templateUrl: './data-view-example.component.html',
  styleUrl: './data-view-example.component.scss'
})
export class DataViewExampleComponent {

}
