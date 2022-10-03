import { useTransition } from "react";
import {useState, createContext } from "react";
import { obtenerDiferenciaYear, clacularMarca, calcularPlan, formatearDinero } from "../helpers";

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        setCargando(true)
        //Una base
        let resultado = 2000

        // Obtener la diferencia de year
        const diferencia = obtenerDiferenciaYear(datos.year)

        // Hay que restar el 3% por cada year
        resultado -= ((diferencia * 3) * resultado) / 100

        // Europeo %30
        // Americano %15
        // Asiatico %05
        resultado *= clacularMarca(datos.marca)

        // Basico %20
        // Completo %50
        resultado *= calcularPlan(datos.plan)

        // Formatear Dinero
        resultado = formatearDinero(resultado)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)            
        }, 2000)
    }

    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export{
    CotizadorProvider
}
export default CotizadorContext