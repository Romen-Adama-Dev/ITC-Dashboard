import { Component, Input, HostBinding, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-graph-custom-curve',
  standalone: true,
  imports: [NgxGraphModule],
  templateUrl: './graph-custom-curve.component.html',
  styleUrls: ['./graph-custom-curve.component.scss']
})
export class NgxGraphCustomCurveComponent implements AfterViewInit, OnDestroy {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  // Tamaño inicial; se actualizará de forma responsive
  view: [number, number] = [800, 550];

  layout: string = 'dagreCluster';

  nodes = [
    { id: 'first', label: 'A', data: { color: '#4da6e3' } },
    { id: 'second', label: 'B', data: { color: '#0768A9' } },
    { id: 'c1', label: 'C1', data: { color: '#3a94d0' } },
    { id: 'c2', label: 'C2', data: { color: '#4da6e3' } },
    { id: 'd', label: 'D', data: { color: '#0768A9' } }
  ];

  links = [
    { id: 'a', source: 'first', target: 'second', label: 'is parent of' },
    { id: 'b', source: 'first', target: 'c1', label: 'custom label' },
    { id: 'd', source: 'first', target: 'c2', label: 'custom label' },
    { id: 'e', source: 'c1', target: 'd', label: 'first link' },
    { id: 'f', source: 'c1', target: 'd', label: 'second link' }
  ];

  clusters = [
    { id: 'third', label: 'Cluster node', childNodeIds: ['c1', 'c2'] }
  ];

  // Usamos interpolación lineal para las curvas
  curve = shape.curveLinear;

  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef) {
    // Se mantiene la relación de aspecto: 550 / 800 ≈ 0.6875
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * 0.6875;
        this.view = [width, height];
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }
}