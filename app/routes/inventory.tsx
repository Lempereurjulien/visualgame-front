import { useEffect, useRef, useState } from "react";
import { useIp } from "~/context/IpContext";
import { useSparkService } from "~/service/sparkService";
import { useNavigate } from "react-router";
import webSocketService from "~/webSocketService";
import ItemIcon from "~/components/ItemIcon";
export default function Inventory() {
  // Exemple de données statiques (à remplacer par des props ou un fetch)
  const [players, setPlayer] = useState<any[]>([]);
  const [map, setMap] = useState<any[]>([]);
  const [isDay, setIsDay] = useState<boolean>(true);
  const { ip } = useIp();
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { starterPack,setDay } = useSparkService()

  const navigate = useNavigate();

  useEffect(() => {

    const wsService = new webSocketService(`ws://${ip}:8887`);
    wsService.connect();

    const handleMessage = (data: any) => {
      if(data.type == "players"){
        var playersJson = data.data;
            setPlayer(playersJson);
      }      
      if(data.type == "map"){
        setIsDay(data.data.isDay);
        
      }
          
    }

    wsService.onMessage(handleMessage);

    return () => {
      wsService.offMessage(handleMessage);
      wsService.disconnect();
    }
  }, [])

  const changeDay = () =>{
    if(!isDay){
      setDay()
    }
    
  }

  // Fermer le menu au clic extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openIndex !== null &&
        containerRefs.current[openIndex] &&
        !containerRefs.current[openIndex]!.contains(event.target as Node)
      ) {
        setOpenIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openIndex]);

  const handleLogout = () => {
    localStorage.removeItem("ip");
    navigate("/"); // Retour à la page home
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Bouton Déconnexion */}
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Déconnexion
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-8">Inventaire des joueurs ({players?.length})</h1>
      <div className="w-full flex justify-end">
        <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-3 bg-gray-50" onClick={() => changeDay()}>
        <img src={isDay ? "sun.png" : "moon.png"} alt="ensoleillement icônes" className="w-12 h12"/>
        </div>

      </div>

      <div className="w-full max-w-4xl grid gap-6">
        {players?.map((player: any, index) => (
          <section
            key={player.name}
            ref={el => (containerRefs.current[index] = el as HTMLDivElement)}
            className="bg-white rounded-lg shadow-md p-6"
          >
            {/* Header esthétique avec image + nom */}
            <div className="relative inline-flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
                <img
                  src={`https://minotar.net/helm/${player.name}/100.png`}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
              </div>
              <h2 className="text-2xl font-semibold" >{player.name}</h2>

              {player.status ? (
                <span className="text-sm">🟢</span>
              ) : (
                <span className="text-sm flex items-center gap-1">
                  ☠️
                </span>
              )}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 p-1 rounded hover:bg-gray-200 focus:outline-none"
                aria-label="Toggle menu"
              >
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
              </button>
              {openIndex === index && (
                <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2 w-40 bg-white border rounded shadow-lg z-10">
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => starterPack(player.name)}>
                    Starter pack
                  </button>
                </div>
              )}
            <div className="100%">
              
            </div>
            </div>

            {/* Inventaire */}
            <div className="grid grid-cols-6 gap-4">
              {player.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-3 bg-gray-50"
                >
                  {/* Remplace par une image si possible */}
                  <div className="w-12 h-12 mb-2 bg-gray-300 rounded">
                    <ItemIcon name={item.name} />
                  </div>

                  <span className="text-sm text-center font-medium capitalize">
                    {item.name.replace(/_/g, " ")}
                  </span>
                  {item.amount > 1 && (
                    <span className="text-xs text-gray-600">x{item.amount}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

    </main>
  );
}
