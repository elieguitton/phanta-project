import useAPI from "../hooks/useAPI";

const WaitTime = () => {
  const { data, loading, error } = useAPI("http://localhost:8010/proxy/parks/56/queue_times.json");


  if (loading) return <p>Mise à jour...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Temps d'attente</h1>

      {data?.lands?.map((land) => (
        <div key={land.id} className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">{land.name}</h2>

          {/* 📌 Grid pour affichage en 2 colonnes sur les grands écrans */}
          <ul className="grid md:grid-cols-2 gap-4">
            {land.rides.map((ride) => (
              <li
                key={ride.id}
                className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
              >
                <span className="text-lg">{ride.name} :</span>
                <span
                  className={`text-lg font-bold
                    ${!ride.is_open ? "text-gray-500"  // Fermé - Gris
                    : ride.wait_time > 40 ? "text-red-500" // Plus de 40 min - Rouge
                    : ride.wait_time > 20 ? "text-yellow-500" // Entre 20 et 40 min - Jaune
                    : "text-green-500" // Moins de 20 min - Vert
                  }`}
                >
                  {ride.is_open ? `${ride.wait_time} min` : "FERMÉ"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h3 className="mt-8 text-center text-red-400 font-semibold">
        Dernière mise à jour : {new Date(data?.lands?.[0]?.rides?.[0]?.last_updated).toLocaleTimeString()}
      </h3>
    </div>
  );
};

export default WaitTime;
