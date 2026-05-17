

// --- 1. LÓGICA DE MODO OSCURO ---

function iniciarModoOscuro() {
    const btnTheme = document.getElementById('theme-toggle');
    const iconTheme = document.getElementById('theme-icon');
    if (!btnTheme) return; // Si no hay botón, se sale pacíficamente
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (iconTheme) iconTheme.textContent = '☀️'; // [cite: 88, 89]
    }

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            let theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            if (iconTheme) iconTheme.textContent = (theme === 'dark') ? '☀️' : '🌙'; // [cite: 90]
            localStorage.setItem('theme', theme);
        });
    }
}

// --- 2. LÓGICA DE REGISTRO (Guardar Usuario) ---
function iniciarRegistro() {
    const formRegistro = document.getElementById('miFormulario');
    if (!formRegistro) return;

    const loader = document.getElementById('loader-container');

    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Guardamos en un array dentro de localStorage para simular una base de datos
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuarios.push({ email: email, password: password });
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            loader.classList.add('active'); // Activamos la animación de carga
            setTimeout(() => {
                alert("¡Usuario registrado con éxito!");
                window.location.href = "iniciar_sesion.html";
            }, 2000);
        });
    }
}

// --- 3. LÓGICA DE INICIO DE SESIÓN ---
// Esta función debe conectarse al formulario de tu HTML de "Iniciar Sesión"
function iniciarLogin() {
    const formLogin = document.getElementById('form-login'); // Un ID único para el formulario de login
    if (!formLogin) return;

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailIngresado = document.getElementById('login-email').value;
            const passIngresada = document.getElementById('login-password').value;

            // Usuarios predefinidos que pediste
            const credencialesFijas = [
                { email: 'juan', pass: '123456' },
                { email: 'pepa', pass: '654321' }
            ];

            // Revisar en usuarios registrados (localStorage)
            const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Validar si existe en fijos o en registrados
            const esValidoFijo = credencialesFijas.find(u => u.email === emailIngresado && u.pass === passIngresada);
            const esValidoRegistrado = usuariosRegistrados.find(u => u.email === emailIngresado && u.password === passIngresada);

            if (esValidoFijo || esValidoRegistrado) {
                loader.classList.add('active');
                setTimeout(() => {
                    window.location.href = "bienvenida.html"; // Redirige al Dashboard [cite: 86]
                }, 2000);
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        });
    }
}

// --- Extra. REDIRECCIÓN GENERICA ---

function pasarPantallas(idBoton, urlDestino) {
    const linkIniciar = document.getElementById(idBoton);
    const loader = document.getElementById('loader-container');
    if (linkIniciar) {
        linkIniciar.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace salte de golpe sin cargar la animación

            // Si no tengo loader en el html pasa directo para que esten pendientes si no quieren loader
            if (loader) {
                loader.classList.add('active'); // Muestra la rueda de carga
                setTimeout(() => {
                    window.location.href = urlDestino;
                }, 2000);
            }
            else {
                window.location.href = urlDestino;
            }
        }
        );

        // Espera 2 segundos mostrando el spinner y luego cambia de ventana

    }
}
// --- 4. FUNCIÓN REUTILIZABLE PARA MENÚS DESPLEGABLES ---
function configurarDropdown(idBoton, idMenu) {
    const boton = document.getElementById(idBoton);
    const menu = document.getElementById(idMenu);

    // Con este 'if' protegemos el código: si los elementos no existen en la página actual, no hace nada
    if (boton && menu) {
        boton.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic cierre el menú inmediatamente
            menu.classList.toggle('show');
        });

        // Evento global: si hacen clic fuera del menú, este se cierra solo
        document.addEventListener('click', (e) => {
            // Verificamos si el clic fue fuera del botón y fuera del propio menú
            if (!boton.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('show');
            }
        });
    }
}
//Esta creo que es de la seccion de extras
function filtrarHistorial(tipo) {
    // Buscamos todas las tarjetas de transacciones en la pantalla
    const transacciones = document.querySelectorAll('.transaccion');

    transacciones.forEach(tarjeta => {
        if (tipo === 'todos') {
            // Si eligen 'todos', mostramos absolutamente todas las tarjetas
            tarjeta.style.display = 'grid'; 
        } else if (tarjeta.classList.contains(tipo)) {
            // Si la tarjeta tiene la clase que buscamos ('ingreso' o 'egreso'), se muestra
            tarjeta.style.display = 'grid';
        } else {
            // Si no coincide, la escondemos por completo de la pantalla
            tarjeta.style.display = 'none';
        }
    });
}

