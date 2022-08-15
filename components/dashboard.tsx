import React, { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import Charts from './charts';
import LimitedItems from './limitedItems';
import { Badge, Box, Flex, List, ListItem, StyleProps, Text } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import Address from "./core/Address";

function EmptyPage() {
    return <></>
}

interface CompiledMenuItemProps extends StyleProps {
    tab: string,
    item: {
        loc: string,
        title: string,
        btnAction(),
        badge?: JSX.Element
    },
    children?: JSX.Element
}

function CompiledMenuItem(props: CompiledMenuItemProps) {

    const { item, tab } = props;

    const bgColor = tab === item.loc ? 'white' : 'rgb(243 244 246)';
    const fontWeight = tab === item.loc ? 'bold' : 'normal';

    return <ListItem
        borderRadius="10px"
        marginBottom="1"
        transition="all .2s ease"
        key={item.loc}
        padding="3"
        paddingLeft={6}
        _hover={{ backgroundColor: "white" }}
        display="flex"
        fontSize="sm"
        fontWeight={fontWeight}
        bgColor={bgColor}
        onClick={item.btnAction}
        cursor="pointer"
        textAlign={props.textAlign}
    >
        <span>{props.children} {item.badge} {item.title}</span>
    </ListItem>
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
            badge: <Badge variant='outline'>Soon</Badge>
        },
        {
            title: 'Earnings',

            loc: 'earnings',
            btnAction: () => setTab('earnings'),
            component: EmptyPage,
        }
    ];

    const signOutButton = {
        title: 'Sign Out',
        loc: 'sign-out',

        styles: "font-bold",
        btnAction: () => {
            disconnect().catch(() => { });
            console.log('log out');
        },
        component: EmptyPage,
    };

    const paddingLeft = 6;
    const outerPadding = 4;

    const currentContent = menuItems.find(x => x.loc == tab);
    const Content = currentContent.component;

    return (<Box display="flex" overflow="hidden">
        <Flex ariaLabel="Sidebar" flexDir="column" width="220px">
            <Box backgroundColor="rgb(243 244 246)" height="100%" display="flex" flexDirection="column">
                <Box padding={outerPadding}>
                    <Text marginY="15px" fontSize='xl' fontWeight="bold" textAlign={"left"} paddingLeft={paddingLeft}>MatoLabs</Text>
                </Box>

                <List padding={outerPadding} >
                    {menuItems.map(item =>
                        <CompiledMenuItem item={item} tab={tab} />
                    )}
                </List>
                <List padding={outerPadding} justifySelf="stretch" marginBottom="10px" marginTop="auto" >
                    <ListItem paddingLeft={paddingLeft} fontSize="xs" textAlign="left" color="rgb(118 118 118)"><Address addr={publicKey} /></ListItem>
                    <CompiledMenuItem
                        item={signOutButton}
                        tab={tab}
                        textAlign="left"
                    >
                        <LockIcon />
                    </CompiledMenuItem >
                </List>
            </Box>
        </Flex>
        <Box padding={outerPadding}>
            <Content />
        </Box>
    </Box>
    );
}
