'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import DarkModeToggle from './DarkModeToggle';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/chat', label: 'AI Chat', icon: '💬' },
    { href: '/bets', label: 'My Bets', icon: '🎯' },
    { href: '/pricing', label: 'Pricing', icon: '💎' },
    { href: '/api-docs', label: 'API Docs', icon: '📖' },
  ];

  const navigateToSport = (sportKey: string) => {
    router.push(`/sports?sport=${sportKey}`);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              AI Bet GPT
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            {/* Sports Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center ${
                    pathname === '/sports'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-1">🏆</span>
                  Sports
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[220px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-1 z-50"
                  sideOffset={5}
                >
                  {/* American Sports */}
                  <DropdownMenu.Label className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    🇺🇸 American Sports
                  </DropdownMenu.Label>
                  
                  <DropdownMenu.Item
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 outline-none"
                    onClick={() => navigateToSport('americanfootball_nfl')}
                  >
                    🏈 NFL
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Item
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 outline-none"
                    onClick={() => navigateToSport('basketball_nba')}
                  >
                    🏀 NBA
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Item
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 outline-none"
                    onClick={() => navigateToSport('baseball_mlb')}
                  >
                    ⚾ MLB
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Item
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 outline-none"
                    onClick={() => navigateToSport('icehockey_nhl')}
                  >
                    🏒 NHL
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

                  {/* Soccer */}
                  <DropdownMenu.Label className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    ⚽ Soccer
                  </DropdownMenu.Label>
                  
                  <DropdownMenu.Item
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 outline-none"
                    onClick={() => navigateToSport('soccer_epl')}
                  >
                    ⚽ Premier League
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Item
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 outline-none"
                    onClick={() => navigateToSport('soccer_uefa_champs_league')}
                  >
                    ⚽ Champions League
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

                  {/* South African Sports */}
                  <DropdownMenu.Label className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    🇿🇦 South African
                  </DropdownMenu.Label>
                  
                  <DropdownMenu.Item
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 outline-none"
                    onClick={() => navigateToSport('soccer_south_africa_premiership')}
                  >
                    ⚽ PSL (Soccer)
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Item
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 outline-none"
                    onClick={() => navigateToSport('rugbyunion_super_rugby')}
                  >
                    🏉 URC Rugby
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Item
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 outline-none"
                    onClick={() => navigateToSport('cricket_test_match')}
                  >
                    🏏 Proteas Cricket
                  </DropdownMenu.Item>

                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            
            <DarkModeToggle />
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <DarkModeToggle />
            <button className="p-2 rounded-md text-gray-700 dark:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
