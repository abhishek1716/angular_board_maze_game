import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  form: FormGroup;
  formErrors = {
    height: '',
    width: ''
  }
  validationMessages = {
    height: {
      required: 'Height is required'
    },
    width: {
      required: 'Width is required'
    }
  }
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.form = this.fb.group({
      height: ['', [Validators.required]],
      width: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  logValidationErrors(group: FormGroup = this.form): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || abstractControl)
      ) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.logValidationErrors(this.form);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
