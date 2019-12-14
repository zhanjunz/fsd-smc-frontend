import { IpoEditorDialogComponent } from './../ipo-editor-dialog/ipo-editor-dialog.component';
import { IpoModel } from './../../model/ipo-model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ipo-view-dialog',
  templateUrl: './ipo-view-dialog.component.html',
  styleUrls: ['./ipo-view-dialog.component.css']
})
export class IpoViewDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<IpoEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IpoModel) { }

  ngOnInit() {
  }

}
