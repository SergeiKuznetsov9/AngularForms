import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/data/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  /*   roles: string[] = ['Гость', 'Модератор', 'Администратор']
  model: User = new User(1, '', '') */

  /*
  Каждое поле формы инициализируем следующим образом:
*/
  userForm = new FormGroup({
    /*
  Внутри FormControl первым аргументом можем указать дефолтные значения поля;
  Вторым аргументом - валидаторы

*/
    name: new FormControl('User', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
  });

  onSubmit(): void {
    console.log(this.userForm);
    console.log(this.userForm.value);
  }
}
