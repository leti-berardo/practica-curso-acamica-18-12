var Restaurant = function (id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function (horarioReservado) {
    this.horarios = this.horarios.filter(function (elem) {
        return elem !== horarioReservado;
    });
};

Restaurant.prototype.calificar = function (nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function () {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        var sumatoria = this.promedio(this.calificaciones);
        return sumatoria;
    }

};

Restaurant.prototype.promedio = function (array) {
    let sum = this.sumatoria(array);
    let prom = sum / array.length;
    return Math.round(prom * 10) / 10;
};

Restaurant.prototype.sumatoria = function (array) {
    let sum = array.reduce(function (acumulador, valorActual) {
        return acumulador + valorActual
    });

    return sum;
};

