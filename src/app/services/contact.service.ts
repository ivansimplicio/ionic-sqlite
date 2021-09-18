import { Contact } from './contact';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(public databaseService: DatabaseService) { }

  public save(contact: Contact) {
    if (contact.id > 0) {
      return this.update(contact);
    } else {
      return this.insert(contact);
    }
  }

  public async getById(id: number) {
    const sql = 'select * from contacts where id = ?';
    const data = [id];
    const result = await this.databaseService.executeSQL(sql, data);
    const rows = result.rows;
    const contact = new Contact();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      contact.id = item.id;
      contact.name = item.name;
      contact.email = item.email;
      contact.phone = item.phone;
    }
    return contact;
  }

  public async getAll() {
    const sql = 'select * from contacts';
    const result = await this.databaseService.executeSQL(sql);
    const contacts = this.fillContacts(result.rows);
    return contacts;
  }

  public delete(id: number) {
    const sql = 'delete from contacts where id = ?';
    const data = [id];

    return this.databaseService.executeSQL(sql, data);
  }

  private insert(contact: Contact) {
    const sql = 'insert into contacts (name, email, phone) values (?, ?, ?)';
    const data = [contact.name, contact.email, contact.phone];

    return this.databaseService.executeSQL(sql, data);
  }

  private update(contact: Contact) {
    const sql = 'update contacts set name = ? where id = ?';
    const data = [contact.name, contact.id];

    return this.databaseService.executeSQL(sql, data);
  }

  private async filter(text: string) {
    const sql = 'select * from contacts where name like ?';
    const data = [`%${text}%`];
    const result = await this.databaseService.executeSQL(sql, data);
    const contacts = this.fillContacts(result.rows);
    return contacts;
  }

  private fillContacts(rows: any) {
    const contacts: Contact[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const contact = new Contact();
      contact.id = item.id;
      contact.name = item.name;
      contact.email = item.email;
      contact.phone = item.phone;
      contacts.push(contact);
    }

    return contacts;
  }
}
