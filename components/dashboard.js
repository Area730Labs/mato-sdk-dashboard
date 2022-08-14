import React, { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import Charts from './charts';
import LimitedItems from './limitedItems';
import { Badge, Box, Flex, List, ListItem, Text } from "@chakra-ui/react";

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
            component: null,
            badge: <Badge variant='solid' colorScheme='green'>Soon</Badge>
        },
        {
            title: 'Tokens',

            loc: 'tokens',
            btnAction: () => setTab('tokens'),
            component: null,
            badge: <Badge variant='solid' colorScheme='green' alignSelf={"end"}>Soon</Badge>
        },
        {
            title: 'Sign Out (' + publicKey.toString().substring(0, 6) + '...)',
            loc: 'sign-out',

            styles: "font-bold",
            btnAction: () => {
                disconnect().catch(() => { });
                console.log('log out');
            },
            component: null,
        }
    ];

    const currentContent = menuItems.find(x => x.loc == tab);
    const Content = currentContent.component;

    return (<Box display="flex" borderRadius="24px" overflow="hidden">
        <Flex ariaLabel="Sidebar" flexDir="column">
            <Box backgroundColor="rgb(243 244 246)" h="100%">
                <Text marginY="15px" fontSize='xl' fontWeight="bold" textAlign={"left"} paddingLeft={6}>MatoLabs</Text>
                <List>
                    {menuItems.map(({ loc, title, btnAction, styles, ...rest }) => {

                        const bgColor = tab === loc ? 'white' : 'rgb(243 244 246)';

                        return <ListItem
                            transition="all .4s ease"
                            key={title}
                            padding="4"
                            paddingLeft={6}
                            _hover={{ backgroundColor: "white" }}
                            display="flex"
                            fontSize="sm"
                            bgColor={bgColor}
                        >
                            <a href="#" onClick={btnAction}>
                                <span>{title} {rest.badge}</span>
                            </a>
                        </ListItem>
                    })}
                </List>
            </Box>
        </Flex>
        <div className="overflow-x-auto relative flex flex-col w-full">
            <Content />
        </div>
    </Box>
    );
}
