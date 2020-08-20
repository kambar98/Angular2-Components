import { Component } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService, AccountsService]
})
export class NewAccountComponent {


  constructor(private loggingService: LoggingService, private accountService: AccountsService) { }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.loggingService.logStatusChange(accountStatus);
    this.accountService.addAccount(accountName, accountStatus);
    
  }

}
