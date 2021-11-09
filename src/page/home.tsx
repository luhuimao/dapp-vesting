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
      TOKENID: ''
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
    console.log(modifiedValue);
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
    console.log(modifiedValue);
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
    console.log(modifiedValue);
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
    console.log(modifiedValue);
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
    console.log(modifiedValue);
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
    console.log(modifiedValue);
    // Update the customer object's first name
    tokenId = modifiedValue;

    // Update the state object
    this.setState({
      TOKENID: tokenId
    });
  }

  async handleCreateClick() {
    console.log(this.state.DEPOSIT);
    console.log(this.state.TOKENADDRESS);
    console.log(this.state.STARTTIME);
    console.log(this.state.STOPTIME);
    console.log(this.state.ERC721ADDRESS);
    console.log(this.state.TOKENID);

    await this.props.commonStore!.createStream(this.state.DEPOSIT,
      this.state.TOKENADDRESS,
      this.state.STARTTIME,
      this.state.STOPTIME,
      this.state.ERC721ADDRESS,
      this.state.TOKENID
    );
  }
  selectMenuContent() {
    if (this.props.homeStore!.selectedMenu === "test1") {
      return (
        <div className="menu-content">
          <div>
            <ul>
              <li>  <label>
                DEPOSIT:
                <input type="text" onChange={this.updateDepositInput.bind(this)} name="name" />
              </label>
              </li>
              <li>   <label>
                TOKENADDRESS:
                <input type="text" onChange={this.updateTokenAddressInput.bind(this)} name="name" />
              </label></li>
              <li>
                <label>
                  STARTTIME: <input type="text" onChange={this.updateStartTimeInput.bind(this)} name="name" />
                </label>
              </li>
              <li>
                <label>
                  STOPTIME: <input type="text" onChange={this.updateStopTimeInput.bind(this)} name="name" />
                </label>
              </li>
              <li>
                <label>
                  ERC721ADDRESS:
                  <input type="text" onChange={this.updateErc721AddressInput.bind(this)} name="name" />
                </label>
              </li>
              <li>
                <label>
                  TOKENID:
                  <input type="text" onChange={this.updateTokenIdInput.bind(this)} name="name" />
                </label>
              </li>
            </ul>
            <Button type={`primary`} onClick={async () => {
              await this.handleCreateClick();
            }}>Create</Button>
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
    } else if (this.props.homeStore!.selectedMenu === "test2") {
      return (
        <div className="menu-content">test2</div>
      )
    } else if (this.props.homeStore!.selectedMenu === "test3") {
      return (
        <div className="menu-content">test3</div>
      )
    } else if (this.props.homeStore!.selectedMenu === "test4") {
      return (
        <div className="menu-content">
          <div style={{
            display: `flex`,
            flexDirection: `column`,
            marginTop: 100
          }}>
            <span>
              TEST NFT Balance: {this.props.commonStore!.userTestNFTBalance}
            </span>
            <Button type={`primary`} onClick={() => {
              this.props.commonStore!.mintTestNFT()
            }}>Mint</Button>
          </div>
        </div>)
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
                    <Menu.Item key="test1" icon={<ToolOutlined />}>
                      Create Stream
                    </Menu.Item>
                    <Menu.Item key="test2" icon={<ToolOutlined />}>
                      Balance
                    </Menu.Item>
                    <Menu.Item key="test3" icon={<ToolOutlined />}>
                      Withdraw
                    </Menu.Item>
                    <Menu.Item key="test4" icon={<ToolOutlined />}>
                      Mint TESTNFT
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
