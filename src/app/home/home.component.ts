import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../login-usuario/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { TemplateDrivenComponent } from '../template-driven/template-driven.component';
// import { TemplateDrivenService } from '../template-driven/template-driven.service';
import { ReactiveService } from '../reactive/reactive.service';
import { ReactiveComponent } from '../reactive/reactive.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mostrarNavbar: boolean = true;

  displayedColumns: string[] = [
    'id',
    'nome',
    'sobrenome',
    'nomeSocial',
    'cpf',
    'dataDeNascimento',
    'genero',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authService: AuthService,
    private _dialog: MatDialog,
    private drivenService: ReactiveService
  ) {}

  ngOnInit() {
    this.authService.mostrarNavbarEmitter.subscribe((mostrar) => {
      this.mostrarNavbar = mostrar;
    });
    this.getUsuarioList();
  }

  abrirCriarUsuario() {
    const dialogRef = this._dialog.open(ReactiveComponent);
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getUsuarioList();
        }
      },
    });
  }

  getUsuarioList() {
    this.drivenService.getUsuarioList().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  deleteUsuario(id: number) {
    this.drivenService.deleteUsuario(id).subscribe({
      next: (response) => {
        alert('Usário deletado!');
        this.getUsuarioList();
      },
      error: console.log,
    });
  }

  abrirEditarUsuario(data: any) {
    const dialogRef = this._dialog.open(ReactiveComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getUsuarioList();
        }
      },
    });
  }
}
