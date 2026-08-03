import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '972aef7b686a9fca412e695ed9c7e719';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'แนะนำ',
      wallets: [metaMaskWallet],
    },
  ],
  {
    appName: 'Web3 FHD Streaming',
    projectId: projectId,
  }
);

export const config = createConfig({
  connectors,
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
  ssr: true,
});