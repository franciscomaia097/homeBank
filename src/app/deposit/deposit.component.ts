import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {
  depositAmount = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+(\.\d{1,2})?$/),
  ]);

  // Declare a variable to store the current balance
  currentBalance: number;

  constructor(
    public dialogRef: MatDialogRef<DepositComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Retrieve the current balance from the data passed in
    this.currentBalance = data.currentBalance;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDeposit(): void {
    if (this.depositAmount.valid) {
      let depositAmount = parseFloat(this.depositAmount.value || '0');
      let newBalance = this.currentBalance + depositAmount;

      // Close the dialog with the new balance and deposit amount
      this.dialogRef.close({
        newBalance: newBalance,
        depositAmount: depositAmount,
      });
    }
  }
}
