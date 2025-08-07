import React, { useEffect, useState } from "react";
import wsService from "~/webSocketService";
import WebSocketManager from "~/components/WebSockerManager";
import webSocketService from "~/webSocketService";
import { useIp } from "~/context/IpContext";
export default function Inventory() {
  // Exemple de données statiques (à remplacer par des props ou un fetch)
  const [players, setPlayer] = useState();
//   const players = [
//     {
//       playerName: "PlayerOne",
//       items: [
//         { material: "diamond_sword", amount: 1 },
//         { material: "apple", amount: 5 },
//       ],
//     },
//     {
//       playerName: "PlayerTwo",
//       items: [
//         { material: "bow", amount: 1 },
//         { material: "arrow", amount: 20 },
//       ],
//     },
//   ];
  const {ip} = useIp();
  useEffect(() =>{
    const wsService = new webSocketService(`ws://${ip}:8887`);
    wsService.connect();

    const handleMessage = (data : any) =>{
        setPlayer(data)
    }

    wsService.onMessage(handleMessage);

    return () =>{
        wsService.offMessage(handleMessage);
        wsService.disconnect();
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Inventaire des joueurs</h1>

      <div className="w-full max-w-4xl grid gap-6">
  {players?.map((player: any) => (
    <section
      key={player.playerName}
      className="bg-white rounded-lg shadow-md p-6"
    >
      {/* Header esthétique avec image + nom */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
          <img
            src={`https://minotar.net/helm/${player.playerName}/100.png`}
            alt={player.playerName}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold">{player.playerName}</h2>
      </div>

      {/* Inventaire */}
      <div className="grid grid-cols-6 gap-4">
        {player.items.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-3 bg-gray-50"
          >
            {/* Remplace par une image si possible */}
            <div className="w-12 h-12 mb-2 bg-gray-300 rounded"></div>

            <span className="text-sm font-medium capitalize">
              {item.material.replace(/_/g, " ")}
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
