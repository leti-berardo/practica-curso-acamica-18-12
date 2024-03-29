var expect = chai.expect;

function mockRestaurant() {
    return new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
}

function mockListadoRestaurantes() {
    let listadoDeRestaurantes = [
        new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
        new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
        new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
        new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
        new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]),
        new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9]),
        new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
        new Restaurant(9, "La Trottinette", "Pasta", "París", ["16:00", "18:00", "21:30"], "../img/pasta5.jpg", [8, 8, 7, 7, 7, 7]),
        new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6])];
    return new Listado(listadoDeRestaurantes);
}

describe('Test Reserva Horarios', () => {

    let restaurante;
    let horariosOriginal;
    let horariosControl;

    beforeEach(function () {
        restaurante = mockRestaurant();
        horariosOriginal = restaurante.horarios;
        horariosControl = [...restaurante.horarios];
    })

    it('Si el horario esta disponible, se elimina del array', () => {
        // ["13:00", "15:30", "18:00"]

        let horarioAReservar = horariosOriginal[1];
        restaurante.reservarHorario(horarioAReservar);
        expect(restaurante.horarios).that.does.not.include(horarioAReservar);
    });

    it('Si el horario que se reserva no existe, el array se mantiene igual', () => {

        let horarioAReservar = "20:30";
        restaurante.reservarHorario(horarioAReservar);
        expect(restaurante.horarios).to.eql(horariosControl);
    });

    it('Intenta reservar un horario sin pasar un parametro en la funcion, el array se mantiene igual', () => {
        restaurante.reservarHorario();
        expect(restaurante.horarios).to.eql(horariosControl);
    });
});

describe('Test Obtener Puntuacion', () => {
    let restaurante;

    beforeEach(function () {
        //[6, 7, 9, 10, 5]
        restaurante = mockRestaurant();
    });

    it('Dado un array, devuelve el promedio correctamente', () => {
        let promedioEsperado = 7.4;
        let promedioObtenido = restaurante.obtenerPuntuacion();
        expect(promedioObtenido).to.be.equal(promedioEsperado);
    });

    it('Dado un array vacio, devuelve el valor 0', () => {
        restaurante.calificaciones = [];
        let promedioObtenido = restaurante.obtenerPuntuacion();
        expect(promedioObtenido, 'Aca pueden poner un mje personalizado por si se rompe').to.be.equal(0);
    });
});

describe('Test Calificar', () => {
    /*  1- Agregar una calificacion (8) y chequear si se agrego
        2- Agregar un valor negativo y no se debe agregar
        3- Agregar un valor con decimales y no se debe agregar
        4- Agregar un valor string y no se debe agregar*/

    let restaurante;

    beforeEach(function () {
        restaurante = mockRestaurant();
    });

    it('Agrega una calificacion y aparece en el array de calificaciones', () => {
        //[6, 7, 9, 10, 5]
        let arrayCalificaciones = restaurante.calificaciones;
        restaurante.calificar(8);
        expect(arrayCalificaciones).that.does.include(8);
    });

    it('Agrega un valor negativo y el valor no aparece en el array de calificaciones', () => {
        let arrayCalificaciones = restaurante.calificaciones;
        restaurante.calificar(-8);
        expect(arrayCalificaciones).that.does.not.include(-8);
    });

    it('Agregar un valor con decimales y no se debe agregar', () => {
        let arrayCalificaciones = restaurante.calificaciones;
        restaurante.calificar(8.5);
        expect(arrayCalificaciones).that.does.not.include(8.5);
    });

    it('Agregar un valor string y no se debe agregar', () => {
        let arrayCalificaciones = restaurante.calificaciones;
        restaurante.calificar('8');
        expect(arrayCalificaciones).that.does.not.include('8');
    });
});

