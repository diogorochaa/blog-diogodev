import { CloseIcon, OpenIcon } from '@/components/Icons'

type ToggleButtonProps = {
  isOpenMenu: boolean
  handleToggleMenu: () => void
}

export const ToggleButton = ({
  isOpenMenu = false,
  handleToggleMenu,
}: ToggleButtonProps) => {
  const title = isOpenMenu ? 'Fechar menu' : 'Abrir menu'

  return (
    <button
      className="rounded-lg p-2 transition-colors duration-300 hover:bg-white/8"
      type="button"
      onClick={handleToggleMenu}
      title={title}
      aria-label={title}
      aria-expanded={isOpenMenu}
    >
      {isOpenMenu && <CloseIcon size={32} data-testid="close-icon" />}
      {!isOpenMenu && <OpenIcon size={32} data-testid="open-icon" />}
    </button>
  )
}
