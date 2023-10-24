"use client";
import { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import QRCode from "react-qr-code";
import { Chain, createPublicClient, http, parseAbi } from "viem";
import { mainnet } from "viem/chains";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { CheckBadgeIcon, TicketIcon } from "@heroicons/react/20/solid";

export const neo = {
  id: 2970385,
  name: "NeoEVM",
  network: "neo",
  nativeCurrency: {
    decimals: 18,
    name: "GAS",
    symbol: "GAS",
  },
  rpcUrls: {
    public: { http: ["https://neo-jsonrpc-wrapper.vercel.app/api/rpc"] },
    default: { http: ["https://neo-jsonrpc-wrapper.vercel.app/api/rpc"] },
  },
  blockExplorers: {
    etherscan: { name: "NeoEVMExplorer", url: "https://evm.ngd.network" },
    default: { name: "NeoEVMExplorer", url: "https://evm.ngd.network" },
  },
  contracts: {
    multicall3: {
      address: "0x76C2Bdd0456c73151f20e3D7C937ba53BD1288b5",
      blockCreated: 992350,
    },
  },
} as const satisfies Chain;

const client = createPublicClient({
  chain: neo,
  transport: http("https://neo-jsonrpc-wrapper.vercel.app/api/rpc"),
});

const erc20ABI = [
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: true,
        name: "value",
        type: "uint256",
      },
    ],
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        name: "value",
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address",
      },
      {
        name: "recipient",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
];

export default function PaymentModel(props: any) {
  const { width, height } = useWindowSize();
  const [transfer, setTransfer] = useState(false);
  const unwatch = client.watchContractEvent({
    address: "0xD0d4C08136877F7E25A355900B20100fBF19562A",
    abi: erc20ABI,
    eventName: "Transfer",
    args: { to: "0xc160Efc3af51ebc6fC4c517cA941a6999Ce0beC0" },
    onLogs: (logs) => setTransfer(true),
  });
  const Token = {
    logoURI: "",
    address: "0xD0d4C08136877F7E25A355900B20100fBF19562A",
    name: "USDCoin",
    symbol: "USDC",
    decimals: "6",
  };
  return (
    <Dialog
      open={props.toggle}
      onClose={() => props.close(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/90" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-md rounded bg-white text-black px-6 py-3 flex flex-col gap-4 justify-center items-center">
          {transfer ? (
            <div className="p-6 flex justify-center items-center gap-8 flex-col">
              <Dialog.Title
                className={
                  " text-lg flex justify-center items-center gap-2 font-bold"
                }
              >
                Transaction Completed{" "}
                <CheckBadgeIcon className="w-8 h-8 text-green-600" />
              </Dialog.Title>
              <div className="text-xl">
                Your order is placed successfully 🎉
              </div>
              <Confetti width={width} height={height} />
              <div>
                <p>Thank you for using NeoPay</p>
              </div>
            </div>
          ) : (
            <>
              <Dialog.Title className={"font-medium text-lg"}>
                Complete your order
              </Dialog.Title>
              <div>
                <QRCode
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid white",
                  }}
                  value={JSON.stringify({
                    token: Token,
                    amount: props.total.toString(),
                    receiver: "0xc160Efc3af51ebc6fC4c517cA941a6999Ce0beC0",
                  })}
                />
              </div>
              <div>
                <p>Scan with NeoPay and Pay</p>
              </div>
            </>
          )}

          {/* ... */}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
