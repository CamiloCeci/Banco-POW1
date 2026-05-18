// ==========================================================================
// --- 1. LÓGICA DE MODO OSCURO ---
// ==========================================================================
function iniciarModoOscuro() {
    const btnTheme = document.getElementById('theme-toggle');
    const iconTheme = document.getElementById('theme-icon');
    if (!btnTheme) return; 

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (iconTheme) iconTheme.textContent = '☀️';
    }

    btnTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        if (iconTheme) iconTheme.textContent = (theme === 'dark') ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    });
}

// ==========================================================================
// --- 2. LÓGICA DE REGISTRO (Con validación estricta de 6 caracteres) ---
// ==========================================================================
function iniciarRegistro() {
    const formRegistro = document.getElementById('miFormulario');
    if (!formRegistro) return;

    const loader = document.getElementById('loader-container');

    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault(); // Detiene el envío nativo para validar con JS

        const email = document.getElementById('email').value;
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        // OBLIGA A HTML5 A EVALUAR EL "minlength="6"" Y EL "required"
        if (!formRegistro.checkValidity()) {
            formRegistro.reportValidity(); 
            return; 
        }

        // VERIFICA QUE AMBAS CONTRASEÑAS COINCIDAN
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("❌ Las contraseñas no coinciden. Por favor, verifícalas.");
            confirmPasswordInput.focus();
            return; 
        }

        // Guardamos en localStorage si pasa los filtros de seguridad
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push({ email: email, password: passwordInput.value });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Activamos animación de carga y redirigimos de forma segura
        if (loader) {
            loader.classList.add('active');
        }

        setTimeout(() => {
            window.location.href = "preguntas_seguridad.html";
        }, 2000);
    });
}

// ==========================================================================
// --- 3. LÓGICA DE INICIO DE SESIÓN ---
// ==========================================================================
function iniciarLogin() {
    const formLogin = document.getElementById('form-login');
    if (!formLogin) return;

    // DECLARACIÓN CORRECTA DEL LOADER PARA EVITAR ERRORES
    const loader = document.getElementById('loader-container');

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailIngresado = document.getElementById('login-email').value;
        const passIngresada = document.getElementById('login-password').value;

        const credencialesFijas = [
            { email: 'juan', pass: '123456' },
            { email: 'pepa', pass: '654321' }
        ];

        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

        const esValidoFijo = credencialesFijas.find(u => u.email === emailIngresado && u.pass === passIngresada);
        const esValidoRegistrado = usuariosRegistrados.find(u => u.email === emailIngresado && u.password === passIngresada);

        if (esValidoFijo || esValidoRegistrado) {
            if (loader) loader.classList.add('active');
            setTimeout(() => {
                window.location.href = "principal.html"; 
            }, 2000);
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
}

// ==========================================================================
// --- EXTRA: REDIRECCIÓN GENÉRICA ---
// ==========================================================================
function pasarPantallas(idBoton, urlDestino) {
    const linkIniciar = document.getElementById(idBoton);
    const loader = document.getElementById('loader-container');
    
    if (linkIniciar) {
        linkIniciar.addEventListener('click', (e) => {
            e.preventDefault();

            if (loader) {
                loader.classList.add('active');
                setTimeout(() => {
                    window.location.href = urlDestino;
                }, 2000);
            } else {
                window.location.href = urlDestino;
            }
        });
    }
}

// ==========================================================================
// --- EXTRA: MENÚS DESPLEGABLES ---
// ==========================================================================
function configurarDropdown(idBoton, idMenu) {
    const boton = document.getElementById(idBoton);
    const menu = document.getElementById(idMenu);

    if (boton && menu) {
        boton.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!boton.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('show');
            }
        });
    }
}

