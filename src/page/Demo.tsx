import { Box, Typography } from '@mui/material'
import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import _ from 'lodash'
import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

interface DataTs {
  lat: number
  level: number
  lng: number
  name: string
}

interface MarkerDatasTs extends DataTs {
  showIcon: L.Icon
}

const ICON_IMGUR_MAP = {
  red: '5TQO0Ej',
  orange: '0rJ51Jl',
  green: 'wwtTxes',
  select: 'qnKlRfl',
}

export default function Demo() {
  const [selectIconIndex, setSelectIconIndex] = useState<number | null>(null)
  const [position, setPosition] = useState<LatLngExpression>([25.02605, 121.5436]) // 台北某地標
  const zoom = 15

  const [redIcon, orangeIcon, greenIcon, selectIcon] = _.map(ICON_IMGUR_MAP, imgur =>
    L.icon({
      iconUrl: `https://i.imgur.com/${imgur}.png`,
      iconAnchor: [13, 37],
      iconSize: [26, 40],
      popupAnchor: [0, -39],
    })
  )

  // API 取得
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

  const markerDatas: MarkerDatasTs[] = datas.map(data => {
    let showIcon = greenIcon
    if (data.level > 10) showIcon = redIcon
    else if (data.level > 5) showIcon = orangeIcon

    return { ...data, showIcon }
  })

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
        <Popup>location marker</Popup>
      </Marker>
    )
  }

  const MarkerLevel = (data: MarkerDatasTs, index: number) => {
    const isSelect = selectIconIndex === index
    return (
      <Marker
        position={[data.lat, data.lng]}
        icon={isSelect ? selectIcon : data.showIcon}
        key={index}
        eventHandlers={{
          click: () => {
            setSelectIconIndex(isSelect ? null : index)
          },
        }}
      >
        <Popup>
          {data.name} / level: {data.level}
        </Popup>
      </Marker>
    )
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      margin={'auto'}
      overflow={'hidden'}
      sx={{ height: '70vh', width: '50vw', border: 'solid 1px lightgray', borderRadius: '5px' }}
    >
      <Box display={'flex'} flexDirection={'column'} padding={'0px 15px'}>
        <Typography variant='h6' marginY={'15px'}>
          Demo Page
        </Typography>
        <div className='icon-intro-area'>
          <div className='icon-image-area'>
            <img className='icon-image' src={`https://i.imgur.com/${ICON_IMGUR_MAP.red}.png`} />
            <Typography variant='caption'>10 up</Typography>
          </div>
          <div className='icon-image-area'>
            <img className='icon-image' src={`https://i.imgur.com/${ICON_IMGUR_MAP.orange}.png`} />
            <Typography variant='caption'>5 ~ 10</Typography>
          </div>
          <div className='icon-image-area'>
            <img className='icon-image' src={`https://i.imgur.com/${ICON_IMGUR_MAP.green}.png`} />
            <Typography variant='caption'>0 ~ 5</Typography>
          </div>
          <div className='icon-image-area'>
            <img className='icon-image' src={`https://i.imgur.com/${ICON_IMGUR_MAP.select}.png`} />
            <Typography variant='caption'>目前選取</Typography>
          </div>
        </div>
      </Box>
      <div id='map' style={{ height: '80%', width: '100%' }}>
        <MapContainer center={position} zoom={zoom} style={{ height: '100%', minHeight: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png'
          />
          {markerDatas.map((data, index) => MarkerLevel(data, index))}
          <LocationMarker />
        </MapContainer>
      </div>
    </Box>
  )
}
