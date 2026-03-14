use serde::{Serialize, Deserialize};
use weil_macros::{constructor, mutate, query, smart_contract, WeilType};

#[derive(Serialize, Deserialize, WeilType)]
pub struct ChatbotState {
    messages: Vec<(String,String)>
}

#[smart_contract]
impl ChatbotState {

    #[constructor]
    fn new() -> Result<Self,String> {
        Ok(ChatbotState { messages: vec![] })
    }

    #[query]
    async fn thread_list(&self) -> Vec<String> {
        vec!["Default Thread".to_string()]
    }

    #[mutate]
    async fn append_response(
        &mut self,
        query_str:String,
        answer:String
    ) {
        self.messages.push((query_str,answer));
    }
}