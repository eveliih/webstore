import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

export const useNotification = () => {
  const dispatch = useDispatch()

  return (message, type = 'info')  => {
    dispatch(notify(message, type))
  }
}

