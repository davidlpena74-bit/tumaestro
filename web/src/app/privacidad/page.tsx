export default function Privacidad() {
    return (
        <div className="min-h-screen bg-transparent pt-32 pb-12 px-4 md:px-20 text-white font-sans">
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl">
                <h1 className="text-4xl font-bold mb-8 text-teal-300">Política de Privacidad</h1>

                <div className="space-y-6 text-gray-200 leading-relaxed">
                    <p>Última actualización: Enero 2026</p>

                    <h2 className="text-2xl font-bold text-white mt-8">1. Su Privacidad</h2>
                    <p>Su privacidad es importante para nosotros. Es política de TuMaestro.es respetar su privacidad con respecto a cualquier información que podamos recopilar de usted a través de nuestro sitio web.</p>

                    <h2 className="text-2xl font-bold text-white mt-8">2. Información que recopilamos</h2>
                    <p>Solo solicitamos información personal cuando realmente la necesitamos para brindarle un servicio. La recopilamos por medios justos y legales, con su conocimiento y consentimiento.</p>

                    <h2 className="text-2xl font-bold text-white mt-8">3. Retención de datos</h2>
                    <p>Solo conservamos la información recopilada durante el tiempo que sea necesario para proporcionarle el servicio solicitado. Lo que almacenamos, lo protegeremos dentro de medios comercialmente aceptables.</p>

                    <h2 className="text-2xl font-bold text-white mt-8">4. Cookies</h2>
                    <p>Utilizamos cookies para mejorar su experiencia de navegación y analizar nuestro tráfico. Al continuar utilizando nuestro sitio, acepta nuestro uso de cookies.</p>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <a href="/" className="text-teal-300 hover:text-white font-bold transition">← Volver al inicio</a>
                </div>
            </div>
        </div>
    );
}
