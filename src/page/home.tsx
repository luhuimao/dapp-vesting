import React from 'react';
import { inject, observer } from 'mobx-react';
import './home.css'
import {
  Image, Layout, Menu, Button
} from 'antd';
import { ToolOutlined } from '@ant-design/icons';
import HomeStore from '../store/home_store';
import CommonStore from '../store/common_store';


import Footer from '../component/footer';
import Header from '../component/header';

const { Sider } = Layout;


@inject('homeStore', 'commonStore')
@observer
export default class Home extends React.Component<{
  homeStore?: HomeStore,
  commonStore?: CommonStore,
  [x: string]: any,
}, any> {

  constructor(props) {
    super(props);

    this.state = {
      DEPOSIT: '',
      TOKENADDRESS: '',
      STARTTIME: '',
      STOPTIME: '',
      ERC721ADDRESS: '',
      TOKENID: '',
      NFTTOTALSUPPLY: '',
      StreamID: '',
      Stream2ID: '',
      WithdrawAmount: '',
      Recipient: '',
      SendTokenId: '',
      CheckBalanceStreamID: '',
      withdrawableBalance: '',
      withdrawableBalance2: '',
      Shares: ''
    }

    this.updateDepositInput = this.updateDepositInput.bind(this);
    this.updateTokenAddressInput = this.updateTokenAddressInput.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }
  updateTokenAddressInput(event) {
    // Extract the current value of the customer from state
    var tokenaddr = this.state.TOKENADDRESS;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    tokenaddr = modifiedValue;

    // Update the state object
    this.setState({
      TOKENADDRESS: tokenaddr
    });
  }
  updateDepositInput(event) {
    // Extract the current value of the customer from state
    var deposit = this.state.DEPOSIT;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    deposit = modifiedValue;

    // Update the state object
    this.setState({
      DEPOSIT: deposit
    });
  }

  updateStartTimeInput(event) {
    // Extract the current value of the customer from state
    var startTime = this.state.STARTTIME;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    startTime = modifiedValue;

    // Update the state object
    this.setState({
      STARTTIME: startTime
    });
  }

  updateStopTimeInput(event) {
    // Extract the current value of the customer from state
    var stopTime = this.state.STOPTIME;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    stopTime = modifiedValue;

    // Update the state object
    this.setState({
      STOPTIME: stopTime
    });
  }

  updateErc721AddressInput(event) {
    // Extract the current value of the customer from state
    var erc721Addr = this.state.ERC721ADDRESS;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    erc721Addr = modifiedValue;

    // Update the state object
    this.setState({
      ERC721ADDRESS: erc721Addr
    });
  }

  updateSharesInput(event) {
    // Extract the current value of the customer from state
    var share = this.state.Shares;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    share = modifiedValue;

    // Update the state object
    this.setState({
      Shares: share
    });
  }

  updateNftTotalSupplyInput(event) {
    // Extract the current value of the customer from state
    var totalSupply = this.state.NFTTOTALSUPPLY;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    totalSupply = modifiedValue;

    // Update the state object
    this.setState({
      NFTTOTALSUPPLY: totalSupply
    });
  }

  updateStreamIdInput(event) {
    // Extract the current value of the customer from state
    var streamID = this.state.StreamID;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    streamID = modifiedValue;

    // Update the state object
    this.setState({
      StreamID: streamID
    });
  }

  updateStream2IdInput(event) {
    // Extract the current value of the customer from state
    var stream2ID = this.state.Stream2ID;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    stream2ID = modifiedValue;

    // Update the state object
    this.setState({
      Stream2ID: stream2ID
    });
  }

  updateWithdrawAmount(event) {
    // Extract the current value of the customer from state
    var withdrawAmount = this.state.WithdrawAmount;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    withdrawAmount = modifiedValue;

    // Update the state object
    this.setState({
      WithdrawAmount: withdrawAmount
    });
  }

  updateRecipientInput(event) {
    // Extract the current value of the customer from state
    var recipient = this.state.Recipient;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    recipient = modifiedValue;

    // Update the state object
    this.setState({
      Recipient: recipient
    });
  }

  updateSendTokenIDInput(event) {
    // Extract the current value of the customer from state
    var sendTokenId = this.state.SendTokenId;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    sendTokenId = modifiedValue;

    // Update the state object
    this.setState({
      SendTokenId: sendTokenId
    });
  }

  updateCheckBalanceStreamIDInput(event) {
    // Extract the current value of the customer from state
    var checkBalanceStreamID = this.state.CheckBalanceStreamID;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    checkBalanceStreamID = modifiedValue;

    // Update the state object
    this.setState({
      CheckBalanceStreamID: checkBalanceStreamID
    });
  }

  async getAllowance() {
    return await this.props.commonStore?.getAllowance(this.props.commonStore?.user);
  }

  async getVesting2Allowance() {
    return await this.props.commonStore?.getVesting2Allowance(this.props.commonStore?.user);
  }
  async getBalance() {
    const balance = await this.props.commonStore!.getWithdrawrableStreamBalance(this.state.CheckBalanceStreamID);
    this.setState({
      withdrawableBalance: balance
    });
  }
  async getBalance2() {
    const balance = await this.props.commonStore!.getWithdrawrableStream2Balance(this.state.CheckBalanceStreamID);
    this.setState({
      withdrawableBalance: balance
    });
  }
  async getVesting2Balance() {
    const balance = await this.props.commonStore!.getWithdrawrableStream2Balance(this.state.CheckBalanceStreamID);
    this.setState({
      withdrawableBalance2: balance
    });
  }

  async handleCreateClick() {
    if (!this.state.DEPOSIT || this.state.DEPOSIT.length <= 0 ||
      !this.state.TOKENADDRESS || this.state.TOKENADDRESS.length <= 0 ||
      !this.state.STARTTIME || this.state.STARTTIME.length <= 0 ||
      !this.state.STOPTIME || this.state.STOPTIME.length <= 0 ||
      !this.state.ERC721ADDRESS || this.state.ERC721ADDRESS.length <= 0 ||
      !this.state.NFTTOTALSUPPLY || this.state.NFTTOTALSUPPLY.length <= 0
    ) {
      alert("DEPOSIT, TOKENADDRESS, STARTTIME, STOPTIME, ERC721ADDRESS, NFTTOTALSUPPLY Can't Be Null");
      return;
    }
    await this.props.commonStore!.createStream(
      this.state.DEPOSIT,
      this.state.TOKENADDRESS,
      this.state.STARTTIME,
      this.state.STOPTIME,
      this.state.ERC721ADDRESS,
      this.state.NFTTOTALSUPPLY
    );
  }
  async handleCreate2Click() {
    if (!this.state.DEPOSIT || this.state.DEPOSIT.length <= 0 ||
      !this.state.TOKENADDRESS || this.state.TOKENADDRESS.length <= 0 ||
      !this.state.STARTTIME || this.state.STARTTIME.length <= 0 ||
      !this.state.STOPTIME || this.state.STOPTIME.length <= 0 ||
      !this.state.ERC721ADDRESS || this.state.ERC721ADDRESS.length <= 0 ||
      !this.state.Shares || this.state.Shares.length <= 0
    ) {
      alert("DEPOSIT, TOKENADDRESS, STARTTIME, STOPTIME, ERC721ADDRESS, Shares Can't Be Null");
      return;
    }
    await this.props.commonStore!.createStream2(
      this.state.DEPOSIT,
      this.state.TOKENADDRESS,
      this.state.STARTTIME,
      this.state.STOPTIME,
      this.state.ERC721ADDRESS,
      this.state.Shares
    );
  }
  selectMenuContent() {
    if (this.props.homeStore!.selectedMenu === "create") {
      return (
        <div className="menu-content">
          <div className="wrap">
            <div className="top">
              <div className="item"><h1>Create Stream1</h1></div>
              <div className="item">
                <label>DEPOSIT</label>
                <input id="" name="" onChange={this.updateDepositInput.bind(this)} placeholder="deposit token amount" type="text" />
              </div>
              <div className="item">
                <label>TOKENADDRESS</label>
                <input id="" name="" onChange={this.updateTokenAddressInput.bind(this)} placeholder="ERC20 Token Address" type="text" />
              </div>
              <div className="item">
                <label>STARTTIME</label>
                <input id="phone-num" name="" onChange={this.updateStartTimeInput.bind(this)} placeholder="Vesting Start Timestamp" type="text" />
              </div>
              <div className="item">
                <label>STOPTIME</label>
                <input id="" name="" onChange={this.updateStopTimeInput.bind(this)} placeholder="Vesting End Timestamp" type="text" />
              </div>
              <div className="item">
                <label>ERC721ADDRESS</label>
                <input id="" name="" onChange={this.updateErc721AddressInput.bind(this)} placeholder="ERC721 Address" type="text" />
              </div>
              <div className="item">
                <label>NFTTOTALSUPPLY</label>
                <input id="" name="" onChange={this.updateNftTotalSupplyInput.bind(this)} placeholder="ERC721 TotalSupply" type="text" />
              </div>
            </div>
            <div style={{
              paddingTop: '20px',
              paddingLeft: '20px',
            }}>
              <div style={{
                float: `left`,
                display: `flex`,
                marginLeft: '20px'
              }}>
                <Button disabled={this.props.commonStore?.approved} onClick={async () => {
                  await this.props.commonStore?.approveToVestingContract();
                }}>Approve</Button>
              </div>
              <div style={{
                float: `right`,
                display: `flex`,
                // marginRight: '20px'
              }}>
                <Button type={`primary`} onClick={async () => {
                  await this.handleCreateClick();
                }}>Create</Button>
              </div>
            </div>
          </div>
        </div >
      )
    } else if (this.props.homeStore!.selectedMenu === "streamInfo") {
      return (
        <div className="menu-content">
          <div className="wrap">
            <div className="top">
              <div className="item"><h1>Get Stream1</h1></div>
              <div className="item">
                <label>sender</label>
                <input id="" disabled name="" value={this.props.commonStore!.stream1Sender} type="text" />
              </div>
              <div className="item">
                <label>deposit</label>
                <input id="" name="" disabled value={this.props.commonStore!.stream1Deposit} type="text" />
              </div>
              <div className="item">
                <label>tokenAddress</label>
                <input id="phone-num" name="" value={this.props.commonStore!.stream1TokenAddress} disabled type="text" />
              </div>
              <div className="item">
                <label>startTime</label>
                <input id="" name="" value={this.props.commonStore!.stream1StartTime} disabled type="text" />
              </div>
              <div className="item">
                <label>stopTime</label>
                <input id="" name="" value={this.props.commonStore!.stream1StopTime} disabled type="text" />
              </div>
              <div className="item">
                <label>remainingBalance</label>
                <input id="" name="" value={this.props.commonStore!.stream1RemainingBalance} disabled type="text" />
              </div>
              <div className="item">
                <label>ratePerSecond</label>
                <input id="" name="" value={this.props.commonStore!.stream1RatePerSecond} disabled type="text" />
              </div>
              <div className="item">
                <label>erc721Address</label>
                <input id="" name="" value={this.props.commonStore!.stream1Erc721Address} disabled type="text" />
              </div>
              <div className="item">
                <label>nftTotalSupply</label>
                <input id="" name="" value={this.props.commonStore!.stream1NftTotalSupply} disabled type="text" />
              </div>
              <div className="item">
                <label>StreamID</label>
                <input type="text" onChange={this.updateCheckBalanceStreamIDInput.bind(this)} name="name" />
                {/* <input id="" name="" value={this.props.commonStore!.stream1NftTotalSupply} disabled type="text" /> */}
              </div>
            </div>
            <div className="button-wrap">
              <Button type={`primary`} onClick={async () => {
                if (!this.state.CheckBalanceStreamID || this.state.CheckBalanceStreamID.length <= 0) {
                  alert("StreamID Can't Be Null");
                  return;
                }
                await this.props.commonStore!.getStream1Info(this.state.CheckBalanceStreamID);
              }}>Get StreamInfo</Button>
            </div>
          </div>
          <div style={{
            display: `flex`,
            flexDirection: `column`,
            marginTop: 100
          }}>
            {/* <ul><li>
              <label>
                sender: {
                  this.props.commonStore!.stream1Sender
                }
              </label>
            </li></ul>
            <ul><li>
              <label>
                deposit: {this.props.commonStore!.stream1Deposit}
              </label>
            </li></ul>
            <ul><li>
              <label>
                tokenAddress: {this.props.commonStore!.stream1TokenAddress}
              </label>
            </li></ul>
            <ul><li>
              <label>
                startTime: {this.props.commonStore!.stream1StartTime}
              </label>
            </li></ul>
            <ul><li>
              <label>
                stopTime: {this.props.commonStore!.stream1StopTime}
              </label>
            </li></ul>
            <ul><li>
              <label>
                remainingBalance: {this.props.commonStore!.stream1RemainingBalance}
              </label>
            </li></ul>
            <ul><li>
              <label>
                ratePerSecond: {this.props.commonStore!.stream1RatePerSecond}
              </label>
            </li></ul>
            <ul><li>
              <label>
                erc721Address: {this.props.commonStore!.stream1Erc721Address}
              </label>
            </li></ul>
            <ul><li>
              <label>
                nftTotalSupply: {this.props.commonStore!.stream1NftTotalSupply}
              </label>
            </li></ul> */}
            {/* <ul><li>
              StreamID: <input type="text" onChange={this.updateCheckBalanceStreamIDInput.bind(this)} name="name" />
            </li></ul> */}

          </div>
        </div>
      )
    } else if (this.props.homeStore!.selectedMenu === "balance") {
      return (
        <div className="menu-content">
          <div className="wrap">
            <div className="top">
              <div className="item"><h1>Stream1 Balance</h1></div>
              <div className="item">
                <label>Test Token Balance</label>
                <input id="" disabled name="" value={this.props.commonStore!.userTestERC20Balance} type="text" />
              </div>
              <div className="item">
                <label>TEST NFT Balance</label>
                <input id="" name="" disabled value={this.props.commonStore!.userTestNFTBalance} type="text" />
              </div>
              <div className="item">
                <label>TokenIDs</label>
                <input id="phone-num" name="" value={this.props.commonStore!.userTestNFTTokenID} disabled type="text" />
              </div>
              <div className="item">
                <label>Vesting Balance</label>
                <input id="" name="" value={this.state.withdrawableBalance} disabled type="text" />
              </div>
              <div className="item">
                <label>StreamID</label>
                <input type="text" onChange={this.updateCheckBalanceStreamIDInput.bind(this)} name="name" />
              </div>
            </div>
            <div style={{
              paddingTop: '20px',
              paddingLeft: '20px',
            }}>
              <div style={{
                float: `left`,
                display: `flex`,
                marginLeft: '20px'
              }}>
                <Button type={`primary`} onClick={async () => {
                  if (!this.state.CheckBalanceStreamID || this.state.CheckBalanceStreamID.length <= 0) {
                    alert("StreamID Can't Be Null");
                    return;
                  }
                  await this.getBalance();
                }}>Check Balance</Button>
              </div>
              <div style={{
                float: `right`,
                display: `flex`,
              }}>
                <Button type={`primary`} onClick={() => {
                  if (!this.state.CheckBalanceStreamID || this.state.CheckBalanceStreamID.length <= 0) {
                    alert("StreamID Can't Be Null");
                    return;
                  }
                  this.props.commonStore!.withdraw(this.state.CheckBalanceStreamID);
                }}>Withdraw</Button>
              </div>
            </div>
            {/* <div className="button-wrap">
              <Button type={`primary`} onClick={async () => {
                if (!this.state.CheckBalanceStreamID || this.state.CheckBalanceStreamID.length <= 0) {
                  alert("StreamID Can't Be Null");
                  return;
                }
                await this.getBalance();
              }}>Check Balance</Button>
            </div> */}
          </div>
          {/* <div style={{
            display: `flex`,
            flexDirection: `column`,
            marginTop: 100,
          }}>
            <ul><li>
              <span>
                Test Token Balance: {
                  this.props.commonStore!.userTestERC20Balance
                }
              </span>
            </li></ul>
            <ul><li>
              <span>
                TEST NFT Balance: {this.props.commonStore!.userTestNFTBalance}
              </span>
            </li></ul>
            <ul><li>
              <span>
                TokenIDs: {this.props.commonStore!.userTestNFTTokenID}
              </span>
            </li></ul>
            <ul><li>  <span>
              Vesting Withdrawrable Balance: {this.state.withdrawableBalance}
            </span></li></ul>
            <ul><li>
              StreamID: <input type="text" onChange={this.updateCheckBalanceStreamIDInput.bind(this)} name="name" />
            </li></ul>
            <Button type={`primary`} onClick={async () => {
              await this.getBalance();
            }}>Check Balance</Button>
          </div> */}
        </div>
      )
    }
    //  else if (this.props.homeStore!.selectedMenu === "withdraw") {
    //   return (
    //     <div className="menu-content">
    //       <div style={{
    //         display: `flex`,
    //         flexDirection: `column`,
    //         marginTop: 100
    //       }}>
    //         <div className="wrap">
    //           <div className="top">
    //             <div className="item"><h1>WithDraw From Stream1</h1></div>
    //             <div className="item">
    //               <label>StreamID</label>
    //               <input id="" name="" onChange={this.updateStreamIdInput.bind(this)} placeholder="StreamID To WithDraw" type="text" />
    //             </div>
    //           </div>
    //           <div className="button-wrap">
    //             <Button type={`primary`} onClick={() => {
    //               if (!this.state.StreamID || this.state.StreamID.length <= 0) {
    //                 alert("StreamID Can't Be Null");
    //                 return;
    //               }
    //               this.props.commonStore!.withdraw(this.state.StreamID);
    //             }}>Withdraw</Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // } 
    else if (this.props.homeStore!.selectedMenu === "senderWithdraw") {
      return (
        <div className="menu-content">
          <div style={{
            display: `flex`,
            flexDirection: `column`,
            marginTop: 100
          }}>
            <div className="wrap">
              <div className="top">
                <div className="item"><h1>Sender WithDraw From Stream1</h1></div>
                <div className="item">
                  <label>StreamID</label>
                  <input id="" name="" onChange={this.updateStreamIdInput.bind(this)} placeholder="StreamID To WithDraw" type="text" />
                </div>
              </div>
              <div className="button-wrap">
                <Button type={`primary`} onClick={() => {
                  if (!this.state.StreamID || this.state.StreamID.length <= 0) {
                    alert("StreamID Can't Be Null");
                    return;
                  }
                  this.props.commonStore!.senderWithdraw(this.state.StreamID);
                }}>Withdraw</Button>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (this.props.homeStore!.selectedMenu === "create2") {
      return (
        <div className="menu-content">
          <div className="wrap">
            <div className="top">
              <div className="item"><h1>Create Stream2</h1></div>

              <div className="item">
                <label>DEPOSIT</label>
                <input id="" name="" onChange={this.updateDepositInput.bind(this)} placeholder="Deposit Token Amount" type="text" />
              </div>
              <div className="item">
                <label>TOKENADDRESS</label>
                <input id="" name="" onChange={this.updateTokenAddressInput.bind(this)} placeholder="ERC20 Token Address" type="text" />
              </div>
              <div className="item">
                <label>STARTTIME</label>
                <input id="phone-num" name="" onChange={this.updateStartTimeInput.bind(this)} placeholder="Vesting Start Timestamp" type="text" />
              </div>
              <div className="item">
                <label>STOPTIME</label>
                <input id="" name="" onChange={this.updateStopTimeInput.bind(this)} placeholder="Vesting End Timestamp" type="text" />
              </div>
              <div className="item">
                <label>ERC721ADDRESS</label>
                <input id="" name="" onChange={this.updateErc721AddressInput.bind(this)} placeholder="ERC721 Address" type="text" />
              </div>
              <div className="item">
                <label>SHARES</label>
                <input id="" name="" onChange={this.updateSharesInput.bind(this)} placeholder="eg [{ 'tokenid': 0, 'share': 1000 }]" type="text" />
              </div>
            </div>
            <div style={{
              paddingTop: '20px',
              paddingLeft: '20px',
            }}>
              <div style={{
                float: `left`,
                display: `flex`,
                marginLeft: '20px'
              }}>
                <Button disabled={this.props.commonStore?.approvedForVesting2} onClick={async () => {
                  await this.props.commonStore?.approveToVesting2Contract();
                }}>Approve</Button>
              </div>
              <div style={{
                float: `right`,
                display: `flex`,
                // marginRight: '20px'
              }}>
                <Button type={`primary`} onClick={async () => {
                  await this.handleCreate2Click();
                }}>Create</Button>
              </div>
            </div>
          </div>
          <div style={{ display: 'none' }}>
            <ul>
              <li>
                <span>
                  DEPOSIT:
                </span>
                <input type="text" onChange={this.updateDepositInput.bind(this)} name="name" />
              </li>
            </ul>
            <ul>
              <li>
                <label>
                  TOKENADDRESS:
                </label>
                <input id="_tokenaddress" type="text" onChange={this.updateTokenAddressInput.bind(this)} name="name" />
              </li>
            </ul>
            <ul>
              <li>
                <label>
                  STARTTIME: <input type="text" onChange={this.updateStartTimeInput.bind(this)} name="name" />
                </label>
              </li>
            </ul>
            <ul>
              <li>
                <label>
                  STOPTIME: <input type="text" onChange={this.updateStopTimeInput.bind(this)} name="name" />
                </label>
              </li>
            </ul>
            <ul>
              <li>
                <label>
                  ERC721ADDRESS:
                  <input type="text" onChange={this.updateErc721AddressInput.bind(this)} name="name" />
                </label>
              </li>
            </ul>
            <ul>
              <li>
                <label>
                  SHARES:
                  <input type="text" onChange={this.updateSharesInput.bind(this)} name="name" />
                </label>
              </li>
            </ul>
            <div style={{
              float: `left`,
              display: `flex`,
              marginLeft: '20px'
            }}>
              <Button disabled={this.props.commonStore?.approvedForVesting2} onClick={async () => {
                await this.props.commonStore?.approveToVesting2Contract();
              }}>Approve</Button>
            </div>
            <div style={{
              float: `right`,
              display: `flex`,
              marginRight: '20px'
            }}>
              <Button type={`primary`} onClick={async () => {
                await this.handleCreate2Click();
              }}>Create</Button>
            </div>
          </div>
        </div>
      )
    } else if (this.props.homeStore!.selectedMenu === "stream2Info") {
      return (
        <div className="menu-content">
          <div className="wrap">
            <div className="top">
              <div className="item"><h1>Get Stream2 Info</h1></div>

              <div className="item">
                <label>sender</label>
                <input id="" disabled name="" value={this.props.commonStore!.stream2Sender} type="text" />
              </div>
              <div className="item">
                <label>deposit</label>
                <input id="" name="" disabled value={this.props.commonStore!.stream2Deposit} type="text" />
              </div>
              <div className="item">
                <label>tokenAddress</label>
                <input id="phone-num" name="" value={this.props.commonStore!.stream2TokenAddress} disabled type="text" />
              </div>
              <div className="item">
                <label>startTime</label>
                <input id="" name="" value={this.props.commonStore!.stream2StartTime} disabled type="text" />
              </div>
              <div className="item">
                <label>stopTime</label>
                <input id="" name="" value={this.props.commonStore!.stream2StopTime} disabled type="text" />
              </div>
              <div className="item">
                <label>remainingBalance</label>
                <input id="" name="" value={this.props.commonStore!.stream2RemainingBalance} disabled type="text" />
              </div>
              <div className="item">
                <label>ratePerSecond</label>
                <input id="" name="" value={this.props.commonStore!.stream2RatePerSecond} disabled type="text" />
              </div>
              <div className="item">
                <label>erc721Address</label>
                <input id="" name="" value={this.props.commonStore!.stream2Erc721Address} disabled type="text" />
              </div>
              {/* <div className="item">
                <label>nftTotalSupply</label>
                <input id="" name="" value={this.props.commonStore!.stream1NftTotalSupply} disabled type="text" />
              </div> */}
              <div className="item">
                <label>StreamID</label>
                <input type="text" onChange={this.updateCheckBalanceStreamIDInput.bind(this)} name="name" />
                {/* <input id="" name="" value={this.props.commonStore!.stream1NftTotalSupply} disabled type="text" /> */}
              </div>
            </div>
            <div className="button-wrap">
              <Button type={`primary`} onClick={async () => {
                if (!this.state.CheckBalanceStreamID || this.state.CheckBalanceStreamID.length <= 0) {
                  alert("StreamID Can't Be Null");
                  return;
                }
                await this.props.commonStore!.getStream2Info(this.state.CheckBalanceStreamID);
              }}>Get StreamInfo</Button>
            </div>
          </div>
        </div>
      )
    } else if (this.props.homeStore!.selectedMenu === "stream2Balance") {
      return (
        <div className="menu-content">
          <div className="wrap">
            <div className="top">
              <div className="item"><h1>Stream2 Balance</h1></div>
              <div className="item">
                <label>Vesting Balance</label>
                <input id="" name="" value={this.state.withdrawableBalance} disabled type="text" />
              </div>
              <div className="item">
                <label>Stream2ID</label>
                <input type="text" onChange={this.updateCheckBalanceStreamIDInput.bind(this)} name="name" />
              </div>
            </div>
            <div style={{
              paddingTop: '20px',
              paddingLeft: '20px',
            }}>
              <div style={{
                float: `left`,
                display: `flex`,
                marginLeft: '20px'
              }}>
                <Button type={`primary`} onClick={async () => {
                  if (!this.state.CheckBalanceStreamID || this.state.CheckBalanceStreamID.length <= 0) {
                    alert("StreamID Can't Be Null");
                    return;
                  }
                  await this.getBalance2();
                }}>Check Balance</Button>
              </div>
              <div style={{
                float: `right`,
                display: `flex`,
              }}>
                <Button type={`primary`} onClick={() => {
                  if (!this.state.CheckBalanceStreamID || this.state.CheckBalanceStreamID.length <= 0) {
                    alert("StreamID Can't Be Null");
                    return;
                  }
                  this.props.commonStore!.withdraw2(this.state.CheckBalanceStreamID);
                }}>Withdraw</Button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    // else if (this.props.homeStore!.selectedMenu === "withdraw2") {
    //   return (
    //     <div className="menu-content">
    //       <div style={{
    //         display: `flex`,
    //         flexDirection: `column`,
    //         marginTop: 100
    //       }}>
    //         <div className="wrap">
    //           <div className="top">
    //             <div className="item"><h1>WithDraw From Stream2</h1></div>
    //             <div className="item">
    //               <label>StreamID</label>
    //               <input id="" name="" onChange={this.updateStreamIdInput.bind(this)} placeholder="StreamID To WithDraw" type="text" />
    //             </div>
    //           </div>
    //           <div className="button-wrap">
    //             <Button type={`primary`} onClick={() => {
    //               if (!this.state.StreamID || this.state.StreamID.length <= 0) {
    //                 alert("StreamID Can't Be Null");
    //                 return;
    //               }
    //               this.props.commonStore!.withdraw2(this.state.StreamID);
    //             }}>Withdraw</Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // } 
    else if (this.props.homeStore!.selectedMenu === "senderWithdraw2") {
      return (
        <div className="menu-content">
          <div style={{
            display: `flex`,
            flexDirection: `column`,
            marginTop: 100
          }}>
            <div className="wrap">
              <div className="top">
                <div className="item"><h1>Sender WithDraw From Stream2</h1></div>
                <div className="item">
                  <label>Stream2ID</label>
                  <input id="" name="" onChange={this.updateStream2IdInput.bind(this)} placeholder="Stream2ID To WithDraw" type="text" />
                </div>
              </div>
              <div className="button-wrap">
                <Button type={`primary`} onClick={() => {
                  if (!this.state.Stream2ID || this.state.Stream2ID.length <= 0) {
                    alert("Stream2ID Can't Be Null");
                    return;
                  }
                  this.props.commonStore!.senderWithdraw2(this.state.Stream2ID);
                }}>Withdraw</Button>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (this.props.homeStore!.selectedMenu === "mint") {
      return (
        <div className="menu-content">
          <div style={{
            display: `flex`,
            flexDirection: `column`,
            marginTop: 100
          }}>
            <Button type={`primary`} onClick={() => {
              this.props.commonStore!.mintTestNFT()
            }}>Mint</Button>
          </div>
        </div>
      )
    } else if (this.props.homeStore!.selectedMenu === "send") {
      return (
        <div className="menu-content">
          <div className="wrap">
            <div className="top">
              <div className="item"><h1>Transfer NFT</h1></div>
              <div className="item">
                <label>Recipient</label>
                <input id="" name="" onChange={this.updateRecipientInput.bind(this)} placeholder="Recipient Address" type="text" />
              </div>
              <div className="item">
                <label>TokenID</label>
                <input id="" name="" onChange={this.updateSendTokenIDInput.bind(this)} placeholder="TokenId To Send" type="text" />
              </div>
            </div>
            <div className="button-wrap">
              <Button type={`primary`} onClick={() => {
                if (!this.state.Recipient || this.state.Recipient.length <= 0
                  || !this.state.SendTokenId || this.state.SendTokenId.length <= 0
                ) {
                  alert("Recipient,SendTokenId Can't Be Null");
                  return;
                }
                this.props.commonStore!.sendTestNFT(this.state.Recipient, this.state.SendTokenId)
              }}>Transfer</Button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="menu-content">nothing</div>
      )
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="content">
          <div className="left-space" style={{
            flex: this.props.homeStore!.isWeb ? 1 : 0
          }}></div>
          <div className="real-content">
            <div style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
            }}>
              <div className="content-header" style={{
                display: this.props.homeStore!.isWeb ? "flex" : "none"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center"
                }}>
                  <Image
                    width={46}
                    src="./logo.png"
                  />
                  <span style={{
                    color: "#009a61",
                    marginLeft: 10,
                    fontSize: 28
                  }}>VESTING DEMO</span>
                </div>
              </div>
              <Layout className="all-menu-content">
                <Sider
                  breakpoint="lg"
                  collapsedWidth="0"
                  onBreakpoint={broken => {
                    console.log(broken);
                  }}
                  onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                  }}
                  theme="light"
                  style={{
                    backgroundColor: "#333",
                    color: "white",
                  }}
                >
                  <div className="logo" />
                  <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.homeStore!.selectedMenu]} style={{
                    backgroundColor: "#333"
                  }} onSelect={(e) => {
                    this.props.homeStore!.setSelectedMemu(e.key as string)
                  }}>
                    <Menu.Item key="create" icon={<ToolOutlined />}>
                      Create Stream1
                    </Menu.Item>
                    <Menu.Item key="streamInfo" icon={<ToolOutlined />}>
                      Get Stream1
                    </Menu.Item>
                    <Menu.Item key="balance" icon={<ToolOutlined />}>
                      Stream1 Balance
                    </Menu.Item>
                    {/* <Menu.Item key="withdraw" icon={<ToolOutlined />}>
                      Withdraw Stream1
                    </Menu.Item> */}
                    <Menu.Item key="senderWithdraw" icon={<ToolOutlined />}>
                      Sender Withdraw Stream1
                    </Menu.Item>
                    <Menu.Item key="create2" icon={<ToolOutlined />}>
                      Create Stream2
                    </Menu.Item>
                    <Menu.Item key="stream2Info" icon={<ToolOutlined />}>
                      Get Stream2
                    </Menu.Item>
                    <Menu.Item key="stream2Balance" icon={<ToolOutlined />}>
                      Stream2 Balance
                    </Menu.Item>
                    {/* <Menu.Item key="withdraw2" icon={<ToolOutlined />}>
                      Withdraw Stream2
                    </Menu.Item> */}
                    <Menu.Item key="senderWithdraw2" icon={<ToolOutlined />}>
                      Sender Withdraw Stream2
                    </Menu.Item>
                    <Menu.Item key="mint" icon={<ToolOutlined />}>
                      Mint TESTNFT
                    </Menu.Item>
                    <Menu.Item key="send" icon={<ToolOutlined />}>
                      Transfer TESTNFT
                    </Menu.Item>
                  </Menu>
                </Sider>
                {this.selectMenuContent()}
              </Layout>
            </div>
          </div>
          <div className="right-space" style={{
            flex: this.props.homeStore!.isWeb ? 1 : 0
          }}></div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
