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
        itemUid: '',
        supply: 0,
        price: 0,
        token: ''
    });

    const changeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const saveHandler = e => {
        props.onSave(formValues)
    }

    const canSave = formValues.itemName.length > 0 
                    && formValues.itemUid.length > 0 
                    && formValues.supply > 0 
                    && formValues.token.length > 0;

    return (
        <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new limited item</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Item name (for dashboard only)</FormLabel>
                        <Input value={formValues.itemName} onChange={changeHandler} name='itemName' />

                        <FormLabel mt='0.5rem'>Game uid</FormLabel>
                        <Input value={formValues.itemUid} onChange={changeHandler} name='itemUid' />

                        <FormLabel  mt='0.5rem'>Supply</FormLabel>
                        <NumberInput>
                            <NumberInputField value={formValues.supply} onChange={changeHandler} name='supply' />
                        </NumberInput>

                        <FormLabel mt='0.5rem'>Price</FormLabel>
                        <NumberInput>
                            <NumberInputField value={formValues.price} onChange={changeHandler} name='price' />
                        </NumberInput>

                        <FormLabel mt='0.5rem'>Token</FormLabel>
                        <Select placeholder='Select option' value={formValues.token} onChange={changeHandler} name='token'>
                            <option value='USDC'>USDC</option>
                            <option value='SOL'>SOL</option>
                        </Select>


                        <FormHelperText>Please doublecheck everything as you won't be able to change it later, only create a new one</FormHelperText>
                    </FormControl>

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={saveHandler} isDisabled={!canSave}>Save</Button>
                    <Button onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}