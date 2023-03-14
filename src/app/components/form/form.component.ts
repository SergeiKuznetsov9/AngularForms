import { Component } from '@angular/core';
import { User } from 'src/app/data/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  roles: string[] = ['Гость', 'Модератор', 'Администратор']
  model: User = new User(1, '', '')



  errorsLog(d: any) {
    console.log(d)
  }

}
