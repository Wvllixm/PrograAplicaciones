import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  apellido: string = '';
  carrera: string = '';
  rut: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async register() {
    if (this.nombre && this.apellido && this.carrera && this.rut) {

      const nombreUsuario = this.nombre.substring(0, 2) + this.apellido.substring(0, 1) + this.rut.substring(0, 2);

      const password = this.rut.substring(0, 4);
  
      const alumno = {
        nombre: this.nombre,
        apellido: this.apellido,
        carrera: this.carrera,
        rut: this.rut,
        nombreUsuario: nombreUsuario,
        password: password,
      };
  
      localStorage.setItem('alumno', JSON.stringify(alumno));

      const mensaje = `Tu nombre de usuario es: ${nombreUsuario}\nTu contraseña es: ${password}`;
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: mensaje,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/home']);
            },
          },
        ],
      });

      await alert.present();
    } else {
      console.error('Faltan datos obligatorios para el registro.');
    }
  }


}