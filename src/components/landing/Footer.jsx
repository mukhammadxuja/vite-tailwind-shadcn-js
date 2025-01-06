import { GoalIcon, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerNavs = [
  {
    label: 'Product',
    items: [
      {
        to: '/',
        name: 'Email Collection',
      },
      {
        to: '/pricing',
        name: 'Pricing',
      },
      {
        to: '/faq',
        name: 'FAQ',
      },
    ],
  },

  {
    label: 'Community',
    items: [
      {
        to: '/',
        name: 'Discord',
      },
      {
        to: '/',
        name: 'Twitter',
      },
      {
        to: 'mailto:hello@chatcollect.com',
        name: 'Email',
      },
    ],
  },
  {
    label: 'Legal',
    items: [
      {
        to: '/terms',
        name: 'Terms',
      },

      {
        to: '/privacy',
        name: 'Privacy',
      },
    ],
  },
];

const footerSocials = [
  {
    to: '',
    name: 'Discord',
    icon: <GoalIcon className="size-4" />,
  },
  {
    to: '',
    name: 'Twitter',
    icon: <SearchX className="size-4" />,
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto w-full max-w-screen-xl xl:pb-2">
        <div className="gap-4 p-4 px-8 py-16 sm:pb-16 md:flex md:justify-between">
          <div className="mb-12 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <img
                src="/assets/logo-white.svg"
                className="mx-auto w-5 h-5 animate-pulse hidden dark:block"
              />
              <img
                src="/assets/logo-black.svg"
                className="mx-auto w-5 h-5 animate-pulse block dark:hidden"
              />
              <span className="whitespace-nowrap text-2xl font-semibold dark:text-white">
                Swordfish
              </span>
            </Link>
            <p className="max-w-xs">UI Library for Design Engineers</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h2 className="mb-6 text-sm font-medium uppercase tracking-tighter text-gray-900 dark:text-white">
                  {nav.label}
                </h2>
                <ul className="grid gap-2">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.to}
                        className="cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-md border-neutral-700/20 px-8 py-4 sm:flex sm:flex-row sm:items-center sm:justify-between">
          <div className="flex space-x-5 sm:mt-0 sm:justify-center">
            {footerSocials.map((social) => (
              <Link
                key={social.name}
                to={social.to}
                className="fill-gray-500 text-gray-500 hover:fill-gray-900 hover:text-gray-900 dark:hover:fill-gray-600 dark:hover:text-gray-600"
              >
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Copyright © {new Date().getFullYear()}{' '}
            <Link to="/" className="cursor-pointer">
              Swordfish Boilerplate
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
      {/*   <SiteBanner /> */}
    </footer>
  );
}
