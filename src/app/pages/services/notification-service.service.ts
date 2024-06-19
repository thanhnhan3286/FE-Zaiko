import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogInformationComponent } from '@common/components/dialog-information/dialog-information.component';
import { IDialogInformation } from '@common/models';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private dialog: MatDialog) {}

  public showError(message: string): void {
    const dialogData: IDialogInformation = {
      type: 'error',
      content: message,
      negative: {
        title: 'Close',
        click: () => {
          this.dialog.closeAll();
        }
      }
    };

    this.dialog.open(DialogInformationComponent, {
      data: dialogData
    });
  }

  public showSuccess(message:string): void {
    const dialogData: IDialogInformation = {
      type:'success',
      content:message,
      negative:{
        title:'Close',
        click:()=>{
          this.dialog.closeAll();
        }
      }
    };
    this.dialog.open(DialogInformationComponent,{
      data:dialogData
    })
  }

  public showDeleteConfirmation(onConfirm: () => void): void {
    const dialogData: IDialogInformation = {
      type: 'delete',
      content: '現在の行を削除します。よろしいですか？',
      negative: {
        title: 'No',
        click: () => {
          this.dialog.closeAll();
        }
      },
      positive: {
        title: 'Yes',
        click: () => {
          onConfirm();
          this.dialog.closeAll();
        }
      }
    };

    this.dialog.open(DialogInformationComponent, {
      data: dialogData
    });
  }

}
