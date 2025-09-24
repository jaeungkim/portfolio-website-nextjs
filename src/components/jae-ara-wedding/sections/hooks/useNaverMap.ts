import { useState, useEffect, useCallback, RefObject } from "react";

// Naver Maps API types
declare global {
  interface Window {
    naver: any;
  }
}

interface VenueCoordinates {
  lat: number;
  lng: number;
  address: string;
  name: string;
}

export function useNaverMap(
  mapRef: RefObject<HTMLDivElement | null>,
  venue: VenueCoordinates
) {
  const [mapLoaded, setMapLoaded] = useState(false);

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.naver?.maps) return;

    const mapOptions = {
      center: new window.naver.maps.LatLng(venue.lat, venue.lng),
      zoom: 15,
      minZoom: 15,
      maxZoom: 15,
      mapTypeControl: false,
      zoomControl: false,
      scrollWheel: false,
      disableDoubleClickZoom: true,
      disableKineticPan: true,
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);

    // Add marker for wedding venue
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(venue.lat, venue.lng),
      map: map,
      title: venue.name,
    });

    // Add info window
    const infoWindow = new window.naver.maps.InfoWindow({
      content: `
        <div style="padding: 10px; text-align: center;">
          <div style="font-weight: bold; margin-bottom: 5px;">${venue.name}</div>
          <div style="font-size: 12px; color: #666;">${venue.address}</div>
        </div>
      `,
    });

    window.naver.maps.Event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    });

    setMapLoaded(true);
  }, [mapRef, venue]);

  useEffect(() => {
    const loadNaverMaps = () => {
      if (window.naver && window.naver.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=qytpphp4at`;
      script.async = true;
      script.onload = () => {
        if (window.naver && window.naver.maps) {
          initializeMap();
        }
      };
      document.head.appendChild(script);
    };

    loadNaverMaps();
  }, [initializeMap]);

  return { mapLoaded, initializeMap };
}
