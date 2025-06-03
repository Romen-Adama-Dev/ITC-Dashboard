export interface SimpleChartData {
  name: string;
  value: number;
}

export interface SeriesChartData {
  name: string;
  series: Array<{
    name: string;
    value: number;
  }>;
}

export type ChartData = SimpleChartData | SeriesChartData;

export interface ChartConfig {
  theme: 'default' | 'dark';
  view: [number, number];
  data: ChartData[];
}

export interface ChartsJson {
  charts: {
    sharedChart: ChartConfig;
    areaChart?: ChartConfig;
    boxChart?: ChartConfig;
    bubbleChart?: ChartConfig;
    heatMap?: ChartConfig;
    lineChart?: ChartConfig;
    linearGaugeChart?: ChartConfig;
    normalizedAreaChart?: ChartConfig;
    normalizedHorizontalBarChart?: ChartConfig;
    normalizedVerticalBarChart?: ChartConfig;
    numberCards?: ChartConfig;
    percentGaugeChart?: ChartConfig;
    pieChart?: ChartConfig;
    pieGridChart?: ChartConfig;
    polarChart?: ChartConfig;
    stackedAreaChart?: ChartConfig;
    stackedHorizontalBarChart?: ChartConfig;
    stackedVerticalBarChart?: ChartConfig;
    treeMap?: ChartConfig;
  };
}
