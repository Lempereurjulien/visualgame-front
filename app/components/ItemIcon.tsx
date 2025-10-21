import { useState } from "react"; 

interface ItemProps{
    name: string;
}
export default function ItemIcon({name} : ItemProps){
     var itemName = name.toLocaleLowerCase();
     const [srcIndex, setSrcIndex] = useState(0);

    if(itemName == "crafting_table"){
        itemName="crafting_table_side"
    }

    const paths = [
        `item/${itemName}.png`,
        `block/${itemName}.png`,
        `100.png`

    ]

    const itemSrc = `item/${itemName}.png`;

    return (
        <div>
            <img
                src={paths[srcIndex]}
                alt={itemName}
                className="w-full h-full"
                onError={(e) =>{
                    if(srcIndex < paths.length -1){
                        setSrcIndex(srcIndex+1)
                    }
                }}
            />
        </div>
    )
}