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
      StreamID: '',
      WithdrawAmount: '',
      Recipient: '',
      SendTokenId: '',
      CheckBalanceStreamID: '',
      withdrawableBalance: ''
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

  updateTokenIdInput(event) {
    // Extract the current value of the customer from state
    var tokenId = this.state.TOKENID;

    // Extract the value of the input element represented by `target`
    var modifiedValue = event.target.value;
    // Update the customer object's first name
    tokenId = modifiedValue;

    // Update the state object
    this.setState({
      TOKENID: tokenId
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
  async getBalance() {
    const balance = await this.props.commonStore!.getWithdrawrableStreamBalance(this.state.CheckBalanceStreamID);
    this.setState({
      withdrawableBalance: balance
    });
  }

  async handleCreateClick() {
    await this.props.commonStore!.createStream(
      this.state.DEPOSIT,
      this.state.TOKENADDRESS,
      this.state.STARTTIME,
      this.state.STOPTIME,
      this.state.ERC721ADDRESS,
      this.state.TOKENID
    );
  }
  selectMenuContent() {
    if (this.props.homeStore!.selectedMenu === "create") {
      return (
        <div className="menu-content">
          <div>
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
                  TOKENID:
                  <input type="text" onChange={this.updateTokenIdInput.bind(this)} name="name" />
                </label>
              </li>
            </ul>
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
              marginRight: '20px'
            }}>
              <Button type={`primary`} onClick={async () => {
                await this.handleCreateClick();
              }}>Create</Button>
            </div>

          </div>
          {/* <div style={{
            display: `flex`,
            flexDirection: `column`,
            marginTop: 100
          }}> */}
          {/* <span>
              {this.props.homeStore!.counter}
            </span>
            <Button type={`primary`} onClick={() => {
              this.props.homeStore!.add()
            }}>加计数</Button> */}
          {/* </div> */}
        </div>
      )
    } else if (this.props.homeStore!.selectedMenu === "balance") {
      return (
        <div className="menu-content">
          <div style={{
            display: `flex`,
            flexDirection: `column`,
            marginTop: 100
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
            <ul><li>
              StreamID: <input type="text" onChange={this.updateCheckBalanceStreamIDInput.bind(this)} name="name" />
              <span>
                Vesting Withdrawrable Balance: {this.state.withdrawableBalance}
              </span>
            </li></ul>
            <Button type={`primary`} onClick={async () => {
              await this.getBalance();
            }}>Check Balance</Button>
          </div>
        </div>
      )
    } else if (this.props.homeStore!.selectedMenu === "withdraw") {
      return (
        <div className="menu-content">
          <div style={{
            display: `flex`,
            flexDirection: `column`,
            marginTop: 100
          }}>
            <div className="">
              <div>
                <ul>
                  <li>
                    <span>StreamID</span>
                    <input type="text" onChange={this.updateStreamIdInput.bind(this)} name="name" />
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Amount</span>
                    <input type="text" onChange={this.updateWithdrawAmount.bind(this)} name="name" />
                  </li>
                </ul>
              </div>
            </div>
            <Button type={`primary`} onClick={() => {
              this.props.commonStore!.withdraw(this.state.StreamID, this.state.WithdrawAmount);
            }}>Withdraw</Button>
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
          <div style={{
            display: `flex`,
            flexDirection: `column`,
            marginTop: 100
          }}>
            <div className="">
              <div>
                <ul>
                  <li>
                    <span>Recipient</span>
                    <input type="text" onChange={this.updateRecipientInput.bind(this)} name="name" />
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>TokenID</span>
                    <input type="text" onChange={this.updateSendTokenIDInput.bind(this)} name="name" />
                  </li>
                </ul>
              </div>
            </div>
            <Button type={`primary`} onClick={() => {
              this.props.commonStore!.sendTestNFT(this.state.Recipient, this.state.SendTokenId)
            }}>Send</Button>
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
                      Create Stream
                    </Menu.Item>
                    <Menu.Item key="balance" icon={<ToolOutlined />}>
                      Balance
                    </Menu.Item>
                    <Menu.Item key="withdraw" icon={<ToolOutlined />}>
                      Withdraw
                    </Menu.Item>
                    <Menu.Item key="mint" icon={<ToolOutlined />}>
                      Mint TESTNFT
                    </Menu.Item>
                    <Menu.Item key="send" icon={<ToolOutlined />}>
                      Send TESTNFT
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
