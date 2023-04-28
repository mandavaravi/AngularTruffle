//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Payment {
    address origenTransferencia;
    address payable destinoTransferencia;
    uint montoTransferencia;
    
    constructor() {
        origenTransferencia = msg.sender;
    }

    event TransferirMonto(address payable _destinoTransferencia, address _origenTransferencia, uint montoTransferencia);
    
    function nuevaTransaccion(address payable _destinoTransferencia) public payable returns (bool){
        destinoTransferencia = _destinoTransferencia;
        destinoTransferencia.transfer(msg.value);
        emit TransferirMonto(destinoTransferencia, origenTransferencia, msg.value);
        return true;
    }
    function verBalanceCuenta() public pure returns (uint ) {
        return 1000;
    }

    function getAll() public pure returns (uint) {
        return 1000;
    }

    
}