// ==========================================================================
// --- EXTRA: FILTRADO DE HISTORIAL ---
// ==========================================================================
function filtrarHistorial(tipo) {
    const transacciones = document.querySelectorAll('.transaccion');
    transacciones.forEach(tarjeta => {
        if (tipo === 'todos') {
            tarjeta.style.display = 'grid';
        } else if (tarjeta.classList.contains(tipo)) {
            tarjeta.style.display = 'grid';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

// ==========================================================================
// --- EXTRA: OCULTAR/MOSTRAR SALDO ---
// ==========================================================================
function iniciarOcultarSaldo() {
    const btnOcultar = document.getElementById('btnOcultarSaldo');
    const saldoElement = document.querySelector('.tarjeta-textosaldo span');
    const ojoIcon = document.getElementById('ojoIcon');

    if (!btnOcultar || !saldoElement) return;

    let saldoVisible = true;
    let saldoOriginal = saldoElement.textContent;

    function ocultarSaldo() {
        saldoOriginal = saldoElement.textContent;
        saldoElement.setAttribute('data-saldo-original', saldoOriginal);
        saldoElement.textContent = '•••';
        saldoElement.classList.add('saldo-oculto');
        saldoVisible = false;

        if (ojoIcon) {
            ojoIcon.src = 'assets/eye-slash-svgrepo-com.svg';
        }

        saldoElement.classList.add('saldo-animation');
        setTimeout(() => {
            saldoElement.classList.remove('saldo-animation');
        }, 300);
    }

    function mostrarSaldo() {
        const saldoGuardado = saldoElement.getAttribute('data-saldo-original');
        if (saldoGuardado) {
            saldoElement.textContent = saldoGuardado;
        } else {
            saldoElement.textContent = saldoOriginal;
        }
        saldoElement.classList.remove('saldo-oculto');
        saldoVisible = true;

        if (ojoIcon) {
            ojoIcon.src = 'assets/eye-svgrepo-com.svg';
        }

        saldoElement.classList.add('saldo-animation');
        setTimeout(() => {
            saldoElement.classList.remove('saldo-animation');
        }, 300);
    }

    btnOcultar.addEventListener('click', () => {
        if (saldoVisible) {
            ocultarSaldo();
        } else {
            mostrarSaldo();
        }
    });
}

// ==========================================================================
// --- EXTRA: CAMBIO DE CUENTA DE BANCO ---
// ==========================================================================
function iniciarCambioCuenta() {
    const btnCuenta = document.getElementById('btnCuenta');
    const menuCuenta = document.getElementById('menuCuenta');
    const textoSuperior = document.querySelector('.tarjeta-textosup span:first-child');
    const textoSaldo = document.querySelector('.tarjeta-textosaldo span');

    if (!btnCuenta || !menuCuenta) return;

    const opcionesCuenta = menuCuenta.querySelectorAll('span');

    opcionesCuenta.forEach(opcion => {
        opcion.addEventListener('click', (e) => {
            e.stopPropagation();

            const nombreCuenta = opcion.textContent;
            const nuevoSaldo = opcion.getAttribute('data-saldo');

            let textoActualizado = nombreCuenta.replace('-', ' ');

            if (textoSuperior) {
                textoSuperior.textContent = textoActualizado;
            }

            if (textoSaldo && nuevoSaldo) {
                textoSaldo.textContent = `Bs. ${nuevoSaldo}`;

                if (textoSaldo.classList.contains('saldo-oculto')) {
                    textoSaldo.setAttribute('data-saldo-original', `Bs. ${nuevoSaldo}`);
                }
            }

            menuCuenta.classList.remove('show');

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
// --- EXTRA: CAMBIO DE CONTRASEÑA EN EL PERFIL ---
// ==========================================================================
function iniciarCambioClave() {
    const formCambiarClave = document.getElementById('formCambiarClave');
    if (!formCambiarClave) return;

    const loader = document.getElementById('loader-container');

    formCambiarClave.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue bruscamente

        const nuevaClaveInput = document.getElementById('nuevaClave');
        const confirmarNuevaClaveInput = document.getElementById('confirmarNuevaClave');

        // 1. Forzar validación nativa de HTML5 (minlength="6" y required)
        if (!formCambiarClave.checkValidity()) {
            formCambiarClave.reportValidity();
            return;
        }

        // 2. Comprobar que ambas contraseñas coinciden de forma estricta
        if (nuevaClaveInput.value !== confirmarNuevaClaveInput.value) {
            alert("❌ Las contraseñas nuevas no coinciden. Por favor, verifícalas.");
            confirmarNuevaClaveInput.focus();
            return;
        }

        // 3. Simular la actualización del usuario activo en localStorage
        // Nota: Como estamos en un prototipo, actualizaremos el último usuario registrado para pruebas
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        if (usuarios.length > 0) {
            // Modificamos la contraseña del último usuario creado
            usuarios[usuarios.length - 1].password = nuevaClaveInput.value;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        } else {
            // Si el usuario entró con las credenciales fijas ("juan" o "pepa"), creamos su registro modificado
            usuarios.push({ email: "usuario_actual@banca360.com", password: nuevaClaveInput.value });
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

        // 4. Mostrar animación estética de carga
        if (loader) {
            loader.classList.add('active');
        }

        // 5. Confirmación de éxito y limpieza del formulario
        setTimeout(() => {
            if (loader) {
                loader.classList.remove('active');
            }
            alert("🔒 ¡Tu contraseña ha sido actualizada con éxito!");
            formCambiarClave.reset(); // Limpia los campos del formulario
        }, 2000);
    });
}

// ==========================================================================
// --- CENTRALIZACIÓN Y EJECUCIÓN (DOMContentLoaded) ---
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

    if (typeof iniciarModoOscuro === 'function') {
        iniciarModoOscuro();
    }

    if (typeof iniciarRegistro === 'function') {
        iniciarRegistro();
    }

    if (typeof iniciarLogin === 'function') {
        iniciarLogin();
    }

    if (typeof configurarDropdown === 'function') {
        configurarDropdown('btnTuerca', 'dropdownMenu');
        configurarDropdown('btnPerfil', 'menuPerfil');
        configurarDropdown('btnCuenta', 'menuCuenta');
    }

    if (typeof iniciarCambioCuenta === 'function') {
        iniciarCambioCuenta();
    }

    if (typeof iniciarOcultarSaldo === 'function') {
        iniciarOcultarSaldo();
    }

    if (typeof iniciarOcultarSaldo === 'function') {
        iniciarOcultarSaldo();
    }

    // 💡 NUEVA LLAMADA AGREGADA AQUÍ:
    if (typeof iniciarCambioClave === 'function') {
        iniciarCambioClave();
    }

    if (typeof pasarPantallas === 'function') {
        pasarPantallas('link-iniciar-sesion', 'iniciar_sesion.html');
        pasarPantallas('btn-verificar-seguridad', 'principal.html');
        // 💡 LÍNEA ELIMINADA DE AQUÍ: Dejamos que "iniciarRegistro()" controle el submit y valide los datos.
    }

    console.log("¡Todas las funciones del Banco se han inicializado correctamente!");
}); // <-- CIERRE CORRECTO Y LIMPIO DEL ARCHIVO