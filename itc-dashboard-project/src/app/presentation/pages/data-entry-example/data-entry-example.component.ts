import { Component } from '@angular/core';
import { NzDemoAutoCompleteUncertainCategoryComponent } from "../../components/shared/data-entry/autocomplete/autocomplete.component";
import { NzDemoCascaderMultipleComponent } from "../../components/shared/data-entry/cascader/cascader.component";
import { NzDemoDatePickerRangePickerComponent } from "../../components/shared/data-entry/date-range/date-range.component";
import { appInputComponent } from "../../components/shared/data-entry/input/input.component";
import { NzDemoInputNumberBasicComponent } from "../../components/shared/data-entry/input-number/input-number.component";
import { UnifiedRadioGroupComponent } from "../../components/shared/data-entry/radio/radio.component";
import { NzDemoSliderIconSliderComponent } from "../../components/shared/data-entry/slider/slider.component";
import { SwitchDemoComponent } from "../../components/shared/data-entry/switch/switch.component";
import { NzDemoUploadDefaultFileListComponent } from "../../components/shared/data-entry/upload/upload.component";

@Component({
  selector: 'app-data-entry-example',
  standalone: true,
  imports: [
    NzDemoAutoCompleteUncertainCategoryComponent,
    NzDemoCascaderMultipleComponent,
    NzDemoDatePickerRangePickerComponent,
    appInputComponent,
    NzDemoInputNumberBasicComponent,
    UnifiedRadioGroupComponent,
    NzDemoSliderIconSliderComponent,
    SwitchDemoComponent,
    NzDemoUploadDefaultFileListComponent
],
  templateUrl: './data-entry-example.component.html',
  styleUrls: ['./data-entry-example.component.scss']
})
export class DataEntryExampleComponent { }