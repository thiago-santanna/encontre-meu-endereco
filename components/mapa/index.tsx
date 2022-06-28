import Image from "next/image";
import mapa from "../../public/mapa.png";

export default function Mapa() {
  return (
    <>
      <Image
        className="overflow-scroll"
        src={mapa}
        alt="Mapa"
        width={200}
        height={200}
      />
    </>
  );
}
