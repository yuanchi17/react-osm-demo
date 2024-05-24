import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

interface DataTs {
  name: string
  lat: number
  lng: number
  level: number // NOTE: level: red: 10 up / orange: 5 ~ 10 / green: 0 ~ 5
}

// TODO: 點擊的圖釘需更換顏色

export default function Demo() {
  const [position, setPosition] = useState<LatLngExpression>([25.02605, 121.5436]) // 台北某地標
  const zoom = 15

  const datas: DataTs[] = [
    {
      name: '捷運科技大樓站',
      lat: 25.02605,
      lng: 121.5436,
      level: 10,
    },
    {
      name: '復興南路二段273號前',
      lat: 25.02565,
      lng: 121.54357,
      level: 10,
    },
    {
      name: '國北教大實小東側門',
      lat: 25.02429,
      lng: 121.54124,
      level: 10,
    },
    {
      name: '和平公園東側',
      lat: 25.02351,
      lng: 121.54282,
      level: 5,
    },
    {
      name: '辛亥復興路口西北側',
      lat: 25.02153,
      lng: 121.54299,
      level: 8,
    },
    {
      name: '復興南路二段280號前',
      lat: 25.02429,
      lng: 121.54328,
      level: 0,
    },
    {
      name: '復興南路二段340巷口',
      lat: 25.02253,
      lng: 121.54326,
      level: 3,
    },
    {
      name: '新生南路三段52號前',
      lat: 25.02112,
      lng: 121.53407,
      level: 5,
    },
    {
      name: '新生南路三段66號前',
      lat: 25.01976,
      lng: 121.53384,
      level: 8,
    },
    {
      name: '新生南路三段82號前',
      lat: 25.01894,
      lng: 121.53361,
      level: 0,
    },
    {
      name: '辛亥路一段30號前',
      lat: 25.01986,
      lng: 121.52982,
      level: 15,
    },
    {
      name: '和平復興路口西北側',
      lat: 25.02543,
      lng: 121.54332,
      level: 2,
    },
    {
      name: '羅斯福路三段311號前',
      lat: 25.01717,
      lng: 121.53202,
      level: 5,
    },
    {
      name: '大安運動中心停車場',
      lat: 25.020348,
      lng: 121.546446,
      level: 5,
    },
    {
      name: '羅斯福路三段245號前',
      lat: 25.01927,
      lng: 121.52989,
      level: 15,
    },
    {
      name: '溫州公園',
      lat: 25.01895,
      lng: 121.53156,
      level: 0,
    },
  ]

  const [redIcon, orangeIcon, greenIcon] = ['5TQO0Ej', '0rJ51Jl', 'wwtTxes'].map(imgur =>
    L.icon({
      iconUrl: `https://i.imgur.com/${imgur}.png`,
      iconAnchor: [13, 37],
      iconSize: [26, 40],
      popupAnchor: [0, -39],
    })
  )

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

  const MarkerLevel = (data: DataTs, index: number) => {
    let showIcon = greenIcon
    if (data.level > 10) showIcon = redIcon
    else if (data.level > 5) showIcon = orangeIcon

    return (
      <Marker position={[data.lat, data.lng]} icon={showIcon} key={index}>
        <Popup>
          {data.name} / level: {data.level}
        </Popup>
      </Marker>
    )
  }

  return (
    <>
      <p>Demo Page</p>
      <div className='icon-intro-area'>
        <div className='icon-image-area'>
          <img className='icon-image' src='https://i.imgur.com/5TQO0Ej.png' />
          <span>10 up</span>
        </div>
        <div className='icon-image-area'>
          <img className='icon-image' src='https://i.imgur.com/0rJ51Jl.png' />
          <span>5 ~ 10</span>
        </div>
        <div className='icon-image-area'>
          <img className='icon-image' src='https://i.imgur.com/wwtTxes.png' />
          <span>0 ~ 5</span>
        </div>
      </div>
      <div id='map' style={{ height: '50vh', width: '80vw' }}>
        <MapContainer center={position} zoom={zoom} style={{ height: '100%', minHeight: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png'
          />
          {datas.map((data, index) => MarkerLevel(data, index))}
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  )
}
