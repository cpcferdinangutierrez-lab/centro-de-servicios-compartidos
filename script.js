/* === script.js ===
   Ajusta la constante scriptURL con la URL "Deploy as web app" de tu Apps Script.
   Hoja Usuarios: UserID | Usuario | Contraseña
*/

const scriptURL = "https://script.google.com/macros/s/AKfycbynYFa1VhI-ipqN8x3k3c0COrVJ369cbvXj-T1sc57-4WSCBy2xHjGioPeLlUNplTli/exec"; // <-- PÉGALA AQUÍ

const form = document.getElementById("loginForm");
const inputUsuario = document.getElementById("usuario");
const inputPassword = document.getElementById("password");
const msg = document.getElementById("loginMsg");

function setMsg(text, ok = false) {
  msg.textContent = text;
  msg.style.color = ok ? "green" : "red";
}

function disableForm(disabled) {
  form.querySelector("button[type='submit']").disabled = disabled;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMsg("");
  disableForm(true);

  const usuario = (inputUsuario.value || "").trim();
  const password = (inputPassword.value || "").trim();

  if (!usuario || !password) {
    setMsg("Completa usuario y contraseña.");
    disableForm(false);
    return;
  }

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "login",
        usuario,
        password
      })
    });

    // Intentar JSON; si no, texto
    let data;
    const text = await res.text();
    try { data = JSON.parse(text); } catch { data = { status: text }; }

    if (data && (data.status === "OK" || data.status === "ok")) {
      // Soporta backend que devuelva clienteID o userID
      const clienteID = data.clienteID || data.userID || usuario;
      const nombreUsuario = data.usuario || usuario;
      const productos = Array.isArray(data.productos) ? data.productos : [];

      // Guardar en localStorage para usar en pedido.html
      localStorage.setItem("clienteID", clienteID);
      localStorage.setItem("usuario", nombreUsuario);
      localStorage.setItem("productos", JSON.stringify(productos));

      setMsg("Ingreso correcto. Redirigiendo…", true);
      window.location.href = "pedido.html";
    } else {
      setMsg("Usuario o contraseña incorrectos ❌");
      disableForm(false);
    }
  } catch (err) {
    console.error(err);
    setMsg("Error de conexión con el servidor.");
    disableForm(false);
  }
});


