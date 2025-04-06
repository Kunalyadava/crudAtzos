import { AfterViewInit, Component, inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ApiserviceService } from '../apiservice.service';
import { MatIconModule } from '@angular/material/icon';
import { PostcomponentComponent } from '../postcomponent/postcomponent.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  address: string;
  id: number;
  email: string;
  mobile: string;
  name: string;
}

@Component({
  selector: 'app-get-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatDialogModule],
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'id', 'name', 'address', 'email', 'mobile', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatSort) sort!: MatSort; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private destroy$ = new Subject<void>();

  constructor(private http: ApiserviceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUsers() {
    this.http.getData().pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.dataSource.data = res.sort((a: any, b: any) => b.id - a.id);//comment this line if you dont want to show newly added user on top
      this.dataSource = new MatTableDataSource<PeriodicElement>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  AddUser() {
    const dialogRef = this.dialog.open(PostcomponentComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getUsers();
        });
  }

  edit(id: number) {
    const dialogRef = this.dialog.open(PostcomponentComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    
      this.getUsers();
    });
  }

  delete(id: number) {
    const isconfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isconfirmed) {
      this.http.deleteUser(id).subscribe((res: any) => {
        console.log('user deleted', res);
        this.dataSource.data = this.dataSource.data.filter((user: any) => user.id !== id);
      });
    }
  }
  
}
