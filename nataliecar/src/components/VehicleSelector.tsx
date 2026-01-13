import { VehicleType, Vehicle } from "@/types/game";
import { useChromaKeyImage } from "@/hooks/useChromaKeyImage";
import taxiImg from "@/assets/taxi.png";
import minibusImg from "@/assets/minibus.png";
import busImg from "@/assets/bus.png";
import tramImg from "@/assets/tram.png";

export const vehicles: Vehicle[] = [
  { id: 'taxi', name: '紅色的士', nameEn: 'Red Taxi', image: taxiImg, color: 'bg-primary' },
  { id: 'minibus', name: '綠色小巴', nameEn: 'Green Minibus', image: minibusImg, color: 'bg-secondary' },
  { id: 'bus', name: '雙層巴士', nameEn: 'Double Decker Bus', image: busImg, color: 'bg-orange' },
  { id: 'tram', name: '香港電車', nameEn: 'Hong Kong Tram', image: tramImg, color: 'bg-sky' },
];

interface VehicleSelectorProps {
  selectedVehicle: VehicleType | null;
  onSelect: (vehicle: VehicleType) => void;
}

export const VehicleSelector = ({ selectedVehicle, onSelect }: VehicleSelectorProps) => {
  const VehicleSprite = ({ src, alt }: { src: string; alt: string }) => {
    const cutout = useChromaKeyImage(src, { threshold: 80 });
    return (
      <img
        src={cutout}
        alt={alt}
        className="w-full h-full object-contain float-animation"
      />
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {vehicles.map((vehicle) => (
        <button
          key={vehicle.id}
          onClick={() => onSelect(vehicle.id)}
          className={`vehicle-card flex flex-col items-center gap-3 ${
            selectedVehicle === vehicle.id ? 'selected' : ''
          }`}
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <VehicleSprite src={vehicle.image} alt={vehicle.name} />
          </div>
          <span className="font-bold text-lg text-foreground">{vehicle.name}</span>
        </button>
      ))}
    </div>
  );
};
