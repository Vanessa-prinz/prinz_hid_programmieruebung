import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
  constructor(private formbuilder: FormBuilder, public storeService: StoreService, private backendService: BackendService) {
  }

  public registrationForm: any;

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

  onSubmit() {
    if (this.registrationForm.valid) {
      this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage);
      this.displayToast(); //Notification Popup bei erfolgreicher Kursanmeldung (Bootstrap)
    } else {
      alert('Bitte füllen Sie alle erforderlichen Felder aus.');
    }
  }

  displayToast(): void {
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000); //automatisches ausblenden nach 3 Sekunden
  }

  closeToast(): void { //manuelles ausblenden des Toast
    this.showToast = false;
  }
}
