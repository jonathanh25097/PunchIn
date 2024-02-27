import { Component, OnInit } from '@angular/core';
import { PunchingProxyService } from '../_services/punchin.proxy.service';
import { Form, FormControl, Validators } from '@angular/forms';
import { User, Record } from '../_models/PunchIn';
import moment from 'moment'; // Use default import for moment
import 'moment-timezone'; // Ensure moment-timezone is imported to extend moment functionality

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    '_id',
    'user.name',
    'clockInTime',
    'clockOutTime',
  ];
  time: string = '';
  user: User = {} as User;
  lastRecord: Record = {} as Record;
  isClockedIn: boolean = false;
  lastFiveRecords: Record[] = [];

  constructor(private punchingProxyService: PunchingProxyService) {
    this.punchingProxyService.login('aimee', 'ilovejony').subscribe((user) => {
      this.user = user;
      this.punchingProxyService
        .getLastFiveRecords(user._id)
        .subscribe((records) => {
          this.lastFiveRecords = records;
        });
      this.punchingProxyService.getLastRecord(user._id).subscribe((record) => {
        this.lastRecord = record;
        this.isClockedIn = record.clockInTime && !record.clockOutTime;
      });
    });
  }
  ngOnInit() {
    setInterval(() => {
      this.time = moment().tz('America/New_York').format('HH:mm:ss');
    }, 1000);
  }

  Clock() {
    if (this.isClockedIn) {
      this.clockOut();
    } else {
      this.clockIn();
    }
  }

  clockIn() {
    const record: Record = {
      user: { _id: this.user._id, name: 'Aimee' },
      clockInTime: new Date(),
    };
    this.punchingProxyService.clockIn(record).subscribe((record) => {
      console.log('Clocked in:', record);
      this.isClockedIn = true;
    });
  }

  clockOut() {
    this.punchingProxyService.clockOut(this.user._id).subscribe((record) => {
      console.log('Clocked out:', record);
      this.isClockedIn = false;
    });
  }
}
