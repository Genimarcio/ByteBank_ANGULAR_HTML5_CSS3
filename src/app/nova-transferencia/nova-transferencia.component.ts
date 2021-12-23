import { HttpClient } from "@angular/common/http";
import { Component, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Transferencia } from "../models/transferencia.model";
import { TransferenciaService } from "../services/transferencia.service";

@Component({
    selector:'app-nova-transferencia' , 
    templateUrl:'./nova-transferencia.component.html' , 
    styleUrls:['./nova-transferencia.component.scss']
})


export class NovaTransferenciaComponent{
    title = 'bytebank'

    @Output() aoTransferir = new EventEmitter<any>();

    valor: number;

    destino: number;

    constructor(private service: TransferenciaService , private router: Router){

    }

    transferir(){

        console.log('solicitar nova Transferencia');

        const valorEmitir: Transferencia = {valor: this.valor, destino: this.destino };
        this.aoTransferir.emit(valorEmitir);

        this.service.adicionar(valorEmitir)
        .subscribe(resultado => {
            console.log(resultado);
            this.limparCampos();
            this.router.navigateByUrl('extrato');
        },
        error => console.error(error));
        
        this.limparCampos();

        // console.log('Valor:' , this.valor);
        // console.log('Destino:' , this.destino);

    }

    limparCampos(){
        this.valor = 0;
        this.destino = 0;
    }

    // nomes: []

    // stringsNomes(){
    //     console.log('Acionada', this.nomes);
        
    // }

}


