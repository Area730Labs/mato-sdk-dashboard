import { PublicKey } from "@solana/web3.js";

export default function Address(props: { addr: PublicKey }) {


    const prefixLength = 7;
    const suffixLength = 3;

    const key_str = props.addr.toString();
    const len = key_str.length;

    const prefix = props.addr.toString().substring(0, prefixLength);
    const suffix = props.addr.toString().substring(len - suffixLength);

    return <>
        {prefix}...{suffix}
    </>

}