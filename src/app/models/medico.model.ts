import { Usuario } from './usuario.model';
import { Hospital } from './hospital.model';
export class Medico{
    constructor(
        public nombre:string,
        public hospital?:Hospital,
        public usuario?:Usuario,
        public img?:string,
        public _id?:string
    ){

    }
}