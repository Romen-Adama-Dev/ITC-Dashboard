export interface ChartData {
    name: string;
    value: number;
  }
  
  export interface ChartConfig {
    theme: 'default' | 'dark';
    view: [number, number];
    data: ChartData[];
  }
  
  export interface ChartsJson {
    charts: {
      advancedPieChart: ChartConfig;
      areaChart: ChartConfig;
      boxChart: ChartConfig;
      bubbleChart: ChartConfig;
      gaugeChart: ChartConfig;
      verticalBarChart: ChartConfig;
      horizontalBarChart: ChartConfig;
    };
  }