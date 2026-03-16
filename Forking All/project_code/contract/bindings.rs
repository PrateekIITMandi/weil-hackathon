
use serde::{Deserialize, Serialize};
use weil_macros::{constructor, mutate, query, secured, smart_contract, WeilType};
use weil_rs::collections::{streaming::ByteStream, plottable::Plottable, WeilIdGenerator};
use weil_rs::config::Secrets;
use weil_rs::webserver::WebServer;



#[derive(Debug, Serialize, Deserialize, WeilType, Default)]
pub struct AlphaVantageConfig {
    pub api_key_1: String,
    pub api_key_2: String,
    pub api_key_3: String,
    pub api_key_4: String,
    pub api_key_5: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct StockDataPoint {
    pub timestamp: String,
    pub open: String,
    pub high: String,
    pub low: String,
    pub close: String,
    pub volume: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TimeSeriesData {
    pub symbol: String,
    pub interval: String,
    pub data_points: Vec<StockDataPoint>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct QuoteData {
    pub symbol: String,
    pub price: String,
    pub change: String,
    pub change_percent: String,
    pub volume: String,
    pub latest_trading_day: String,
}

trait Stocks {
    fn new() -> Result<Self, String>
    where
        Self: Sized;
    async fn get_intraday_data_range(&self, symbol: String, interval: String, from_timestamp: String, to_timestamp: String) -> Result<Plottable, String>;
    async fn get_intraday_data_recent(&self, symbol: String, interval: String, seconds_back: String) -> Result<Plottable, String>;
    async fn get_daily_data_range(&self, symbol: String, from_timestamp: String, to_timestamp: String) -> Result<Plottable, String>;
    async fn get_daily_data_recent(&self, symbol: String, seconds_back: String) -> Result<Plottable, String>;
    async fn get_weekly_data_range(&self, symbol: String, from_timestamp: String, to_timestamp: String) -> Result<Plottable, String>;
    async fn get_weekly_data_recent(&self, symbol: String, seconds_back: String) -> Result<Plottable, String>;
    async fn get_monthly_data_range(&self, symbol: String, from_timestamp: String, to_timestamp: String) -> Result<Plottable, String>;
    async fn get_monthly_data_recent(&self, symbol: String, seconds_back: String) -> Result<Plottable, String>;
    async fn get_quote(&self, symbol: String) -> Result<String, String>;
    async fn search_symbol(&self, keywords: String) -> Result<String, String>;
    async fn get_company_overview(&self, symbol: String) -> Result<String, String>;
    async fn get_earnings(&self, symbol: String) -> Result<String, String>;
    async fn get_sma(&self, symbol: String, interval: String, time_period: u32, series_type: String) -> Result<Plottable, String>;
    async fn get_rsi(&self, symbol: String, interval: String, time_period: u32, series_type: String) -> Result<Plottable, String>;
    fn tools(&self) -> String;
    fn prompts(&self) -> String;
}

#[derive(Serialize, Deserialize, WeilType)]
pub struct StocksContractState {
    // define your contract state here!
    secrets: Secrets<AlphaVantageConfig>,
}

#[smart_contract]
impl Stocks for StocksContractState {
    #[constructor]
    fn new() -> Result<Self, String>
    where
        Self: Sized,
    {
        unimplemented!();
    }


    #[query(plottable)]
    async fn get_intraday_data_range(&self, symbol: String, interval: String, from_timestamp: String, to_timestamp: String) -> Result<Plottable, String> {
        unimplemented!();
    }

    #[query(plottable)]
    async fn get_intraday_data_recent(&self, symbol: String, interval: String, seconds_back: String) -> Result<Plottable, String> {
        unimplemented!();
    }

    #[query(plottable)]
    async fn get_daily_data_range(&self, symbol: String, from_timestamp: String, to_timestamp: String) -> Result<Plottable, String> {
        unimplemented!();
    }

    #[query(plottable)]
    async fn get_daily_data_recent(&self, symbol: String, seconds_back: String) -> Result<Plottable, String> {
        unimplemented!();
    }

    #[query(plottable)]
    async fn get_weekly_data_range(&self, symbol: String, from_timestamp: String, to_timestamp: String) -> Result<Plottable, String> {
        unimplemented!();
    }

    #[query(plottable)]
    async fn get_weekly_data_recent(&self, symbol: String, seconds_back: String) -> Result<Plottable, String> {
        unimplemented!();
    }

    #[query(plottable)]
    async fn get_monthly_data_range(&self, symbol: String, from_timestamp: String, to_timestamp: String) -> Result<Plottable, String> {
        unimplemented!();
    }

    #[query(plottable)]
    async fn get_monthly_data_recent(&self, symbol: String, seconds_back: String) -> Result<Plottable, String> {
        unimplemented!();
    }

    #[query]
    async fn get_quote(&self, symbol: String) -> Result<String, String> {
        unimplemented!();
    }

    #[query]
    async fn search_symbol(&self, keywords: String) -> Result<String, String> {
        unimplemented!();
    }

    #[query]
    async fn get_company_overview(&self, symbol: String) -> Result<String, String> {
        unimplemented!();
    }

    #[query]
    async fn get_earnings(&self, symbol: String) -> Result<String, String> {
        unimplemented!();
    }

    #[query(plottable)]
    async fn get_sma(&self, symbol: String, interval: String, time_period: u32, series_type: String) -> Result<Plottable, String> {
        unimplemented!();
    }

    #[query(plottable)]
    async fn get_rsi(&self, symbol: String, interval: String, time_period: u32, series_type: String) -> Result<Plottable, String> {
        unimplemented!();
    }


    #[query]
    fn tools(&self) -> String {
        r#"[
  {
    "type": "function",
    "function": {
      "name": "get_intraday_data_range",
      "description": "Get intraday time series data for stocks with absolute time range and return as plottable chart\nUse this method when you have specific start and end dates/times (e.g., \"for year 2023\", \"from January to March\")\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbols as comma-separated string (e.g., \"IBM, AAPL, GOOGL\")\n"
          },
          "interval": {
            "type": "string",
            "description": "Time interval: 1min, 5min, 15min, 30min, 60min\n"
          },
          "from_timestamp": {
            "type": "string",
            "description": "Unix timestamp filter\n"
          },
          "to_timestamp": {
            "type": "string",
            "description": "Unix timestamp filter\n"
          }
        },
        "required": [
          "symbol",
          "interval",
          "from_timestamp",
          "to_timestamp"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_intraday_data_recent",
      "description": "Get intraday time series data for stocks with relative time range and return as plottable chart\nUse this method when you want data relative to now (e.g., \"for the last month\", \"past 30 days\", \"last week\")\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbols as comma-separated string (e.g., \"IBM, AAPL, GOOGL\")\n"
          },
          "interval": {
            "type": "string",
            "description": "Time interval: 1min, 5min, 15min, 30min, 60min\n"
          },
          "seconds_back": {
            "type": "string",
            "description": "Number of seconds back from now (e.g., \"2592000\" for ~30 days, \"604800\" for 1 week)\n"
          }
        },
        "required": [
          "symbol",
          "interval",
          "seconds_back"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_daily_data_range",
      "description": "Get daily time series data for stocks with absolute time range and return as plottable chart\nUse this method when you have specific start and end dates/times (e.g., \"for year 2023\", \"from January to March\")\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbols as comma-separated string (e.g., \"IBM, AAPL, GOOGL\")\n"
          },
          "from_timestamp": {
            "type": "string",
            "description": "Unix timestamp filter\n"
          },
          "to_timestamp": {
            "type": "string",
            "description": "Unix timestamp filter\n"
          }
        },
        "required": [
          "symbol",
          "from_timestamp",
          "to_timestamp"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_daily_data_recent",
      "description": "Get daily time series data for stocks with relative time range and return as plottable chart\nUse this method when you want data relative to now (e.g., \"for the last month\", \"past 30 days\", \"last week\")\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbols as comma-separated string (e.g., \"IBM, AAPL, GOOGL\")\n"
          },
          "seconds_back": {
            "type": "string",
            "description": "Number of seconds back from now (e.g., \"2592000\" for ~30 days, \"604800\" for 1 week)\n"
          }
        },
        "required": [
          "symbol",
          "seconds_back"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_weekly_data_range",
      "description": "Get weekly time series data for stocks with absolute time range and return as plottable chart\nUse this method when you have specific start and end dates/times (e.g., \"for year 2023\", \"from January to March\")\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbols as comma-separated string (e.g., \"IBM, AAPL, GOOGL\")\n"
          },
          "from_timestamp": {
            "type": "string",
            "description": "Unix timestamp filter\n"
          },
          "to_timestamp": {
            "type": "string",
            "description": "Unix timestamp filter\n"
          }
        },
        "required": [
          "symbol",
          "from_timestamp",
          "to_timestamp"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_weekly_data_recent",
      "description": "Get weekly time series data for stocks with relative time range and return as plottable chart\nUse this method when you want data relative to now (e.g., \"for the last month\", \"past 30 days\", \"last week\")\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbols as comma-separated string (e.g., \"IBM, AAPL, GOOGL\")\n"
          },
          "seconds_back": {
            "type": "string",
            "description": "Number of seconds back from now (e.g., \"2592000\" for ~30 days, \"604800\" for 1 week)\n"
          }
        },
        "required": [
          "symbol",
          "seconds_back"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_monthly_data_range",
      "description": "Get monthly time series data for stocks with absolute time range and return as plottable chart\nUse this method when you have specific start and end dates/times (e.g., \"for year 2023\", \"from January to March\")\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbols as comma-separated string (e.g., \"IBM, AAPL, GOOGL\")\n"
          },
          "from_timestamp": {
            "type": "string",
            "description": "Unix timestamp filter\n"
          },
          "to_timestamp": {
            "type": "string",
            "description": "Unix timestamp filter\n"
          }
        },
        "required": [
          "symbol",
          "from_timestamp",
          "to_timestamp"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_monthly_data_recent",
      "description": "Get monthly time series data for stocks with relative time range and return as plottable chart\nUse this method when you want data relative to now (e.g., \"for the last month\", \"past 30 days\", \"last week\")\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbols as comma-separated string (e.g., \"IBM, AAPL, GOOGL\")\n"
          },
          "seconds_back": {
            "type": "string",
            "description": "Number of seconds back from now (e.g., \"2592000\" for ~30 days, \"604800\" for 1 week)\n"
          }
        },
        "required": [
          "symbol",
          "seconds_back"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_quote",
      "description": "Get real-time quote for a stock\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbol (e.g., IBM, AAPL)\n"
          }
        },
        "required": [
          "symbol"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "search_symbol",
      "description": "Search for stocks by keyword\n",
      "parameters": {
        "type": "object",
        "properties": {
          "keywords": {
            "type": "string",
            "description": "Keywords to search for (e.g., \"microsoft\", \"MSFT\")\n"
          }
        },
        "required": [
          "keywords"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_company_overview",
      "description": "Get company overview and fundamental data\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbol (e.g., IBM, AAPL)\n"
          }
        },
        "required": [
          "symbol"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_earnings",
      "description": "Get earnings data for a company\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbol (e.g., IBM, AAPL)\n"
          }
        },
        "required": [
          "symbol"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_sma",
      "description": "Get technical indicator data (SMA - Simple Moving Average) and return as plottable chart\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbol (e.g., IBM, AAPL)\n"
          },
          "interval": {
            "type": "string",
            "description": "Time interval: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly\n"
          },
          "time_period": {
            "type": "integer",
            "description": "Time period for SMA calculation (e.g., 20, 50, 200)\n"
          },
          "series_type": {
            "type": "string",
            "description": "Price type: close, open, high, low\n"
          }
        },
        "required": [
          "symbol",
          "interval",
          "time_period",
          "series_type"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_rsi",
      "description": "Get technical indicator data (RSI - Relative Strength Index) and return as plottable chart\n",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Stock symbol (e.g., IBM, AAPL)\n"
          },
          "interval": {
            "type": "string",
            "description": "Time interval: 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly\n"
          },
          "time_period": {
            "type": "integer",
            "description": "Time period for RSI calculation (typically 14)\n"
          },
          "series_type": {
            "type": "string",
            "description": "Price type: close, open, high, low\n"
          }
        },
        "required": [
          "symbol",
          "interval",
          "time_period",
          "series_type"
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

