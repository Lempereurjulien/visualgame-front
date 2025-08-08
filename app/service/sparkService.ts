import { useIp } from "~/context/IpContext"

export function useSparkService() {
  const { ip } = useIp();

function verifCode(uuid: string): Promise<any> {
  return fetch(`http://${ip}:4567/code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uuid }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function starterPack(namePlayer : string) : Promise<any>{
  return fetch(`http://${ip}:4567/starterpack`,{
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({namePlayer})
  })
}

  return { verifCode, starterPack };
}