import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux-hooks'
import { clearError, selectError } from '../../redux/slices/errorSlice'

const Error = () => {
  const errorMessage = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(clearError())
    }
  }, [errorMessage, dispatch])

  return <ToastContainer position='top-right' autoClose={2000} theme='dark' closeOnClick />
}

export default Error
