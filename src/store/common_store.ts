import { observable } from 'mobx';
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { withGlobalLoading, wrapPromise } from '../util/decorator';
import TimeUtil from '@pefish/js-util-time';
import { StringUtil } from '@pefish/js-node-assist';
import config from '../config';
import { Contract } from "web3-eth-contract"
import Util from '../util/util';
import {
  Modal
} from 'antd';
import { EthWallet } from "@pefish/js-coin-eth";
import { NftShares } from '../util/type';

const walletConnectConfig = {
  rpc: {
    1: config.rpcUrl
  }
}
export default class CommonStore {

  @observable public globalLoading: boolean = false;
  public globalLoadingCount: number = 0 // 控制全局loading的显示时机
  @observable public user: string = ""
  @observable public userBalance: string = "0"
  @observable public rebateRate: string = "0"  // 普通佣金比例。10%，这里就是10
  @observable public vipRebateRate: string = "0"
  @observable public userTestNFTBalance: string = "0"
  @observable public userTestNFTTokenID: string = ""
  @observable public userWithdrawrableBalance: number = 0
  @observable public userTestERC20Balance: string = "0"
  @observable public currentBlockTime: string = "0"
  @observable public approved: boolean = false;
  @observable public approvedForVesting2: boolean = false;

  @observable public allowance: number = 0
  @observable public allowanceOfVesting2: number = 0

  @observable public stream1Sender: string = "0"
  @observable public stream1Deposit: number = 0
  @observable public stream1TokenAddress: string = "0"
  @observable public stream1StartTime: string = "0"
  @observable public stream1StopTime: string = "0"
  @observable public stream1RemainingBalance: string = "0"
  @observable public stream1RatePerSecond: string = "0"
  @observable public stream1Erc721Address: string = "0"
  @observable public stream1NftTotalSupply: string = "0"

  @observable public stream2Sender: string = "0"
  @observable public stream2Deposit: number = 0
  @observable public stream2TokenAddress: string = "0"
  @observable public stream2StartTime: string = "0"
  @observable public stream2StopTime: string = "0"
  @observable public stream2RemainingBalance: string = "0"
  @observable public stream2RatePerSecond: string = "0"
  @observable public stream2Erc721Address: string = "0"

  private web3Provider?: any
  private web3Instance?: Web3
  // private coinToolsContractInstance?: Contract
  private ethWallet: EthWallet = new EthWallet()
  private vesting1ContractInstance?: Contract
  private vesting2ContractInstance?: Contract
  private testNFTContractInstance?: Contract
  private testERC20ContractInstance?: Contract

  // 用作没连接到钱包之前的访问
  private publicProvider = new Web3.providers.HttpProvider(config.rpcUrl)
  private web3PublicInstance: Web3 = new Web3(this.publicProvider)
  // private coinToolsPublicContractInstance?: Contract = new this.web3PublicInstance.eth.Contract(config.coinToolContractAbi, config.coinToolContractAddress);

  private invitorAddress: string = Util.getQueryVariable("invitor")
  private timerStatus: boolean = false
  @observable public vipInfo?: {
    type_: string,
    registerTime: string,
    enable: boolean
  }
  @observable public isVipValid: boolean = false
  public tools?: {
    name: string, // tool的名字
    addr: string,  // tool的合约地址
    reward: string,  // 收费多少eth
    monthVipReward: string,  // 月费价格的收费价格
    enable: boolean  // 是否启用
  }[] = []

  constructor() {
    TimeUtil.setInterval(async () => {
      if (!this.timerStatus) {
        return
      }
      try {
        await this.loop()
      } catch (err) {
        console.error(err)
      }
    }, 3000)

    // 如果metamask安装了则立马连接
    if (typeof window["ethereum"] !== 'undefined') {
      console.log(`window["ethereum"]`, window["ethereum"])
      this.connectMetamask()
    }
  }

