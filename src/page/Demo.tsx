import { DATAS_FORK } from '@/utils/constant'
import COLOR from '@/utils/theme-color'
import { Box, Typography } from '@mui/material'
import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

interface ApiDataTs {
  lat: number
  lng: number
  name: string
  sid: string
  hand: number
  auto: number
  one: number
  two: number
  fault: number
  project: number
}

interface SelectItemTs extends ApiDataTs {
  totalCount: number
  showIcon: L.Icon
}

const ICON_IMGUR_MAP = {
  omg: 'GVhKcMV',
  red: '5TQO0Ej',
  orange: '0rJ51Jl',
  green: 'wwtTxes',
  select: 'qnKlRfl',
}

const ItemCountBox = ({ count = '', title = '' }: { count: number | string; title: string }) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      marginLeft={'5px'}
      sx={{ width: '30px', height: '100%' }}
    >
      <Typography variant='h6' color={'primary'}>
        {count}
      </Typography>
      <Typography variant='caption' color={'gray'} marginTop={'auto'}>
        {title}
      </Typography>
    </Box>
  )
}

export default function Demo() {
  const [apiDatas, setApiDatas] = useState<ApiDataTs[]>([])
  const [selectIconIndex, setSelectIconIndex] = useState<number | null>(null)
  const [position, setPosition] = useState<LatLngExpression>([25.02605, 121.5436]) // 台北某地標
  const zoom = 15

  const [omgIcon, redIcon, orangeIcon, greenIcon, selectIcon] = _.map(ICON_IMGUR_MAP, imgur =>
    L.icon({
      iconUrl: `https://i.imgur.com/${imgur}.png`,
      iconAnchor: [13, 37],
      iconSize: [26, 40],
      popupAnchor: [0, -39],
    })
  )

  useEffect(() => {
    setApiDatas(DATAS_FORK)
  }, [])
  const markerDatas: SelectItemTs[] = apiDatas.map(data => {
    const totalCount = data?.hand + data?.auto + data?.one + data?.two + data?.fault + data?.project
    let showIcon = greenIcon
    if (totalCount > 50) showIcon = omgIcon
    else if (totalCount > 30) showIcon = redIcon
    else if (totalCount > 20) showIcon = orangeIcon

    return { ...data, showIcon, totalCount }
  })

  const selectItem = useMemo<SelectItemTs>(() => {
    return selectIconIndex ? markerDatas[selectIconIndex] : null
  }, [selectIconIndex])

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

  const MarkerLevel = (data: SelectItemTs, index: number) => {
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
      />
    )
  }

  return (
    <Box display={'flex'} flexDirection={'column'} flex={'auto'}>
      <Box display={'flex'} flexDirection={'column'} padding={'0px 15px'}>
        <Typography variant='h6' marginY={'15px'}>
          Demo Page
        </Typography>
        <Box
          display={'flex'}
          marginBottom={'5px'}
          marginX={'10px'}
          sx={{
            placeContent: 'space-between',
          }}
        >
          <div className='icon-image-area'>
            <img className='icon-image' src={`https://i.imgur.com/${ICON_IMGUR_MAP.omg}.png`} />
            <Typography variant='caption'>GG得思</Typography>
          </div>
          <div className='icon-image-area'>
            <img className='icon-image' src={`https://i.imgur.com/${ICON_IMGUR_MAP.red}.png`} />
            <Typography variant='caption'>要爆啦</Typography>
          </div>
          <div className='icon-image-area'>
            <img className='icon-image' src={`https://i.imgur.com/${ICON_IMGUR_MAP.orange}.png`} />
            <Typography variant='caption'>普普</Typography>
          </div>
          <div className='icon-image-area'>
            <img className='icon-image' src={`https://i.imgur.com/${ICON_IMGUR_MAP.green}.png`} />
            <Typography variant='caption'>一般般</Typography>
          </div>
          <div className='icon-image-area'>
            <img className='icon-image' src={`https://i.imgur.com/${ICON_IMGUR_MAP.select}.png`} />
            <Typography variant='caption'>目前選取</Typography>
          </div>
        </Box>
      </Box>

      {selectItem ? (
        <Box
          display={'flex'}
          flexDirection={'column'}
          margin={'auto 15px'}
          sx={{
            zIndex: 999,
            backgroundColor: 'white',
            position: 'absolute',
            bottom: '100px',
            width: '-webkit-fill-available',
            borderTop: `solid 4px ${COLOR.primary.light}`,
          }}
        >
          <Box
            sx={{
              borderRadius: '10px 10px 0px 0px',
              position: 'absolute',
              top: '-35px',
              left: '20px',
              width: '60px',
              height: '35px',
              background: `linear-gradient(180deg, ${COLOR.primary.dark}, ${COLOR.primary.light})`,
              color: 'white',
              textAlign: 'center',
              alignContent: 'center',
            }}
          >
            <Typography variant='h6'>{selectItem?.totalCount}</Typography>
          </Box>
          <Box display={'flex'} padding={'10px'} justifyContent={'space-between'}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'start'} justifyContent={'center'}>
              <Typography variant='subtitle2'>{selectItem?.sid}</Typography>
              <Typography variant='subtitle2' color={'gray'}>
                {selectItem?.name}
              </Typography>
            </Box>

            <Box display={'flex'} alignItems={'start'}>
              <ItemCountBox count={selectItem?.hand || ''} title='文案' />
              <ItemCountBox count={selectItem?.auto || ''} title='文案' />
              <ItemCountBox count={selectItem?.one || ''} title='文案' />
              <ItemCountBox count={selectItem?.two || ''} title='文案' />
              <ItemCountBox count={selectItem?.fault || ''} title='文案' />
              <ItemCountBox count={selectItem?.project || ''} title='文案' />
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: '5px',
              position: 'absolute',
              top: '-15px',
              right: '20px',
              width: '90px',
              height: '25px',
              backgroundColor: COLOR.primary.main,
              color: 'white',
              textAlign: 'center',
              alignContent: 'center',
            }}
          >
            <Typography variant='subtitle2'>{`查看更多 >`}</Typography>
          </Box>
        </Box>
      ) : (
        <></>
      )}

      <Box display={'flex'} flexDirection={'column'} flex={'auto'}>
        <div id='map' style={{ height: '100%', width: '100%' }}>
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
    </Box>
  )
}
