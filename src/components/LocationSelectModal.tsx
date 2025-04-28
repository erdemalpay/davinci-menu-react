import React from "react";

interface LocationSelectModalProps {
  isOpen: boolean;
  onSelect: (locationId: number) => void;
  onClose: () => void;
}

const LocationSelectModal: React.FC<LocationSelectModalProps> = ({
  isOpen,
  onSelect,
  onClose,
}) => {
  if (!isOpen) return null;

  // Derive unique location IDs from categories
  const uniqueLocations = [
    {
      id: 1,
      name: "Bahçeli",
    },
    {
      id: 2,
      name: "Neorama",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">Konum Seç</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {uniqueLocations.map((loc) => (
            <button
              key={loc.id}
              className="w-full py-2 border rounded hover:bg-gray-100"
              onClick={() => {
                onSelect(loc.id);
                window.history.pushState(null, "", `/${loc.id}`);
                onClose();
              }}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSelectModal;
