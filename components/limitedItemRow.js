import { 
    Tr,
    Td,
    Switch,
    CircularProgress,
    CircularProgressLabel,
} from '@chakra-ui/react'

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
                    {/* <svg className="w-6 h-6 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg> */}
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