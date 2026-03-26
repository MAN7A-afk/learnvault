#![no_std]

use soroban_sdk::{contract, contractimpl, Env, String};

#[contract]
pub struct FungibleAllowlist;

#[contractimpl]
impl FungibleAllowlist {
    pub fn get_version(env: Env) -> String {
        String::from_str(&env, "1.0.0")
    }
}
