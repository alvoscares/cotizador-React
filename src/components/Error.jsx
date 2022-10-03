import useCotizador from "../hooks/useCotizador"

const Error = () => {

    const {error} = useCotizador()

  return (
    <div className="border text-center bg-red-100 border-red-400 py-3 text-red-700">
        <p>{error}</p>
    </div>
  )
}
export default Error