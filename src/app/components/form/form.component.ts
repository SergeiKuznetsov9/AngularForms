import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/data/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  userForm!: FormGroup;
  roles: string[] = ['Гость', 'Модератор', 'Администратор'];
  user: User = new User(1, null, null, null, null, null);

  formErrors: any = {
    name: '',
    password: '',
    email: '',
    role: '',
    age: '',
  }

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
    email: {
      required: 'Email is required',
      email: 'Uncorrect email format',
    },
    age: {
      required: 'Age is required',
    },
    role: {
      required: 'Role is required',
    },
  }

  constructor(private formBuilder: FormBuilder) {}

  private buildForm(): void {
    this.userForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: [this.user.password, [Validators.required, Validators.minLength(7), Validators.maxLength(25)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      age: [this.user.age, [Validators.required]],
      role: [this.user.role, [Validators.required]],
    });

    this.userForm.valueChanges.subscribe( () => this.onValueChanged())

  }

  onSubmit(): void {
    console.log(this.userForm);
    console.log(this.userForm.value);
  }
}
