import { Component, OnInit } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-graph-custom-curve',
  standalone: true,
  imports: [NgxGraphModule],
  templateUrl: './graph-custom-curve.component.html',
  styleUrls: ['./graph-custom-curve.component.scss']
})
export class NgxGraphCustomCurveComponent implements OnInit {
  view: [number, number] = [800, 550];
  layout: string = 'dagreCluster';

  // Ejemplo de nodos. Se pueden complementar con atributos "data" para los colores, etc.
  nodes = [
    { id: 'first', label: 'A', data: { color: '#4da6e3' } },
    { id: 'second', label: 'B', data: { color: '#0768A9' } },
    { id: 'c1', label: 'C1', data: { color: '#3a94d0' } },
    { id: 'c2', label: 'C2', data: { color: '#4da6e3' } },
    { id: 'd', label: 'D', data: { color: '#0768A9' } }
  ];

  // Ejemplo de enlaces (edges)
  links = [
    { id: 'a', source: 'first', target: 'second', label: 'is parent of' },
    { id: 'b', source: 'first', target: 'c1', label: 'custom label' },
    { id: 'd', source: 'first', target: 'c2', label: 'custom label' },
    { id: 'e', source: 'c1', target: 'd', label: 'first link' },
    { id: 'f', source: 'c1', target: 'd', label: 'second link' }
  ];

  // Ejemplo de clusters
  clusters = [
    { id: 'third', label: 'Cluster node', childNodeIds: ['c1', 'c2'] }
  ];

  // Usamos la interpolación lineal para las curvas de las aristas
  curve = shape.curveLinear;

  constructor() {}

  ngOnInit(): void {}
}