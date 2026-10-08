import { CloseIcon, OpenIcon } from '@/components/Icons'

import type { ToggleButtonProps } from './ToggleButton.types'

export const ToggleButton = ({
  isOpenMenu = false,
  handleToggleMenu,
  controlsId,
}: ToggleButtonProps) => {
  const title = isOpenMenu ? 'Fechar menu' : 'Abrir menu'

  return (
    <button
      className="flex h-11 w-11 items-center justify-center border-2 border-line text-ink transition-colors hover:border-accent hover:text-accent"
      type="button"
      onClick={handleToggleMenu}
      title={title}
      aria-label={title}
      aria-expanded={isOpenMenu}
      aria-controls={controlsId}
    >
      {isOpenMenu && <CloseIcon size={24} data-testid="close-icon" />}
      {!isOpenMenu && <OpenIcon size={24} data-testid="open-icon" />}
    </button>
  )
}
