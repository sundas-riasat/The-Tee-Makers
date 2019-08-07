import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-text-popup',
  templateUrl: './text-popup.component.html',
  styleUrls: ['./text-popup.component.css']
})
export class TextPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TextPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
