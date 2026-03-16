use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;

use weil_macros::{constructor, query, smart_contract, WeilType};
use weil_rs::http::{HttpClient, HttpMethod};

trait Xpecto {
    fn new() -> Result<Self, String>
    where
        Self: Sized;

    async fn get_token_price(&self, token_id: String) -> Result<u64, String>;

    fn tools(&self) -> String;
    fn prompts(&self) -> String;
}

#[derive(Serialize, Deserialize, WeilType)]
pub struct XpectoContractState {}

#[smart_contract]
impl Xpecto for XpectoContractState {
    #[constructor]
    fn new() -> Result<Self, String> {
        Ok(XpectoContractState {})
    }

    #[query]
    async fn get_token_price(&self, token_id: String) -> Result<u64, String> {
        if token_id.trim().is_empty() {
            return Err("Token id cannot be empty".to_string());
        }

        // Panora API key
        let api_key =
            "a4^KV_EaTf4MW#ZdvgGKX#HUD^3IFEAOV_kzpIE^3BQGA8pDnrkT7JcIy#HNlLGi";

        let url = format!(
            "https://api.panora.exchange/prices?tokenAddress={}",
            token_id
        );

        let mut headers = HashMap::new();
        headers.insert("x-api-key".to_string(), api_key.to_string());

        let response = HttpClient::request(&url, HttpMethod::Get)
            .headers(headers)
            .send()
            .map_err(|e| format!("HTTP request failed: {}", e))?;

        let body = response.text();

        if body.trim().is_empty() {
            return Err("Empty API response".to_string());
        }

        // Parse JSON
        let json: Value = serde_json::from_str(&body)
            .map_err(|e| format!("JSON parse error: {} | raw body: {}", e, body))?;

        // Expect array
        let arr = json
            .as_array()
            .ok_or_else(|| format!("Unexpected API response format: {}", body))?;

        if arr.is_empty() {
            return Err("Token not found in price API".to_string());
        }

        // Extract usdPrice
        let price_str = arr[0]
            .get("usdPrice")
            .and_then(|v| v.as_str())
            .ok_or("usdPrice field missing")?;

        let price: f64 = price_str
            .parse()
            .map_err(|_| format!("Invalid price format returned by API: {}", price_str))?;

        Ok((price * 100.0) as u64)
    }

    #[query]
    fn tools(&self) -> String {
        r#"[
  {
    "type": "function",
    "function": {
      "name": "get_token_price",
      "description": "Get USD price of an Aptos token using Panora API",
      "parameters": {
        "type": "object",
        "properties": {
          "token_id": {
            "type": "string",
            "description": "Full Aptos token address (example: 0x1::aptos_coin::AptosCoin)"
          }
        },
        "required": ["token_id"]
      }
    }
  }
]"#
        .to_string()
    }

    #[query]
    fn prompts(&self) -> String {
        r#"{
  "prompts": []
}"#
        .to_string()
    }
}