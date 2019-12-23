var Reserva = function (horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;
};


Reserva.prototype.precioFinal = function () {
    return this.precioBase() - this.descuentos() + this.adicionales();
};

Reserva.prototype.adicionales = function() {
    return this.adicionalDia() + this.adicionalHorario();
};

Reserva.prototype.descuentos = function() {
    return this.descuentoCodigo() + this.descuentoPersonas();
};

Reserva.prototype.descuentoPersonas = function () {
    let descuentoPersonas = 0;

    if (this.cantidadPersonas >= 4 && this.cantidadPersonas <= 6) {
        descuentoPersonas = this.precioBase() * 0.05;
    }
    else if (this.cantidadPersonas >= 7 && this.cantidadPersonas <= 8) {
        descuentoPersonas = this.precioBase() * 0.10;
    }
    else if (this.cantidadPersonas > 8) {
        descuentoPersonas = this.precioBase() * 0.15;
    }

    return descuentoPersonas;
};

Reserva.prototype.descuentoCodigo = function () {
    let descuentoCodigo = 0;

    if (this.codigoDescuento == "DES15") {
        descuentoCodigo = this.precioBase() * 0.15;
    }
    else if (this.codigoDescuento == "DES200") {
        descuentoCodigo = 200;
    }
    else if (this.codigoDescuento == "DES1") {
        descuentoCodigo = this.precioPersona;
    }

    return descuentoCodigo;
};

Reserva.prototype.adicionalHorario = function () {
    let hora = this.horario.getHours();
    let adicionalHorario = 0;

    if ((hora >= 13 && hora <= 14) || (hora >= 20 && hora <= 21)) {
        adicionalHorario = this.precioBase() * 0.05;
    }

    return adicionalHorario;
};

Reserva.prototype.adicionalDia = function () {
    let dia = this.horario.getDay();
    let adicionalDia = 0;

    if (dia == 5 || dia == 6 || dia == 7) {
        adicionalDia = this.precioBase() * 0.10;
    }

    return adicionalDia;
};

Reserva.prototype.precioBase = function () {
    return this.cantidadPersonas * this.precioPersona;
};