describe('Test Buscar Restaurante', () => {
    /*  1- Buscar un ID existente y nos devuelva el restaurante correcto
        2- Buscar un ID inexistente y nos devuelva el string: "No se ha encontrado ningún restaurant"
        3- Buscar un String y nos devuelva el string: "No se ha encontrado ningún restaurant"
    */

    let listaRestaurantes;

    beforeEach(function () {
        listaRestaurantes = mockListadoRestaurantes();
    });

    it('Buscar un ID existente (6) y nos devuelva el restaurante correcto', () => {
        let resultadoEsperado = new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]);
        let resultadoObtenido = listaRestaurantes.buscarRestaurante(6);
        expect(resultadoObtenido).to.be.eql(resultadoEsperado);
    });

    it("Buscar un ID inexistente y nos devuelva el string: 'No se ha encontrado ningún restaurant'", () => {
        let resultadoEsperado = "No se ha encontrado ningún restaurant";
        let resultadoObtenido = listaRestaurantes.buscarRestaurante(89);
        expect(resultadoObtenido).to.be.equal(resultadoEsperado);
    });

    it("Buscar un string y nos devuelva el string: 'No se ha encontrado ningún restaurant'", () => {
        let resultadoEsperado = "No se ha encontrado ningún restaurant";
        let resultadoObtenido = listaRestaurantes.buscarRestaurante('6');
        expect(resultadoObtenido).to.be.equal(resultadoEsperado);
    });
});

describe('Test Obtener Restaurantes', () => {
    /*  1- Buscar restaurantes con rubro, ciudad y horario existente, debe retornar un restaurante valido.
        2- Buscar restaurantes con rubro valido, ciudad valida y horario no valido. Debe retornar un array vacio.
        3- Buscar restaurantes con rubro valido, ciudad no valida y horario valido. Debe retornar un array vacio.
        4- Buscar restaurantes con rubro no valido, ciudad valida y horario valido. Debe retornar un array vacio.
    */

    beforeEach(function () {
        listaRestaurantes = mockListadoRestaurantes();
    });

    it('Buscar restaurantes con rubro, ciudad y horario existente, debe retornar un array de length 1.', () => {
        let resultadoObtenido = listaRestaurantes.obtenerRestaurantes("Ensalada", "Berlín", "20:30");
        expect(resultadoObtenido).to.have.lengthOf(1);
    });

    it('Buscar restaurantes con rubro, ciudad y horario existente, debe retornar un restaurante valido.', () => {
        let resultadoEsperado = new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]);
        let resultadoObtenido = listaRestaurantes.obtenerRestaurantes("Ensalada", "Berlín", "20:30");
        expect(resultadoObtenido[0]).to.be.eql(resultadoEsperado);
    });

    it('Buscar restaurantes con horario no valido. Debe retornar un array vacio.', () => {
        let resultadoObtenido = listaRestaurantes.obtenerRestaurantes("Ensalada", "Berlín", "21:30");
        expect(resultadoObtenido).to.have.lengthOf(0);
    });

    it('Buscar restaurantes con ciudad no valida. Debe retornar un array vacio.', () => {
        let resultadoObtenido = listaRestaurantes.obtenerRestaurantes("Ensalada", "New York", "20:30");
        expect(resultadoObtenido).to.have.lengthOf(0);
    });

    it('Buscar restaurantes con rubro no valido. Debe retornar un array vacio.', () => {
        let resultadoObtenido = listaRestaurantes.obtenerRestaurantes("Asiatica", "Berlín", "20:30");
        expect(resultadoObtenido).to.have.lengthOf(0);
    });
})

describe('Test Reserva', () => {
    let reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")
   
    describe('Precio Base Reserva', () => {


        it('Que un restaurante calcule correctamente su precio base', () => {
            let resultadoObtenido = reserva2.precioBase();
            resultadoEsperado = 300;
            expect(resultadoObtenido).to.be.equal(resultadoEsperado);
        });
    })

    describe('Precio Final Reserva', () => {

        it('Que un restaurante calcule correctamente su precio final', () => {
            let resultadoObtenido = reserva2.precioFinal();
            resultadoEsperado = 100;
            expect(resultadoObtenido).to.be.equal(resultadoEsperado);
        })
    })
})

