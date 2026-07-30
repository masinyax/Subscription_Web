import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '972aef7b686a9fca412e695ed9c7e719';

export const config = getDefaultConfig({
  appName: 'Web3 4K Streaming',
  projectId: projectId,
  chains: [sepolia, mainnet],
  ssr: true,
});