use serde::{Deserialize, Serialize};
use weil_macros::{constructor, query, smart_contract, WeilType};


trait Arithmetic {
    fn new() -> Result<Self, String>
    where
        Self: Sized;
    async fn add(&self, x: i32, y: i32) -> i32;
    async fn multiply(&self, x: i32, y: i32) -> i32;
    fn tools(&self) -> String;
    fn prompts(&self) -> String;
}

#[derive(Serialize, Deserialize, WeilType)]
pub struct ArithmeticContractState {
    // define your contract state here!
}

#[smart_contract]
impl Arithmetic for ArithmeticContractState {
    #[constructor]
    fn new() -> Result<Self, String>
    where
        Self: Sized,
    {
      Ok(Self {})
    }


    #[query]
    async fn add(&self, x: i32, y: i32) -> i32 {
      x + y
    }

    #[query]
    async fn multiply(&self, x: i32, y: i32) -> i32 {
        x * y
    }


    #[query]
    fn tools(&self) -> String {
        r#"[
  {
    "type": "function",
    "function": {
      "name": "add",
      "description": "adds two numbers\n",
      "parameters": {
        "type": "object",
        "properties": {
          "x": {
            "type": "integer",
            "description": "the first number\n"
          },
          "y": {
            "type": "integer",
            "description": "the number to add with the first one\n"
          }
        },
        "required": [
          "x",
          "y"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "multiply",
      "description": "multiply two numbers\n",
      "parameters": {
        "type": "object",
        "properties": {
          "x": {
            "type": "integer",
            "description": "the first number\n"
          },
          "y": {
            "type": "integer",
            "description": "the number to multiply with the first one\n"
          }
        },
        "required": [
          "x",
          "y"
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