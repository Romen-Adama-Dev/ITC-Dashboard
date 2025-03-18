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
      verticalBarChart: ChartConfig;
      horizontalBarChart: ChartConfig;
    };
  }