  private async connectMetamask() {
    this.web3Provider = window["ethereum"];
    const networkID = await this.web3Provider.request({ method: 'net_version' });
    if (networkID != 4) {
      await this.web3Provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x4' }] });
    }

    this.web3Provider.on('accountsChanged', async (accounts) => {
      console.log("metamask账户变更")
      if (accounts.length === 0) {  // metamask连上的账户全部断开了
        this.afterWalletDisconnectSuccess()
        return
      }
      this.user = accounts[0]
      console.log("获取到用户:", this.user)
      this.web3Instance = new Web3(this.web3Provider as any)
      // this.coinToolsContractInstance = new this.web3Instance!.eth.Contract(config.coinToolContractAbi, config.coinToolContractAddress);
      await this.afterConnectWalletSuccess()
    });
    const accounts = await this.web3Provider.request({ method: 'eth_requestAccounts' });
    this.user = accounts[0]
    console.log("获取到用户:", this.user)
    this.web3Instance = new Web3(this.web3Provider as any)
    // this.coinToolsContractInstance = new this.web3Instance!.eth.Contract(config.coinToolContractAbi, config.coinToolContractAddress);
    this.vesting1ContractInstance = new this.web3Instance!.eth.Contract(
      config.vesting1ContractABI, config.vesting1ContractAddressRINKEBY);
    this.vesting2ContractInstance = new this.web3Instance!.eth.Contract(
      config.vesting2ContractABI, config.vesting2ContractAddressRINKEBY);
    this.testNFTContractInstance = new this.web3Instance!.eth.Contract(
      config.testNFTContractABI,
      config.testNFTContractAddressRINKEBY);
    this.testERC20ContractInstance = new this.web3Instance!.eth.Contract(
      config.testERC20ContractABI,
      config.testERC20ContractAddressRINKEBY);
    await this.afterConnectWalletSuccess()
  }

  private async loop() {

  }

  // 钱包登陆后做什么
  @withGlobalLoading()
  async afterConnectWalletSuccess() {
    console.log("钱包连接成功")
    // 开启定时器
    this.timerStatus = true

    await Promise.all([
      (async () => {
        // 取余额
        console.log("取余额。。。")
        this.userBalance = StringUtil.unShiftedBy_(await Util.timeoutWrapperCall(async () => {
          return await this.web3Instance!.eth.getBalance(this.user)
        }), 18)
      })(),
      (async () => {
        // 取余额
        console.log("取Test Token余额。。。")
        this.userTestERC20Balance = await Util.timeoutWrapperCall(async () => {
          return await this.testERC20ContractInstance!.methods.balanceOf(this.user).call({ from: this.user, })
        })
      })(),
      (async () => {
        // 取余额
        console.log("取NFT余额。。。")
        this.userTestNFTBalance = await Util.timeoutWrapperCall(async () => {
          return await this.testNFTContractInstance!.methods.balanceOf(this.user).call({ from: this.user, })
        });
      })(),
      (async () => {
        // 取余额
        console.log("取NFT TokenID。。。")
        this.userTestNFTTokenID = await Util.timeoutWrapperCall(async () => {
          return await this.getUserTokenIds();
        });
      })(),
      (async () => {
        // 取余额
        console.log("取Stream余额。。。")
        // this.userWithdrawrableBalance = await Util.timeoutWrapperCall(async () => {
        //   return await this.getWithdrawrableStreamBalance(100001);
        // });
      })(),
      (async () => {
        // 取block timestamp
        console.log("取block timestamp。。。")
        this.currentBlockTime = await Util.timeoutWrapperCall(async () => {
          return (await this.web3Instance!.eth.getBlock("latest")).timestamp;

        });
      })(),
      (async () => {
        // 取allowance
        console.log("取allowance。。。")
        this.allowance = await Util.timeoutWrapperCall(async () => {
          return (await this.getAllowance(this.user));
        });
        this.approved = this.allowance > 0 ? true : false;
      })(),
      (async () => {
        // 取vesting2allowance
        console.log("取vesting2allowance。。。")
        this.allowanceOfVesting2 = await Util.timeoutWrapperCall(async () => {
          return (await this.getVesting2Allowance(this.user));
        });
        console.log("allowance:", this.allowanceOfVesting2.toString());
        this.approvedForVesting2 = this.allowanceOfVesting2 > 0 ? true : false;
      })(),
      // (async () => {
      //   // 查询会员是否可用
      //   console.log("查询会员是否可用。。。")
      //   this.isVipValid = await Util.timeoutWrapperCall(async () => {
      //     return await this.coinToolsContractInstance!.methods.isVipValid(this.user).call({
      //       from: this.user,
      //     })
      //   })
      // })(),
      // (async () => {
      //   // 查询佣金比例
      //   console.log("查询佣金比例。。。")
      //   const rebateRate_ = await Util.timeoutWrapperCall(async () => {
      //     return await this.coinToolsContractInstance!.methods.nomarlRebateRate().call({
      //       from: this.user,
      //     })
      //   })
      //   this.rebateRate = StringUtil.div_(rebateRate_.toString(), 100)

      // })(),
      // (async () => {
      //   console.log("查询会员佣金比例。。。")
      //   const vipRebateRate_ = await Util.timeoutWrapperCall(async () => {
      //     return await this.coinToolsContractInstance!.methods.monthVipRebateRate().call({
      //       from: this.user,
      //     })
      //   })
      //   this.vipRebateRate = StringUtil.div_(vipRebateRate_.toString(), 100)
      // })(),
      // (async () => {
      //   // 查询会员信息
      //   console.log("请求会员信息。。。")
      //   this.vipInfo = await Util.timeoutWrapperCall(async () => {
      //     return await this.coinToolsContractInstance!.methods.vips(this.user).call({
      //       from: this.user,
      //     })
      //   })
      // })(),
    ])
  }

