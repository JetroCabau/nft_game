const PickleCoin = artifacts.require("PickleCoin");

module.exports = function (deployer) {
  deployer.deploy(PickleCoin);
};