import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-postcomponent',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './postcomponent.component.html',
  styleUrl: './postcomponent.component.css'
})
export class PostcomponentComponent implements OnInit {
  myForm: FormGroup;
  private destroy$ = new Subject<void>();
  isEdit: boolean = false;
  userId: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: ApiserviceService,
    public dialogRef: MatDialogRef<PostcomponentComponent>
  ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.isEdit = true;
      this.userId = this.data.id;
      this.loadUserData(this.userId);
    }
  }

  loadUserData(id: number): void {
    this.http.getData().pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      const user = res.find((user: any) => user.id === id);
      if (user) {
        this.myForm.setValue({
          name: user.name,
          address: user.address,
          email: user.email,
          mobile: user.mobile
        });
      }
    });
  }

  addUser(): void {
    if (this.myForm.valid) {
      if (this.isEdit && this.userId) {
        this.http.updateUser(this.userId, this.myForm.value).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.dialogRef.close();
        });
      } else {
        this.http.postUser(this.myForm.value).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.dialogRef.close();
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
