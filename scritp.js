let indiceActual = 0;
        const tarjetas = document.querySelectorAll('.tarjeta');
        const totalTarjetas = tarjetas.length;
        let intervaloAutomatico;

        // Crear indicadores
        function crearIndicadores() {
            const contenedorIndicadores = document.getElementById('indicadores');
            for (let i = 0; i < totalTarjetas; i++) {
                const indicador = document.createElement('span');
                indicador.className = 'indicador';
                indicador.onclick = () => irATarjeta(i);
                contenedorIndicadores.appendChild(indicador);
            }
            actualizarIndicadores();
        }

        // Actualizar indicadores
        function actualizarIndicadores() {
            const indicadores = document.querySelectorAll('.indicador');
            indicadores.forEach((ind, i) => {
                ind.classList.toggle('activo', i === indiceActual);
            });
        }

        // Mover carrusel
        function moverCarrusel(direccion) {
            indiceActual += direccion;
            
            if (indiceActual >= totalTarjetas) {
                indiceActual = 0;
            } else if (indiceActual < 0) {
                indiceActual = totalTarjetas - 1;
            }
            
            actualizarPosicion();
            reiniciarIntervalo();
        }

        // Ir a tarjeta específica
        function irATarjeta(indice) {
            indiceActual = indice;
            actualizarPosicion();
            reiniciarIntervalo();
        }

        // Actualizar posición del carrusel
        function actualizarPosicion() {
            const carrusel = document.getElementById('carrusel');
            const desplazamiento = -indiceActual * 320;
            carrusel.style.transform = `translateX(${desplazamiento}px)`;
            actualizarIndicadores();
        }

        // Avance automático
        function avanzarAutomaticamente() {
            moverCarrusel(1);
        }

        // Reiniciar intervalo
        function reiniciarIntervalo() {
            clearInterval(intervaloAutomatico);
            intervaloAutomatico = setInterval(avanzarAutomaticamente, 3000);
        }

        // Inicializar
        crearIndicadores();
        reiniciarIntervalo();

        // Pausar al pasar el mouse
        const contenedorCarrusel = document.querySelector('.contenedor-carrusel');
        contenedorCarrusel.addEventListener('mouseenter', () => {
            clearInterval(intervaloAutomatico);
        });
        contenedorCarrusel.addEventListener('mouseleave', reiniciarIntervalo);