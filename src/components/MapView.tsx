import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import { useMapStore } from '../store/mapStore';

// Configure Mapbox with access token
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

interface MapViewProps {
  onMapReady?: () => void;
}

const MapViewComponent: React.FC<MapViewProps> = ({ onMapReady }) => {
  const { mapRegion } = useMapStore();
  const [isMapMounted, setIsMapMounted] = useState(false);
  const cameraRef = useRef<Mapbox.Camera>(null);

  useEffect(() => {
    // Verify Mapbox token is configured
    if (!MAPBOX_ACCESS_TOKEN || MAPBOX_ACCESS_TOKEN === 'your_mapbox_access_token_here') {
      console.error('Mapbox access token is not configured properly');
    }
  }, []);

  // Handle map ready events
  const handleMapReady = () => {
    if (!isMapMounted) {
      console.log('Map loaded successfully - onDidFinishLoadingMap');
      setIsMapMounted(true);
      onMapReady?.();
    }
  };

  const handleMapIdle = () => {
    if (!isMapMounted) {
      console.log('Map loaded successfully - onMapIdle');
      setIsMapMounted(true);
      onMapReady?.();
    }
  };

  const handleDidFinishRenderingMapFully = () => {
    if (!isMapMounted) {
      console.log('Map loaded successfully - onDidFinishRenderingMapFully');
      setIsMapMounted(true);
      onMapReady?.();
    }
  };

  // Error boundary for missing token
  if (!MAPBOX_ACCESS_TOKEN || MAPBOX_ACCESS_TOKEN === 'your_mapbox_access_token_here') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Map Configuration Error</Text>
        <Text style={styles.errorSubtext}>
          Mapbox access token is not configured.{'\n'}
          Please check your .env file.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={Mapbox.StyleURL.Dark}
        onDidFinishLoadingMap={handleMapReady}
        onMapIdle={handleMapIdle}
        onDidFinishRenderingMapFully={handleDidFinishRenderingMapFully}
        logoEnabled={false}
        attributionEnabled={true}
        attributionPosition={{ bottom: 8, right: 8 }}
        scaleBarEnabled={false}
        compassEnabled={true}
        compassPosition={{ top: 16, right: 16 }}
        compassViewMargins={{ x: 16, y: 100 }}
        rotateEnabled={true}
        pitchEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
      >
        <Mapbox.Camera
          ref={cameraRef}
          zoomLevel={12}
          centerCoordinate={[
            mapRegion?.longitude || 144.9631,
            mapRegion?.latitude || -37.8136,
          ]}
          animationMode="none"
        />
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4444',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MapViewComponent;
