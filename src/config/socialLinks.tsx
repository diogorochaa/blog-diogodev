import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
} from '@/components/Icons'

import { MainNavType } from '@/models'

export const socialLinkConfig: MainNavType = {
  mainNav: [
    {
      title: 'Linkedin',
      href: 'https://www.linkedin.com/in/diogorochaa/',
      icon: <LinkedinIcon size={28} />,
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/diogodev_/',
      icon: <InstagramIcon size={28} />,
    },
    {
      title: 'Github',
      href: 'https://www.github.com/diogorochaa/',
      icon: <GithubIcon size={28} />,
    },
    {
      title: 'Twitter',
      href: 'https://www.twitter.com/Diogo99R/',
      icon: <TwitterIcon size={28} />,
    },
  ],
}
