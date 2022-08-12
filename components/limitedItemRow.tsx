import { 
    Tr,
    Td,
    Switch,
    CircularProgress,
    CircularProgressLabel,
} from '@chakra-ui/react'
import Image from 'next/image'
import { toast } from 'react-toastify';
import { SdkItem } from '../api/api';



export default function LimitedRowItem(props : {item: SdkItem})  {

    let {item,...restprops} = props;

    const showCopyOkToast = () => {
        toast.info('copied to clipboard');
    } 

    const soldPercent = (item.sold/item.supply)*100;


    return (
        <Tr {...restprops}>
            {/* <Td textAlign='center'><Switch id='email-alerts' colorScheme='green' isChecked={props.active} name={props.mint} onChange={props.enableHandler} /></Td> */}
            <Td>{item.uid}</Td>
            <Td>
                {item.mint.substring(0, 6)}...
                <a href="#" onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(item.mint);
                    showCopyOkToast();
                }}>
                    <Image src="/copyIcon.svg" alt="Logo" className="mr-3 h-6 sm:h-7" width={22} height={22} color='gray.100'/>
                </a>
            </Td>
            <Td isNumeric>{item.supply.toString().toLocaleString()}</Td>
            <Td isNumeric>{item.price.toString().toLocaleString()}</Td>
            <Td isNumeric>{item.sold.toString().toLocaleString()}</Td>
            <Td textAlign='end'>
                <CircularProgress value={soldPercent} color='green.400'>
                    <CircularProgressLabel>{soldPercent}%</CircularProgressLabel>
                </CircularProgress>
            </Td>
        </Tr>
    );
}