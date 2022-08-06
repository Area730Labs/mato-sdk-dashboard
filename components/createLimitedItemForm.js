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
    FormErrorMessage,
    FormHelperText,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberDecrementStepper,
    Select,
} from '@chakra-ui/react'
import React, { useState } from "react";

export default function CreateLimitedItemForm(props) {
    

    const [formValues, setFormValues] = useState({
        itemName: '',
        gameUid: '',
        supply: 0,
        price: 0,
        tokenSymbol: ''
    });

    const changeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const saveHandler = e => {
        props.onSave(formValues)
    }

    const canSave = formValues.itemName.length > 0 
                    && formValues.gameUid.length > 0 
                    && formValues.supply > 0 
                    && formValues.tokenSymbol.length > 0;

    const onClose = () => {
        props.onClose();

        setFormValues({
            itemName: '',
            gameUid: '',
            supply: 0,
            price: 0,
            tokenSymbol: ''
        });
    };

    return (
        <Modal onClose={onClose} isOpen={props.isOpen} isCentered closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new limited item</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Item name (for dashboard only)</FormLabel>
                        <Input value={formValues.itemName} onChange={changeHandler} name='itemName' />

                        <FormLabel mt='0.5rem'>Game uid</FormLabel>
                        <Input value={formValues.gameUid} onChange={changeHandler} name='gameUid' />

                        <FormLabel  mt='0.5rem'>Supply</FormLabel>
                        <NumberInput>
                            <NumberInputField value={formValues.supply} onChange={changeHandler} name='supply' />
                        </NumberInput>

                        <FormLabel mt='0.5rem'>Price</FormLabel>
                        <NumberInput>
                            <NumberInputField value={formValues.price} onChange={changeHandler} name='price' />
                        </NumberInput>

                        <FormLabel mt='0.5rem'>Token</FormLabel>
                        <Select placeholder='Select option' value={formValues.tokenSymbol} onChange={changeHandler} name='tokenSymbol'>
                            <option value='USDC'>USDC</option>
                            <option value='SOL'>SOL</option>
                        </Select>


                        <FormHelperText>Please doublecheck everything as you won't be able to change it later, only create a new one</FormHelperText>
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