import React, { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import Charts from './charts';
import LimitedItems from './limitedItems';
import { Badge, Box, Flex, List, ListItem, Text } from "@chakra-ui/react";

function EmptyPage() {
    return <></>
}

export default function Dashboard(props) {
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
            component: EmptyPage,
            badge: <Badge variant='outline' >Soon</Badge>
        },
        {
            title: 'Tokens',

            loc: 'tokens',
            btnAction: () => setTab('tokens'),
            component: EmptyPage,
            badge: <Badge  variant='outline'>Soon</Badge>
        },
        {
            title: 'Sign Out (' + publicKey.toString().substring(0, 6) + '...)',
            loc: 'sign-out',

            styles: "font-bold",
            btnAction: () => {
                disconnect().catch(() => { });
                console.log('log out');
            },
            component: EmptyPage,
        }
    ];

    const currentContent = menuItems.find(x => x.loc == tab);
    const Content = currentContent.component;

    return (<Box display="flex" overflow="hidden">
        <Flex ariaLabel="Sidebar" flexDir="column" width="220px">
            <Box backgroundColor="rgb(243 244 246)" height="100%">
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
                            onClick={btnAction}
                        >
                            <a href="#" >
                                <span>{rest.badge} {title}</span>
                            </a>
                        </ListItem>
                    })}
                </List>
            </Box>
        </Flex>
        <Box padding="4">
            <Content />
        </Box>
    </Box>
    );
}
