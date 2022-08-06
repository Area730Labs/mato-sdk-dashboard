import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CircularProgress,
} from '@chakra-ui/react'
import React, { useState } from "react";


export default function ProgressDialog(props) {
    return (
        <Modal isOpen={props.isOpen} size='xs' isCentered closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent textAlign='center'>
                <ModalHeader>Saving data</ModalHeader>
                <ModalBody mb='10px'>
                    <CircularProgress isIndeterminate color='green.300' />
                </ModalBody>
               
            </ModalContent>
        </Modal>
    );
}