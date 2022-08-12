import {
    Button,
    ButtonGroup,
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
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import CreateLimitedItemForm, { CreateItemForm } from './createLimitedItemForm';
import ProgressDialog from './progressDialog';
import LimitedRowItem from './limitedItemRow'
import ChainSdk from '../chain/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppContext } from '../core/appcontext';
import { Connection, Keypair, Signer, Transaction } from '@solana/web3.js';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { useProjectContext } from './projectContext';
import { toast } from 'react-toastify';

export default function LimitedItems() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isProgressOpen, onOpen: onProgressOpen, onClose: onProgressClose } = useDisclosure()

    const { wallet } = useWallet();
    const { sendTx, connection } = useAppContext();
    const { project: project_id, projectObject, items } = useProjectContext();

    const itemsList = [];

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
    // const create_escrow_payment_account = async  => {

    //     const project_uid = new PublicKey("3jMSn7jd6DXGsu55iMus7DApi2AEkiNGRwV16Rqpwhrg");
    //     const mint = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

    //     const ix = new ChainSdk(wallet.adapter).createEscrowTokenAccount(
    //         project_id,
    //         mint,
    //     );

    //     sendTx([ix],"other", []).then((sig) => {
    //         console.log('tx sent',sig)
    //     }).catch((e) => {
    //         console.error('got an error: ',e)
    //     });
    // }

    const testTx = async e => {

        let txData = await fetch('https://cldfn.com/matosolana/buy/D6ipFk7ZmTw8HRRtkKsxKY4zAQCriCkLztZyCERdT41C/1/CUnDxJCbAEtrN9yruSfWx1oD8dFj7os78Rfqe9LHaMDy');
        let txJson = await txData.json();
        let conn = new Connection("https://api.devnet.solana.com");

        // let default_signatue = bs58.encode(Buffer.alloc(64).fill(0));

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

        const ix = new ChainSdk(wallet.adapter).createProject();

        sendTx([ix], "system").catch((e) => {
            toast.error('unable to create project: ' + e.message)
        });
    };

    return (<>
        <Flex w="100%" p="1rem">
            <p className="not-italic text-xl font-bold pl-2">Limited items</p>
            <Spacer />
            <Button colorScheme='teal' size='sm' onClick={onOpen}>
                + item
            </Button>
            <Button colorScheme='teal' size='sm' onClick={testTx}>
                test buy tx
            </Button>
            <Button onClick={create_project}>
                +project
            </Button>
        </Flex>

        <CreateLimitedItemForm isOpen={isOpen} onClose={onClose} onSave={onDataSave} />
        <ProgressDialog isOpen={isProgressOpen} />

        <TableContainer>
            <Table variant='simple' size='sm'>
                <TableCaption>List of limited items in shop</TableCaption>
                <Thead>
                    <Tr>
                        {/* <Th textAlign='center' width='0em'>Enabled</Th> */}
                        <Th>Game UID</Th>
                        <Th>Mint</Th>
                        <Th isNumeric>Supply</Th>
                        <Th isNumeric>Price</Th>
                        <Th isNumeric >Sales</Th>
                        <Th textAlign='end'>Sold</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {items.map((item) => (<LimitedRowItem key={item.mint} item={item} onClick={() => {
                        toast.warn("enable " + item.mint + " not implemented");
                    }} />))}
                </Tbody>

            </Table>
        </TableContainer>
    </>);
}