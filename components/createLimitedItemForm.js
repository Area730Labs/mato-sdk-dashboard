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
import { WarningIcon } from '@chakra-ui/icons'

function SupplySlider(props) {

    const [sliderValue, setSliderValue] = useState(reversevalue(props.value))
    const [maxVal, setMax] = useState(500);

    console.log('slider redraw with value',props.value,sliderValue);

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    function value(expval) {
        return Math.round(Math.exp((expval / maxVal) * 13))
    }

    function reversevalue(val) {
        for (let i = 0; i < maxVal; i++) {
            if (value(i) > val) {
                return i;
            }
        }

        return 500;
    }

    return (
        <Box pt={6} pb={2}>
            <Slider
                aria-label='slider-ex-6'
                onChange={(val) => {
                    setSliderValue(val)
                    props.changeHandler(value(val))
                }}
                max={maxVal}
                value={sliderValue}
            >
                <SliderMark value={177} {...labelStyles}>
                    {value(177)}
                </SliderMark>
                <SliderMark value={239} {...labelStyles}>
                    {value(239)}
                </SliderMark>
                <SliderMark value={355} {...labelStyles}>
                    10000
                </SliderMark>
                <SliderMark value={470} {...labelStyles}>
                    400000
                </SliderMark>

                <SliderMark
                    value={sliderValue}
                    textAlign='center'
                    bg='tomato'
                    color='white'
                    mt='-10'
                    ml='-5'
                    paddingX="6px"
                >
                    {value(sliderValue)}
                </SliderMark>

                <SliderTrack bg='red.100'>
                    <SliderFilledTrack bg='tomato' />
                </SliderTrack>

                <SliderThumb />
            </Slider>
        </Box>
    )
}

export default function CreateLimitedItemForm(props) {

    const [formValues, setFormValues] = useState({
        // itemName: '',
        gameUid: '',
        price: 0,
        tokenSymbol: ''
    });

    const [supply,setSupply] = useState(10000);

    const changeHandler = e => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const saveHandler = e => {
        props.onSave(formValues)
    }

    const canSave = //formValues.itemName.length > 0 && 
        formValues.gameUid.length > 0
        && supply > 0
        && formValues.tokenSymbol.length > 0;

    const onClose = () => {
        props.onClose();

        setFormValues({
            // itemName: '',
            gameUid: '',
            price: 0,
            tokenSymbol: ''
        });

        setSupply(10000);
    };

    return (
        <Modal onClose={onClose} isOpen={props.isOpen} isCentered closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Label>Create new limited item</Label>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        {/* <FormLabel>
                            <Label>Name (dashboard only)</Label>
                        </FormLabel>
                        <Input
                            value={formValues.itemName}
                            onChange={changeHandler}
                            name='itemName'
                            autoComplete="off"
                        /> */}

                        <FormLabel mt='0.5rem'>
                            <Label>Game uid</Label>
                        </FormLabel>
                        <Input
                            value={formValues.gameUid}
                            onChange={changeHandler}
                            name='gameUid'
                            autoComplete="off"
                            placeholder='some_item'
                        />

                        <FormLabel mt='0.5rem'>
                            <Label>Supply</Label>
                        </FormLabel>

                        <NumberInput>
                                <NumberInputField
                                    value={formValues.price}
                                    onChange={changeHandler}
                                    name='price'
                                    placeholder='10000'
                                />
                        </NumberInput>

                        {/* <SupplySlider value={supply} changeHandler={(newSupply) => {
                            setSupply(newSupply);
                        }} /> */}

                        <FormLabel mt='0.5rem'>
                            <Label>Price per item</Label>
                        </FormLabel>
                        <NumberInput>
                            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                                <NumberInputField
                                    value={formValues.price}
                                    onChange={changeHandler}
                                    name='price'
                                    placeholder='50'
                                />
                                <GridItem colSpan={3}>
                                    <Select placeholder={<Label>Payment token</Label>} value={formValues.tokenSymbol} onChange={changeHandler} name='tokenSymbol'>
                                        <option value='USDC'><Label>USDC</Label></option>
                                        <option value='SOL'><Label>SOL</Label></option>
                                    </Select>
                                </GridItem>
                            </Grid>
                        </NumberInput>
                        <FormHelperText marginTop="20px">
                            <WarningIcon marginRight="5px" />
                            Please doublecheck everything as you will not be able to change it later, only create a new one
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