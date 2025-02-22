import { Component } from '@angular/core';
import { AlertIconComponent } from "../../components/shared/feedback/alert/alert.component";
import { NzDemoDrawerFromDrawerComponent } from "../../components/shared/feedback/drawer/drawer.component";
import { UnifiedMessageDemoComponent } from "../../components/shared/feedback/message/message.component";
import { NzDemoModalAsyncComponent } from "../../components/shared/feedback/modal/modal.component";
import { UnifiedNotificationDemoComponent } from "../../components/shared/feedback/notification/notification.component";
import { NzDemoPopconfirmPromiseComponent } from "../../components/shared/feedback/popconfirm/popconfirm.component";
import { NzDemoProgressLineComponent } from "../../components/shared/feedback/linear-bar/linear-bar.component";
import { NzDemoProgressFormatComponent } from "../../components/shared/feedback/circular-bar/circular-bar.component";
import { ProgressGradientComponent } from "../../components/shared/feedback/custom-bar/custom-bar.component";
import { UnifiedSkeletonDemoComponent } from "../../components/shared/feedback/skeleton/skeleton.component";
import { NzDemoSpinBasicComponent } from "../../components/shared/feedback/spin/spin.component";

@Component({
  selector: 'app-feedback-example',
  imports: [AlertIconComponent, NzDemoDrawerFromDrawerComponent, UnifiedMessageDemoComponent, NzDemoModalAsyncComponent, UnifiedNotificationDemoComponent, NzDemoPopconfirmPromiseComponent, NzDemoProgressLineComponent, NzDemoProgressFormatComponent, ProgressGradientComponent, UnifiedSkeletonDemoComponent, NzDemoSpinBasicComponent],
  templateUrl: './feedback-example.component.html',
  styleUrl: './feedback-example.component.scss'
})
export class FeedbackExampleComponent {

}
