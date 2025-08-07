import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import { useIp } from "../context/IpContext";
import webSocketService from "~/webSocketService";
import { useSparkService } from "~/service/sparkService";


export default function Home() {
  const { verifCode } = useSparkService();
  const { ip, setIp, resetIp } = useIp();
  const [ipPage, setIpPage] = useState(true);
  const [uuid, setUuid] = useState("");
  const handleChange = (e: any) => setIp(e.target.value);

  useEffect(() => {
    const storedIp = localStorage.getItem("ip");
    if (storedIp !== null) {
      setIp(storedIp);
    }
  }, []);

  const handleSubmit = () => {
    try {
      if(ip === null || ip === ""){
        return
      }
      const ws = new WebSocket(`ws://${ip}:8887`);
      ws.onopen = async () => {
        console.log("Connecté ✅");
        ws.onclose
        setIpPage(false);
        if (!ipPage) {
          const data = await verifCode(uuid)
          if (data.response) {
            navigate('/inventory');
          }
          else {
            //Marqué une erreur
            alert("Code non correcte")
          }
        }
      }
    } catch (error) {
      console.log("Erreur critique ❌");
    }
  };

  const navigate = useNavigate()
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Bienvenue sur mon site</h1>
        <p className="text-lg text-gray-600 mb-6">
          Ceci est une page d’accueil minimaliste avec Tailwind CSS.
        </p>
        {ipPage && (
          <>
            <label htmlFor="ip" className="block mb-2 font-semibold">
              Entrez une adresse IP :
            </label>
            <input
              id="ip"
              type="text"
              value={ip}
              onChange={handleChange}
              placeholder="Ex: 192.168.0.1"
              className="border rounded px-3 py-2 w-full max-w-xs"
            />
          </>
        )}
        {!ipPage && (
          <>
            <label htmlFor="uuid" className="block mb-2 font-semibold">
              Code :
            </label>
            <input
              id="uuid"
              type="text"
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
              placeholder="Ex: 1234"
              className="border rounded px-3 py-2 w-full max-w-xs"
            />
          </>
        )}

        <button
          onClick={() => handleSubmit()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Commencer
        </button>
      </div>
    </div>

  )
}
