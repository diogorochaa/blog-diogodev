import { List, ListItem } from '@/components/List'

import { NavItem } from '@/models'

type SocialMediaProps = {
  items: NavItem[]
}

export const SocialMedia = ({ items }: SocialMediaProps) => {
  return (
    <List className="flex-col">
      {items.map((item) => (
        <ListItem key={item.title}>
          <a
            className="flex items-center transition-all duration-300 hover:text-black"
            href={item.href}
            rel="noreferrer"
            target="_blank"
          >
            {item?.icon}
            <p className="ml-1">{item.title}</p>
          </a>
        </ListItem>
      ))}
    </List>
  )
}
