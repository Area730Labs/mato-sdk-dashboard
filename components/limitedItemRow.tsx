import { CopyIcon } from '@chakra-ui/icons';
import {
    Tr,
    Td,
    Switch,
    CircularProgress,
    CircularProgressLabel,
    SystemProps,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SdkItem } from '../api/api';


export interface LimitedRowItemProps extends SystemProps {
    /**
     * Aligns the cell content to the right
     */
    item: SdkItem;
    disabled?: boolean,
}


export default function LimitedRowItem(props: LimitedRowItemProps) {


    let { item, ...restprops } = props;
    let [enabled, setEnabled] = useState(!item.inactive);

    const soldPercent = Math.round((item.sold / item.supply) * 100);
    const toggleActive = () => {
        setEnabled(!enabled);
    }

    const [mintHover, setHoverMint] = useState(false);
    const [gameuidHover, setHoverGameuid] = useState(false);

    const fontWeight = mintHover ? "bold" : "normal"; 

    return (
        <Tr {...restprops}>
            <Td textAlign='center'>
                <Switch colorScheme='green' isChecked={enabled} onChange={toggleActive} />
            </Td>
            <Td
                onMouseEnter={() => {
                    setHoverGameuid(true);
                }}
                onMouseLeave={() => {
                    setHoverGameuid(false);
                }}

                onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(item.uid);
                    toast.info('uid copied');
                }}

            >{item.uid} <CopyIcon style={{ opacity: gameuidHover ? 1 : 0 }} /></Td>
            <Td
                onMouseEnter={() => {
                    setHoverMint(true);
                }}
                onMouseLeave={() => {
                    setHoverMint(false);
                }}

                onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(item.mint);
                    toast.info('mint address copied');
                }}

                >

                {item.mint.substring(0, 8)}... <CopyIcon style={{ opacity: mintHover ? 1 : 0 }} />
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