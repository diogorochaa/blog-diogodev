import { useCallback, useState } from 'react'

export const useMainNav = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleToggleMenu = useCallback(() => {
    setIsOpenMenu((prevState) => !prevState)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpenMenu(false)
  }, [])

  return {
    isOpenMenu,
    handleToggleMenu,
    closeMenu,
  }
}
