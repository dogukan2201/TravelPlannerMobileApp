import React, { createContext, useState, useContext, ReactNode } from "react";
import { ImageSourcePropType } from "react-native";

export interface PlaceProps {
  name: string;
  description: string;
}

export interface DestinationProps {
  id: number;
  name: string;
  status: "Upcoming" | "Past" | "Planning";
  country: string;
  date: Date;
  img?: string;
  description?: string;
  places?: PlaceProps[];
}

export interface DestinationContextProps {
  destinations: DestinationProps[];
  addDestination: (destination: DestinationProps) => void;
  updateDestination: (id: number, destination: DestinationProps) => void;
  removeDestination: (id: number) => void;
}

const DestinationContext = createContext<DestinationContextProps | undefined>( // 'DestinationContext' adında bir kontekst oluşturulur
  undefined
);

export const DestinationProvider: React.FC<{ children: ReactNode }> = ({
  // 'DestinationProvider' adında bir bileşen oluşturulur
  children,
}) => {
  const [destinations, setDestinations] = useState<DestinationProps[]>([]);

  const addDestination = (destination: DestinationProps) => {
    // 'addDestination' fonksiyonu, yeni bir destinasyon ekler
    setDestinations((prev) => [...prev, destination]);
  };

  const updateDestination = (
    // 'updateDestination' fonksiyonu, bir destinasyonu günceller
    id: number,
    updatedDestination: DestinationProps
  ) => {
    setDestinations((prev) =>
      prev.map((dest) =>
        dest.id === id ? { ...dest, ...updatedDestination } : dest
      )
    );
  };

  const removeDestination = (id: number) => {
    // 'removeDestination' fonksiyonu, bir destinasyonu siler
    setDestinations((prev) => prev.filter((dest) => dest.id !== id));
  };

  return (
    <DestinationContext.Provider // 'DestinationContext.Provider' bileşeni ile kontekst sağlanır
      value={{
        destinations,
        addDestination,
        updateDestination,
        removeDestination,
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestinationContext = (): DestinationContextProps => {
  // 'useDestinationContext' adında bir özelleştirilmiş bir kancayı dışa aktarır
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error(
      "useDestinationContext must be used within a DestinationProvider"
    );
  }
  return context;
};
