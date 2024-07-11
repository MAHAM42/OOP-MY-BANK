#! /usr/bin/env node
import inquirer from "inquirer";
import chlak from "chalk";
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chlak.redBright `withdrawal of $${amount} successful. Rwmaining balance:$${this.balance}`);
        }
        else {
            console.log("Insufficient balance");
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(chlak.green `Depositof $${amount}successful. Remaining Balance: $${this.balance}`);
    }
    checkBalance() {
        console.log(chlak.green `Current balance: $${this.balance} `);
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
const account = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
const customers = [
    new Customer("Hamza", "Khan", "Male", 35, 3162223334, account[0]),
    new Customer("Syeda", "Shanzay", "Female", 24, 33362223334, account[1]),
    new Customer("Arisha", "Khan", "Femaale", 27, 34162223334, account[2])
];
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chlak.yellow `Welcome ${customer.firstName}${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an oppostion",
                    choices: ["Desposite", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Desposite":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to desposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
service();
