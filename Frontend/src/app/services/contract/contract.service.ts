import { Inject, Injectable } from '@angular/core';
import { WEB3 } from '../../core/web3';
import contract from 'truffle-contract';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

declare let require: any;
const Web3 = require('web3');
const tokenAbi = require('../../../../../Blockchain/build/contracts/Payment.json');
// declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  public accountsObservable = new Subject<string[]>();
  public compatible: boolean;
  public counter = 0;
  web3Modal;
  web3js;
  provider;
  accounts;
  allAccs;
  balance;
  payment

  constructor(@Inject(WEB3) private web3: Web3, private snackbar: MatSnackBar) {
    console.log('_++_+_+_+_+_+_+_+_+_+_+');
    console.log('Con Ser counter :: ' + this.counter);
    console.log('_++_+_+_+_+_+_+_+_+_+_+');
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }

  public async initContractInstance(originAccount) {
    const paymentContract = contract(tokenAbi);
    paymentContract.setProvider(this.provider);
    let payment = await paymentContract.new({ from: originAccount[0] });
    return payment;
  }

  async connectAccount() {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    this.initContractInstance(this.accounts).then((r) => {
      this.payment = r;
      console.log('conAcc from ser suc ::  ' + this.payment);
    })
      .catch((e) => {
        console.log('conAcc from ser err:: ' + e);
        this.failure("Getting failed");
      });
    return this.accounts;
  }

  async accountInfo(accounts) {
    const initialvalue = await this.web3js.eth.getBalance(accounts);
    this.balance = this.web3js.utils.fromWei(initialvalue, 'ether');
    return this.balance;
  }

  // can use this for placeOrder methods
  trasnferEther(originAccount, destinyAccount, amount) {
    const that = this;

    return new Promise((resolve, reject) => {
      const paymentContract = contract(tokenAbi);
      paymentContract.setProvider(this.provider);
      paymentContract.deployed().then((instance) => {
        let finalAmount = this.web3.utils.toBN(amount)
        console.log(finalAmount)
        return instance.nuevaTransaccion(
          destinyAccount,
          {
            from: originAccount[0],
            value: this.web3.utils.toWei(finalAmount, 'ether')
          }
        );
      }).then((status) => {
        if (status) {
          return resolve({ status: true });
        }
      }).catch((error) => {
        console.log(error);

        return reject('Error transfering Ether');
      });
    });
  }


  failure(message: string) {
    const snackbarRef = this.snackbar.open(message);
    snackbarRef.dismiss()
  }

  success() {
    const snackbarRef = this.snackbar.open('Transaction complete successfully');
    snackbarRef.dismiss()
  }

  public async getAll(originAccount) {
    const paymentContract = contract(tokenAbi);
    paymentContract.setProvider(this.provider);
    let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await payment.getAll({ from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }



  public async getItemById(originAccount, itemId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.getItemById(itemId, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }


  public async getAllItems(originAccount) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.getAllItems({ from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async addUser(originAccount, name, addr, userId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.addUser(userId, name, addr, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async getAllUsers(originAccount) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.getAllUsers({ from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async getUserById(originAccount, userId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.getUserById(userId, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async addItemToCart(originAccount, userId, itemId, name, catId, price, quantity, retailerId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.addItemToCart(userId, itemId, name, catId, price, quantity, retailerId, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async viewCart(originAccount, userId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.viewCart(userId, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async updateCart(originAccount, userId, itemId, newQuant) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.updateCart(userId, itemId, newQuant, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async removeItemFromCart(originAccount, userId, itemId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.removeItemFromCart(userId, itemId, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async addRetailer(originAccount, retailerId, name, homeAddr) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.addRetailer(retailerId, name, homeAddr, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async getRetailerById(originAccount, retailerId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.getRetailerById(retailerId[0], { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async getAllRetailer(originAccount) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.getAllRetailer({ from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async addnewItemToInvt(originAccount, name, catId, price, quantity, retailerId, itemId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.addnewItemToInvt(name, catId, price, quantity, retailerId[0], itemId, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async viewInventory(originAccount, retailerId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.viewInventory(retailerId[0], { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async UpdateInventory(originAccount, itemId, newQuant, retailerId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.UpdateInventory(itemId, newQuant, retailerId[0], { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async removeItemInventory(originAccount, retailerId, itemId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.removeItemInventory(retailerId[0], itemId, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }

  public async viewOrdersByUserId(originAccount, userId) {
    // const paymentContract = contract(tokenAbi);
    // paymentContract.setProvider(this.provider);
    // let payment = await paymentContract.new({ from: originAccount[0] });
    let balance = await this.payment.viewOrdersByUserId(userId, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }




  // can use this for placeOrder methods
  async placeOrder(originAccount, destinyAccount, orderId, orderAmount) {
    let balance = await this.payment.placeOrderNew(destinyAccount, orderId, orderAmount, { from: originAccount[0] });
    console.log('balance :: ' + balance);
    return balance;
  }


}

