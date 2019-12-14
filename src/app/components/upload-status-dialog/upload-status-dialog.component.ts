import { FileStatusModel } from '../../model/file-status-model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-status-dialog',
  templateUrl: './upload-status-dialog.component.html',
  styleUrls: ['./upload-status-dialog.component.css']
})
export class UploadStatusDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UploadStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileStatusModel) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
