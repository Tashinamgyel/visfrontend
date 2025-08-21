import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Credentials } from '@app/auth';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user: Credentials;
  @Input() userDetails: any;
  @Input() locationDetails: any;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

  jurisdiction: any;
  fullName: any;
  centre: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.jurisdiction = JSON.parse(localStorage.getItem('jurisdiction'));
    this.fullName = JSON.parse(localStorage.getItem('fullName'));
    this.centre = JSON.parse(localStorage.getItem('centre'));
  }

  public signOutEmit(): void {
    this.signOut.emit();
  }

  get username(): string | null {
    const credentials = this.user;
    return credentials ? credentials.userName : null;
  }

  userProfile() {
    this.router.navigate([this.route.snapshot.queryParams.redirect || '/profile'], { replaceUrl: true });
  }
}
