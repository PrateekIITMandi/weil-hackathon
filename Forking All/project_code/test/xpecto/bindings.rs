
use serde::{Deserialize, Serialize};
use weil_macros::{constructor, mutate, query, secured, smart_contract, WeilType};
use weil_rs::collections::{streaming::ByteStream, plottable::Plottable, WeilIdGenerator};
use weil_rs::config::Secrets;
use weil_rs::webserver::WebServer;



trait Xpecto {
    fn new() -> Result<Self, String>
    where
        Self: Sized;
    async fn get_token_price(&self, token_id: String) -> Result<u64, String>;
    fn tools(&self) -> String;
    fn prompts(&self) -> String;
}

#[derive(Serialize, Deserialize, WeilType)]
pub struct XpectoContractState {
    // define your contract state here!
}

#[smart_contract]
impl Xpecto for XpectoContractState {
    #[constructor]
    fn new() -> Result<Self, String>
    where
        Self: Sized,
    {
        unimplemented!();
    }


    #[query]
    async fn get_token_price(&self, token_id: String) -> Result<u64, String> {
        unimplemented!();
    }


    #[query]
    fn tools(&self) -> String {
        r#"[
  {
    "type": "function",
    "function": {
      "name": "get_token_price",
      "description": "",
      "parameters": {
        "type": "object",
        "properties": {
          "token_id": {
            "type": "string",
            "description": ""
          }
        },
        "required": [
          "token_id"
        ]
      }
    }
  }
]"#.to_string()
    }


    #[query]
    fn prompts(&self) -> String {
        r#"{
  "prompts": []
}"#.to_string()
    }
}

