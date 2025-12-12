import { create } from 'zustand';

interface Location {
  latitude: number;
  longitude: number;
}

interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MapState {
  currentLocation: Location | null;
  mapRegion: MapRegion | null;
  followUserLocation: boolean;
  setCurrentLocation: (location: Location) => void;
  setMapRegion: (region: MapRegion) => void;
  setFollowUserLocation: (follow: boolean) => void;
}

// Default to Melbourne CBD
const DEFAULT_REGION: MapRegion = {
  latitude: -37.8136,
  longitude: 144.9631,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export const useMapStore = create<MapState>((set) => ({
  currentLocation: null,
  mapRegion: DEFAULT_REGION,
  followUserLocation: true,

  setCurrentLocation: (location) =>
    set((state) => ({
      currentLocation: location,
      mapRegion: state.followUserLocation
        ? {
            ...location,
            latitudeDelta: state.mapRegion?.latitudeDelta || 0.05,
            longitudeDelta: state.mapRegion?.longitudeDelta || 0.05,
          }
        : state.mapRegion,
    })),

  setMapRegion: (region) =>
    set({
      mapRegion: region,
      followUserLocation: false,
    }),

  setFollowUserLocation: (follow) => set({ followUserLocation: follow }),
}));
