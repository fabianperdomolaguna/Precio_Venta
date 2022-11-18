import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import numeroaletras from "./numeroaletras";

function App() {
  const initialValues = {
    Nombre_empleado: "",
    Nombre_empresa: "",
    Nombre_contacto_cliente: "",
    Nombre_empresa_cliente: "",
    Costo_del_producto: "",
    Margen_estimado: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm(formValues);
    if (errors.length != 0) {
      const message =
        "No pudimos procesar el precio ya que no tenemos los datos de " +
        errors.join(", ").replaceAll("_", " ");
      Swal.fire({
        title: "Error!",
        text: message.replaceAll("_", " "),
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      const precio = precioVenta(formValues);
      console.log(numeroaletras(precio));
      const firstSentence = "Hola " + formValues.Nombre_empleado;
      const secondSentence =
        "El precio de venta del producto que deseas entregar a " +
        formValues.Nombre_contacto_cliente +
        " de la compañìa " +
        formValues.Nombre_empresa_cliente +
        " es de $" +
        precio +
        " (" +
        numeroaletras(precio) +
        "). ";
      const thirdSentence =
        "Con esta venta " +
        formValues.Nombre_empresa +
        " tendrá un margen de " +
        formValues.Margen_estimado +
        "%";
      Swal.fire({
        icon: "success",
        title: firstSentence,
        text: secondSentence + thirdSentence,
      });
    }
  };

  const validateForm = (values) => {
    const errors = [];
    Object.entries(values).forEach(([key, value]) => {
      if (value == "") {
        errors.push(key);
      }
    });
    return errors;
  };

  const precioVenta = (values) => {
    const redondeo = Math.round(
      values.Costo_del_producto / (1 - values.Margen_estimado / 100)
    );
    const cociente = redondeo % 1000;
    if (cociente >= 500) {
      return redondeo + (1000 - cociente);
    } else {
      return redondeo - cociente;
    }
  };

  const resetSubmit = () => {
    setFormValues(initialValues);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-4 mx-auto">
          <div className="card">
            <div className="car-body m-2">
              <form onSubmit={handleSubmit}>
                <h3>Cálculo precio de venta</h3>
                <hr />
                <div className="form-group">
                  <label>Nombre empleado</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Nombre_empleado"
                    value={formValues.Nombre_empleado}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-3 form-group">
                  <label>Nombre empresa</label>
                  <input
                    type="text"
                    name="Nombre_empresa"
                    className="form-control"
                    value={formValues.Nombre_empresa}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-3 form-group">
                  <label>Nombre contacto cliente</label>
                  <input
                    type="text"
                    name="Nombre_contacto_cliente"
                    className="form-control"
                    value={formValues.Nombre_contacto_cliente}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-3 form-group">
                  <label>Nombre empresa cliente</label>
                  <input
                    type="text"
                    name="Nombre_empresa_cliente"
                    className="form-control"
                    value={formValues.Nombre_empresa_cliente}
                    onChange={handleChange}
                  />
                </div>
                <label className="mt-3">Costo del producto</label>
                <div className="form-group input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    name="Costo_del_producto"
                    className="form-control"
                    value={formValues.Costo_del_producto}
                    onChange={handleChange}
                  />
                </div>
                <label className="mt-3">Margen estimado</label>
                <div className="form-group input-group">
                  <input
                    type="number"
                    name="Margen_estimado"
                    className="form-control"
                    value={formValues.Margen_estimado}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">%</span>
                  </div>
                </div>
                <div className="mt-3 form-group">
                  <button className="btn btn-success me-1 col-5">
                    Calcular
                  </button>
                </div>
                <div className="mt-3 form-group"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
