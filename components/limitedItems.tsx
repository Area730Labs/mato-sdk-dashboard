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
import CreateLimitedItemForm, { CreateItemForm } from './createLimitedItemForm';
import ProgressDialog from './progressDialog';
import LimitedRowItem from './limitedItemRow'
import { useAppState } from './useApp';
import ChainSdk from '../chain/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppContext } from '../core/appcontext';
import { Keypair, PublicKey, Signer } from '@solana/web3.js';
import { SdkProject } from '../chain/generated/accounts';

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export default function LimitedItems() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const { isOpen: isProgressOpen, onOpen: onProgressOpen, onClose: onProgressClose } = useDisclosure()

    const { state, dispatch, actions } = useAppState();
    const {wallet} = useWallet();
    const {sendTx,connection} = useAppContext();

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

    const itemsList = state.serverData.limited_items;

    const onDataSave = async (data : CreateItemForm) => {
        onClose();
        onProgressOpen();

        const project_id = new PublicKey("b5XHK9Hfcfp9QJ3kowao8N3D9mEQs5FrUL4zhP6pmfi");
        const mint_keypair = new Keypair();

        const project_info = await SdkProject.fetch(connection,project_id);

        const ix = new ChainSdk(wallet.adapter).createItem(
            project_id,
            project_info,
            mint_keypair.publicKey,
            data.supply,
            data.price,
            data.payment_mint,
            data.game_uid,
            "https://arweave.net/K_0cZoEK8wa8_rnlN0Tnwp1DEQfJjffg5dwMi9B7mTU?ext=png"
        );

        const newItem = {
            ...data,
            mint: mint_keypair.publicKey,
            sales: 0,
            soldPercent: 0,
            active: false
        };

        console.log('item ',ix);
        console.log("extra signer for this tx : ",mint_keypair.publicKey.toString());

        const signers = [
            {
                publicKey: mint_keypair.publicKey, 
                secretKey: mint_keypair.secretKey
            } as Signer,
        ];
        
        sendTx([ix],"other", signers).then(() => {
            console.log('tx sent')
        }).catch((e) => {
            console.error('got an error: ',e)
        });

        // let res = await actions.addNewLimitedItem(state.publicKey, newItem);

        onProgressClose();

        // if (res) {
        //     toast({
        //         title: 'Data saved',
        //         status: 'success',
        //         duration: 2000,
        //         isClosable: false,
        //         position: 'top'
        //     });
        // } else {
        //     toast({
        //         title: 'Failed to save data',
        //         status: 'error',
        //         duration: 2000,
        //         isClosable: false,
        //         position: 'top'
        //     });
        // }
        
    };

    
    const onActivateItemHandler = e => {
        // const mint = e.target.name;
        // let index = items.findIndex(a => a.mint === mint);
        
        // let newItems = [...items];
        // let item = {...newItems[index]};
        // item.active = !item.active;
        // newItems[index] = item;
        
        // setItems(newItems);
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
                        {/* <Th textAlign='center' width='0em'>Enabled</Th> */}
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
                    {itemsList.map((item) => (<LimitedRowItem key={item.mint} {...item} showCopyOkToast={showCopyOkToast} enableHandler={onActivateItemHandler} />))}
                </Tbody>
               
            </Table>    
        </TableContainer>
    </>);
}