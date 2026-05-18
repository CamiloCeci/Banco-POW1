

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
                window.location.href = "principal.html";
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
                    window.location.href = "principal.html"; // Redirige al Dashboard [cite: 86]
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
        // Guardar el saldo original en un atributo personalizado
        saldoElement.setAttribute('data-saldo-original', saldoOriginal);
        saldoElement.textContent = '•••';
        saldoElement.classList.add('saldo-oculto');
        saldoVisible = false;
        
        // Cambiar la imagen al ojo cerrado
        if (ojoIcon) {
            ojoIcon.src = 'assets/eye-slash-svgrepo-com.svg';
        }
        
        // Animación de parpadeo
        saldoElement.classList.add('saldo-animation');
        setTimeout(() => {
            saldoElement.classList.remove('saldo-animation');
        }, 300);
    }
    
    // Función para mostrar el saldo
    function mostrarSaldo() {
        // Recuperar el saldo original del atributo personalizado
        const saldoGuardado = saldoElement.getAttribute('data-saldo-original');
        if (saldoGuardado) {
            saldoElement.textContent = saldoGuardado;
        } else {
            saldoElement.textContent = saldoOriginal;
        }
        saldoElement.classList.remove('saldo-oculto');
        saldoVisible = true;
        
        // Cambiar la imagen al ojo abierto
        if (ojoIcon) {
            ojoIcon.src = 'assets/eye-svgrepo-com.svg';
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

function iniciarCambioCuenta() {
    const btnCuenta = document.getElementById('btnCuenta');
    const menuCuenta = document.getElementById('menuCuenta');
    const textoSuperior = document.querySelector('.tarjeta-textosup span:first-child');
    const textoSaldo = document.querySelector('.tarjeta-textosaldo span');
    
    // Si no existe el botón o el menú, salimos (no estamos en principal.html)
    if (!btnCuenta || !menuCuenta) return;
    
    // Obtener todos los elementos del menú (las opciones de cuenta)
    const opcionesCuenta = menuCuenta.querySelectorAll('span');
    
    // Agregar evento click a cada opción del menú
    opcionesCuenta.forEach(opcion => {
        opcion.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Obtener los datos de la cuenta seleccionada
            const nombreCuenta = opcion.textContent;
            const nuevoSaldo = opcion.getAttribute('data-saldo');
            
            // Extraer solo el tipo de cuenta y los últimos dígitos
            // Ejemplo: "Cta corriente-*456" -> "Cta corriente *456"
            let textoActualizado = nombreCuenta.replace('-', ' ');
            
            // Actualizar el texto superior de la tarjeta
            if (textoSuperior) {
                textoSuperior.textContent = textoActualizado;
            }
            
            // Actualizar el saldo
            if (textoSaldo && nuevoSaldo) {
                textoSaldo.textContent = `Bs. ${nuevoSaldo}`;
                
                // Si el saldo estaba oculto, mantenerlo oculto pero actualizar el valor original
                if (textoSaldo.classList.contains('saldo-oculto')) {
                    // Guardamos el nuevo saldo original para cuando se muestre
                    textoSaldo.setAttribute('data-saldo-original', `Bs. ${nuevoSaldo}`);
                }
            }
            
            // Cerrar el menú después de seleccionar
            menuCuenta.classList.remove('show');
            
            // Pequeña animación de feedback
            const tarjeta = document.querySelector('.caja-saldo');
            if (tarjeta) {
                tarjeta.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    tarjeta.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// ==========================================================================
// --- CENTRALIZACIÓN Y LLAMADAS DE LAS FUNCIONES ---
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

    if (typeof iniciarCambioCuenta === 'function') {
        iniciarCambioCuenta();
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