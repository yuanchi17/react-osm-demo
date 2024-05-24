import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

// TODO: 顯示不同情境的站點

export default function Demo() {
  const [position, setPosition] = useState<LatLngExpression>([25.02605, 121.5436]) // 台北某地標
  const zoom = 15

  const LocationMarker = () => {
    const map = useMapEvents({
      click: () => {
        map.locate()
      },
      locationfound: location => {
        setPosition(location.latlng)
        map.flyTo([location.latlng.lat, location.latlng.lng], zoom)
      },
    })

    return (
      <Marker position={position}>
        <Popup>You are here.</Popup>
      </Marker>
    )
  }

  return (
    <>
      <p>Demo Page</p>
      <p>圖示</p>
      <div id='map' style={{ height: '50vh', width: '80vw' }}>
        <MapContainer center={position} zoom={zoom} style={{ height: '100%', minHeight: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png'
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  )
}
