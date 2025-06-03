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
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AreaChartComponent.html" data-type="entity-link" >AreaChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BoxChartComponent.html" data-type="entity-link" >BoxChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BubbleChartComponent.html" data-type="entity-link" >BubbleChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChartSelectionModalComponent.html" data-type="entity-link" >ChartSelectionModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChartSelectorVanillaComponent.html" data-type="entity-link" >ChartSelectorVanillaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DefaultButtonComponent.html" data-type="entity-link" >DefaultButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditWidgetModalComponent.html" data-type="entity-link" >EditWidgetModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FloatShapeButtonComponent.html" data-type="entity-link" >FloatShapeButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GaugeChartComponent.html" data-type="entity-link" >GaugeChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GridsterDashboardComponent.html" data-type="entity-link" >GridsterDashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeatMapComponent.html" data-type="entity-link" >HeatMapComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HorizontalBarChartComponent.html" data-type="entity-link" >HorizontalBarChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LanguageDropdownComponent.html" data-type="entity-link" >LanguageDropdownComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LinearGaugeChartComponent.html" data-type="entity-link" >LinearGaugeChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LineChartComponent.html" data-type="entity-link" >LineChartComponent</a>
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
                                <a href="components/PrimaryButtonComponent.html" data-type="entity-link" >PrimaryButtonComponent</a>
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
                                <a href="components/ThemeToggleButtonComponent.html" data-type="entity-link" >ThemeToggleButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreeMapComponent.html" data-type="entity-link" >TreeMapComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VerticalBarChartComponent.html" data-type="entity-link" >VerticalBarChartComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ChartDataService.html" data-type="entity-link" >ChartDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChartHelperService.html" data-type="entity-link" >ChartHelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MediatorService.html" data-type="entity-link" >MediatorService</a>
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
                                <a href="interfaces/ChartConfig.html" data-type="entity-link" >ChartConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartOption.html" data-type="entity-link" >ChartOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartsJson.html" data-type="entity-link" >ChartsJson</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtendedGridsterItem.html" data-type="entity-link" >ExtendedGridsterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SafeGridsterConfig.html" data-type="entity-link" >SafeGridsterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SeriesChartData.html" data-type="entity-link" >SeriesChartData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SimpleChartData.html" data-type="entity-link" >SimpleChartData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreeMapItem.html" data-type="entity-link" >TreeMapItem</a>
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
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
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