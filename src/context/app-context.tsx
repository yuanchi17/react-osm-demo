import { createContext, useEffect, useContext } from 'react'
import { useImmerReducer } from 'use-immer'
import { useLocation } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

import { AppActions, AppContextState, AppState } from '@/context/app-context.interface'
import { checkTokenValid, decodedToken } from '@/utils/token-helper'
import { COOKIE_KEY } from '@/utils/constant'

const ENV = import.meta.env

const appContextDefaultValue: AppState = {
  auth: {
    account: null,
    token: Cookies.get(COOKIE_KEY.TOKEN) || '',
  },
}

const AppContext = createContext<AppContextState | undefined>(undefined)
AppContext.displayName = 'app-context'

const reducer = (draft: AppState, action: AppActions) => {
  switch (action.type) {
    case 'setAuth':
      draft.auth.account = action.payload.account
      draft.auth.token = action.payload.token
      break
    case 'updateAuth':
      draft.auth.account = action.payload.account
      break
    case 'resetAuth':
      Cookies.remove(COOKIE_KEY.TOKEN)
      draft.auth.account = null
      draft.auth.token = ''
      break
  }
}

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, appContextDefaultValue)
  const location = useLocation()

  // NOTE: 檢查 Cookies 中的 token，寫回去 context state 或 把使用者登出
  useEffect(() => {
    if (ENV.DEV) console.log('page refresh token check')

    const cookieToken = Cookies.get(COOKIE_KEY.TOKEN)

    if (!checkTokenValid(cookieToken)) {
      dispatch({ type: 'resetAuth' })
      return
    }

    const decoded = decodedToken(cookieToken)
    dispatch({
      type: 'setAuth',
      payload: {
        account: decoded?.account || null,
        token: cookieToken,
      },
    })
  }, [location])

  // NOTE: 每當 app-context 中 auth.token 的值異動時，檢查 & 調整登入狀態
  useEffect(() => {
    const token = state.auth.token
    if (!token) return

    const decoded = decodedToken(token)
    dispatch({
      type: 'updateAuth',
      payload: {
        account: decoded?.account || null,
      },
    })
  }, [state.auth.token])

  const logout = () => {
    dispatch({ type: 'resetAuth' })
    // navigate('/login')
  }

  const axiosHeadersConfig = {
    Authorization: `Bearer ${state.auth.token}`,
    'Content-Type': 'application/json',
  }
  const runApi = async ({ method, url, data, params, headers }) => {
    const headersConfig = {
      ...axiosHeadersConfig,
      ...headers,
    }
    try {
      let res
      url = `${ENV.VITE_API_URL}${url}`
      switch (method.toUpperCase()) {
        case 'GET':
          res = await axios.get(url, { headers: headersConfig, params })
          break
        case 'POST':
          res = await axios.post(url, data, { headers: headersConfig })
          break
        case 'PUT':
          res = await axios.put(url, data, { headers: headersConfig })
          break
        case 'DELETE':
          res = await axios.delete(url, { headers: headersConfig })
          break
      }
      if (!res.data?.code) throw new Error(res.data?.message?.error || '發生未知錯誤')
      return res.data
    } catch (err) {
      throw new Error(apiErrorMessage(err))
    }
  }

  const getJsonApi = async ({ url }) => {
    try {
      const res = await axios.get(`${ENV.VITE_API_URL}${url}`)
      return res.data
    } catch (err) {
      throw new Error(apiErrorMessage(err))
    }
  }

  const getBlobApi = async ({ url, params }) => {
    try {
      const res = await axios.get(`${ENV.VITE_API_URL}${url}`, {
        headers: axiosHeadersConfig,
        responseType: 'blob',
        params,
      })
      if (!res.data) throw new Error(res.data?.message?.error || '發生未知錯誤')
      return res.data
    } catch (err) {
      throw new Error(apiErrorMessage(err))
    }
  }

  const apiErrorMessage = (err: AxiosError) => {
    console.error(err)
    // Token 失效
    if (err?.response?.status === 401) {
      logout()
      return '請重新登入'
    }

    // 欄位檢查產生的錯誤
    if (err?.response?.status === 422) {
      return '欄位錯誤'
    }

    // 請求次數異常
    if (err?.response?.status === 429) {
      return '請求次數過多，請稍候再重試'
    }

    if (err?.response?.status === 500) {
      return '伺服器發生錯誤'
    }
    return err?.message
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        runApi,
        getJsonApi,
        getBlobApi,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) throw new Error('useApp must be used within a AppContextProvider')
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { AppContextProvider, useApp }
