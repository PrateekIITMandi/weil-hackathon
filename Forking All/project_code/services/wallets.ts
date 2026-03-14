import { WeilWallet } from "@weilliptic/weil-sdk"

const privateKey =
  "0000000000000000000000000000000000000000000000000000000000000000"

export const getWallet = async () => {

  const wallet = new WeilWallet({
    privateKey,
    sentinelEndpoint: "http://localhost:8000",
  })

  return wallet
}