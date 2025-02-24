import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule, NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
}

@Component({
  selector: 'app-unified-table',
  standalone: true,
  imports: [FormsModule, NzButtonModule, NzDropDownModule, NzDividerModule, NzIconModule, NzInputModule, NzTableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class UnifiedTableComponent {
  searchValue: string = '';
  visible: boolean = false;
  
  // Sample data values
  listOfData: DataItem[] = [
    { name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
    { name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
    { name: 'Kate White', age: 29, address: 'Paris No. 3 Lake Park' },
    { name: 'Tom Blue', age: 35, address: 'Berlin No. 4 Lake Park' }
  ];
  
  listOfDisplayData: DataItem[] = [...this.listOfData];
  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' }
      ],
      filterFn: (list: string[], item: DataItem) =>
        list.some(name => item.name.indexOf(name) !== -1)
    },
    {
      name: 'Age',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Address',
      sortOrder: null,
      sortFn: null,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
        { text: 'Paris', value: 'Paris' },
        { text: 'Berlin', value: 'Berlin' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (list: string[], item: DataItem) =>
        list.some(address => item.address.indexOf(address) !== -1)
    }
  ];
  
  sortByAge(): void {
    this.listOfColumns.forEach(item => {
      item.sortOrder = item.name === 'Age' ? 'descend' : null;
    });
  }
  
  resetFilters(): void {
    // Reset filter lists to default values
    this.listOfColumns.forEach(item => {
      if (item.name === 'Name') {
        item.listOfFilter = [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' }
        ];
      } else if (item.name === 'Address') {
        item.listOfFilter = [
          { text: 'London', value: 'London' },
          { text: 'New York', value: 'New York' },
          { text: 'Paris', value: 'Paris' },
          { text: 'Berlin', value: 'Berlin' },
          { text: 'Sidney', value: 'Sidney' }
        ];
      }
    });
  }
  
  resetSortAndFilters(): void {
    this.listOfColumns.forEach(item => item.sortOrder = null);
    this.resetFilters();
    this.searchValue = '';
    this.search();
  }
  
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) =>
      item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    );
  }
  
  trackByData(index: number, item: DataItem): string {
    return item.name;
  }
  
  onSelect(event: any): void {
    console.log(event);
  }
}