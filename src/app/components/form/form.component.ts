import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm, ValidationErrors } from '@angular/forms';
import { User } from 'src/app/data/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements AfterViewInit {
  @ViewChild('userForm') userForm: NgForm | null = null;

  roles: string[] = ['Гость', 'Модератор', 'Администратор'];
  model: User = new User(1, null, null, null);

  formErrors: any = {
    name: '',
    age: '',
  };

  validationMessages: any = {
    name: {
      required: 'Name is required',
      minlength: 'Min 4 chars',
    },
    age: {
      required: 'Age is required',
    },
  };

  ngAfterViewInit() {
    console.log(this.userForm);

    /* 
    valueChanges - это observable, поэтому на него нужно подписаться. После этого мы будем
    получать объект с данными полей формы при ее изменении.
    Однако для нашей цели данные формы не важны, т.к. нам нужна более подробная информация,
    в т.ч. о статусе поля, в сязи с чем мы по факту изменения будем вызывать кое-какой метод,
    но передавать туда значения, генерируемые observable - не будем 
*/
    this.userForm?.valueChanges?.subscribe(() => this.onValueChanged());
  }

  onValueChanged() {
    const form = this.userForm?.form;

    Object.keys(this.formErrors).forEach((field) => {
      this.formErrors[field] = '';
      const control = form?.get(field);

      if (control && control.dirty && control.invalid) {
        const messages = this.validationMessages[field];

        Object.keys(control.errors as ValidationErrors).forEach((key) => {
          const message = messages[key];
          this.formErrors[field] += message;
        });
      }
    });
  }

  onSubmit(d: any): void {
    console.log(d);
  }
}
