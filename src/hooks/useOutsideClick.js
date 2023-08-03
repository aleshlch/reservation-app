import { useEffect } from 'react'

const useOutsideClick = (ref, CloseFunc) => {

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        CloseFunc()
      }
    }

    const handleEscapeKey = (e) => {
      if (e.keyCode === 27) {
        CloseFunc()
      }
    }


    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)


    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [ref, CloseFunc])
}

export default useOutsideClick