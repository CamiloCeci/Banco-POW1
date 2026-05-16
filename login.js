

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

// --- Extra. REDIRECCIÓN DESDE INDEX A INICIAR SESIÓN ---
const linkIniciar = document.getElementById('link-iniciar-sesion');

if (linkIniciar) {
    linkIniciar.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que el enlace salte de golpe sin cargar la animación

        // Comprobamos si el loader existe en la página actual antes de activarlo
        if (loader) {
            loader.classList.add('active'); // Muestra la rueda de carga
        }

        // Espera 2 segundos mostrando el spinner y luego cambia de ventana
        setTimeout(() => {
            window.location.href = "iniciar_sesion.html";
        }, 2000);
    });
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
        
        // Menú de opciones de la tuerca en la ventana de transacciones
        configurarDropdown('btnTuerca', 'dropdownMenu');

        configurarDropdown('btnPerfil', 'menuPerfil');
        
        // 💡 Cuando crees nuevos menús en el futuro, solo agregas la llamada aquí abajo:
        // configurarDropdown('idDelNuevoBoton', 'idDelNuevoMenu');
    }

    console.log("¡Todas las funciones del Banco se han inicializado correctamente!");
});
