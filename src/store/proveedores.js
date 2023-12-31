import { api } from "@/api/Api";

export async function fetchProveedores({ commit }, pag) {
  try {
    const { data } = await api.get(`/proveedores/pages/${pag}`);
    console.log(data);
    commit("setProveedores", data);
  } catch (error) {
    console.error("Error fetching proveedores:", error);
  }
}

export function fetchProveedor({ commit }, id) {
  api.get(`/proveedores/${id}`)
    .then(response => {
      const data = response.data;
      console.log(data);
      commit("setProveedor", data);
    })
    .catch(error => {
      console.error("Error fetching proveedor:", error);
    });
}

export async function createProveedor({ commit }, proveedor) {
  try {
    const { data } = await api.post("/proveedores", proveedor);
    console.log(data);
    if (proveedor.proveedorDetalle) {
      proveedor.proveedorDetalle.proveedorId = data.id;
      createProveedorDetalle(proveedor.proveedorDetalle);
    }
    commit("addProveedor", data);
  } catch (error) {
    console.error("Error creating proveedor:", error);
  }
}

/** Para crear un Detalle */
export async function createProveedorDetalle(detalle) {
  try {
    console.log(detalle);
    await api.post("/proveedores-detalles", detalle);
  } catch (error) {
    console.error("Error creating proveedor:", error);
  }
}

export async function updateProveedor({ commit }, proveedor) {
  try {
    const { data } = await api.put(`/proveedores/${proveedor.id}`, proveedor);
    commit("updateProveedor", data);
  } catch (error) {
    console.error("Error updating proveedor:", error);
  }
}

export async function deleteProveedor({ commit }, id) {
  try {
    await api.delete(`/proveedores/${id}`);
    commit("removeProveedor", id);
  } catch (error) {
    console.error("Error deleting proveedor:", error);
  }
}

export async function searchProveedoresByNombre({ commit }, { query, pag }) {
  try {
    const { data } = await api.get(`/proveedores/nombre/${query}/pages/${pag}`);
    commit("setProveedores", data);
  } catch (error) {
    console.error("Error fetching proveedores:", error);
  }
}

export async function searchProveedoresByRuc({ commit }, { query, pag }) {
  try {
    const { data } = await api.get(`/proveedores/ruc/${query}/pages/${pag}`);
    commit("setProveedores", data);
  } catch (error) {
    console.error("Error fetching proveedores:", error);
  }
}