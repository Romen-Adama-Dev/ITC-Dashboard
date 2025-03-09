'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">itc-dashboard-project documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AdvancedPieChartComponent.html" data-type="entity-link" >AdvancedPieChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AlertIconComponent.html" data-type="entity-link" >AlertIconComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppAvatarComponent.html" data-type="entity-link" >AppAvatarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/appInputComponent.html" data-type="entity-link" >appInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AreaChartComponent.html" data-type="entity-link" >AreaChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AvatarGroupComponent.html" data-type="entity-link" >AvatarGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BoxChartComponent.html" data-type="entity-link" >BoxChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BubbleChartComponent.html" data-type="entity-link" >BubbleChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CardComponent.html" data-type="entity-link" >CardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CardSkeletonComponent.html" data-type="entity-link" >CardSkeletonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChartSelectorVanillaComponent.html" data-type="entity-link" >ChartSelectorVanillaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashedButtonComponent.html" data-type="entity-link" >DashedButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DefaultButtonComponent.html" data-type="entity-link" >DefaultButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DropdownButtonComponent.html" data-type="entity-link" >DropdownButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmptyComponent.html" data-type="entity-link" >EmptyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FloatMenuButtonComponent.html" data-type="entity-link" >FloatMenuButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FloatShapeButtonComponent.html" data-type="entity-link" >FloatShapeButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GaugeChartComponent.html" data-type="entity-link" >GaugeChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Gridster2ExampleComponent.html" data-type="entity-link" >Gridster2ExampleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GridsterDashboardComponent.html" data-type="entity-link" >GridsterDashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GroupedHorizontalBarChartComponent.html" data-type="entity-link" >GroupedHorizontalBarChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GroupedVerticalBarChartComponent.html" data-type="entity-link" >GroupedVerticalBarChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeatMapComponent.html" data-type="entity-link" >HeatMapComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HorizontalBarChartComponent.html" data-type="entity-link" >HorizontalBarChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HorizontalNavComponent.html" data-type="entity-link" >HorizontalNavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/IconButtonComponent.html" data-type="entity-link" >IconButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InlineNavComponent.html" data-type="entity-link" >InlineNavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LinearGaugeChartComponent.html" data-type="entity-link" >LinearGaugeChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LineChartComponent.html" data-type="entity-link" >LineChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LinkButtonComponent.html" data-type="entity-link" >LinkButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListComponent.html" data-type="entity-link" >ListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgxGraphCustomCurveComponent.html" data-type="entity-link" >NgxGraphCustomCurveComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NormalizedAreaChartComponent.html" data-type="entity-link" >NormalizedAreaChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NormalizedHorizontalBarChartComponent.html" data-type="entity-link" >NormalizedHorizontalBarChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NormalizedVerticalBarChartComponent.html" data-type="entity-link" >NormalizedVerticalBarChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NumberCardsComponent.html" data-type="entity-link" >NumberCardsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoAutoCompleteUncertainCategoryComponent.html" data-type="entity-link" >NzDemoAutoCompleteUncertainCategoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoAvatarBadgeComponent.html" data-type="entity-link" >NzDemoAvatarBadgeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoCascaderMultipleComponent.html" data-type="entity-link" >NzDemoCascaderMultipleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoDatePickerRangePickerComponent.html" data-type="entity-link" >NzDemoDatePickerRangePickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoDrawerFromDrawerComponent.html" data-type="entity-link" >NzDemoDrawerFromDrawerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoInputNumberBasicComponent.html" data-type="entity-link" >NzDemoInputNumberBasicComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoModalAsyncComponent.html" data-type="entity-link" >NzDemoModalAsyncComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoPopconfirmPromiseComponent.html" data-type="entity-link" >NzDemoPopconfirmPromiseComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoProgressFormatComponent.html" data-type="entity-link" >NzDemoProgressFormatComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoProgressLineComponent.html" data-type="entity-link" >NzDemoProgressLineComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoSliderIconSliderComponent.html" data-type="entity-link" >NzDemoSliderIconSliderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoSpinBasicComponent.html" data-type="entity-link" >NzDemoSpinBasicComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NzDemoUploadDefaultFileListComponent.html" data-type="entity-link" >NzDemoUploadDefaultFileListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PaginationNavComponent.html" data-type="entity-link" >PaginationNavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PercentGaugeChartComponent.html" data-type="entity-link" >PercentGaugeChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PieChartComponent.html" data-type="entity-link" >PieChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PieGridComponent.html" data-type="entity-link" >PieGridComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PolarChartComponent.html" data-type="entity-link" >PolarChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PopoverComponent.html" data-type="entity-link" >PopoverComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PrimaryButtonComponent.html" data-type="entity-link" >PrimaryButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProgressGradientComponent.html" data-type="entity-link" >ProgressGradientComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RadioSelectorComponent.html" data-type="entity-link" >RadioSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StackedAreaChartComponent.html" data-type="entity-link" >StackedAreaChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StackedHorizontalBarChartComponent.html" data-type="entity-link" >StackedHorizontalBarChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StackedVerticalBarChartComponent.html" data-type="entity-link" >StackedVerticalBarChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StepHorizontalNavComponent.html" data-type="entity-link" >StepHorizontalNavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StepVerticalNavComponent.html" data-type="entity-link" >StepVerticalNavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SwitchDemoComponent.html" data-type="entity-link" >SwitchDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ThemeToggleButtonComponent.html" data-type="entity-link" >ThemeToggleButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreeMapComponent.html" data-type="entity-link" >TreeMapComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UnifiedMessageDemoComponent.html" data-type="entity-link" >UnifiedMessageDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UnifiedNotificationDemoComponent.html" data-type="entity-link" >UnifiedNotificationDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UnifiedRadioGroupComponent.html" data-type="entity-link" >UnifiedRadioGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UnifiedSkeletonDemoComponent.html" data-type="entity-link" >UnifiedSkeletonDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UnifiedTableComponent.html" data-type="entity-link" >UnifiedTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VerticalBarChartComponent.html" data-type="entity-link" >VerticalBarChartComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ColumnItem.html" data-type="entity-link" >ColumnItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataItem.html" data-type="entity-link" >DataItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtendedGridsterItem.html" data-type="entity-link" >ExtendedGridsterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RadioOption.html" data-type="entity-link" >RadioOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RadioOption-1.html" data-type="entity-link" >RadioOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SafeGridsterConfig.html" data-type="entity-link" >SafeGridsterConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});