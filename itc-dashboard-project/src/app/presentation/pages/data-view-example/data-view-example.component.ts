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
import { LineChartComponent } from "../../components/shared/data-view/line-chart/line-chart.component";
import { PolarChartComponent } from "../../components/shared/data-view/polar-chart/polar-chart.component";
import { AreaChartComponent } from "../../components/shared/data-view/area-chart/area-chart.component";
import { StackedAreaChartComponent } from "../../components/shared/data-view/stacked-area-chart/stacked-area-chart.component";
import { NormalizedAreaChartComponent } from "../../components/shared/data-view/normalized-area-chart/normalized-area-chart.component";
import { BubbleChartComponent } from "../../components/shared/data-view/bubble-chart/bubble-chart.component";
import { BoxChartComponent } from "../../components/shared/data-view/box-chart/box-chart.component";
import { HeatMapComponent } from "../../components/shared/data-view/heat-chart/heat-chart.component";
import { TreeMapComponent } from "../../components/shared/data-view/tree-chart/tree-chart.component";
import { NumberCardsComponent } from "../../components/shared/data-view/number-chart/number-chart.component";
import { GaugeChartComponent } from "../../components/shared/data-view/gauge-chart/gauge-chart.component";
import { LinearGaugeChartComponent } from "../../components/shared/data-view/linear-gauge-chart/linear-gauge-chart.component";
import { PercentGaugeChartComponent } from "../../components/shared/data-view/percent-gauge-chart/percent-gauge-chart.component";

@Component({
  selector: 'app-data-view-example',
  imports: [AppAvatarComponent, NzDemoAvatarBadgeComponent, AvatarGroupComponent, CardComponent, CardSkeletonComponent, EmptyComponent, ListComponent, PopoverComponent, NgxGraphCustomCurveComponent, VerticalBarChartComponent, HorizontalBarChartComponent, GroupedVerticalBarChartComponent, GroupedHorizontalBarChartComponent, StackedVerticalBarChartComponent, StackedHorizontalBarChartComponent, NormalizedVerticalBarChartComponent, NormalizedHorizontalBarChartComponent, PieChartComponent, AdvancedPieChartComponent, PieGridComponent, LineChartComponent, PolarChartComponent, AreaChartComponent, StackedAreaChartComponent, NormalizedAreaChartComponent, BubbleChartComponent, BoxChartComponent, HeatMapComponent, TreeMapComponent, NumberCardsComponent, GaugeChartComponent, LinearGaugeChartComponent, PercentGaugeChartComponent],
  templateUrl: './data-view-example.component.html',
  styleUrl: './data-view-example.component.scss'
})
export class DataViewExampleComponent {

}
