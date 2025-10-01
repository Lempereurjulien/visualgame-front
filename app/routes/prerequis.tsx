import { useEffect } from "react";
import { useNavigate } from "react-router";
import {ArrowLeftCircleIcon} from "@heroicons/react/24/solid"
export default function Prerequis() {
    const navigate = useNavigate();
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <header className="mb-6">
                <ArrowLeftCircleIcon className="h-8 w-8 text-black" onClick={() => navigate("/")}/>
                <h1 className="text-3xl font-extrabold leading-tight">Prérequis pour utiliser le VisualGame plugin Minecraft</h1>
                <p className="mt-2 text-sm text-gray-600">Checklist et instructions rapides — prêt à copier/coller.</p>
            </header>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Résumé rapide</h2>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>Serveur Minecraft Paper/Spigot (recommandé: Paper)</li>
                    <li>Java 17+</li>
                    <li>Version compatible du plugin (ex: 1.21.8)</li>
                    <li>Accès FTP/SFTP ou accès direct aux dossiers du serveur</li>
                    <li>Permissions: op ou accès à la console pour installer le plugin</li>
                </ul>
            </section>


            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Checklist technique</h2>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold">Serveur</h3>
                        <ol className="pl-4 list-decimal text-gray-700 mt-2">
                            <li>Type: Paper ou Spigot.</li>
                            <li>Version: installez la version du serveur correspondant à la version Minecraft ciblée (ex: 1.21.8).</li>
                            <li>Accès au dossier <code className="bg-gray-100 px-1 rounded">plugins/</code>.</li>
                        </ol>
                    </div>

                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold">Java</h3>
                        <ul className="pl-4 list-disc text-gray-700 mt-2">
                            <li>Java 17+ recommandé .</li>
                            {/* <li>Vérifier la variable d'environnement <code className="bg-gray-100 px-1 rounded">JAVA_HOME</code>.</li> */}
                        </ul>
                    </div>


                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold">Permissions & rôle</h3>
                        <ul className="pl-4 list-disc text-gray-700 mt-2">
                            <li>Avoir accès console/FTP pour déposer le .jar.</li>
                            <li>Perms: <code className="bg-gray-100 px-1 rounded">op</code> ou plugin de permissions (ex: LuckPerms).</li>
                        </ul>
                    </div>

                </div>
            </section>


            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Installation pas-à-pas</h2>
                <ol className="pl-4 list-decimal text-gray-700 space-y-2">
                    <a href="/visualGame-1.0-SNAPSHOT.jar" download>
                    <li><strong>Télécharger</strong> le fichier <code className="bg-gray-100 px-1 rounded">visualGame-1.0-SNAPSHOT.jar</code></li>
                    </a>
                    <li><strong>Arrêter</strong> le serveur (recommandé) ou mettre en pause les auto-reloads.</li>
                    <li><strong>Uploader</strong> le .jar dans le dossier <code className="bg-gray-100 px-1 rounded">plugins/</code> via FTP ou file manager.</li>
                    <li><strong>Démarrer</strong> le serveur et vérifier la console pour les erreurs de démarrage.</li>
                    <li><strong>Configurer</strong> : ajustez le fichier <code className="bg-gray-100 px-1 rounded">plugins/visualgame.jar/config.yml</code> si présent.</li>
                    <li><strong>Vérifier</strong> les permissions et redémarrer si nécessaire.</li>
                </ol>
            </section>


            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Bonnes pratiques</h2>
                <ul className="pl-4 list-disc text-gray-700">
                    <li>Faire une sauvegarde complète du dossier <code className="bg-gray-100 px-1 rounded">world/</code> et <code className="bg-gray-100 px-1 rounded">plugins/</code> avant installation.</li>
                    <li>Tester d'abord sur un serveur de test.</li>
                    <li>Lire la documentation officielle du plugin (page GitHub / SpigotMC).</li>
                </ul>
            </section>


            <footer className="mt-4 text-sm text-gray-600">
                <p>Besoin d'une version personnalisée (ex: checklist simplifiée, instructions pour Docker/Forge) ? Dis-moi ce que tu veux et je l'adapte.</p>
            </footer>
        </div>
    );

}