import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Validators, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})

export class AddDataComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, private backendService: BackendService) {
    this.registrationForm = this.formbuilder.group({
    })
  }

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      courseId: ['', Validators.required],
      birthdate: [null, Validators.required],
      newsletter: [false],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  showToast: boolean = false;

  displayToast(): void {
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 8000);
  }

  closeToast(): void {
    this.showToast = false;
  }

  resetForm() {
    this.registrationForm.reset();
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage);
      this.displayToast();
      this.resetForm();
    }
  }
}
