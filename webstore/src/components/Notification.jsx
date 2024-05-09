import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const info = useSelector(({ notification }) => notification)
  if (!info.message) {
    return null
  }

  const variant = info.type === 'error' ? 'danger' : 'success'

  return (
    <Alert variant={variant} className='notify'>
      {info.message}
    </Alert>
  )
}

export default Notification