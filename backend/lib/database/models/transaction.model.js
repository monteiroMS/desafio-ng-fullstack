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
var account_model_1 = require("./account.model");
var Transaction = /** @class */ (function (_super) {
    __extends(Transaction, _super);
    function Transaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Transaction;
}(sequelize_1.Model));
Transaction.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    debitedAccountId: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
    creditedAccountId: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
    value: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
}, {
    sequelize: _1.default,
    modelName: 'Transactions',
    timestamps: true,
    updatedAt: false,
});
Transaction.belongsTo(account_model_1.default, { foreignKey: 'debitedAccountId', as: 'debitedFrom' });
Transaction.belongsTo(account_model_1.default, { foreignKey: 'creditedAccountId', as: 'creditedIn' });
exports.default = Transaction;
