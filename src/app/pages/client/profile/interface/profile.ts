export interface Profile {
    email: string;
    nombre: string;
    apellidos: string;
    phoneNumber: string;
    fechaRegistro: Date;
    rol: string;
}

export interface UpdateUserDto {
  nombre: string;
  apellidos: string;
  email: string;
  phoneNumber: string;
  newPassword?: string;
  currentPassword?: string;
}
