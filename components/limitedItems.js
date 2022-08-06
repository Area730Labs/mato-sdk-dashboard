import { 
    Button, 
    ButtonGroup ,
    Flex,
    Spacer,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Switch,
    CircularProgress,
    CircularProgressLabel,
    useToast,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import CreateLimitedItemForm from './createLimitedItemForm';
import ProgressDialog from './progressDialog';
import LimitedRowItem from './limitedItemRow'
import { useState } from 'react';
import {Keypair} from '@solana/web3.js' 

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function LimitedItems() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const { isOpen: isProgressOpen, onOpen: onProgressOpen, onClose: onProgressClose } = useDisclosure()

    const showCopyOkToast = () => {
        if (!toast.isActive('copy-info')) {
            toast({
                title: 'Copied mint to clipboard',
                status: 'info',
                duration: 3000,
                isClosable: false,
                position: 'top',
                id: 'copy-info'
            });
        }
    };

    let [items, setItems] = useState([
        {
            itemName: 'Golden drsgon',
            gameUid: 'golden-drsgon',
            mint: '6dlkdjf8doufdifldjflkjdlfkjdlkfjdlkf',
            supply: 10000,
            price: 105,
            sales: 143900,
            tokenSymbol: 'USDC',
            soldPercent: 43,
            active: false
        }
    ]);

    const onDataSave = data => {
        onClose();
        onProgressOpen();

        setTimeout(() => {
            onProgressClose();

            setItems(prevItems => [
                ...prevItems,
                {
                    ...data,
                    mint: Keypair.generate().publicKey.toString(),
                    sales: getRandomInt(500),
                    soldPercent: getRandomInt(100),
                    active: false
                }
            ]);

            toast({
                title: 'Data saved',
                status: 'success',
                duration: 2000,
                isClosable: false,
                position: 'top'
            });
        }, 3000);
    };

    
    const onActivateItemHandler = e => {
        const mint = e.target.name;
        let index = items.findIndex(a => a.mint === mint);
        
        let newItems = [...items];
        let item = {...newItems[index]};
        item.active = !item.active;
        newItems[index] = item;
        
        setItems(newItems);
    }

    return (<>
        <Flex w="100%" p="1rem" borderBottom='1px' borderColor='gray.200'>
            <p className="not-italic text-xl font-bold pl-2">Limited items</p>
            <Spacer />
            <Button colorScheme='teal' size='sm' onClick={onOpen}>
                Add new
            </Button>
        </Flex>

        <CreateLimitedItemForm isOpen={isOpen} onClose={onClose} onSave={onDataSave} />
        <ProgressDialog isOpen={isProgressOpen} />

        <TableContainer>
            <Table variant='striped' >
                <TableCaption>List of limited items in shop</TableCaption>
                <Thead>
                    <Tr>
                        <Th textAlign='center' width='0em'>Enabled</Th>
                        <Th>Name</Th>
                        <Th>Game UID</Th>
                        <Th>Mint</Th>
                        <Th isNumeric>Supply</Th>
                        <Th isNumeric>Price</Th>
                        <Th isNumeric>Sales</Th>
                        <Th textAlign='end'>Sold</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {items.map((item) => (<LimitedRowItem key={item.mint} {...item} showCopyOkToast={showCopyOkToast} enableHandler={onActivateItemHandler} />))}
                </Tbody>
               
            </Table>    
        </TableContainer>
    </>);
}