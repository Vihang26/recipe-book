import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private dataStorageService: DataStorageService, private authService:AuthService) { }

  isAuthenticated = false;
  private userSub : Subscription;

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user =>{
    this.isAuthenticated = !!user;
    });
  }

  onSave(){
    this.dataStorageService.storeRecipe()
  }
  onFetch(){
    this.dataStorageService.fetchRecipe().subscribe()
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
