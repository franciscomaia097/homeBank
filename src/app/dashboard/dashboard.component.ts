import { MatDialog } from '@angular/material/dialog';
import { DepositComponent } from '../deposit/deposit.component';
import { WithdrawComponent } from '../withdraw/withdraw.component';
import { Component, OnInit } from '@angular/core';

interface Transaction {
  type: string;
  amount: number;
  name?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public username: string | null = null;
  public balance: number = 0;
  public transactions: Transaction[] = []; // Declare the transactions array

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username;
    this.balance = user.balance;

    // Load the transactions from localStorage
    const transactions = JSON.parse(
      localStorage.getItem('transactions') || '[]'
    );
    this.transactions = transactions;
  }

  openDepositDialog(): void {
    const dialogRef = this.dialog.open(DepositComponent, {
      width: '250px',
      data: { currentBalance: this.balance },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the balance with the new balance
        this.balance = result.newBalance;
        // Update local storage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.balance = this.balance;
        localStorage.setItem('user', JSON.stringify(user));
        // Add the deposit to the transactions array
        this.transactions.push({
          type: 'Depósito',
          amount: result.depositAmount,
        });
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
      }
    });
  }

  openWithdrawDialog() {
    const dialogRef = this.dialog.open(WithdrawComponent, {
      data: { currentBalance: this.balance },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.balance = result.newBalance;
        // Add the withdrawal to the transactions array
        this.transactions.push({
          type: 'Levantamento',
          amount: result.amount,
          name: result.expenseName,
        });
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
      }
    });
  }
}
