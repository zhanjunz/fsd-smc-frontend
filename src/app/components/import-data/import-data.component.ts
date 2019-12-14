import { FileUploadResponse } from "./../../model/file-upload-response";
import { Component, OnInit } from "@angular/core";
import { FormGroupDirective, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-import-data",
  templateUrl: "./import-data.component.html",
  styleUrls: ["./import-data.component.css"]
})
export class ImportDataComponent implements OnInit {
  loading = false;
  fileToUpload: File;

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  ngOnInit() {}

  fileSelected(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    this.loading = true;
    var config = {
      headers: { "Content-Type": undefined },
      transformRequest: []
    };

    let data = new FormData();
    data.append("file", this.fileToUpload, this.fileToUpload.name);

    let api = this.http.post(`${environment.gatewayUrl}/upload-service`, data);
    api.subscribe(
      (response: FileUploadResponse) => {
        this.loading = false;
        this.snackbar.open(response.message, "Close", {
          duration: 3000
        });
      },
      error => {
        let errorMessage: string;
        this.loading = false;
        if (error.error && error.error.message) {
          errorMessage = "Error:" + error.error.message;
        } else {
          errorMessage =
            "Error occured while uploading, please try again after some time.";
        }
        this.snackbar.open(errorMessage, "Close", {
          duration: 3000
        });
      }
    );
  }
}
