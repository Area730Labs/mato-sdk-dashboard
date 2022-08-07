import { 
    Tr,
    Td,
    Switch,
    CircularProgress,
    CircularProgressLabel,
} from '@chakra-ui/react'
import Image from 'next/image'



export default function LimitedRowItem(props)  {

    return (
        <Tr>
            {/* <Td textAlign='center'><Switch id='email-alerts' colorScheme='green' isChecked={props.active} name={props.mint} onChange={props.enableHandler} /></Td> */}
            <Td>{props.itemName}</Td>
            <Td>{props.gameUid}</Td>
            <Td>
                {props.mint.substring(0, 6)}...
                <a href="#" onClick={(e) => {
                    navigator.clipboard.writeText(props.mint);
                    props.showCopyOkToast();
                }}>
                    <Image src="/copyIcon.svg" alt="Logo" className="mr-3 h-6 sm:h-7" width={22} height={22} color='gray.100'/>
                </a>
            </Td>
            <Td isNumeric>{props.supply.toString().toLocaleString()}</Td>
            <Td isNumeric>{props.price.toString().toLocaleString()} {props.tokenSymbol}</Td>
            <Td isNumeric>{props.sales.toString().toLocaleString()} {props.tokenSymbol}</Td>
            <Td textAlign='end'>
                <CircularProgress value={props.soldPercent} color='green.400'>
                    <CircularProgressLabel>{props.soldPercent}%</CircularProgressLabel>
                </CircularProgress>
            </Td>
        </Tr>
    );
}