"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var _1 = require(".");
var user_model_1 = require("./user.model");
var transaction_model_1 = require("./transaction.model");
var Account = /** @class */ (function (_super) {
    __extends(Account, _super);
    function Account() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Account;
}(sequelize_1.Model));
Account.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    balance: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
}, {
    sequelize: _1.default,
    modelName: 'Accounts',
    timestamps: false,
});
Account.hasOne(user_model_1.default, { foreignKey: 'accountId', as: 'user' });
Account.hasMany(transaction_model_1.default, { foreignKey: 'debitedAccountId', as: 'debitedAccount' });
Account.hasMany(transaction_model_1.default, { foreignKey: 'creditedAccountId', as: 'creditedAccount' });
exports.default = Account;
