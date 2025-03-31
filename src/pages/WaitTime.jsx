import useAPI from "../hooks/useAPI";

const WaitTime = () => {
  const { data, loading, error } = useAPI("http://localhost:8010/proxy/parks/56/queue_times.json");


  if (loading) return <p>Mise à jour...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Temps d'attente</h1>
      <ul className="space-y-2">
        {data?.lands?.map((land) => (
          <div key={land.id} className="mb-4 pt-4">
            <h2 className="text-xl font-semibold">{land.name}</h2>
            <ul className="m-4">
              {land.rides.map((ride) => (
                <li
                  key={ride.id}
                  className="p-3 bg-gray-100 rounded-lg shadow-md flex justify-between"
                >
                  <span>{ride.name} : </span>

                  <span className={`font-bold
                  ${!ride.is_open ? "text-grey-500" // Fermé - Gris
                  : ride.wait_time > 40 ? "text-red-500" // Plus de 45min - Rouge
                  : ride.wait_time > 20 ? "text-yellow-500" // Entre 20min et 40min - Jaune
                  : "text-green-500" // Moins de 20min - Vert
                  }`}>

                    {ride.is_open ? `${ride.wait_time} min` : "FERMÉ"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>

      <h3 className="p-4 text-red-500 font-bold">Dernière mise à jour : {new Date(data?.lands?.[0]?.rides?.[0]?.last_updated).toLocaleTimeString()} </h3>

    </div>
  );
};

export default WaitTime;
