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


    const onDataSave = data => {
        onClose();
        onProgressOpen();

        setTimeout(() => {
            onProgressClose();

            toast({
                title: 'Data saved',
                status: 'success',
                duration: 2000,
                isClosable: false,
                position: 'top'
            });
        }, 3000);
    };


    return (<>
        <Flex w="100%" p="1rem" borderBottom='1px' borderColor='gray.200'>
            <p class="not-italic text-xl font-bold pl-2">Limited items</p>
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
                    <Tr>
                    <Td textAlign='center'><Switch id='email-alerts' colorScheme='green' /></Td>
                        <Td>Golden dragon pet</Td>
                        <Td>golden-dragon</Td>
                        <Td>
                            EPjFWdd5...
                            <a href="#" onClick={(e) => showCopyOkToast()}>
                            <svg class="w-6 h-6 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                            </a>
                        </Td>
                        <Td isNumeric>10,000</Td>
                        <Td isNumeric>150 USDC</Td>
                        <Td isNumeric>450,000 USDC</Td>
                        <Td textAlign='end'>
                            <CircularProgress value={40} color='green.400'>
                                <CircularProgressLabel>40%</CircularProgressLabel>
                            </CircularProgress>
                        </Td>
                    </Tr>
                    
                </Tbody>
               
            </Table>    
        </TableContainer>
    </>);
}