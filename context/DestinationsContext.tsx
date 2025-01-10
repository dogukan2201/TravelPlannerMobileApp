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

const DestinationContext = createContext<DestinationContextProps | undefined>(
  undefined
);

export const DestinationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [destinations, setDestinations] = useState<DestinationProps[]>([]);

  const addDestination = (destination: DestinationProps) => {
    setDestinations((prev) => [...prev, destination]);
  };

  const updateDestination = (
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
    setDestinations((prev) => prev.filter((dest) => dest.id !== id));
  };

  return (
    <DestinationContext.Provider
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
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error(
      "useDestinationContext must be used within a DestinationProvider"
    );
  }
  return context;
};
