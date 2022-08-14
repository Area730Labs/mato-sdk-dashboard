import React, { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import Charts from './charts';
import LimitedItems from './limitedItems';

export default function Dashboard() {
    const { disconnect, publicKey, wallet } = useWallet();

    let [tab, setTab] = useState('limited-items');

    const menuItems = [
        {
            title: 'Dashboard',
            loc: 'charts',
            btnAction: () => setTab('charts'),
            component: Charts
        },
        {
            title: 'Limited items',

            loc: 'limited-items',
            btnAction: () => setTab('limited-items'),
            component: LimitedItems
        },
        {
            title: 'NFTs',

            loc: 'nfts',
            btnAction: () => setTab('nfts'),
            component: null
        },
        {
            title: 'Tokens',

            loc: 'tokens',
            btnAction: () => setTab('tokens'),
            component: null
        },
        {
            title: 'Sign Out (' + publicKey.toString().substring(0, 6) + '...)',
            loc: 'sign-out',

            styles: "font-bold",
            btnAction: () => {
                disconnect().catch(() => { });
                console.log('log out');
            },
            component: null
        }
    ];

    const currentContent = menuItems.find(x => x.loc == tab);
    const Content = currentContent.component;

    return (<main className='flex rounded-l-3xl overflow overflow-hidden'>
            <aside className="w-64 h-full" aria-label="Sidebar">
                <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded h-full">
                    <p className="flex items-center pl-2.5 mb-5">
                        {/* <Image src="/logo_1.svg" alt="Logo" className="mr-3 h-6 sm:h-7" width={28} height={28}/> */}
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-7" alt="Flowbite Logo" /> */}
                        <span className="self-center text-xl font-semibold whitespace-nowrap p-2">Mato Tools</span>
                    </p>
                    <ul className="space-y-2">
                        {menuItems.map(({ loc, title, btnAction, styles }) => (
                            <li key={title}>
                                <a href="#" onClick={btnAction} className={"flex items-center p-2 text-base font-normal text-gray-900 rounded-lg " + (
                                    tab === loc ? ' bg-sky-100' : 'hover:bg-gray-100'
                                )}>
                                    <span className={"flex-1 ml-3 whitespace-nowrap text-sm " + styles}>{title}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            <div className="overflow-x-auto relative flex flex-col w-full">
                <Content />
            </div>
        </main>
    );
}