  // 授权方主动断开后做什么
  afterWalletDisconnectSuccess(type: string = "metamask") {
    if (type === "wallet_connect") {
      this.web3Provider?.disconnect()  // 断开session
    }
    this.user = ""
    this.timerStatus = false
  }

  @withGlobalLoading()
  async becomeVip() {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }
    if (this.isVipValid) {
      Modal.info({
        content: "您已经是尊贵会员。"
      })
      return
    }
    // const requiredFee = await Util.timeoutWrapperCall(async () => {
    //   return await this.coinToolsContractInstance?.methods.getRequiredFee(0).call({
    //     from: this.user,
    //   })
    // })
    // console.log(`要求收取费用：${StringUtil.unShiftedBy_(requiredFee, 18)}`)
    try {
      // const result = await this.coinToolsContractInstance?.methods.toolEntry(0, this.ethWallet.zeroAddress(), `0x${this.ethWallet.encodeParamsHex(["address"], [this.user])}`).send({
      //   from: this.user,
      //   value: requiredFee,
      // })  // 直到确认了才会返回
      // console.log("result", result)
      Modal.success({
        content: "欢迎加入会员大家庭！！！"
      })
    } catch (err) {
      console.log(err)
    }
  }

  @withGlobalLoading()
  @wrapPromise()
  async initForHomePage() {
    console.log("进入主页需要加载")
    // 进入主页需要加载的东西

    // 获取所有工具
    // this.tools = await this.coinToolsPublicContractInstance!.methods.getTools(0, 0).call()
    // console.log("tools", this.tools)
  }

  async getCurrentBlockTimeStamp() {
    this.currentBlockTime = await Util.timeoutWrapperCall(async () => {
      return (await this.web3Instance!.eth.getBlock("latest")).timestamp;
    });
  }

  async createStream(
    depositAmount: any,
    tokenAddr: string,
    streamStartTime: any,
    streamStopTime: any,
    erc721Addr: string,
    nftTotalSupply: any) {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }
    if (depositAmount <= 0) {
      Modal.error({
        content: "depositAmount must greater than 0!"
      })
      return
    }
    if (streamStartTime < (await this.web3Instance!.eth.getBlock("latest")).timestamp) {
      Modal.error({
        content: "streamStartTime must greater than current block timestamp!"
      })
      return
    }
    if (streamStartTime > streamStopTime) {
      Modal.error({
        content: "streamStopTime must greater than streamStartTime!"
      })
      return
    }
    const streamDuration = streamStopTime - streamStartTime;
    if (depositAmount < streamDuration) {
      Modal.error({
        content: "depositAmount smaller than time streamDuration!"
      })
      return
    }
    if (depositAmount % streamDuration != 0) {
      Modal.error({
        content: "depositAmount not multiple of time delta!"
      })
      return
    }
    if (!this.approved) {
      Modal.error({
        content: "approve first!"
      })
      return
    }
    try {
      const result = await this.vesting1ContractInstance?.methods.createStream(
        depositAmount,
        tokenAddr,
        streamStartTime,
        streamStopTime,
        erc721Addr,
        nftTotalSupply
      ).send({
        from: this.user,
      })  // 直到确认了才会返回
      if (!result.gasPrice) {
        // let rel1 = result.wait(1);
        // console.log(`stream create result: ${result}`);
      } else {
        // console.log("result", result)
      }

      let latest_block = await this.web3Instance!.eth.getBlockNumber();
      let historical_block = latest_block - 100;
      const data_events = await this.vesting1ContractInstance?.getPastEvents(
        'CreateStream', // change if your looking for a different event
        { fromBlock: historical_block, toBlock: 'latest' }
      );
      let streamid: number = 0;
      if (data_events) {
        for (var i = 0; i < data_events.length; i++) {
          streamid = data_events[i]['returnValues']['streamId'];
          console.log(`streamid: ${streamid.toString()}`);
        }
      }

      Modal.success({
        content: "stream created！！！ streamID: " + streamid.toString()
      })
    } catch (err) {
      console.log(err)
    }
  }
  async createStream2(
    depositAmount: any,
    tokenAddr: string,
    streamStartTime: any,
    streamStopTime: any,
    erc721Addr: string,
    shares: any) {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }
    if (depositAmount <= 0) {
      Modal.error({
        content: "depositAmount must greater than 0!"
      })
      return
    }
    if (streamStartTime < (await this.web3Instance!.eth.getBlock("latest")).timestamp) {
      Modal.error({
        content: "streamStartTime must greater than current block timestamp!"
      })
      return
    }
    if (streamStartTime > streamStopTime) {
      Modal.error({
        content: "streamStopTime must greater than streamStartTime!"
      })
      return
    }
    const streamDuration = streamStopTime - streamStartTime;
    if (depositAmount < streamDuration) {
      Modal.error({
        content: "depositAmount smaller than time streamDuration!"
      })
      return
    }
    // if (depositAmount % streamDuration != 0) {
    //   Modal.error({
    //     content: "depositAmount not multiple of time delta!"
    //   })
    //   return
    // }
    if (!this.approvedForVesting2) {
      Modal.error({
        content: "approve first!"
      })
      return
    }
    try {
      const obj = JSON.parse(shares);
      let nftshares: number[] = [];
      let tokenIds: number[] = [];

      for (var i = 0; i < obj.length; i++) {
        let tokenid = obj[i].tokenid;
        let share = obj[i].share;
        nftshares.push(share);
        tokenIds.push(tokenid);
      }
      console.log(`depositAmount ${depositAmount}`);
      console.log(`tokenAddr ${tokenAddr}`);
      console.log(`streamStartTime ${streamStartTime}`);
      console.log(`streamStopTime ${streamStopTime}`);
      console.log(`erc721Addr ${erc721Addr}`);
      console.log(`nftshares ${nftshares}`);
      console.log(`tokenIds ${tokenIds}`);

      const result = await this.vesting2ContractInstance?.methods.createStream21(
        depositAmount,
        tokenAddr,
        streamStartTime,
        streamStopTime,
        erc721Addr,
        tokenIds,
        nftshares
      ).send({
        from: this.user,
      })  // 直到确认了才会返回
      if (!result.gasPrice) {
        // let rel1 = result.wait(1);
        // console.log(`stream create result: ${result}`);
      } else {
        // console.log("result", result)
      }

      let latest_block = await this.web3Instance!.eth.getBlockNumber();
      let historical_block = latest_block - 100;
      const data_events = await this.vesting2ContractInstance?.getPastEvents(
        'CreateStream2', // change if your looking for a different event
        { fromBlock: historical_block, toBlock: 'latest' }
      );
      let stream2id: number = 0;
      if (data_events) {
        for (var i = 0; i < data_events.length; i++) {
          console.log("returnValues:", data_events[i]['returnValues']);
          stream2id = data_events[i]['returnValues']['streamId'];
          console.log(`stream2id: ${stream2id.toString()}`);
        }
      }

      Modal.success({
        content: "stream2 created！！！ stream2ID: " + stream2id.toString()
      })
    } catch (err) {
      console.log(err)
    }
  }
  async withdraw(streamID: number) {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }
    const balance = await this.getWithdrawrableStreamBalance(streamID);
    if (balance <= 0) {
      Modal.error({
        content: "Error: balance is zero！！！"
      })
      return
    }
    // if (amount >= balance) {
    //   Modal.error({
    //     content: "amount exceeds the available balance！！！"
    //   })
    //   return
    // }
    try {
      const rel = await this.vesting1ContractInstance?.methods.withdrawFromStream(streamID).send({ from: this.user });
      Modal.success({
        content: "withdraw succeed！！！"
      })
    } catch (err) {
      console.log(err)
    }
  }

  async withdraw2(streamID: number) {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }
    const balance = await this.getWithdrawrableStream2Balance(streamID);
    if (balance <= 0) {
      Modal.error({
        content: "Error: balance is zero！！！"
      })
      return
    }
    try {
      const rel = await this.vesting2ContractInstance?.methods.withdrawFromStream2(streamID).send({ from: this.user });
      Modal.success({
        content: "withdraw succeed！！！"
      })
    } catch (err) {
      console.log(err)
    }
  }

  async senderWithdraw(streamID: number) {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }
    const balance = await this.getSenderWithdrawrableStream1Balance(streamID);
    if (balance <= 0) {
      Modal.error({
        content: "Error: sender balance is zero！！！"
      })
      return
    }
    // if (amount >= balance) {
    //   Modal.error({
    //     content: "amount exceeds the available balance！！！"
    //   })
    //   return
    // }
    try {
      const rel = await this.vesting1ContractInstance?.methods.senderWithdrawFromStream(streamID).send({ from: this.user });
      Modal.success({
        content: "sender withdraw succeed！！！"
      })
    } catch (err) {
      console.log(err)
    }
  }

  async senderWithdraw2(stream2ID: number) {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }
    const balance = await this.getSenderWithdrawrableStream2Balance(stream2ID);
    if (balance <= 0) {
      Modal.error({
        content: "Error: sender balance is zero！！！"
      })
      return
    }
    try {
      const rel = await this.vesting2ContractInstance?.methods.senderWithdrawFromStream2(stream2ID).send({ from: this.user });
      Modal.success({
        content: "sender withdraw succeed！！！"
      })
    } catch (err) {
      console.log(err)
    }
  }

  async getStream1Info(streamID: number) {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }
    const balance = await this.getWithdrawrableStreamBalance(streamID);

    try {
      const rel = await this.vesting1ContractInstance?.methods.getStream(streamID).call({ from: this.user });
      this.stream1Sender = rel.sender;
      this.stream1Deposit = rel.deposit;
      this.stream1TokenAddress = rel.tokenAddress;
      // this.stream1StartTime = rel.startTime;
      // // Hours part from the timestamp
      // var hours = date.getHours();
      // // Minutes part from the timestamp
      // var minutes = "0" + date.getMinutes();
      // // Seconds part from the timestamp
      // var seconds = "0" + date.getSeconds();
      // // Will display time in 10:30:23 format
      // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      const startdate = new Date(rel.startTime * 1000);
      const stopdate = new Date(rel.stopTime * 1000);
      this.stream1StartTime = startdate.toLocaleDateString("en-US") + startdate.toLocaleTimeString("en-US");
      this.stream1StopTime = stopdate.toLocaleDateString("en-US") + stopdate.toLocaleTimeString("en-US");
      this.stream1RemainingBalance = rel.remainingBalance;
      this.stream1RatePerSecond = rel.ratePerSecond;
      this.stream1Erc721Address = rel.erc721Address;
      this.stream1NftTotalSupply = rel.nftTotalSupply;
      // Modal.success({
      //   content: "get Stream1Info succeed！！！"
      // })
    } catch (err) {
      console.log(err)
    }
  }

  async getStream2Info(streamID: number) {
    // if (!this.user) {
    //   Modal.error({
    //     content: "请先连接钱包！！！"
    //   })
    //   return
    // }
    const balance = await this.getWithdrawrableStream2Balance(streamID);

    try {
      const rel = await this.vesting2ContractInstance?.methods.getStream2(streamID).call({ from: this.user });
      this.stream2Sender = rel.sender;
      this.stream2Deposit = rel.deposit;
      this.stream2TokenAddress = rel.tokenAddress;
      const startdate = new Date(rel.startTime * 1000);
      const stopdate = new Date(rel.stopTime * 1000);
      this.stream2StartTime = startdate.toLocaleDateString("en-US") + startdate.toLocaleTimeString("en-US");
      this.stream2StopTime = stopdate.toLocaleDateString("en-US") + stopdate.toLocaleTimeString("en-US");
      // this.stream2StartTime = rel.startTime;
      // this.stream2StopTime = rel.stopTime;
      this.stream2RemainingBalance = rel.remainingBalance;
      this.stream2RatePerSecond = rel.ratePerSecond;
      this.stream2Erc721Address = rel.erc721Address;
      // Modal.success({
      //   content: "get Stream2Info succeed！！！"
      // })
    } catch (err) {
      console.log(err)
    }
  }
  async approveToVestingContract() {
    try {
      await this.testERC20ContractInstance?.methods.approve(config.vesting1ContractAddressRINKEBY, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').send({ from: this.user });
      this.approved = true;
      Modal.success({
        content: "approved！！！"
      })
    } catch (err) {
      console.log(err)
    }

  }

  async approveToVesting2Contract() {
    try {
      await this.testERC20ContractInstance?.methods.approve(config.vesting2ContractAddressRINKEBY, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').send({ from: this.user });
      this.approvedForVesting2 = true;
      Modal.success({
        content: "approved！！！"
      })
    } catch (err) {
      console.log(err)
    }

  }


  async getAllowance(owner: string) {
    return await this.testERC20ContractInstance?.methods.allowance(owner, config.vesting1ContractAddressRINKEBY).call({ from: this.user });
  }

  async getVesting2Allowance(owner: string) {
    return await this.testERC20ContractInstance?.methods.allowance(owner, config.vesting2ContractAddressRINKEBY).call({ from: this.user });
  }

  async getTestNFTBalance() {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }
    return await this.testNFTContractInstance!.methods.balanceOf(this.user).call({ from: this.user, })
  }


  async getUserTokenIds() {
    const balance = await this.testNFTContractInstance!.methods.balanceOf(this.user).
      call({
        from: this.user,
      });
    console.log(`NFT Balance: ${balance.toString()}`);
    let ids: string = "[";
    try {
      for (var i = 0; i < parseInt(balance); i++) {
        let tokenid = await this.testNFTContractInstance!.methods.tokenOfOwnerByIndex(this.user, i).call({
          from: this.user,
        });
        console.log(`toenid: ${tokenid}`);
        ids += tokenid + ",";
      }
      ids += "]";
      console.log(ids);
      return ids;
    } catch (err) { console.log(`err:${err}`) }
  }

  async mintTestNFT() {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }

    try {
      const result = await this.testNFTContractInstance?.methods.mint(
        1
      ).send({
        from: this.user,
      })  // 直到确认了才会返回
      console.log("result", result)
      Modal.success({
        content: "Minted！！！"
      })
    } catch (err) {
      console.log(err)
    }
  }

  async sendTestNFT(recipient: string, tokenid: number) {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }

    try {
      const result = await this.testNFTContractInstance?.methods.transferFrom(
        this.user,
        recipient,
        tokenid
      ).send({
        from: this.user,
      })  // 直到确认了才会返回
      console.log("result", result)
      Modal.success({
        content: "Send Succeed！！！"
      })
    } catch (err) {
      console.log(err)
    }
  }

  async getWithdrawrableStreamBalance(streamID: number) {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }
    return await this.vesting1ContractInstance?.methods.balanceOf(streamID, this.user).call({
      from: this.user,
    })
  }

  async getSenderWithdrawrableStream1Balance(streamID: number) {
    // if (!this.user) {
    //   Modal.error({
    //     content: "请先连接钱包！！！"
    //   })
    //   return
    // }
    return await this.vesting1ContractInstance?.methods.balanceOfSender(streamID).call({
      from: this.user,
    })
  }

  async getWithdrawrableStream2Balance(stream2ID: number) {
    if (!this.user) {
      Modal.error({
        content: "请先连接钱包！！！"
      })
      return
    }
    return await this.vesting2ContractInstance?.methods.balanceOf2(stream2ID, this.user).call({
      from: this.user,
    })
  }

  async getSenderWithdrawrableStream2Balance(stream2ID: number) {
    return await this.vesting2ContractInstance?.methods.balanceOfSender2(stream2ID).call({
      from: this.user,
    })
  }

  @withGlobalLoading()
  @wrapPromise()
  async walletConnect() {
    if (typeof window["ethereum"] !== 'undefined') {
      await this.connectMetamask()
    } else {
      try {
        console.log("准备连接wallet connect")
        this.web3Provider = new WalletConnectProvider(walletConnectConfig)  // 会立马启动一个ws
        // Subscribe to accounts change
        this.web3Provider.once("accountsChanged", (accounts: string[]) => {
          console.log("accountsChanged", accounts);
        });

        // Subscribe to chainId change
        this.web3Provider.once("chainChanged", (chainId: number) => {
          console.log("chainChanged", chainId);
        });

        // Subscribe to networkId change
        this.web3Provider.once("networkChanged", (networkId: number) => {
          console.log("networkChanged", networkId);
        });

        // Subscribe to session connection/open
        this.web3Provider.once("open", () => {
          console.log("open");
        });

        // Subscribe to session disconnection/close
        this.web3Provider.once("close", (code: number, reason: string) => {
          console.log("close", code, reason)
          if (code === 1000) {  // 用户断开连接
            this.afterWalletDisconnectSuccess("wallet_connect")
          }
        });
        const result: string[] = (await this.web3Provider!.enable()) as string[]
        console.log("wallet connect连接成功")
        this.user = result[0]
        this.web3Instance = new Web3(this.web3Provider as any)
        // this.coinToolsContractInstance = new this.web3Instance!.eth.Contract(config.coinToolContractAbi, config.coinToolContractAddress);
        console.log("获取到用户:", this.user)
        await this.afterConnectWalletSuccess()
      } catch (err) {  // 用户关掉二维码窗口就会异常
        console.log(err)
      }
    }


  }
}