import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css'],
})
export class WithdrawComponent {
  withdrawAmount = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+(\.\d{1,2})?$/),
  ]);

  expenseName = new FormControl('', [Validators.required]);

  withdrawForm: FormGroup = new FormGroup({
    withdrawAmount: this.withdrawAmount,
    expenseName: this.expenseName,
  });

  // Declare a variable to store the current balance
  currentBalance: number;

  constructor(
    public dialogRef: MatDialogRef<WithdrawComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Retrieve the current balance from the data passed in
    this.currentBalance = data.currentBalance;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onWithdraw(): void {
    if (this.withdrawForm.valid) {
      // Convert the withdrawAmount value to a number
      let amount = parseFloat(this.withdrawAmount.value || '0');
      // Check if the withdrawal amount is greater than the balance
      if (amount > this.currentBalance) {
        // Show an error message
        alert('Você não pode sacar mais do que o saldo disponível.');
      } else {
        // Subtract the withdrawal amount from the balance
        let newBalance = this.currentBalance - amount;
        // Close the dialog with the new balance and expense name
        this.dialogRef.close({
          newBalance: newBalance,
          expenseName: this.expenseName.value,
          amount: amount,
        });
      }
    }
  }
}
