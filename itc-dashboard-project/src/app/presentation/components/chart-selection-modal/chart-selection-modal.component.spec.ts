import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChartSelectionModalComponent } from './chart-selection-modal.component';

describe('ChartSelectionModalComponent', () => {
  let component: ChartSelectionModalComponent;
  let fixture: ComponentFixture<ChartSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSelectionModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeModal when Close button is clicked', () => {
    spyOn(component.closeModal, 'emit');
    const closeBtn = fixture.debugElement.queryAll(By.css('app-default-button'))[0];
    closeBtn.triggerEventHandler('click', null);
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should alert if trying to add without selecting chart variant', () => {
    spyOn(window, 'alert');
    const addBtn = fixture.debugElement.queryAll(By.css('app-primary-button'))[0];
    addBtn.triggerEventHandler('click', null);
    expect(window.alert).toHaveBeenCalledWith('Please select a chart variant and data source.');
  });

  it('should emit addChart with correct payload when valid selection', () => {
    spyOn(component.addChart, 'emit');
    component.selectChartCategory('pie-chart');
    component.selectedChartVariant = 'pie-chart';
    component.selectedDataSource = '/assets/data-set-2.json';
    component.selectedDataCount = '5';
    fixture.detectChanges();
    const addBtn = fixture.debugElement.queryAll(By.css('app-primary-button'))[0];
    addBtn.triggerEventHandler('click', null);

    expect(component.addChart.emit).toHaveBeenCalledWith({
      chartType: 'pie-chart',
      dataSource: '/assets/data-set-2.json',
      dataCount: '5'
    });
  });

  it('should default dataCount to "all" if invalid number entered', () => {
    spyOn(component.addChart, 'emit');
    component.selectChartCategory('bar-chart');
    component.selectedChartVariant = 'horizontal-bar';
    component.selectedDataSource = '/assets/data-set-1.json';
    component.selectedDataCount = '0';
    fixture.detectChanges();

    const addBtn = fixture.debugElement.queryAll(By.css('app-primary-button'))[0];
    addBtn.triggerEventHandler('click', null);

    expect(component.addChart.emit).toHaveBeenCalledWith({
      chartType: 'horizontal-bar',
      dataSource: '/assets/data-set-1.json',
      dataCount: 'all'
    });
  });

});