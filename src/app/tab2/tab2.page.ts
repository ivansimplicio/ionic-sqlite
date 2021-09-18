import { ContactService } from './../services/contact.service';
import { Component } from '@angular/core';
import { Contact } from '../services/contact';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{

  contacts: Contact[] = [];

  constructor(public userService: ContactService) {}

  ionViewWillEnter() {
    this.loadContacts();
  }

  async loadContacts(){
    this.contacts = await this.userService.getAll();
  }
}
