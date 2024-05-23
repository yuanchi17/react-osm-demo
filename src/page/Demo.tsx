import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

export default function Demo() {
  const position: LatLngExpression = [25.0408578889, 121.567904444] // 台北某地標
  const zoom = 15

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
          <Marker position={position}>
            <Popup>test popup</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  )
}
