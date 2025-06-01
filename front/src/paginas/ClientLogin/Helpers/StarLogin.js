import authApi from "../../../api/authApi";

export const starLoginCliente = async (dni) => {
  try {
    // Hacer la petición al backend para logear al cliente
    const resp = await authApi.post("/cliente/login", { dni: dni.toString() });

    if (resp.data.ok) {
      // ✅ Si el login es exitoso, guardar el token y el cliente en localStorage
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("cliente", JSON.stringify(resp.data.cliente));

      // Devolver los datos al componente
      return {
        ok: true,
        cliente: resp.data.cliente,
        token: resp.data.token,
      };
    } else {
      // Si el servidor responde pero no con ok: true
      throw new Error(resp.data.msg || "Error en el login");
    }
  } catch (error) {
    console.error("Error completo:", error);
    console.log("DNI que se envía:", dni);

    // Devolver el error al componente (no navegamos ni redirigimos desde acá)
    return {
      ok: false,
      error,
    };
  }
};
