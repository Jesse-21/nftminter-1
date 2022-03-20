import axios from "axios";
const apiKey = process.env.REACT_APP_NAAS_API_KEY; //your api key
const url = "https://api.onec.in/api/v1/naas";

const contract_address = process.env.REACT_APP_NAAS_CONTRACT_ADDRESS; //your contract address
const contract_type = "721"; //your contract type

export const uploadImageToIpfs = async (file) => {
  try {
    console.log("uploading to ipfs", apiKey);
    const res = await axios.post(`${url}/ipfsFile/`, file, {
      headers: {
        "NAAS-APIKEY": apiKey,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const NftMint = async (nftmetadata, address) => {
  var data = {
    metadata_list: [
      {
        public_address: address,
        metadata: nftmetadata,
      },
    ],
    contract_address: contract_address,
    contract_type: contract_type,
  };
  console.log(data);

  if (data.metadata_list[0].public_address == undefined) {
    return "Ethereum Address is required";
  } else {
    try {
      const res = await axios.post(`${url}/mintNFT/`, data, {
        headers: {
          "Content-Type": "application/json",
          "NAAS-APIKEY": apiKey,
        },
      });
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
};

export const NftStatus = async (nft_id) => {
  try {
    if (nft_id == undefined) {
      return "NFT ID is required";
    } else {
      const res = await axios.get(`${url}/checkMintStatus/${nft_id}`, {
        headers: {
          "Content-Type": "application/json",
          "NAAS-APIKEY": apiKey,
        },
      });

      return res.data;
    }
  } catch (e) {
    console.log(e);
  }
};
