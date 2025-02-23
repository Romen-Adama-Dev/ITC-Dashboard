import { Component } from '@angular/core';
import { AppAvatarComponent } from "../../components/shared/data-view/avatar/avatar.component";
import { NzDemoAvatarBadgeComponent } from "../../components/shared/data-view/avatar-badge/avatar-badge.component";
import { AvatarGroupComponent } from "../../components/shared/data-view/avatar-group/avatar-group.component";
import { CardComponent } from "../../components/shared/data-view/card/card.component";
import { CardSkeletonComponent } from "../../components/shared/data-view/card-skeleton/card-skeleton.component";
import { EmptyComponent } from "../../components/shared/data-view/empty/empty.component";
import { ListComponent } from "../../components/shared/data-view/list/list.component";
import { PopoverComponent } from "../../components/shared/data-view/popover/popover.component";
import { NgxGraphCustomCurveComponent } from "../../components/shared/data-view/graph-custom-curve/graph-custom-curve.component";
import { VerticalBarChartComponent } from "../../components/shared/data-view/vertical-chart/vertical-chart.component";
import { HorizontalBarChartComponent } from "../../components/shared/data-view/horizontal-chart/horizontal-chart.component";
import { GroupedVerticalBarChartComponent } from "../../components/shared/data-view/grouped-vertical-bar-chart/grouped-vertical-bar-chart.component";
import { GroupedHorizontalBarChartComponent } from "../../components/shared/data-view/grouped-horizontal-bar-chart/grouped-horizontal-bar-chart.component";
import { StackedVerticalBarChartComponent } from "../../components/shared/data-view/stacked-vertical-bar-chart/stacked-vertical-bar-chart.component";
import { StackedHorizontalBarChartComponent } from "../../components/shared/data-view/stacked-horizontal-bar-chart/stacked-horizontal-bar-chart.component";
import { NormalizedVerticalBarChartComponent } from "../../components/shared/data-view/normalized-vertical-bar-chart/normalized-vertical-bar-chart.component";
import { NormalizedHorizontalBarChartComponent } from "../../components/shared/data-view/normalized-horizontal-bar-chart/normalized-horizontal-bar-chart.component";
import { PieChartComponent } from "../../components/shared/data-view/pie-chart/pie-chart.component";
import { AdvancedPieChartComponent } from "../../components/shared/data-view/advanced-pie-chart/advanced-pie-chart.component";
import { PieGridComponent } from "../../components/shared/data-view/pie-grid/pie-grid.component";

@Component({
  selector: 'app-data-view-example',
  imports: [AppAvatarComponent, NzDemoAvatarBadgeComponent, AvatarGroupComponent, CardComponent, CardSkeletonComponent, EmptyComponent, ListComponent, PopoverComponent, NgxGraphCustomCurveComponent, VerticalBarChartComponent, HorizontalBarChartComponent, GroupedVerticalBarChartComponent, GroupedHorizontalBarChartComponent, StackedVerticalBarChartComponent, StackedHorizontalBarChartComponent, NormalizedVerticalBarChartComponent, NormalizedHorizontalBarChartComponent, PieChartComponent, AdvancedPieChartComponent, PieGridComponent],
  templateUrl: './data-view-example.component.html',
  styleUrl: './data-view-example.component.scss'
})
export class DataViewExampleComponent {

}
