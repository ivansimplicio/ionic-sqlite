import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Contact } from '../services/contact';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public userService: ContactService,
              private toast: ToastController){
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      phone : ['', Validators.required]
    });
  }

  async save(){
    const user = new Contact();
    user.name = this.registrationForm.get('name').value;
    user.email = this.registrationForm.get('email').value;
    user.phone = this.registrationForm.get('phone').value;
    try {
      const result = await this.userService.save(user);
      user.id = result.insertId;

      const toast = await this.toast.create({
        header: 'Sucesso',
        message: 'Contato salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 1000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toast.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar o Contato.',
        color: 'danger',
        position: 'bottom',
        duration: 1000
      });

      toast.present();
    }
  }

  clear(){
    this.registrationForm = this.formBuilder.group({
      name : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      phone : ['', Validators.required]
    });
  }
}
