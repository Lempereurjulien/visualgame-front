import { useState } from "react";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";

export default function Home() {

  const [ip, setIp] = useState("");
  const handleChange = (e) => setIp(e.target.value);

    const handleSubmit = () => {
    alert(`Adresse IP saisie : ${ip}`);
  };

  const navigate = useNavigate()
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Bienvenue sur mon site</h1>
        <p className="text-lg text-gray-600 mb-6">
          Ceci est une page d’accueil minimaliste avec Tailwind CSS.
        </p>
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
        <button
          onClick={() => navigate('/inventory')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Commencer
        </button>
      </div>
    </div>

  )
}
