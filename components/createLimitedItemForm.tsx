import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    NumberInput,
    NumberInputField,
    Select,
    Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, Grid, GridItem,
    Box
} from '@chakra-ui/react'
import React, { useState } from "react";

import Label from "./core/label";
import { InfoIcon, WarningIcon } from '@chakra-ui/icons'
import { PublicKey } from '@solana/web3.js';
import global_config from '../core/config';

export interface CreateItemForm {
    price: number,
    payment_mint: PublicKey,
    supply: number,
    game_uid: string,
};

export default function CreateLimitedItemForm(props) {

    const [formValues, setFormValues] = useState<CreateItemForm>({
        game_uid: '',
        price: 0,
        payment_mint: global_config.default_payment_mint,
        supply: 0,
    });

    const changeHandler = e => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const saveHandler = e => {

        let payment_token_info = global_config.payment_tokens.find(x => {
            const result = x.mint.toString() == formValues.payment_mint.toString();
            return result;
        })


        let token_one = Math.pow(10,payment_token_info.decimals);

        formValues.price = token_one * formValues.price; 

        props.onSave(formValues)
    }

    const canSave = //formValues.itemName.length > 0 && 
        formValues.game_uid.length > 0
        && formValues.supply > 0

    const onClose = () => {
        props.onClose();

        setFormValues({
            game_uid: '',
            price: 0,
            supply: 0,
            payment_mint: global_config.default_payment_mint
        });
    };

    const changePaymentToken = (e) => {
        let pk = new PublicKey(e.target.value);

        formValues.payment_mint = pk;
        setFormValues(formValues);
    }

    return (
        <Modal onClose={onClose} isOpen={props.isOpen} isCentered >
            <ModalOverlay />
            <ModalContent borderRadius="24px">
                <ModalHeader position="relative">
                    <Label>Create new limited item</Label>
                    <ModalCloseButton marginTop="2" />
                </ModalHeader>

                <ModalBody>
                    <FormControl>

                        <FormLabel mt='0.5rem'>
                            <Label>Game uid</Label>
                        </FormLabel>
                        <Input
                            value={formValues.game_uid}
                            onChange={changeHandler}
                            name='game_uid'
                            autoComplete="off"
                            placeholder='some_item'
                        />

                        <FormLabel mt='0.5rem'>
                            <Label>Supply</Label>
                        </FormLabel>

                        <NumberInput>
                            <NumberInputField
                                value={formValues.supply}
                                onChange={changeHandler}
                                name='supply'
                                placeholder='10000'
                            />
                        </NumberInput>

                        <FormLabel mt='0.5rem'>
                            <Label>Price per item</Label>
                        </FormLabel>
                        <NumberInput>
                            <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                <GridItem colSpan={2}>
                                    <NumberInputField
                                        value={formValues.price}
                                        onChange={changeHandler}
                                        name='price'
                                        placeholder='50'
                                    />
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <Select placeholder={"Payment token"} value={formValues.payment_mint.toString()} onChange={changePaymentToken}>
                                        {global_config.payment_tokens.map(item =>
                                            <option key={item.mint.toString()} value={item.mint.toString()}><Label>{item.name}</Label></option>
                                        )}
                                    </Select>
                                </GridItem>
                            </Grid>
                        </NumberInput>
                        <FormHelperText marginTop="20px">
                            <InfoIcon marginRight="5px" />
                            Limited item means there's hard limit of items. Once all items are sold, there's no more items to come
                        </FormHelperText>

                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={saveHandler} isDisabled={!canSave}>Save</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}