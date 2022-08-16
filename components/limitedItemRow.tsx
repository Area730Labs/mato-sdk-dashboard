import { CopyIcon } from '@chakra-ui/icons';
import {
    Tr,
    Td,
    Switch,
    CircularProgress,
    CircularProgressLabel,
    SystemProps,
} from '@chakra-ui/react'
import { withTheme } from '@emotion/react';
import { PublicKey } from '@solana/web3.js';
import Image from 'next/image'
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { SdkItem } from '../api/api';
import global_config from '../core/config';
import Address from './core/Address';


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

    const evenStyle = {
        backgroundColor: "rgb(243 244 246)",
    }

    const bRadius = "10px";

    const payment_info = useMemo(() => {
        
        const info =  global_config.payment_tokens.find(x => x.mint.toString() == item.price_mint);
        const one = Math.pow(10,info.decimals);

        return {
            one,
            info,
        }

    },[item])

    const price_value = item.price/payment_info.one;

    return (
        <Tr {...restprops}
            _even={evenStyle}
        >
            <Td textAlign='center' _first={{ borderLeftRadius: bRadius }}>
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
                <Address addr={new PublicKey(item.mint)}/> <CopyIcon style={{ opacity: mintHover ? 1 : 0 }} />
            </Td>
            <Td isNumeric>{item.supply.toString().toLocaleString()}</Td>
            <Td isNumeric>{price_value} {payment_info.info.name}</Td>
            <Td isNumeric>{item.sold.toString().toLocaleString()}</Td>
            <Td textAlign='end' _last={{ borderRightRadius: bRadius }}>
                <CircularProgress value={soldPercent} color='green.400'>
                    <CircularProgressLabel>{soldPercent}%</CircularProgressLabel>
                </CircularProgress>
            </Td>
        </Tr>
    );
}