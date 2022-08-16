import {
    Button,
    Flex,
    Spacer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import CreateLimitedItemForm, { CreateItemForm } from './createLimitedItemForm';
import LimitedRowItem from './limitedItemRow'
import ChainSdk from '../chain/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppContext } from '../core/appcontext';
import { Keypair, PublicKey, Signer, Transaction } from '@solana/web3.js';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { useProjectContext } from './projectContext';
import { toast } from 'react-toastify';
import { Listing } from '../chain/generated/accounts/Listing';
import global_config from '../core/config';

export default function LimitedItems() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { wallet } = useWallet();
    const { sendTx, connection } = useAppContext();
    const { project: project_id, projectObject, items } = useProjectContext();

    const onDataSave = async (data: CreateItemForm) => {
        onClose();

        const mint_keypair = new Keypair();

        const ix = new ChainSdk(wallet.adapter).createItem(
            project_id,
            projectObject,
            mint_keypair.publicKey,
            data.supply,
            data.price,
            data.payment_mint,
            data.game_uid,
            "https://arweave.net/K_0cZoEK8wa8_rnlN0Tnwp1DEQfJjffg5dwMi9B7mTU?ext=png"
        );

        const signers = [
            {
                publicKey: mint_keypair.publicKey,
                secretKey: mint_keypair.secretKey
            } as Signer,
        ];

        sendTx([ix], "system", signers).catch((e) => {
            console.error('unable to create an item: ', e)
        });

    };

    // const create_signer_item_account = async  => {

    //     const mint = new PublicKey("2G7YZaFWPAJLPwJNUZFMcY2eLJSCvyngJ7wBoCj5DSr6");

    //     console.log(wallet.adapter.publicKey.toString())

    //     let token_addr = findAssociatedTokenAddress(wallet.adapter.publicKey,mint);

    //     let ix = createAssociatedTokenAccountInstruction(
    //         wallet.adapter.publicKey,
    //         token_addr,
    //         wallet.adapter.publicKey,
    //         mint
    //     );

    //     sendTx([ix],"other", []).then((sig) => {
    //         console.log('tx sent',sig)
    //     }).catch((e) => {
    //         console.error('got an error: ',e)
    //     });
    // }
    const create_escrow_payment_account = async => {

        const ix = new ChainSdk(wallet.adapter).createEscrowTokenAccount(
            project_id,
            global_config.default_payment_mint,
        );

        sendTx([ix], "system").catch((e) => {
            console.error('got an error: ', e)
        });
    }

    const buy_market = async e => {

        let item = new PublicKey("7aD2mfnGR5Fu7i36gmns3VFSf33qVdMpYAUGUWfNY8Y8");

        let listingInfo = await Listing.fetch(connection, item);

        console.warn('listing info ', listingInfo.toJSON())

        let txData = await fetch('https://cldfn.com/matosolana/project/' + project_id + '/market/buy/' + item + "/" + wallet.adapter.publicKey.toString());
        let txJson = await txData.json();


        let tx_message_bytes = Buffer.from(txJson.tx, 'base64');

        // let tx_message = Message.from(tx_message_bytes);
        let tx = Transaction.from(tx_message_bytes);

        let rawtx = tx.serialize({ verifySignatures: false });

        console.warn(bs58.encode(rawtx));

        wallet.adapter.sendTransaction(tx, connection, {
            skipPreflight: true
        });
    }

    const testTx = async e => {

        let test_mint = items[0].mint;

        let txData = await fetch('https://cldfn.com/matosolana/buy/' + test_mint + '/1/' + wallet.adapter.publicKey.toString());
        let txJson = await txData.json();


        let tx_message_bytes = Buffer.from(txJson.tx, 'base64');

        // let tx_message = Message.from(tx_message_bytes);
        let tx = Transaction.from(tx_message_bytes);

        let rawtx = tx.serialize({ verifySignatures: false });

        console.warn(bs58.encode(rawtx));

        wallet.adapter.sendTransaction(tx, connection, {
            skipPreflight: true
        });

        // let res = await wallet.adapter.sendTransaction();
    }

    const create_project = async e => {

        const [_, ix] = new ChainSdk(wallet.adapter).createProject();

        sendTx([ix], "system").catch((e) => {
            toast.error('unable to create project: ' + e.message)
        });
    };

    const list_item = async e => {

        let mint = new PublicKey("41r8vUjmHuLXvC3VPqkJK9zxcWiFKYz6XtUr2JcFb3Xi");


        const url = 'https://cldfn.com/matosolana/project/' + project_id + '/market/list/' + mint + '/' + wallet.adapter.publicKey.toString() + '?price_mint=4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU&price=100000';
        let txData = await fetch(url);

        console.log('sent request to ', url)
        let txJson = await txData.json();


        let tx_message_bytes = Buffer.from(txJson.tx, 'base64');

        // let tx_message = Message.from(tx_message_bytes);
        let tx = Transaction.from(tx_message_bytes);

        let rawtx = tx.serialize({ verifySignatures: false });

        console.warn(tx.serializeMessage().toString("base64"));

        wallet.adapter.sendTransaction(tx, connection, {
            skipPreflight: true
        });

    }

    return (<>
        <Flex justifySelf={"center"} p="1rem" paddingLeft={0}>

            <Button colorScheme='green' size='sm' onClick={onOpen}>
                + new item
            </Button>
            {/*
            <Button colorScheme='teal' size='sm' onClick={list_item}>
                list to market
            </Button>
            <Button colorScheme='teal' size='sm' onClick={buy_market}>
                buy on market
            </Button>
            <Button colorScheme='teal' size='sm' onClick={testTx}>
                test buy tx
            </Button>

            <Button onClick={create_project}>
                +project
            </Button>
            <Button onClick={create_escrow_payment_account}>
                +escrow USDC wallet
            </Button> */}

        </Flex>

        <CreateLimitedItemForm isOpen={isOpen} onClose={onClose} onSave={onDataSave} />

        <TableContainer>
            <Table variant="unstyled" size='sm'>
                <TableCaption>List of limited items in shop</TableCaption>
                <Thead>
                    <Tr>
                        <Th textAlign='center' width='0em'>Active</Th>
                        <Th>Game UID</Th>
                        <Th>Mint</Th>
                        <Th isNumeric>Supply</Th>
                        <Th isNumeric>Price</Th>
                        <Th isNumeric >Sales</Th>
                        <Th textAlign='end'>Sold</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {items.map((item) => (<LimitedRowItem key={item.mint} item={item} />))}
                </Tbody>

            </Table>
        </TableContainer>
    </>);
}