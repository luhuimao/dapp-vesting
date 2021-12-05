import React from 'react';
import { inject, observer } from 'mobx-react';
import './home.css'
import {
  Image, Layout, Menu, Button, DatePicker, Space
} from 'antd';
import 'antd/dist/antd.css';
import { ToolOutlined } from '@ant-design/icons';
import HomeStore from '../store/home_store';
import CommonStore from '../store/common_store';

import Footer from '../component/footer';
import Header from '../component/header';
import moment from 'moment';
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
    const { RangePicker } = DatePicker;

    this.state = {
      DEPOSIT: '',
      DEPOSIT2: '',
      TOKENADDRESS: '',
      TOKENADDRESS2: '',
      STARTTIME: '',
      STOPTIME: '',
      STARTTIME2: '',
      STOPTIME2: '',
      ERC721ADDRESS: '',
      ERC721ADDRESS2: '',
      TOKENID: '',
      NFTTOTALSUPPLY: '',
      StreamID: '',
      Stream2ID: '',
      WithdrawAmount: '',
      Recipient: '',
      SendTokenId: '',
      CheckBalanceStreamID: '',
      CheckBalanceStream2ID: '',
      withdrawableBalance: '',
      withdrawableBalance2: '',
      SHARES: ''
    }
    //vesting1 input event
    this.updateDepositInput = this.updateDepositInput.bind(this);
    this.updateTokenAddressInput = this.updateTokenAddressInput.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);

    //vesting2 input event
    this.updateDeposit2Input = this.updateDeposit2Input.bind(this);
    this.updateTokenAddress2Input = this.updateTokenAddress2Input.bind(this);
    this.updateStartTime2Input = this.updateStartTime2Input.bind(this);
    this.updateStopTime2Input = this.updateStopTime2Input.bind(this);
    this.updateErc721Address2Input = this.updateErc721Address2Input.bind(this);
    this.updateCheckBalanceStream2IDInput = this.updateCheckBalanceStream2IDInput.bind(this);

    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onStopTimeChange = this.onStopTimeChange.bind(this);
    this.onStartTimeOk = this.onStartTimeOk.bind(this);
    this.onStopTimeOk = this.onStopTimeOk.bind(this);

    this.onStartTime2Change = this.onStartTime2Change.bind(this);
    this.onStopTime2Change = this.onStopTime2Change.bind(this);
    this.onStartTime2Ok = this.onStartTime2Ok.bind(this);
    this.onStopTime2Ok = this.onStopTime2Ok.bind(this);
  }

  onStartTimeChange(value, dateString) {
    console.log('Selected Time: ', value);
    let d = new Date(value)
    const starttime = parseInt((d.getTime() / 1000).toString());
    console.log(parseInt((d.getTime() / 1000).toString()));
    console.log('Formatted Selected Time: ', dateString);
    this.setState({
      STARTTIME: starttime
    });
  }

  onStopTimeChange(value, dateString) {
    console.log('Selected Time: ', value);
    let d = new Date(value)
    const stoptime = parseInt((d.getTime() / 1000).toString());
    console.log(parseInt((d.getTime() / 1000).toString()));
    // console.log(Math.round(new Date() / 1000));
    console.log('Formatted Selected Time: ', dateString);
    this.setState({
      STOPTIME: stoptime
    });
  }

  onStartTimeOk(value) {
    console.log('onOk: ', value);
    let d = new Date(value)
    const starttime = parseInt((d.getTime() / 1000).toString());
    this.setState({
      STARTTIME: starttime
    });
  }

  onStopTimeOk(value) {
    console.log('onOk: ', value);
    let d = new Date(value)
    const stoptime = parseInt((d.getTime() / 1000).toString());
    this.setState({
      STOPTIME: stoptime
    });
  }

  //vesting1 event handler
  updateTokenAddressInput(event) {
    // Update the state object
    this.setState({
      TOKENADDRESS: event.target.value
    });
  }

  updateDepositInput(event) {
    // Update the state object
    const re = /^-?[0-9]\d*\.?\d*$/;
    // const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.setState({ DEPOSIT: event.target.value })
    }
    // this.setState({
    //   DEPOSIT: event.target.value
    // });
  }

  updateStartTimeInput(event) {
    // Update the state object
    this.setState({
      STARTTIME: event.target.value
    });
  }

  updateStopTimeInput(event) {
    // Update the state object
    this.setState({
      STOPTIME: event.target.value
    });
  }

  updateErc721AddressInput(event) {
    // Update the state object
    this.setState({
      ERC721ADDRESS: event.target.value
    });
  }

  updateNftTotalSupplyInput(event) {
    // Update the state object
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.setState({ NFTTOTALSUPPLY: event.target.value })
    }
    // this.setState({
    //   NFTTOTALSUPPLY: event.target.value
    // });
  }
  //===============================vesting2 event handler begin======================================
  updateDeposit2Input(event) {
    // Update the state object
    // this.setState({
    //   DEPOSIT2: event.target.value
    // });

    const re = /^-?[0-9]\d*\.?\d*$/;
    // const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.setState({
        DEPOSIT2: event.target.value
      })
    }
  }

  updateTokenAddress2Input(event) {
    // Update the state object
    this.setState({
      TOKENADDRESS2: event.target.value
    });
  }

  updateStartTime2Input(event) {
    // Update the state object
    this.setState({
      STARTTIME2: event.target.value
    });
  }

  updateStopTime2Input(event) {
    // Update the state object
    this.setState({
      STOPTIME2: event.target.value
    });
  }

  updateErc721Address2Input(event) {
    // Update the state object
    this.setState({
      ERC721ADDRESS2: event.target.value
    });
  }

  updateSharesInput(event) {
    // Update the state object
    this.setState({
      SHARES: event.target.value
    });
  }

  updateCheckBalanceStream2IDInput(event) {
    this.setState({
      CheckBalanceStream2ID: event.target.value
    });
  }

  onStartTime2Change(value, dateString) {
    console.log('Selected Time: ', value);
    let d = new Date(value)
    const starttime = parseInt((d.getTime() / 1000).toString());
    console.log(parseInt((d.getTime() / 1000).toString()));
    console.log('Formatted Selected Time: ', dateString);
    this.setState({
      STARTTIME2: starttime
    });
  }

  onStopTime2Change(value, dateString) {
    console.log('Selected Time: ', value);
    let d = new Date(value)
    const stoptime = parseInt((d.getTime() / 1000).toString());
    console.log(parseInt((d.getTime() / 1000).toString()));
    // console.log(Math.round(new Date() / 1000));
    console.log('Formatted Selected Time: ', dateString);
    this.setState({
      STOPTIME2: stoptime
    });
  }

  onStartTime2Ok(value) {
    console.log('onOk: ', value);
    let d = new Date(value)
    const starttime = parseInt((d.getTime() / 1000).toString());
    this.setState({
      STARTTIME2: starttime
    });
  }

  onStopTime2Ok(value) {
    console.log('onOk: ', value);
    let d = new Date(value)
    const stoptime = parseInt((d.getTime() / 1000).toString());
    this.setState({
      STOPTIME2: stoptime
    });
  }

  updateStream2IdInput(event) {
    // Update the state object
    this.setState({
      Stream2ID: event.target.value
    });
  }
  //===============================vesting2 event handler end======================================
  updateStreamIdInput(event) {
    // Update the state object
    this.setState({
      StreamID: event.target.value
    });
  }


  updateWithdrawAmount(event) {
    // Update the state object
    this.setState({
      WithdrawAmount: event.target.value
    });
  }

  updateRecipientInput(event) {
    // Update the state object
    this.setState({
      Recipient: event.target.value
    });
  }

  updateSendTokenIDInput(event) {
    // Update the state object
    this.setState({
      SendTokenId: event.target.value
    });
  }

  updateCheckBalanceStreamIDInput(event) {
    // Update the state object
    this.setState({
      CheckBalanceStreamID: event.target.value
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
    const balance = await this.props.commonStore!.getWithdrawrableStream2Balance(this.state.CheckBalanceStream2ID);
    this.setState({
      withdrawableBalance2: balance
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
    if (!this.state.DEPOSIT2 || this.state.DEPOSIT2.length <= 0 ||
      !this.state.TOKENADDRESS2 || this.state.TOKENADDRESS2.length <= 0 ||
      !this.state.STARTTIME2 || this.state.STARTTIME2.length <= 0 ||
      !this.state.STOPTIME2 || this.state.STOPTIME2.length <= 0 ||
      !this.state.ERC721ADDRESS2 || this.state.ERC721ADDRESS2.length <= 0 ||
      !this.state.SHARES || this.state.SHARES.length <= 0
    ) {
      alert("DEPOSIT, TOKENADDRESS, STARTTIME, STOPTIME, ERC721ADDRESS, SHARES Can't Be Null");
      return;
    }
    await this.props.commonStore!.createStream2(
      this.state.DEPOSIT2,
      this.state.TOKENADDRESS2,
      this.state.STARTTIME2,
      this.state.STOPTIME2,
      this.state.ERC721ADDRESS2,
      this.state.SHARES
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
                <input id="" name="" value={this.state.DEPOSIT}
                  onChange={this.updateDepositInput.bind(this)} placeholder="deposit token amount" type="text" />
              </div>
              <div className="item">
                <label>TOKENADDRESS</label>
                <input id="" name="" value={this.state.TOKENADDRESS}
                  onChange={this.updateTokenAddressInput.bind(this)} placeholder="ERC20 Token Address" type="text" />
              </div>
              {/* <div className="item">
                <label>STARTTIME-TIMESTAMP</label>
                <input id="phone-num" name="" disabled value={this.state.STARTTIME} onChange={this.updateStartTimeInput.bind(this)} placeholder="Vesting Start Timestamp" type="text" />
              </div> */}
              {/* <div className="item">
                <label>STOPTIME-TIMESTAMP</label>
                <input id="" name="" disabled value={this.state.STOPTIME} onChange={this.updateStopTimeInput.bind(this)} placeholder="Vesting End Timestamp" type="text" />
              </div> */}
              <div className="item">
                <label>STARTTIME</label>
                <Space direction="vertical" size={12}>
                  <DatePicker showTime onChange={this.onStartTimeChange.bind(this)} onOk={this.onStartTimeOk.bind(this)} />
                </Space>
              </div>
              <div className="item">
                <label>STOPTIME</label>
                <Space direction="vertical" size={12}>
                  <DatePicker showTime onChange={this.onStopTimeChange.bind(this)} onOk={this.onStopTimeOk} />
                </Space>
              </div>
              <div className="item">
                <label>DURATION</label>
                <input id="" name="" disabled value={this.state.STOPTIME - this.state.STARTTIME} placeholder="DURATION" type="text" />
              </div>
              <div className="item">
                <label>ERC721ADDRESS</label>
                <input id="" name="" value={this.state.ERC721ADDRESS}
                  onChange={this.updateErc721AddressInput.bind(this)} placeholder="ERC721 Address" type="text" />
              </div>
              <div className="item">
                <label>NFTTOTALSUPPLY</label>
                <input id="" name="" value={this.state.NFTTOTALSUPPLY}
                  onChange={this.updateNftTotalSupplyInput.bind(this)} placeholder="ERC721 TotalSupply" type="text" />
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
                <input type="text" value={this.state.CheckBalanceStreamID}
                  onChange={this.updateCheckBalanceStreamIDInput.bind(this)} name="name" />
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
        </div>
      )
    } else if (this.props.homeStore!.selectedMenu === "balance") {
      return (
        <div className="menu-content">
          <div className="wrap">
            <div className="top">
              <div className="item"><h1>Stream1 Balance</h1></div>
              <div className="item">
                <label>Stream1 Balance</label>
                <input id="" name="" value={this.state.withdrawableBalance} disabled type="text" />
              </div>
              <div className="item">
                <label>StreamID</label>
                <input type="text" value={this.state.CheckBalanceStreamID}
                  onChange={this.updateCheckBalanceStreamIDInput.bind(this)} name="name" />
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
                <Button type={`primary`} onClick={async () => {
                  if (!this.state.CheckBalanceStreamID || this.state.CheckBalanceStreamID.length <= 0) {
                    alert("StreamID Can't Be Null");
                    return;
                  }
                  await this.props.commonStore!.getStream1Info(this.state.CheckBalanceStreamID);
                  const stoptime = this.props.commonStore!.stream1StopTime;
                  this.props.commonStore!.getCurrentBlockTimeStamp();
                  const currenttime = this.props.commonStore!.currentBlockTime;
                  if (currenttime >= stoptime) {
                    alert("Vesting Finish");
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
    } else if (this.props.homeStore!.selectedMenu === "senderWithdraw") {
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
                  <input id="" name="" value={this.state.StreamID}
                    onChange={this.updateStreamIdInput.bind(this)} placeholder="StreamID To WithDraw" type="text" />
                </div>
              </div>
              <div className="button-wrap">
                <Button type={`primary`} onClick={async () => {
                  if (!this.state.StreamID || this.state.StreamID.length <= 0) {
                    alert("StreamID Can't Be Null");
                    return;
                  }
                  await this.props.commonStore!.getStream1Info(this.state.StreamID);
                  const stoptime = this.props.commonStore!.stream1StopTime;
                  this.props.commonStore!.getCurrentBlockTimeStamp();
                  const cuurenttime = this.props.commonStore!.currentBlockTime;
                  if (cuurenttime < stoptime) {
                    alert("Vesting Not Finish");
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
                <input id="" name="" value={this.state.DEPOSIT2}
                  onChange={this.updateDeposit2Input} placeholder="Deposit Token Amount" type="text" />
              </div>
              <div className="item">
                <label>TOKENADDRESS</label>
                <input id="" name="" value={this.state.TOKENADDRESS2}
                  onChange={this.updateTokenAddress2Input} placeholder="ERC20 Token Address" type="text" />
              </div>
              <div className="item">
                <label>STARTTIME</label>
                <Space direction="vertical" size={12}>
                  <DatePicker showTime onChange={this.onStartTime2Change.bind(this)} onOk={this.onStartTime2Ok.bind(this)} />
                </Space>
              </div>
              <div className="item">
                <label>STOPTIME</label>
                <Space direction="vertical" size={12}>
                  <DatePicker showTime onChange={this.onStopTime2Change.bind(this)} onOk={this.onStopTime2Ok} />
                </Space>
              </div>
              <div className="item">
                <label>ERC721ADDRESS</label>
                <input id="" name="" value={this.state.ERC721ADDRESS2}
                  onChange={this.updateErc721Address2Input.bind(this)} placeholder="ERC721 Address" type="text" />
              </div>
              <div className="item">
                <label>SHARES</label>
                <input id="" name="" value={this.state.SHARES}
                  onChange={this.updateSharesInput.bind(this)} placeholder='eg [{"tokenid":0,"share":10000}]' type="text" />
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
              <div className="item">
                <label>StreamID</label>
                <input type="text" value={this.state.CheckBalanceStream2ID} onChange={this.updateCheckBalanceStream2IDInput} name="name" />
              </div>
            </div>
            <div className="button-wrap">
              <Button type={`primary`} onClick={async () => {
                if (!this.state.CheckBalanceStream2ID || this.state.CheckBalanceStream2ID.length <= 0) {
                  alert("StreamID Can't Be Null");
                  return;
                }
                await this.props.commonStore!.getStream2Info(this.state.CheckBalanceStream2ID);
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
                <label>Stream2 Balance</label>
                <input id="" name="" value={this.state.withdrawableBalance2} disabled type="text" />
              </div>
              <div className="item">
                <label>Stream2ID</label>
                <input type="text" value={this.state.CheckBalanceStream2ID}
                  onChange={this.updateCheckBalanceStream2IDInput.bind(this)} name="name" />
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
                  if (!this.state.CheckBalanceStream2ID || this.state.CheckBalanceStream2ID.length <= 0) {
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
                <Button type={`primary`} onClick={async () => {
                  if (!this.state.CheckBalanceStream2ID || this.state.CheckBalanceStream2ID.length <= 0) {
                    alert("StreamID Can't Be Null");
                    return;
                  }
                  await this.props.commonStore!.getStream2Info(this.state.CheckBalanceStream2ID);
                  const stoptime = this.props.commonStore!.stream2StopTime;
                  this.props.commonStore!.getCurrentBlockTimeStamp();
                  const currenttime = this.props.commonStore!.currentBlockTime;
                  if (currenttime >= stoptime) {
                    alert("Vesting Finish");
                    return;
                  }
                  this.props.commonStore!.withdraw2(this.state.CheckBalanceStream2ID);
                }}>Withdraw</Button>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (this.props.homeStore!.selectedMenu === "senderWithdraw2") {
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
                  <input id="" name="" value={this.state.Stream2ID}
                    onChange={this.updateStream2IdInput.bind(this)} placeholder="Stream2ID To WithDraw" type="text" />
                </div>
              </div>
              <div className="button-wrap">
                <Button type={`primary`} onClick={async () => {
                  if (!this.state.Stream2ID || this.state.Stream2ID.length <= 0) {
                    alert("Stream2ID Can't Be Null");
                    return;
                  }
                  await this.props.commonStore!.getStream2Info(this.state.Stream2ID);
                  const stoptime = this.props.commonStore!.stream2StopTime;
                  this.props.commonStore!.getCurrentBlockTimeStamp();
                  const cuurenttime = this.props.commonStore!.currentBlockTime;
                  if (cuurenttime < stoptime) {
                    alert("Vesting Not Finish");
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
                <input id="" name="" value={this.state.Recipient}
                  onChange={this.updateRecipientInput.bind(this)} placeholder="Recipient Address" type="text" />
              </div>
              <div className="item">
                <label>TokenID</label>
                <input id="" name="" value={this.state.SendTokenId}
                  onChange={this.updateSendTokenIDInput.bind(this)} placeholder="TokenId To Send" type="text" />
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
    } else if (this.props.homeStore!.selectedMenu === "testbalance") {
      return (
        <div className="menu-content">
          <div className="wrap">
            <div className="top">
              <div className="item"><h1>Test Token Balance</h1></div>
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
            </div>
            <div className="button-wrap">
              <Button type={`primary`} onClick={async () => {
                await this.props.commonStore!.refreshTestTokenBalance();
              }}>Refresh</Button>
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
                    width: "300px",
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
                    <Menu.Item key="senderWithdraw2" icon={<ToolOutlined />}>
                      Sender Withdraw Stream2
                    </Menu.Item>
                    <Menu.Item key="mint" icon={<ToolOutlined />}>
                      Mint TESTNFT
                    </Menu.Item>
                    <Menu.Item key="send" icon={<ToolOutlined />}>
                      Transfer TESTNFT
                    </Menu.Item>
                    <Menu.Item key="testbalance" icon={<ToolOutlined />}>
                      Test Token Balance
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
