import jwt_decode from 'jwt-decode'

interface JwtPayload {
  exp: number
  iat: number
  iss: string
  jti: string
  nbf: number
  prv: string
  sub: string
  account: string
}

export function checkTokenValid (token: string): boolean {
  if (!token) return false
  try {
    const decoded = decodedToken(token)
    if (!decoded) throw new Error('decoded is null')

    const isExpired = new Date(decoded.exp * 1000) < new Date()
    if (isExpired) throw new Error('token is expired')
    return true
  } catch(err) {
    console.warn(err)
    return false
  }
}

export function decodedToken (token: string): JwtPayload | null {
  if (!token) return null
  try {
    const decoded = jwt_decode(token) as JwtPayload
    return decoded
  } catch(err) {
    console.warn('token is not a JWT')
    return null
  }
}

