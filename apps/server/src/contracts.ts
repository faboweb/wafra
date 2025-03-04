import { ethers } from "ethers";

export const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);

/**
 * USDC Contract interface with required ERC20 and permit functions
 */
export const usdcContract = new ethers.Contract(
  process.env.USDC_CONTRACT!,
  [
    "function approve(address spender, uint256 amount) returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function nonces(address owner) view returns (uint256)",
    "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)",
    "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
    "function version() view returns (string)",
    "function name() view returns (string)",
    "function allowance(address owner, address spender) view returns (uint256)",
  ],
  provider
);

export const fundContract = new ethers.Contract(
  process.env.FUND_CONTRACT!,
  [
    "function balanceOf(address account) view returns (uint256)",
    "function getRedemptionQueue() view returns (tuple(address user, uint256 amount)[])",
    "function depositTo(uint256 amount, address receiverAddress)",
    "function totalValue() view returns (uint256)",
    "function totalSupply() view returns (uint256)",
  ],
  provider
);
export const wfrToken = new ethers.Contract(
  process.env.FUND_TOKEN_ADDRESS!,
  [
    "function balanceOf(address account) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
  ],
  provider
);
