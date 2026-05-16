// --- 1. LÓGICA DE MODO OSCURO ---
const btnTheme = document.getElementById('theme-toggle');
const iconTheme = document.getElementById('theme-icon');

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

// --- 2. LÓGICA DE REGISTRO (Guardar Usuario) ---
const formRegistro = document.getElementById('miFormulario');
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

// --- 3. LÓGICA DE INICIO DE SESIÓN ---
// Esta función debe conectarse al formulario de tu HTML de "Iniciar Sesión"
const formLogin = document.getElementById('miFormulario'); // Asegúrate que tu HTML tenga este ID

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

    // --- 4. REDIRECCIÓN DESDE INDEX A INICIAR SESIÓN ---
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
}