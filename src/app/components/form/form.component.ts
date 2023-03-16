import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/data/user';
import {
  emailValidator,
  matchPasswordValidator,
  rangeValidator,
} from 'src/app/validators/customValidator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  userForm!: FormGroup;
  roles: string[] = ['Гость', 'Модератор', 'Администратор'];
  user: User = new User(1, null, null, null, null, null);

  // Хорошо придерживаться такого паттерна, т.к. все названия можно менять из класса, т.е. не лезть в лэйаут
  // Тоже самое неплохо создать для placeholder, также сообщения об успехе ввода
  // Позже, все текстовые объекты целесообразно вынести в отдельный файл
  formLabels = {
    name: 'Имя',
    password: 'Пароль',
    matchPassword: 'Проверка пароля',
    email: 'Емэил',
    role: 'Роль',
    age: 'Возраст',
  };

  formErrors: any = {
    name: '',
    passwords: '',
    /* password: '',
    matchPassword: '', */
    email: '',
    role: '',
    age: '',
  };

  validationMessages: any = {
    name: {
      required: 'Name is required',
      minlength: 'Min 4 chars',
      maxlength: 'Max 15 chars',
    },
    password: {
      required: 'Password is required',
      minlength: 'Min 7 chars',
      maxlength: 'Max 25 chars',
    },
    matchPassword: {
      required: 'Match Password is required',
      matchPasswordValidator: 'Password doesn`t match',
    },
    email: {
      required: 'Email is required',
      emailValidator: 'Uncorrect email format',
    },
    age: {
      required: 'Age is required',
      rangeValidator: 'from 1 to 122',
      minRange: 'min 1',
      maxRange: 'max 122',
    },
    role: {
      required: 'Role is required',
    },
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.userForm = this.formBuilder.group({
      name: [
        this.user.name,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],

      passwords: this.formBuilder.group(
        {
          password: [
            this.user.password,
            [
              Validators.required,
              Validators.minLength(7),
              Validators.maxLength(25),
            ],
          ],
          matchPassword: ['', [Validators.required]],
        },
        { validators: matchPasswordValidator }
      ),

      email: [
        this.user.email,
        [
          Validators.required,
          emailValidator /* Validators.pattern(/^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})$/) */,
        ],
      ],
      age: [
        this.user.age,
        [
          Validators.required,
          rangeValidator(1, 122) /* Validators.pattern(/^\d+$/) */,
        ],
      ],
      role: [this.user.role, [Validators.required]],
    });

    /* this.userForm.valueChanges.subscribe(() => this.onValueChanged()); */
  }

  onValueChanged() {
    const form = this.userForm;

    Object.keys(this.formErrors).forEach((field) => {
      console.log(field);
      this.formErrors[field] = '';
      const control = form?.get(field);

      if (control && control.dirty && control.invalid) {
        const messages = this.validationMessages[field];

        Object.keys(control.errors as ValidationErrors).some((key) => {
          const message = messages[key];
          return (this.formErrors[field] = message);
        });
      }
    });
  }

  onSubmit(): void {
    console.log(this.userForm);
    console.log(this.userForm.value);
  }
}