// ==========================================================================
// --- CENTRALIZACIÓN Y LLAMADAS DE LAS FUNCIONES (Al final del archivo) ---
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Activamos la lógica universal del Modo Claro / Modo Oscuro
    // (Esta se ejecuta siempre en todas las páginas)
    if (typeof iniciarModoOscuro === 'function') {
        iniciarModoOscuro();
    }

    // 2. Activamos la lógica de la pantalla de Registro
    // (Gracias a los IF internos o al encapsularse, solo actuará en su HTML)
    if (typeof iniciarRegistro === 'function') {
        iniciarRegistro();
    }

    // 3. Activamos la lógica de la pantalla de Iniciar Sesión
    if (typeof iniciarLogin === 'function') {
        iniciarLogin();
    }

    // 4. Inicializamos los menús desplegables (Dropdowns) de tu aplicación
    // Aquí es donde llamas a tu función reutilizable pasándole los IDs del HTML
    if (typeof configurarDropdown === 'function') {

        // Menú desplegables
        configurarDropdown('btnTuerca', 'dropdownMenu');
        configurarDropdown('btnPerfil', 'menuPerfil');
        configurarDropdown('btnCuenta', 'menuCuenta');

        // 💡 Cuando crees nuevos menús en el futuro, solo agregas la llamada aquí abajo:
        // configurarDropdown('idDelNuevoBoton', 'idDelNuevoMenu');
    }

    if (typeof iniciarOcultarSaldo === 'function') {
        iniciarOcultarSaldo();
    }

    //Extra relacionado a pasar pantallas
    if (typeof pasarPantallas === 'function') {

        // Se le pasa el id del boton que quieres que haga la magia y el sitio a donde debe ir
        pasarPantallas('link-iniciar-sesion', 'iniciar_sesion.html');
    }

    console.log("¡Todas las funciones del Banco se han inicializado correctamente!");
});

function iniciarOcultarSaldo() {
    const btnOcultar = document.getElementById('btnOcultarSaldo');
    const saldoElement = document.querySelector('.tarjeta-textosaldo span');
    const ojoIcon = document.getElementById('ojoIcon');
    
    // Si no existe el botón o el elemento del saldo, salimos (no estamos en principal.html)
    if (!btnOcultar || !saldoElement) return;
    
    // Variable para guardar el estado (true = visible, false = oculto)
    let saldoVisible = true;
    
    // Guardamos el saldo original para mostrarlo después
    let saldoOriginal = saldoElement.textContent;
    
    // Función para ocultar el saldo
    function ocultarSaldo() {
        saldoOriginal = saldoElement.textContent;
        saldoElement.textContent = '•••';
        saldoElement.classList.add('saldo-oculto');
        saldoVisible = false;
        
        // Cambiar la imagen al ojo cerrado
        if (ojoIcon) {
            ojoIcon.src = 'assets/eye-slash-svgrepo-com.svg';
            // Si no tienes el icono de ojo cerrado, puedes usar este emoji como fallback
            // o crear un SVG simple:
            // ojoIcon.alt = 'Mostrar saldo';
        }
        
        // Animación de parpadeo
        saldoElement.classList.add('saldo-animation');
        setTimeout(() => {
            saldoElement.classList.remove('saldo-animation');
        }, 300);
    }
    
    // Función para mostrar el saldo
    function mostrarSaldo() {
        saldoElement.textContent = saldoOriginal;
        saldoElement.classList.remove('saldo-oculto');
        saldoVisible = true;
        
        // Cambiar la imagen al ojo abierto
        if (ojoIcon) {
            ojoIcon.src = 'assets/eye-svgrepo-com.svg';
            // ojoIcon.alt = 'Ocultar saldo';
        }
        
        // Animación de parpadeo
        saldoElement.classList.add('saldo-animation');
        setTimeout(() => {
            saldoElement.classList.remove('saldo-animation');
        }, 300);
    }
    
    // Alternar entre mostrar y ocultar
    btnOcultar.addEventListener('click', () => {
        if (saldoVisible) {
            ocultarSaldo();
        } else {
            mostrarSaldo();
        }
    });
}